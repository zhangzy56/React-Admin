import * as types from '@/store/mutation-types'

export const setLanguage = (language: string) => ({
  type: types.SET_LANGUAGE,
  language
})

export const setToken = (token: string | null) => ({
  type: types.SET_TOKEN,
  token
})
