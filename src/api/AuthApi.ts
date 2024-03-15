import request from '@/utils/request'
import { LoginParams } from '@/types/Login'

export default {
  login(params: LoginParams) {
    return request.post<string>('/users/login', params, { showLoading: false })
  }
}
