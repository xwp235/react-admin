import { Breadcrumb, Dropdown, MenuProps, Switch } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'
import { appText } from '@/config'
import styles from './index.module.scss'

function NavHeader() {
  const breadList = [
    {
      title: '首页'
    },
    {
      title: '工作台'
    }
  ]
  const items: MenuProps['items'] = [
    {
      key: 'email',
      label: appText.fields.email
    },
    {
      key: 'logout',
      label: appText.logout
    }
  ]

  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <MenuFoldOutlined />
        <Breadcrumb items={breadList} />
      </div>
      <div className={styles.right}>
        <Switch
          style={{ marginRight: 30 }}
          checkedChildren={appText.theme.dark}
          unCheckedChildren={appText.theme.default}
        />
        <Dropdown menu={{ items }} trigger={['click']}>
          <span className={styles.nickname}>{appText.fields.username}</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
