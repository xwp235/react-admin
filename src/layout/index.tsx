import React, { useEffect, useRef } from 'react'
import { Layout, Watermark } from 'antd'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Sidebar from '@/components/Sidebar'
import { Navigate, Outlet, useLocation, useRouteLoaderData } from 'react-router-dom'
import styles from './index.module.scss'
import AuthApi from '@/api/AuthApi.ts'
import { useSystemStore, useUserStore } from '@/store'
import TabsFC from '@/components/Tabs'
import { IAuthLoader } from '@/router/AuthLoader'
import { searchRoute } from '@/utils'
import { router } from '@/router'

const { Sider } = Layout

const App: React.FC = () => {
  const { userInfo, updateUserInfo } = useUserStore()
  const collapsed = useSystemStore(state => state.collapsed)
  const initialized = useRef(false)

  const getUserInfo = () => AuthApi.getUserInfo().then(userInfo => updateUserInfo(userInfo))
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      getUserInfo()
    }
  }, [])

  // 权限判断
  const { pathname } = useLocation()
  const data = useRouteLoaderData('layout') as IAuthLoader
  const route = searchRoute(pathname, router)
  // if (route && route.meta.auth === false) {
  // 继续执行
  // }
  if (!route || route.meta.auth) {
    const staticPath = ['/welcome', '/403', '/404']
    if (!data.menuPathList.includes(pathname) && !staticPath.includes(pathname)) {
      return <Navigate to="/403" />
    }
  }

  return (
    <Watermark content="React">
      {userInfo._id ? (
        <Layout>
          <Sider collapsed={collapsed}>
            <Sidebar />
          </Sider>
          <Layout>
            <NavHeader />
            <TabsFC />
            <div className={styles.content}>
              <div className={styles.wrapper}>
                <Outlet></Outlet>
              </div>
              <NavFooter />
            </div>
          </Layout>
        </Layout>
      ) : null}
    </Watermark>
  )
}

export default App
