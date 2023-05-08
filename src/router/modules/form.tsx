import { lazy } from 'react'
import lazyLoad from '@/router/utils/lazyLoad'
import { RouteObject } from '../types'
import { LayoutIndex } from '../constant'

const formRouter: Array<RouteObject> = [
  {
    path: '/form',
    element: <LayoutIndex />,
    meta: {
      title: '表单 Form'
    },
    children: [
      {
        path: 'basicForm',
        element: lazyLoad(lazy(() => import('@/views/form/basicForm/index'))),
        meta: {
          title: '基础 Form',
          key: 'basicForm'
        }
      },
      {
        path: 'validateForm',
        element: lazyLoad(lazy(() => import('@/views/form/validateForm/index'))),
        meta: {
          title: '基础 Form',
          key: 'validateForm'
        }
      }
    ]
  }
]

export default formRouter
