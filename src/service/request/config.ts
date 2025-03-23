export let BASE_URL = ''
export const TIME_OUT = 5000
export const PRE_FIX = '/v1/login/'
export const BASE_NAME = '选品大师'
//152.136.185.210:5000/

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://118.193.62.187:18882'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://118.193.62.187:18882'
}
