import request from './request'

// 用户相关接口
export const userApi = {
  login(data: { username: string; password: string }) {
    return request.post('/user/login', data)
  },

  getUserInfo() {
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
