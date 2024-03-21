import { ColumnsType } from 'antd/es/table'
import { UserInfo } from '@/types/Api.ts'
import { formatDate } from '@/utils'
import { Button, Space } from 'antd'
import { useEffect, useState } from 'react'
import UserApi from '@/api/UserApi.ts'

function useUserPage() {
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
  const [data, setData] = useState<UserInfo[]>([])
  // 编辑用户
  const handleEdit = (record: UserInfo) => {
    // userRef.current?.open('edit', record)
  }

  // 删除用户
  const handleDel = (userId: number) => {
    // Modal.confirm({
    //   title: '删除确认',
    //   content: <span>确认删除该用户吗？</span>,
    //   onOk: () => {
    //     handleUserDelSubmit([userId])
    //   }
    // })
  }

  useEffect(() => getUserList(), [])

  const getUserList = () => {
    UserApi.getUserList().then(data => setData(data.list))
  }

  return {
    data,
    columns
  }
}

export default useUserPage
