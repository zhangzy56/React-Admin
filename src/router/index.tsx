import { Navigate, useRoutes } from 'react-router-dom'
import { RouteObject } from './types'
import Login from '@/views/user/login/index'

// 导入所有router
const modules = import.meta.glob('./modules/*.tsx')

// 处理路由
export const routeArr: RouteObject[] = []

Object.keys(modules).forEach(item => {
  // @ts-ignore
  Object.keys(modules[item]).forEach((key: any) => routeArr.push(...modules[item][key]))
})

// 所有路由
export const rootRouter: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '/login',
    element: <Login />,
    meta: {
      requiresAuth: false,
      title: '登录页',
      key: 'login'
    }
  },
  ...routeArr,
  {
    path: '*',
    element: <Navigate to="/404" />
  }
]

const Router = (): React.ReactElement | null => {
  return useRoutes(rootRouter as any[])
}

export default Router
