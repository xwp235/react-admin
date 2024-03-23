import { useEffect, useImperativeHandle, useState } from 'react'
import { IAction, IModalProp } from '@/types/Modal'
import { Modal, Form, TreeSelect, Input, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { message } from '@/utils/AntdGlobal'
import { DeptItem, EditParams } from '@/types/Dept'
import { UserInfo } from '@/types/Api'
import DeptApi from '@/api/DeptApi'
import UserApi from '@/api/UserApi'

export default function CreateDept(props: IModalProp<EditParams>) {
  const [form] = useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  const [deptList, setDeptList] = useState<DeptItem[]>([])
  const [userList, setUserList] = useState<UserInfo[]>([])

  useEffect(() => {
    getAllUserList()
  }, [])

  const getDeptList = async () => {
    const data = await DeptApi.getDeptList()
    setDeptList(data)
  }

  const getAllUserList = () => {
    UserApi.getAllUserList().then(data => setUserList(data))
  }

  useImperativeHandle(props.mRef, () => ({
    open
  }))

  // 打开弹框函数
  const open = (type: IAction, data?: EditParams | { parentId: string }) => {
    setAction(type)
    setVisible(true)
    getDeptList().then(() => {
      if (data) {
        form.setFieldsValue(data)
      }
    })
  }
  // 部门提交
  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      if (action === 'create') {
        await DeptApi.createDept(form.getFieldsValue())
      } else {
        await DeptApi.editDept(form.getFieldsValue())
      }
      message.success('操作成功')
      handleCancel()
      props.update()
    }
  }
  // 关闭和重置弹框
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }

  return (
    <Modal
      title={action === 'create' ? '创建部门' : '编辑部门'}
      width={800}
      open={visible}
      okText="确定"
      cancelText="取消"
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelAlign="right" labelCol={{ span: 4 }}>
        <Form.Item hidden name="_id">
          <Input />
        </Form.Item>
        <Form.Item label="上级部门" name="parentId">
          <TreeSelect
            placeholder="请选择上级部门"
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'deptName', value: '_id' }}
            treeData={deptList}
          />
        </Form.Item>
        <Form.Item label="部门名称" name="deptName" rules={[{ required: true, message: '请输入部门名称' }]}>
          <Input placeholder="请输入部门名称" />
        </Form.Item>
        <Form.Item label="负责人" name="userName" rules={[{ required: true, message: '请选择负责人' }]}>
          <Select>
            {userList.map(item => {
              return (
                <Select.Option value={item.userName} key={item._id}>
                  {item.userName}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
