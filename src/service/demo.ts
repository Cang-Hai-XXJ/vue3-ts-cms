import axios from 'axios'

axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 5000
axios
  .get('get', {
    params: {
      name: 'xxj',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })

//多个请求一起发送,一起返回
axios
  .all([
    axios.get('get'),
    axios.post('post', {
      data: {
        name: 'all'
      }
    })
  ])
  .then((res) => {
    console.log('all0000', res[0].data)
    console.log('all1111', res[1].data)
  })

//拦截器 ,f1成功回调，f2失败回调
// axios.interceptors.request(fn1,fn2)
// axios.interceptors.response(fn1,fn2)

//封装axios，
//1，减少模块对axios的耦合，即便axios不维护也能更换其他库
//2，统一添加token和loading状态，减少重复代码
