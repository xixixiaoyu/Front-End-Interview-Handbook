import type { AxiosRequestConfig } from 'axios'

// 存储请求标识和取消函数的映射
const pendingMap = new Map<string, AbortController>()

// 生成请求标识
function getRequestKey(config: AxiosRequestConfig): string {
  const { url, method, params, data } = config
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}

// 添加取消请求功能
export function addPending(config: AxiosRequestConfig) {
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
export function removePending(config: AxiosRequestConfig) {
  const requestKey = getRequestKey(config)
  if (pendingMap.has(requestKey)) {
    pendingMap.delete(requestKey)
  }
}
