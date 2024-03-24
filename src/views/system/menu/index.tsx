import { Button, Form, Input, Select, Table } from 'antd'
import useMenuPage from '@/views/system/menu/UseMenuPage'
import CreateMenu from '@/views/system/menu/CreateMenu'

export default function MenuManage() {
  const { form, columns, data, getMenuList, handleReset, handleCreate, menuRef } = useMenuPage()

  return (
    <div>
      <Form className="search-form" layout="inline" form={form} initialValues={{ menuState: 1 }}>
        <Form.Item label="菜单名称" name="menuName">
          <Input placeholder="菜单名称" />
        </Form.Item>
        <Form.Item label="菜单状态" name="menuState">
          <Select style={{ width: 100 }}>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>停用</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="mr10" onClick={getMenuList}>
            搜索
          </Button>
          <Button type="default" onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className="base-table">
        <div className="header-wrapper">
          <h3 className="title">菜单列表</h3>
          <div className="action">
            <Button type="primary" onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey="_id" columns={columns} dataSource={data} pagination={false} />
      </div>
      <CreateMenu mRef={menuRef} update={getMenuList} />
    </div>
  )
}
