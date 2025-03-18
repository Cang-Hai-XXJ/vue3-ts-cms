import axios from 'axios'
import type {
  AxiosInstance,
  RawAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import { ElLoading } from 'element-plus'
// import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

interface RequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (err: any) => any
}
interface MYRequestConfig<T = AxiosResponse> extends RawAxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
  isShowLoading?: boolean
}

const LOADING_STATE = true
class MYRequest {
  instance: AxiosInstance
  interceptors?: RequestInterceptors
  loading: any
  isShowLoading: boolean
  constructor(config: MYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.isShowLoading = config.isShowLoading ?? LOADING_STATE

    // 单个实例的拦截器
    // this.instance.interceptors.request.use(
    //   this.interceptors?.requestInterceptor,
    //   this.interceptors?.requestInterceptorCatch
    // )
    // this.instance.interceptors.response.use(
    //   this.interceptors?.responseInterceptor,
    //   this.interceptors?.responseInterceptorCatch
    // )

    // 所有实例的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.isShowLoading) {
          this.loading = ElLoading.service({
            text: '正在加载...',
            lock: true
          })
        }

        // console.log('所有实例请求成功的拦截器')
        return config
      },
      (err) => {
        // console.log('所有实例请求失败的拦截器')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有实例响应成功的拦截器')
        this.loading?.close()

        // returnCode 类型错误拦截
        const { data } = res.data
        if (data?.returnCode === '-1001') {
          console.log('请求失败')
        } else {
          return data
        }
      },
      (err) => {
        // HttpErrorCode 类型错误拦截
        if (err.response.status !== 200) {
          console.log('请求失败')
        }

        // console.log('所有实例响应失败的拦截器')
        this.loading?.close()
        return err
      }
    )
  }

  request<T>(config: MYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //单个请求的拦截器
      if (config.isShowLoading === false) {
        this.isShowLoading = config.isShowLoading
      }
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config as any)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
        .finally(() => {
          //设置为初始状态，以免影响下一个请求
          this.isShowLoading = LOADING_STATE
        })
    })
  }
  get<T>(config: MYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: MYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: MYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: MYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default MYRequest
