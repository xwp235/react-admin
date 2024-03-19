import { Menu } from 'antd'
import { DesktopOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { useSystemStore } from '@/store'

function Sidebar() {
  const navigate = useNavigate()
  const collapsed = useSystemStore(state => state.collapsed)
  const items = [
    {
      label: '工作台',
      key: '1',
      icon: <DesktopOutlined />
    },
    {
      label: '系统管理',
      key: '2',
      icon: <SettingOutlined />,
      children: [
        {
          label: '用户管理',
          key: '3',
          icon: <TeamOutlined />
        }
      ]
    }
  ]

  // Logo点击
  const handleClickLogo = () => navigate('/welcome')

  return (
    <div className={styles.navSide}>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src="/images/logo.png" className={styles.img} />
        {collapsed ? '' : <span className={styles.logoText}>慕慕货运</span>}
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        theme="dark"
        items={items}
        style={{
          width: collapsed ? 80 : 'auto',
          height: 'calc(100vh - 64px)'
        }}
      ></Menu>
    </div>
  )
}

export default Sidebar
