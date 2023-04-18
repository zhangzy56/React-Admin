import { useEffect, useState } from 'react'
import { ConfigProvider } from 'antd'
import { connect } from 'react-redux'
// import i18n from 'i18next'

// 语言包
import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import { getBrowserLang } from './utils/common'
import { setLanguage } from '@/store/modules/system/action'

function App(props: any) {
  const { language, componentSize, themeConfig, setLanguage } = props
  const [locale, setLocale] = useState(zhCN)

  const browserLang = getBrowserLang()

  const changeLocale = (type: string) => {
    if (!['zh', 'en'].includes(type)) return
    if (type === 'zh') setLocale(zhCN)
    if (type === 'en') setLocale(enUS)
    dayjs.locale(type)
  }

  // 设置 antd 语言国际化
  const setAntdLanguage = () => {
    // 如果 redux 中有默认语言就设置成 redux 的默认语言，没有默认语言就设置成浏览器默认语言
    if (language) return changeLocale(language)

    if (browserLang == 'zh') return setLocale(zhCN)
    if (browserLang == 'en') return setLocale(enUS)
  }

  useEffect(() => {
    // 全局使用国际化
    // i18n.changeLanguage(language || getBrowserLang())
    setLanguage(language || browserLang)
    setAntdLanguage()
  }, [language])

  return (
    <ConfigProvider locale={locale} componentSize={componentSize}>
      <div className="App">哈哈哈</div>
    </ConfigProvider>
  )
}

const mapStateToProps = (state: Recordable) => state.system

export default connect(mapStateToProps, { setLanguage })(App)
