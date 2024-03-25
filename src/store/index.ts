import { create } from 'zustand'
import { UserInfo } from '@/types/Api'
import storage from '@/utils/storage'

export const useUserStore = create<{
  token: string
  userInfo: UserInfo
  updateToken: (token: string) => void
  updateUserInfo: (userInfo: UserInfo) => void
}>(set => ({
  token: '',
  userInfo: {
    _id: '',
    userId: 0,
    userName: '',
    userEmail: '',
    deptId: '',
    state: 0,
    mobile: '',
    job: '',
    role: 0,
    roleList: '',
    createId: 0,
    deptName: '',
    userImg: ''
  },
  updateToken: token => set({ token }),
  updateUserInfo: (userInfo: UserInfo) => set({ userInfo })
}))

export const useSystemStore = create<{
  collapsed: boolean
  isDark: boolean
  updateCollapsed: () => void
  updateTheme: (isDark: boolean) => void
}>(set => ({
  collapsed: false,
  isDark: storage.get('isDark') || false,
  updateCollapsed: () =>
    set(state => {
      return {
        collapsed: !state.collapsed
      }
    }),
  updateTheme: isDark => set({ isDark })
}))
