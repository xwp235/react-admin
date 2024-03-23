import { Button, Form, Input, Table } from 'antd'
import useDeptPage from '@/views/system/dept/UseDeptPage'
import CreateDept from '@/views/system/dept/CreateDept'

export default function DeptManage() {
  const { form, columns, data, getDeptList, handleReset, deptRef, handleCreate } = useDeptPage()

  return (
    <div className="dept-wrapper">
      <Form className="search-form" layout="inline" form={form}>
        <Form.Item label="部门名称" name="deptName">
          <Input placeholder="部门名称" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="mr10" onClick={getDeptList}>
            搜索
          </Button>
          <Button type="default" onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className="base-table">
        <div className="header-wrapper">
          <h3 className="title">部门列表</h3>
          <div className="action">
            <Button type="primary" onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey="_id" columns={columns} dataSource={data} pagination={false} />
      </div>
      <CreateDept mRef={deptRef} update={getDeptList} />
    </div>
  )
}
