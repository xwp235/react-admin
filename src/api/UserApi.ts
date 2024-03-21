import request from '@/utils/request'
import { UserPageParams } from '@/types/User.ts'
import { PageData, UserInfo } from '@/types/Api.ts'

export default {
  // 获取用户列表
  getUserList(params?: UserPageParams) {
    return request.get<PageData<UserInfo>>('/users/list', params)
  }
}
