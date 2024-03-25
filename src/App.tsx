import { RouterProvider } from 'react-router-dom'
import { App as AntdApp, ConfigProvider, theme } from 'antd'
import AntdGlobal from './utils/AntdGlobal'

import router from './router'
import { useSystemStore } from '@/store'

import './App.scss'
import './styles/theme.scss'

function App() {
  const isDark = useSystemStore(state => state.isDark)
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ed6c00'
        },
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
    >
      <AntdApp>
        <AntdGlobal />
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
