export let BASE_URL = ''
export const TIME_OUT = 5000
export const BASE_NAME = '选品大师'
//152.136.185.210:5000/

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://152.136.185.210:5000'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://httpbin.org/pro'
}
