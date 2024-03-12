import { Navigate, useRoutes } from 'react-router-dom'

import Login from '@/views/Login'
import Error403 from '@/views/403'
import Error404 from '@/views/404'
import Welcome from '@/views/Welcome'

const router = [
  {
    path: '/welcome',
    element: <Welcome />
  },
  {
    path: '/login',
    element: <Login />
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

function Router() {
  return useRoutes(router)
}

export default Router
