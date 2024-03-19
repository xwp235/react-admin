import React, { useEffect, useRef } from 'react'
import { Layout, Watermark } from 'antd'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Sidebar from '@/components/Sidebar'
import { Outlet } from 'react-router-dom'
import styles from './index.module.scss'
import AuthApi from '@/api/AuthApi.ts'
import { useSystemStore, useUserStore } from '@/store'

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

  return (
    <Watermark content="React">
      {userInfo._id ? (
        <Layout>
          <Sider collapsed={collapsed}>
            <Sidebar />
          </Sider>
          <Layout>
            <NavHeader />
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
