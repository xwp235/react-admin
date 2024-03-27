import { IAuthLoader } from '@/router/AuthLoader'
import { useUserStore } from '@/store'
import { Button } from 'antd'
import { useRouteLoaderData } from 'react-router-dom'

/**
 * 用法： <AuthButton auth="create">新增</AuthButton>
 * @param props
 * @constructor
 */
export default function AuthButton(props: any) {
  const data = useRouteLoaderData('layout') as IAuthLoader
  const role = useUserStore(state => state.userInfo.role)
  if (!props.auth) {
    return <Button {...props}>{props.children}</Button>
  }
  if (data.buttonList.includes(props.auth) || role == 1) {
    // 1代表管理员，直接放行
    return <Button {...props}>{props.children}</Button>
  }
  return <></>
}
