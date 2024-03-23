import { Button, Form, Input, Select, Table } from 'antd'
import { appText } from '@/config'
import useUserPage from '@/views/system/user/UseUserPage.tsx'
import SearchForm from '@/components/SearchForm'
import CreateUser from '@/views/system/user/createUser.tsx'
import React from 'react'

export default function UserManage() {
  const { columns, form, tableProps, search, userRef, handleCreate, userIds, setUserIds, handleBatchDelete } =
    useUserPage()

  return (
    <div className="user-wrapper">
      <SearchForm form={form} initialValues={{ state: 1 }} submit={search.submit} reset={search.reset}>
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
      </SearchForm>

      <div className="base-table">
        <div className="header-wrapper">
          <h3 className="title">{appText.userPage.title}</h3>
          <div className="action">
            <Button type="primary" onClick={handleCreate}>
              {appText.button.add}
            </Button>
            <Button type="primary" danger onClick={handleBatchDelete}>
              {appText.button.batchDelete}
            </Button>
          </div>
        </div>
        <Table
          rowKey="userId"
          bordered
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: userIds,
            onChange: (selectedRowKeys: React.Key[]) => {
              setUserIds(selectedRowKeys as number[])
            }
          }}
          {...tableProps}
          columns={columns}
        />
      </div>

      <CreateUser
        mRef={userRef}
        update={() => {
          search.reset()
        }}
      />
    </div>
  )
}
