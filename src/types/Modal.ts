import { MutableRefObject } from 'react'
import { UserInfo } from '@/types/Api.ts'

export type IAction = 'create' | 'edit' | 'delete'

export interface IModalProp<T = UserInfo> {
  mRef: MutableRefObject<{ open: (type: IAction, data: T) => void } | undefined>
  update: () => void
}

export interface IDetailProp {
  mRef: MutableRefObject<{ open: (orderId: string) => void } | undefined>
}
