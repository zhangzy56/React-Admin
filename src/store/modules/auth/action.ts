import * as types from '@/store/mutation-types'

export const setAuthButtons = (authButtons: { [propName: string]: any }) => ({
  type: types.SET_AUTH_BUTTONS,
  authButtons
})

// 动态路由
export const setAuthRouter = (authRouter: string[]) => ({
  type: types.SET_AUTH_ROUTER,
  authRouter
})
