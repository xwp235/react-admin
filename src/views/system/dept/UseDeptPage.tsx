import { Button, Form, message, Space } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { formatDate } from '@/utils'
import { DeptItem, EditParams } from '@/types/Dept'
import { useEffect, useRef, useState } from 'react'
import DeptApi from '@/api/DeptApi'
import { IAction } from '@/types/Modal'
import { modal } from '@/utils/AntdGlobal'

function useUserPage() {
  const [form] = Form.useForm()
  const [data, setData] = useState<DeptItem[]>([])
  const deptRef = useRef<{
    open: (type: IAction, data?: EditParams | { parentId: string }) => void
  }>()

  useEffect(() => {
    getDeptList()
  }, [])

  // 获取用户列表
  const getDeptList = () => {
    DeptApi.getDeptList(form.getFieldsValue()).then(data => setData(data))
  }

  // 重置
  const handleReset = () => {
    form.resetFields()
  }
  const handleSubCreate = (id: string) => {
    deptRef.current?.open('create', { parentId: id })
  }
  // 创建部门
  const handleCreate = () => {
    deptRef.current?.open('create')
  }
  // 编辑部门
  const handleEdit = (record: DeptItem) => {
    deptRef.current?.open('edit', record)
  }
  const handleDelete = (id: string) => {
    modal.confirm({
      title: '确认',
      content: '确认删除该部门吗？',
      onOk() {
        handleDelSubmit(id)
      }
    })
  }
  // 删除提交
  const handleDelSubmit = async (_id: string) => {
    await DeptApi.deleteDept({
      _id
    })
    message.success('删除成功')
    getDeptList()
  }

  const columns: ColumnsType<DeptItem> = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
      key: 'deptName',
      width: 200
    },
    {
      title: '负责人',
      dataIndex: 'userName',
      key: 'userName',
      width: 150
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render(updateTime) {
        return formatDate(updateTime)
      }
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
            <Button type="text" onClick={() => handleSubCreate(record._id)}>
              新增
            </Button>
            <Button type="text" onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type="text" danger onClick={() => handleDelete(record._id)}>
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
    getDeptList,
    handleReset,
    deptRef,
    handleCreate
  }
}

export default useUserPage
