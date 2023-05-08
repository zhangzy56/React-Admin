import Home from '@/views/home/index'
import { LayoutIndex } from '../constant'
import { RouteObject } from '../types'

// 首页模块
const homeRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: '/home/index',
        element: <Home />,
        meta: {
          title: '首页',
          key: 'home'
        }
      }
    ]
  }
]

export default homeRouter
