import { Dropdown, MenuProps, Switch } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { appText } from '@/config'
import styles from './index.module.scss'
import { useSystemStore, useUserStore } from '@/store'
import CreateBreadcrumb from '@/components/NavHeader/CreateBreadcrumb'
import storage from '@/utils/storage'
import { useEffect } from 'react'

function NavHeader() {
  const userInfo = useUserStore(state => state.userInfo)
  const { collapsed, updateCollapsed, isDark, updateTheme } = useSystemStore()

  useEffect(() => {
    handleSwitch(isDark)
  }, [])

  const items: MenuProps['items'] = [
    {
      key: 'email',
      label: `${appText.fields.email}:${userInfo.userEmail}`
    },
    {
      key: 'logout',
      label: appText.logout
    }
  ]

  // 控制菜单图标关闭和展开
  const toggleCollapsed = () => updateCollapsed()

  const handleSwitch = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.dataset.theme = 'dark'
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.dataset.theme = 'light'
      document.documentElement.classList.remove('dark')
    }
    storage.set('isDark', isDark)
    updateTheme(isDark)
  }

  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <div onClick={toggleCollapsed} className={styles.toggleBtn}>
          {collapsed ? (
            <MenuUnfoldOutlined
              style={{
                fontSize: 24
              }}
            />
          ) : (
            <MenuFoldOutlined
              style={{
                fontSize: 24
              }}
            />
          )}
        </div>
        <CreateBreadcrumb />
      </div>
      <div className={styles.right}>
        <Switch
          checked={isDark}
          style={{ marginRight: 30 }}
          checkedChildren={appText.theme.dark}
          unCheckedChildren={appText.theme.default}
          onChange={handleSwitch}
        />
        <Dropdown menu={{ items }} trigger={['click']}>
          <span className={styles.nickname}>{userInfo.userName}</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
