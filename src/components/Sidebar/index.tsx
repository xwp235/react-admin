import { Menu } from 'antd'
import { DesktopOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()

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
  const handleClickLogo = () => {
    console.log('++')
    navigate('/welcome')
  }

  return (
    <div className="sidebar">
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src="/images/logo.png" className={styles.img} />
        <span>慕课货运</span>
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        theme="dark"
        items={items}
        style={{
          height: 'calc(100vh - 64px)'
        }}
      ></Menu>
    </div>
  )
}

export default Sidebar
