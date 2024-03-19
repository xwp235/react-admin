import request from '@/utils/request'
import { LoginParams } from '@/types/Login'
import { LoginUserInfo } from '@/types/Api.ts'

export default {
  login(params: LoginParams) {
    return request.post<string>('/users/login', params, { showLoading: false })
  },
  getUserInfo() {
    return request.get<LoginUserInfo>('/users/getUserInfo')
  }
}
