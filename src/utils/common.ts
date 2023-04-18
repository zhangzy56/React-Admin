/**
 * @description 获取浏览器默认语言
 * @return string
 */
export const getBrowserLang = () => {
  let language = ''

  let browserLang = navigator.language || navigator.browserLanguage

  if (
    browserLang.toLowerCase() === 'cn' ||
    browserLang.toLowerCase() === 'zh' ||
    browserLang.toLowerCase() === 'zh-cn'
  ) {
    language = 'zh'
  } else {
    language = 'en'
  }

  return language
}
