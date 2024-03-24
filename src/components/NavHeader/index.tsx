import { Dropdown, MenuProps, Switch } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { appText } from '@/config'
import styles from './index.module.scss'
import { useSystemStore, useUserStore } from '@/store'
import CreateBreadcrumb from '@/components/NavHeader/CreateBreadcrumb'

function NavHeader() {
  const userInfo = useUserStore(state => state.userInfo)
  const { collapsed, updateCollapsed } = useSystemStore()

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
          style={{ marginRight: 30 }}
          checkedChildren={appText.theme.dark}
          unCheckedChildren={appText.theme.default}
        />
        <Dropdown menu={{ items }} trigger={['click']}>
          <span className={styles.nickname}>{userInfo.userName}</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
