import request from '@/utils/request'
import { LoginParams } from '@/types/Login'
import { UserInfo } from '@/types/Api'
import { MenuItem } from '@/types/Menu'

export default {
  login(params: LoginParams) {
    return request.post<string>('/users/login', params, { showLoading: false })
  },
  getUserInfo() {
    return request.get<UserInfo>('/users/getUserInfo')
  },
  // 获取权限列表
  getPermissionList() {
    return request.get<{ buttonList: string[]; menuList: MenuItem[] }>('/users/getPermissionList')
  }
}
