import request from '@/utils/request'
import { PageData, PageParams, UserInfo } from '@/types/Api'
import { CreateUserParams, EditUserParams, UserQueryParams } from '@/types/User.ts'

export default {
  // 获取用户列表
  getUserList(params: UserQueryParams & PageParams) {
    return request.get<PageData<UserInfo>>('/users/list', params)
  },
  // 创建用户
  createUser(params: CreateUserParams) {
    return request.post<void>('/users/create', params)
  },
  // 修改用户信息
  editUser(params: EditUserParams) {
    return request.post<void>('/users/edit', params)
  },
  // 删除和批量删除用户
  delUser(params: { userIds: number[] }) {
    return request.post<void>('/users/delete', params)
  },
  // 获取当前账号下的所有用户
  getAllUserList() {
    return request.get<UserInfo[]>('/users/all/list')
  }
}
