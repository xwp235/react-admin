import { appText } from '@/config'
import { MenuItem } from '@/types/Menu'

// 格式化金额
export const formatMoney = (num?: number | string) => {
  if (!num) {
    return '0.00'
  }
  const a = parseFloat(num.toString())
  return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
}

// 格式化数字
export const formatNum = (num?: number | string) => {
  if (!num) {
    return 0
  }
  const a = num.toString()
  if (a.indexOf('.') > -1) {
    return a.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  }
  return a.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}

// 格式化日期
export const toLocalDate = (date?: Date, rule?: string) => {
  let curDate = new Date()
  if (date) {
    curDate = date
  }
  if (rule === 'yyyy-MM-dd') {
    return curDate.toLocaleDateString().replace(/\//g, '-')
  }
  if (rule === 'HH:mm:ss') {
    return curDate.toLocaleTimeString().replace(/\//g, '-')
  }
  return curDate.toLocaleString().replace(/\//g, '-')
}

// 格式化日期
export const formatDate = (date?: Date | string, rule?: string) => {
  let curDate = new Date()
  if (date instanceof Date) {
    curDate = date
  } else if (date) {
    curDate = new Date(date)
  }

  let fmt = rule || 'yyyy-MM-dd HH:mm:ss'
  fmt = fmt.replace(/(y+)/, curDate.getFullYear().toString())
  type OType = {
    [key: string]: number
  }
  const O: OType = {
    'M+': curDate.getMonth() + 1,
    'd+': curDate.getDate(),
    'H+': curDate.getHours(),
    'm+': curDate.getMinutes(),
    's+': curDate.getSeconds()
  }
  for (const k in O) {
    fmt = fmt.replace(new RegExp(`(${k})`), O[k] > 9 ? O[k].toString() : '0' + O[k].toString())
  }
  return fmt
}

// 用户状态转换
export const formatState = (state: number) => {
  if (state === 1) {
    return appText.working
  }
  if (state === 2) {
    return appText.trialPeriod
  }
  if (state === 3) {
    return appText.retired
  }
}

// 获取页面路径
export const getMenuPath = (list: MenuItem[]): string[] => {
  return list.reduce((result: string[], item: MenuItem) => {
    return result.concat(Array.isArray(item.children) && !item.buttons ? getMenuPath(item.children) : item.path + '')
  }, [])
}

/**
 * 递归查找树的路径
 */
export const findTreeNode = (tree: MenuItem[], pathName: string, path: string[]): string[] => {
  if (!tree) {
    return []
  }
  for (const data of tree) {
    path.push(data.menuName)
    if (data.path === pathName) {
      return path
    }
    if (data.children?.length) {
      const list = findTreeNode(data.children, pathName, path)
      if (list?.length) {
        return list
      }
    }
    path.pop()
  }
  return []
}

// 递归获取路由对象
export const searchRoute: any = (path: string, routes: MenuItem[] = []) => {
  for (const item of routes) {
    if (item.path === path) {
      return item
    }
    if (item.children) {
      const result = searchRoute(path, item.children)
      if (result) {
        return result
      }
    }
  }
  return null
}
