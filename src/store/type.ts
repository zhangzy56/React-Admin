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
  token: string
  userInfo: any
  componentSize: SizeType
  language: string
  themeConfig: ThemeConfigProp
}
