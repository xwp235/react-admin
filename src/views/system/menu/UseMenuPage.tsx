import { Button, Form, Space } from 'antd'
import { formatDate } from '@/utils'
import { ColumnsType } from 'antd/es/table'
import { EditParams, MenuItem } from '@/types/Menu'
import { useEffect, useRef, useState } from 'react'
import MenuApi from '@/api/MenuApi'
import { modal, message } from '@/utils/AntdGlobal'
import { IAction } from '@/types/Modal'

function UseMenuPage() {
  const [form] = Form.useForm()
  const [data, setData] = useState<MenuItem[]>([])
  const menuRef = useRef<{
    open: (type: IAction, data?: EditParams | { parentId?: string; orderBy?: number }) => void
  }>()

  useEffect(() => {
    getMenuList()
  }, [])

  // 获取用户列表
  const getMenuList = () => {
    MenuApi.getMenuList(form.getFieldsValue()).then(data => setData(data))
  }

  // 重置
  const handleReset = () => {
    form.resetFields()
  }

  // 创建部门
  const handleCreate = () => {
    menuRef.current?.open('create', {
      orderBy: data.length
    })
  }

  const handleSubCreate = (record: MenuItem) => {
    menuRef.current?.open('create', { parentId: record._id, orderBy: record.children?.length })
  }

  // 编辑部门
  const handleEdit = (record: MenuItem) => {
    menuRef.current?.open('edit', record)
  }

  // 删除菜单
  const handleDelete = (record: MenuItem) => {
    let text = ''
    if (record.menuType == 1) {
      text = '菜单'
    }
    if (record.menuType == 2) {
      text = '按钮'
    }
    if (record.menuType == 3) {
      text = '页面'
    }
    modal.confirm({
      title: '确认',
      content: `确认删除该${text}吗？`,
      onOk() {
        handleDelSubmit(record._id)
      }
    })
  }

  // 删除提交
  const handleDelSubmit = async (_id: string) => {
    await MenuApi.deleteMenu({
      _id
    })
    message.success('删除成功')
    getMenuList()
  }

  const columns: ColumnsType<MenuItem> = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName'
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      key: 'icon'
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render(menuType: number) {
        return {
          1: '菜单',
          2: '按钮',
          3: '页面'
        }[menuType]
      }
    },
    {
      title: '权限标识',
      dataIndex: 'menuCode',
      key: 'menuCode'
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: '组件名称',
      dataIndex: 'component',
      key: 'component'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render(_, record) {
        return (
          <Space>
            <Button type="text" onClick={() => handleSubCreate(record)}>
              新增
            </Button>
            <Button type="text" onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type="text" danger onClick={() => handleDelete(record)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  return {
    form,
    columns,
    data,
    getMenuList,
    handleReset,
    handleCreate,
    menuRef
  }
}

export default UseMenuPage
