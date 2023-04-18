import { Navigate, useLocation } from 'react-router-dom'
import { rootRouter } from '../index'
import { searchRoute } from './index'
import { store } from '@/store/index'
import { HOME_URL } from '@/config/config'

const AuthRouter = (props: { children: JSX.Element }) => {
  const { pathname: path } = useLocation()

  const route = searchRoute(path, rootRouter)

  // 在跳转路由之前，清除所有的请求
  // axiosCanceler.removeAllPending()

  // 判断当前路由是否需要访问权限 (不需要权限直接放行)
  if (!route.meta?.requiresAuth) return props.children

  // 判断是否有Token
  const token = store.getState().system.token
  if (!token) return <Navigate to="/login" replace />

  const dynamicRouter = store.getState().auth.authRouter

  // Static Router(静态路由，必须配置首页地址，否则不能进首页获取菜单、按钮权限等数据)，获取数据的时候会loading，所有配置首页地址也没问题
  const staticRouter = [HOME_URL, '/403']

  const routerList = dynamicRouter.concat(staticRouter)

  // 如果访问的地址没有在路由表中重定向到403页面
  if (!routerList.includes(path)) return <Navigate to="/403" />

  return props.children
}

export default AuthRouter
