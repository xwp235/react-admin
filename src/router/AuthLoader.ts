import { MenuItem } from '@/types/Menu'
import { getMenuPath } from '@/utils'
import AuthApi from '@/api/AuthApi'

export interface IAuthLoader {
  buttonList: string[]
  menuList: MenuItem[]
  menuPathList: string[]
}

export default async function AuthLoader() {
  const data = await AuthApi.getPermissionList()
  const menuPathList = getMenuPath(data.menuList)
  return {
    // 获取页面按钮权限
    buttonList: data.buttonList,
    // 渲染页面左侧主菜单
    menuList: data.menuList,
    menuPathList
  }
}
