import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './service/demo.ts'

import ElementPLus from 'element-plus'
import 'element-plus/dist/index.css'
import MYRequest from './service'

interface DataType {
  data: any
  success: boolean
}
MYRequest.request<DataType>({
  url: 'get'
  // isShowLoading: false
}).then((res) => {
  console.log('返回数据', res)
})

// MYRequest.request({
//   url: 'post',
//   method: 'post',
//   interceptors: {
//     requestInterceptor(config) {
//       console.log('单个请求成功的拦截')
//       return config
//     },
//     responseInterceptor(config) {
//       console.log('单个响应成功的拦截')
//       return config
//     }
//   }
// })
const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPLus)
app.mount('#app')
