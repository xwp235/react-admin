import { Menu, MenuProps } from 'antd'
import styles from './index.module.scss'
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'
import { useSystemStore } from '@/store'
import { appText } from '@/config'
import React, { useEffect, useState } from 'react'
import { MenuItem as IMenuItem } from '@/types/Menu'
import * as Icons from '@ant-design/icons'
import { IAuthLoader } from '@/router/AuthLoader.ts'

function Sidebar() {
  const navigate = useNavigate()
  const { collapsed, isDark } = useSystemStore(state => ({ collapsed: state.collapsed, isDark: state.isDark }))
  const data = useRouteLoaderData('layout') as IAuthLoader
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const { pathname } = useLocation()
  // Logo点击
  const handleClickLogo = () => navigate('/welcome')

  type MenuItem = Required<MenuProps>['items'][number]

  // 生成每一个菜单项
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      label,
      key,
      icon,
      children
    } as MenuItem
  }

  const [menuList, setMenuList] = useState<MenuItem[]>([])

  // 递归生成菜单
  const getTreeMenu = (menuList: IMenuItem[], treeList: MenuItem[] = []) => {
    menuList.forEach((item, index) => {
      if (item.menuType === 1 && item.menuState === 1) {
        if (item.buttons) {
          // path为空时把索引当作key值
          return treeList.push(getItem(item.menuName, item.path || index, createIcon(item.icon)))
        }
        treeList.push(
          getItem(item.menuName, item.path || index, createIcon(item.icon), getTreeMenu(item.children || []))
        )
      }
    })
    return treeList
  }

  function createIcon(name?: string) {
    if (!name) {
      return <></>
    }
    const customerIcons: { [key: string]: any } = Icons
    const icon = customerIcons[name]
    if (!icon) {
      return <></>
    }
    return React.createElement(icon)
  }

  // 菜单点击
  const handleClickMenu = ({ key }: { key: string }) => {
    setSelectedKeys([key])
    navigate(key)
  }

  // 初始化，获取接口菜单列表数据
  useEffect(() => {
    const treeMenuList = getTreeMenu(data.menuList)
    setMenuList(treeMenuList)
    setSelectedKeys([pathname])
  }, [])

  return (
    <div className={styles.navSide}>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src="/images/logo.png" className={styles.img} />
        {collapsed ? '' : <span className={styles.logoText}>{appText.logoText}</span>}
      </div>
      <Menu
        mode="inline"
        theme={isDark ? 'light' : 'dark'}
        style={{
          width: collapsed ? 80 : 'auto',
          height: 'calc(100vh - 64px)'
        }}
        selectedKeys={selectedKeys}
        onClick={handleClickMenu}
        items={menuList}
      ></Menu>
    </div>
  )
}

export default Sidebar
