export interface HttpResponse<T = any> {
  code: number
  msg: string
  data: T
}

export interface PageData<T = any> {
  list: T[]
  page: {
    pageNum: number
    pageSize: number
    total: number | 0
  }
}

export interface UserInfo {
  _id: string
  userId: number
  userName: string
  userEmail: string
  deptId: string
  state: number
  mobile: string
  job: string
  role: number
  roleList: string
  createId: number
  deptName: string
  userImg: string
}
