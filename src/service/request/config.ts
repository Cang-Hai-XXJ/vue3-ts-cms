export let BASE_URL = ''
export const TIME_OUT = 5000
export const PRE_FIX = '/v1/'
export const BASE_NAME = '选品大师'
export const BASE_REDIRECT = 'http://localhost:8080/#/main/index'
//152.136.185.210:5000/

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'https://koiai.com.cn:18882'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'https://koiai.com.cn:18882'
}
