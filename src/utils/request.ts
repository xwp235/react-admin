import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import storage from '@/utils/storage.ts'
import env, { appText } from '@/config'
import { HttpResponse } from '@/types/Api.ts'
import { icode, TOKEN } from '@/config/constants.ts'
import { message } from './AntdGlobal.ts'
import { hideLoading, showLoading } from '@/utils/loading'

interface IConfig {
  showLoading?: boolean
  showError?: boolean
}

interface IInternalRequestConfig {
  showLoading?: boolean
  showError?: boolean
}

interface IAxiosResponse {
  config: InternalAxiosRequestConfig & IInternalRequestConfig
}

interface IParams {
  [key: string]: any
}

const instance = axios.create({
  timeout: 8000,
  timeoutErrorMessage: appText.requestTimeout,
  withCredentials: true,
  headers: {
    icode
  }
})

// 请求拦截器
instance.interceptors.request.use(
  (config: IInternalRequestConfig & InternalAxiosRequestConfig) => {
    if (config.showLoading) {
      showLoading()
    }
    const token = storage.get(TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    if (env.mock) {
      config.baseURL = env.mockApi
    } else {
      config.baseURL = env.baseApi
    }
    return {
      ...config
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse & IAxiosResponse) => {
    const data: HttpResponse = response.data
    hideLoading()
    if (response.config.responseType === 'blob') return response
    if (data.code === 500001) {
      // 未登录或登录失效时返回登录页面
      handleError(new Error(data.msg))
      storage.remove(TOKEN)
      location.href = `/login?callback=${encodeURIComponent(location.href)}`
    } else if (data.code !== 0) {
      if (response.config.showError === false) {
        return Promise.resolve(data)
      } else {
        handleError(new Error(data.msg))
        return Promise.reject(data)
      }
    }
    return data.data
  },
  error => {
    hideLoading()
    message.error(error.message)
    return Promise.reject(error.message)
  }
)

export default {
  get<T>(
    url: string,
    params?: IParams,
    options: IConfig & AxiosRequestConfig = {
      showLoading: true,
      showError: true
    }
  ): Promise<T> {
    return instance.get(url, { params, ...options })
  },
  post<T>(
    url: string,
    data?: IParams,
    options: IConfig & AxiosRequestConfig = {
      showLoading: true,
      showError: true
    }
  ): Promise<T> {
    return instance.post(url, data, options)
  }
}

export function handleError(e: unknown): void {
  if (e instanceof Error) {
    message.error(e.message)
  } else {
    message.error('An unknown error occurred.')
  }
}
