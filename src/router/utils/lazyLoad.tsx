import React, { Suspense } from 'react'
import { Spin } from 'antd'

/**
 * @description 路由懒加载
 * @param {Element} Comp 需要加载的组件
 * @returns element
 */
const lazyLoad = (Comp: React.LazyExoticComponent<any>): React.ReactNode => {
  const Loading = () => (
    <Spin
      size="large"
      className="flex-center"
      style={{
        height: '100%'
      }}
    />
  )

  return (
    <Suspense fallback={<Loading />}>
      <Comp />
    </Suspense>
  )
}

export default lazyLoad
