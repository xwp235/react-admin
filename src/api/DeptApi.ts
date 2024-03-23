import request from '@/utils/request'
import { CreateParams, DelParams, DeptItem, EditParams, Params } from '@/types/Dept'

export default {
  // 获取部门列表
  getDeptList(params?: Params) {
    return request.get<DeptItem[]>('/dept/list', params)
  },
  // 创建部门
  createDept(params: CreateParams) {
    return request.post<void>('/dept/create', params)
  },
  // 修改部门
  editDept(params: EditParams) {
    return request.post<void>('/dept/edit', params)
  },
  // 删除部门
  deleteDept(params: DelParams) {
    return request.post<void>('/dept/delete', params)
  }
}
