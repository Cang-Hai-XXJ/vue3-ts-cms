import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './assets/css/index.less'

import ElementPLus from 'element-plus'
import 'element-plus/dist/index.css'
// import MYRequest from './service'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { setupStore } from './store'

// MYRequest.post({
//   url: 'login',
//   data: {
//     name: 'coderwhy',
//     password: '123456'
//   }
//   // isShowLoading: false
// }).then((res) => {
//   console.log('返回数据', res)
// })

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

setupStore()

app.use(router)
app.use(store)
app.use(ElementPLus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
