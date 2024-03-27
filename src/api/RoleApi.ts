import request from '@/utils/request'
import { PageData } from '@/types/Api'
import { CreateParams, EditParams, Params, RoleItem, Permission } from '@/types/Role'

export default {
  // 获取角色列表
  getRoleList(params: Params) {
    return request.get<PageData<RoleItem>>('/roles/list', params)
  },
  // 创建角色
  createRole(params: CreateParams) {
    return request.post<void>('/roles/create', params)
  },
  // 编辑角色
  editRole(params: EditParams) {
    return request.post<void>('/roles/edit', params)
  },
  // 删除角色
  delRole(params: { _id: string }) {
    return request.post<void>('/roles/delete', params)
  },
  // 设置权限
  updatePermission(params: Permission) {
    return request.post<void>('/roles/update/permission', params)
  },
  // 获取所有角色列表
  getAllRoleList() {
    return request.get<RoleItem[]>('/roles/allList')
  }
}
