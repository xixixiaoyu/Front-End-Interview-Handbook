import request from './request'

export function refreshToken() {
  // 发送刷新 token 的请求
  return request.post('/refresh-token')
}
