import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { addPending, removePending } from './cancel'
import { refreshToken } from './refresh'

// 定义响应数据的类型
interface BaseResponse<T = any> {
  code: number
  data: T
  message: string
}

// 自定义扩展 AxiosRequestConfig 类型
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  retryCount?: number
  retryDelay?: number
  shouldRetry?: boolean
  withToken?: boolean
}

// 创建模块级变量，用于 token 刷新控制
let isRefreshing = false
const requests: Function[] = []

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '', // 接口基础地址
  timeout: 15000, // 请求超时时间（毫秒）
  headers: {
    'Content-Type': 'application/json',
  },
  // 对于跨域请求，允许携带 cookie
  withCredentials: true,
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig & CustomAxiosRequestConfig) => {
    // 添加请求取消功能
    addPending(config)

    // 默认带上 token，除非特别指定
    if (config.withToken !== false) {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    // 调试日志
    if (import.meta.env.DEV) {
      console.log(`[请求] ${config.method?.toUpperCase()} ${config.url}`, config)
    }

    return config
  },
  (error) => {
    console.error('请求错误：', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 请求完成后，移除请求标识
    removePending(response.config)

    const config = response.config as CustomAxiosRequestConfig
    // 正确获取后端返回的数据
    const res = response.data as BaseResponse

    // 调试日志
    if (import.meta.env.DEV) {
      console.log(`[响应] ${config.method?.toUpperCase()} ${config.url}`, res)
    }

    // 根据业务状态码进行判断
    if (res.code !== 200) {
      // 未授权，尝试刷新 token
      if (res.code === 401 && config.url && !config.url.includes('/refresh-token')) {
        if (!isRefreshing) {
          isRefreshing = true

          // 尝试刷新 token
          return refreshToken()
            .then((newToken) => {
              // 重新设置 token
              localStorage.setItem('token', newToken)

              // 重新发送队列中的请求
              requests.forEach((cb) => cb(newToken))
              requests.length = 0

              // 重新发送当前请求
              const newConfig = { ...config }
              if (newConfig.headers) {
                newConfig.headers.Authorization = `Bearer ${newToken}`
              }
              return service(newConfig)
            })
            .catch((err) => {
              // token 刷新失败，可能需要重新登录
              console.error('Token 刷新失败', err)
              // 这里可以添加跳转到登录页面的逻辑
              window.location.href = '/login'
              return Promise.reject(new Error('登录已过期，请重新登录'))
            })
            .finally(() => {
              isRefreshing = false
            })
        } else {
          // 将请求加入队列
          return new Promise((resolve) => {
            requests.push((token: string) => {
              if (config.headers) {
                config.headers.Authorization = `Bearer ${token}`
              }
              resolve(service(config))
            })
          })
        }
      }

      // 其他业务错误处理
      return Promise.reject(new Error(res.message || '未知错误'))
    }

    // 正常返回数据
    return res.data
  },
  async (error) => {
    // 请求失败也要移除请求标识
    if (error.config) {
      removePending(error.config)
    }

    const config = error.config as CustomAxiosRequestConfig

    // 实现请求重试机制
    if (config && config.shouldRetry !== false) {
      config.retryCount = config.retryCount || 0
      const maxRetries = config.retryCount >= (config.retryCount || 2)

      if (!maxRetries) {
        config.retryCount += 1
        const delay = config.retryDelay || 1000

        // 延迟重试
        await new Promise((resolve) => setTimeout(resolve, delay))
        return service(config)
      }
    }

    // 处理 HTTP 错误
    const { response } = error || {}
    let message = '网络错误'

    if (response) {
      const { status } = response
      switch (status) {
        case 400:
          message = '请求参数错误'
          break
        case 401:
          message = '未授权，请重新登录'
          // 这里可以添加跳转到登录页面的逻辑
          // window.location.href = '/login'
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = '请求的资源不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = `服务器错误 (${status})`
      }
    } else if (error.message && error.message.includes('timeout')) {
      message = '请求超时，请稍后重试'
    } else if (error.message && error.message.includes('Network')) {
      message = '网络异常，请检查您的网络连接'
    }

    // 调试日志
    if (import.meta.env.DEV) {
      console.error(
        `[请求错误] ${config?.method?.toUpperCase()} ${config?.url}: ${message}`,
        error
      )
    }

    return Promise.reject(error)
  }
)

// 封装请求方法
const request = {
  get<T = any>(
    url: string,
    params?: object,
    config?: CustomAxiosRequestConfig
  ): Promise<T> {
    return service.get(url, { params, ...config })
  },

  post<T = any>(
    url: string,
    data?: object,
    config?: CustomAxiosRequestConfig
  ): Promise<T> {
    return service.post(url, data, config)
  },

  put<T = any>(
    url: string,
    data?: object,
    config?: CustomAxiosRequestConfig
  ): Promise<T> {
    return service.put(url, data, config)
  },

  delete<T = any>(
    url: string,
    params?: object,
    config?: CustomAxiosRequestConfig
  ): Promise<T> {
    return service.delete(url, { params, ...config })
  },

  // 上传文件
  upload<T = any>(
    url: string,
    file: File | Blob,
    filename = 'file',
    data?: Record<string, any>,
    config?: CustomAxiosRequestConfig
  ): Promise<T> {
    const formData = new FormData()
    formData.append(filename, file)

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
      })
    }

    return service.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    })
  },

  // 下载文件
  download(
    url: string,
    params?: object,
    config?: CustomAxiosRequestConfig
  ): Promise<Blob> {
    return service.get(url, {
      params,
      responseType: 'blob',
      ...config,
    })
  },

  // 自定义请求
  request<T = any>(config: CustomAxiosRequestConfig): Promise<T> {
    return service(config)
  },
}

export default request
export type { BaseResponse, CustomAxiosRequestConfig }
