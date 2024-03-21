import { Button, Form, Input, Select, Table } from 'antd'
import { appText } from '@/config'
import useUserPage from '@/views/system/user/useUserPage.tsx'

export default function UserManage() {
  // // 创建用户
  // const handleCreate = () => {
  //   // userRef.current?.open('create')
  // }
  //
  // // 批量删除确认
  // const handlePatchConfirm = () => {
  //   // if (userIds.length === 0) {
  //   //   message.error('请选择要删除的用户')
  //   //   return
  //   // }
  //   // Modal.confirm({
  //   //   title: '删除确认',
  //   //   content: <span>确认删除该批用户吗？</span>,
  //   //   onOk: () => {
  //   //     handleUserDelSubmit(userIds)
  //   //   }
  //   // })
  // }

  const { data, columns } = useUserPage()

  return (
    <div className="user-wrapper">
      <Form
        className="search-form"
        layout="inline"
        initialValues={{
          state: 1
        }}
      >
        <Form.Item name="userId" label={appText.fields.userId}>
          <Input placeholder={appText.validation.userIdBlank} />
        </Form.Item>
        <Form.Item name="userName" label={appText.fields.username}>
          <Input placeholder={appText.validation.usernameBlank} />
        </Form.Item>
        <Form.Item name="state" label={appText.fields.status}>
          <Select style={{ width: 120 }}>
            <Select.Option value={0}>{appText.all}</Select.Option>
            <Select.Option value={1}>{appText.working}</Select.Option>
            <Select.Option value={2}>{appText.retired}</Select.Option>
            <Select.Option value={3}>{appText.trialPeriod}</Select.Option>
          </Select>
        </Form.Item>
      </Form>

      <div className="base-table">
        <div className="header-wrapper">
          <h3 className="title">{appText.userPage.title}</h3>
          <div className="action">
            <Button type="primary">{appText.button.add}</Button>
            <Button type="primary" danger>
              {appText.button.batchDelete}
            </Button>
          </div>
        </div>
      </div>

      <Table bordered rowSelection={{ type: 'checkbox' }} dataSource={data} columns={columns} />
    </div>
  )
}
