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
    buttonList: data.buttonList,
    menuList: data.menuList,
    menuPathList
  }
}
