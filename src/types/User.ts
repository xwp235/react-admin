export interface UserQueryParams {
  userId?: number
  userName?: string
  state?: number
}

export interface CreateUserParams {
  userName: string
  userEmail: string
  mobile?: number
  deptId: string
  job?: string
  state?: number
  roleList: string[]
  userImg: string
}

export interface EditUserParams extends CreateUserParams {
  userId: number
}
