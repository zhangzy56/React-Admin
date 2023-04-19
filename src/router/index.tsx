import { Navigate, useRoutes } from 'react-router-dom'
import { RouteObject } from './types'
import Login from '@/views/user/login/index'
import React from 'react'

// 导入所有router  导入 moduleItem 下的 default 属性, 否则会嵌套一层
const modules = import.meta.glob('./modules/*.tsx', { eager: true, import: 'default' })

// 处理路由
export const routeArr: RouteObject[] = []

Object.keys(modules).forEach((key: string) => {
  const module = modules[key] as Recordable[]
  routeArr.push(...module)
})

// 所有路由
export const routes: RouteObject[] = [
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
    // element: <Navigate to="/404" />
    element: <Navigate to="/login" />
  }
]

// console.log('routes', routes)

const Router = (): React.ReactElement | null => {
  return useRoutes(routes as any[])
}

export default Router
