import { ColumnsType } from 'antd/es/table'
import { UserInfo } from '@/types/Api'
import { formatDate } from '@/utils'
import { Button, Form, Space } from 'antd'
import UserApi from '@/api/UserApi.ts'
import { useAntdTable } from 'ahooks'
import { UserQueryParams } from '@/types/User'
import { IAction } from '@/types/Modal'
import { useRef, useState } from 'react'
import { modal, message } from '@/utils/AntdGlobal'

function useUserPage() {
  const [form] = Form.useForm()
  const [userIds, setUserIds] = useState<number[]>([])
  const columns: ColumnsType<UserInfo> = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail'
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      render(role: number) {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通用户'
        }[role]
      }
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render(state: number) {
        return {
          1: '在职',
          2: '离职',
          3: '试用期'
        }[state]
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      key: 'address',
      render(record: UserInfo) {
        return (
          <Space>
            <Button type="text" onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type="text" danger onClick={() => handleDel(record.userId)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  const userRef = useRef<{
    open: (type: IAction, data?: UserInfo) => void
  }>()

  // 创建用户
  const handleCreate = () => {
    userRef.current?.open('create')
  }
  // 编辑用户
  const handleEdit = (record: UserInfo) => {
    userRef.current?.open('edit', record)
  }

  // 删除用户
  const handleDel = (userId: number) => {
    modal.confirm({
      title: '删除确认',
      content: <span>确认删除该用户吗？</span>,
      onOk: () => handleUserDelSubmit([userId])
    })
  }

  // 批量删除确认
  const handleBatchDelete = () => {
    if (userIds.length === 0) {
      message.error('请选择要删除的用户')
      return
    }
    modal.confirm({
      title: '删除确认',
      content: <span>确认删除该批用户吗？</span>,
      onOk: () => {
        handleUserDelSubmit(userIds)
      }
    })
  }

  // 公共删除用户接口
  const handleUserDelSubmit = (userIds: number[]) => {
    UserApi.delUser({
      userIds
    }).then(() => {
      message.success('删除成功')
      setUserIds([])
      search.reset()
    })
  }

  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: UserQueryParams) => {
    return UserApi.getUserList({
      ...formData,
      pageNum: current,
      pageSize: pageSize
    }).then(data => {
      return {
        total: data.page.total,
        list: data.list
      }
    })
  }

  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    defaultPageSize: 10
  })

  return {
    columns,
    form,
    tableProps,
    search,
    userRef,
    handleCreate,
    userIds,
    setUserIds,
    handleBatchDelete
  }
}

export default useUserPage
