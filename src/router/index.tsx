import { createBrowserRouter, Navigate } from 'react-router-dom'

import Login from '@/views/login/Login'
import Error403 from '@/views/403'
import Error404 from '@/views/404'
import Layout from '@/layout'
import Welcome from '@/views/welcome/Welcome'
import Dashboard from '@/views/dashboard/Dashboard'
import User from '@/views/system/user'

const router = [
  {
    path: '/',
    element: <Navigate to="/welcome" />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    id: 'layout',
    element: <Layout />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/user',
        element: <User />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/404" />
  },
  {
    path: '/404',
    element: <Error404 />
  },
  {
    path: '/403',
    element: <Error403 />
  }
]

const browserRouter = createBrowserRouter(router)
export default browserRouter
