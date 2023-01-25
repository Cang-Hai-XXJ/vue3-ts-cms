import { BASE_URL, TIME_OUT } from './request/config'
import MYRequest from './request'
import localCache from '@/utils/localCache'
//单个请求实例
const request = new MYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    //携带token
    requestInterceptor: (config) => {
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      // console.log('请求成功拦截')
      return config
    },
    responseInterceptor: (res) => {
      // console.log('响应成功拦截')
      return res
    }
  }
})

export default request
