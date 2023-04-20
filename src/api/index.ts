import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { message } from 'antd'
import router from '@/router'
import { httpResEnum } from '@/enums/httpEnum'
import { checkStatus } from './utils/checkStatus'
import { ResultData } from './types'
import { AxiosCanceler } from './utils/axiosCancel'
import { store } from '@/store'
import { setToken } from '@/store/modules/system/action'

const config = {
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  timeout: httpResEnum.TIMEOUT as number,
  headers: {
    adminid: localStorage.getItem('adminId') || 'e8774e4015f733aeac3d2d242ce411d378ed8307'
  },
  // 跨域时候允许携带凭证
  withCredentials: true
}

const axiosCanceler = new AxiosCanceler()

class Http {
  service: AxiosInstance

  // 实例化axios
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)

    // 请求拦截器
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        axiosCanceler.addPending(config)

        const token = store.getState().system.token

        if (token) config.headers.Authorization = `Bearer ${token}`

        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response

        // token过期, 后端如果重新返回, 则储存在本地
        const { authorization: authStr } = response.headers

        if (authStr && authStr.length > 0) {
          const token = authStr.substr(7)
          localStorage.setItem('token', token)
        }

        axiosCanceler.removePending(config)

        // token过期
        if (data.code == httpResEnum.OVERDUE) {
          message.error(data.msg)
          store.dispatch(setToken(null))
          window.location.hash = '/login'
          return Promise.reject(data)
        }

        // 全局错误信息拦截
        if (data.code !== httpResEnum.SUCCESS) {
          message.error(data.msg)
          return Promise.reject(data)
        }

        // 请求成功
        return data
      },
      (error: AxiosError) => {
        const { response: res } = error

        // 请求超时 && 网络错误单独判断，没有 response
        if (error.message.indexOf('timeout') !== -1) message.error('请求超时！请您稍后重试')
        if (error.message.indexOf('Network Error') !== -1) message.error('网络错误！请您稍后重试')

        // 根据响应的错误状态码, 做不同的处理
        if (res) checkStatus(res.status)

        return Promise.reject(error)
      }
    )
  }

  // https://axios-http.com/zh/docs/example
  // config: https://axios-http.com/zh/docs/req_config

  // 常用请求方法封装
  get<T>(url: string, params?: object, config = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ...config })
  }

  post<T>(url: string, params?: object, config = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, config)
  }

  put<T>(url: string, params?: object, config = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, config)
  }

  delete<T>(url: string, params?: any, config = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ...config })
  }

  download<T>(url: string, params?: object, config = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ...config, responseType: 'blob' })
  }
}

export default new Http(config)
