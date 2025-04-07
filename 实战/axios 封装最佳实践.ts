// request.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || '', // 接口基础地址
  timeout: 10000, // 请求超时时间（毫秒）
  headers: {
    'Content-Type': 'application/json',
  },
})

// 存储请求标识和取消函数的映射
const pendingMap = new Map<string, AbortController>()

// 生成请求标识
function getRequestKey(config: AxiosRequestConfig): string {
  const { url, method, params, data } = config
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}

// 添加取消请求功能
function addPending(config: AxiosRequestConfig) {
  const requestKey = getRequestKey(config)
  if (pendingMap.has(requestKey)) {
    // 如果存在相同请求，取消前一个请求
    const controller = pendingMap.get(requestKey)
    if (controller) {
      controller.abort()
    }
    pendingMap.delete(requestKey)
  }

  const controller = new AbortController()
  config.signal = controller.signal
  pendingMap.set(requestKey, controller)
}

// 移除请求标识
function removePending(config: AxiosRequestConfig) {
  const requestKey = getRequestKey(config)
  if (pendingMap.has(requestKey)) {
    pendingMap.delete(requestKey)
  }
}

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 添加请求取消功能
    addPending(config)
    // 可在请求发送前添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 处理其他请求配置
    return config
  },
  (error) => {
    console.error('请求错误：', error)
    return Promise.reject(error)
  }
)

// 自动刷新 token 相关变量
let isRefreshing = false
let requests: Function[] = []

// 模拟刷新 token 函数
function refreshToken() {
  return new Promise<string>((resolve) => {
    // 这里应该是实际的刷新 token 请求
    setTimeout(() => {
      resolve('new_token')
    }, 1000)
  })
}

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 请求完成后，移除请求标识
    removePending(response.config)
    const res = response.data

    // 根据自己的业务状态码进行判断
    if (res.code !== 200) {
      // 处理业务错误
      if (res.code === 401) {
        const config = response.config
        if (!config.url.includes('/refresh-token')) {
          if (!isRefreshing) {
            isRefreshing = true

            // 尝试刷新 token
            return refreshToken()
              .then((newToken) => {
                // 重新设置 token
                localStorage.setItem('token', newToken)

                // 重新发送队列中的请求
                requests.forEach((cb) => cb(newToken))
                requests = []

                // 重新发送当前请求
                config.headers.Authorization = `Bearer ${newToken}`
                return service(config)
              })
              .finally(() => {
                isRefreshing = false
              })
          } else {
            // 将请求加入队列
            return new Promise((resolve) => {
              requests.push((token) => {
                config.headers.Authorization = `Bearer ${token}`
                resolve(service(config))
              })
            })
          }
        }
      }

      // 其他业务错误处理
      return Promise.reject(new Error(res.message || '未知错误'))
    }

    // 正常返回数据
    return res.data
  },
  (error) => {
    // 请求失败也要移除请求标识
    if (error.config) {
      removePending(error.config)
    }
    // 处理 HTTP 错误
    const { status, data } = error.response || {}
    let message = '网络错误'

    switch (status) {
      case 400:
        message = '请求错误'
        break
      case 401:
        message = '未授权，请重新登录'
        // 可以在这里处理登出逻辑
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
        message = `连接错误 ${status}`
    }

    console.error(`请求失败：${message}`, error)
    return Promise.reject(error)
  }
)

// 定义响应数据的类型
interface BaseResponse<T = any> {
  code: number
  data: T
  message: string
}

// 封装请求方法
const request = {
  get<T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, { params, ...config })
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config)
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config)
  },

  delete<T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, { params, ...config })
  },

  // 上传文件
  upload<T = any>(url: string, file: File, filename = 'file', data?: object): Promise<T> {
    const formData = new FormData()
    formData.append(filename, file)

    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
    }

    return service.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

export default request

// api.ts
// import request from './request'

// 用户相关接口
interface UserInfo {
  id: number
  name: string
  avatar: string
}

export const userApi = {
  login(data: { username: string; password: string }) {
    return request.post('/user/login', data)
  },

  getUserInfo(): Promise<UserInfo> {
    return request.get('/user/info')
  },
}

// 商品相关接口
export const productApi = {
  getList(params: { page: number; size: number }) {
    return request.get('/products', params)
  },

  getDetail(id: number) {
    return request.get(`/products/${id}`)
  },
}

// 使用示例
// 可以将这部分代码放在单独的文件中进行测试
// import { userApi } from './api'

async function login() {
  try {
    const result = await userApi.login({
      username: 'admin',
      password: '123456',
    })
    console.log('登录成功', result)
  } catch (error) {
    console.error('登录失败', error)
  }
}

login()
