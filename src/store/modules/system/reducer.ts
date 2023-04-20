import { AnyAction } from 'redux'
import { produce } from 'immer'
import * as types from '@/store/mutation-types'
import { SystemState } from '@/store/types'

const systemState: SystemState = {
  token: null,
  userInfo: '',
  componentSize: 'middle',
  language: '',
  themeConfig: {
    // 默认 primary 主题颜色
    primary: '#1890ff',
    // 深色模式
    isDark: false,
    // 色弱模式(weak) || 灰色模式(gray)
    weakOrGray: '',
    // 面包屑导航
    breadcrumb: true,
    // 标签页
    tabs: true,
    // 页脚
    footer: true
  }
}

// system reducer
const system = (state: SystemState = systemState, action: AnyAction) =>
  produce(state, (draftState: any) => {
    switch (action.type) {
      case types.SET_TOKEN:
        draftState.token = action.token
        break

      case types.SET_COMPONENT_SIZE:
        draftState.componentSize = action.componentSize
        break

      case types.SET_LANGUAGE:
        draftState.language = action.language
        break

      case types.SET_THEME_CONFIG:
        draftState.themeConfig = action.themeConfig
        break

      default:
        return draftState
    }
  })

export default system
