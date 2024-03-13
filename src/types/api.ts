export interface HttpResponse<T = any> {
  code: number
  msg: string
  data: T
}
