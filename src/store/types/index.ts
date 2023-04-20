import { SizeType } from 'antd/lib/config-provider/SizeContext'

export interface ThemeConfigProp {
  primary: string
  isDark: boolean
  weakOrGray: string
  breadcrumb: boolean
  tabs: boolean
  footer: boolean
}

export interface SystemState {
  token: string | null
  userInfo: any
  componentSize: SizeType
  language: string
  themeConfig: ThemeConfigProp
}

export interface AuthState {
  authButtons: {
    [propName: string]: any
  }
  authRouter: string[]
}

export interface MenuState {
  isCollapse: boolean
  menuList: Menu.MenuOptions[]
}

export interface BreadcrumbState {
  breadcrumbList: any[]
}
