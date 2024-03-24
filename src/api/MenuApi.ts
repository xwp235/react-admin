import request from '@/utils/request'
import { CreateParams, DelParams, MenuItem, EditParams, Params } from '@/types/Menu'

export default {
  // 菜单管理
  getMenuList(params?: Params) {
    return request.get<MenuItem[]>('/menu/list', params)
  },
  // 创建菜单
  createMenu(params: CreateParams) {
    return request.post<void>('/menu/create', params)
  },
  // 编辑菜单
  editMenu(params: EditParams) {
    return request.post<void>('/menu/edit', params)
  },
  // 删除菜单
  deleteMenu(params: DelParams) {
    return request.post<void>('/menu/delete', params)
  }
}
