import { createBrowserRouter, Navigate } from 'react-router-dom'

import Login from '@/views/login/Login'
import Error403 from '@/views/403'
import Error404 from '@/views/404'
import Layout from '@/layout'
import Welcome from '@/views/welcome/Welcome'
import AuthLoader from '@/router/AuthLoader'
import { lazyLoad } from './LazyLoad'
import React from 'react'

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
    loader: AuthLoader,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      },
      {
        path: '/dashboard',
        element: lazyLoad(React.lazy(() => import('@/views/dashboard/Dashboard')))
      },
      {
        path: '/user',
        element: lazyLoad(React.lazy(() => import('@/views/system/user')))
      },
      {
        path: '/dept',
        element: lazyLoad(React.lazy(() => import('@/views/system/dept')))
      },
      {
        path: '/menu',
        element: lazyLoad(React.lazy(() => import('@/views/system/menu')))
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
