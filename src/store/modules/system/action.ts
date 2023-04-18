import * as types from '@/store/mutation-types'

export const setLanguage = (language: string) => ({
  type: types.SET_LANGUAGE,
  language
})
