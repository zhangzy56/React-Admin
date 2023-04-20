import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu } from 'antd'

import { setMenuList } from '@/store/modules/menu/action'
import { setBreadcrumbList } from '@/store/modules/breadcrumb/action'
import { setAuthRouter } from '@/store/modules/auth/action'
import { flattenRouteList, getOpenKeys, searchRoute } from '@/router/utils'
import { getMenuListApi } from '@/api/modules/user'
import { MenuItem, deepLoopFloat } from './utils'

const SiderMenu = (props: any) => {
  const { pathname } = useLocation()
  const { isCollapse, setBreadcrumbList, setAuthRouter, setMenuList: setMenuListAction } = props

  // 当前选中的 MenuItem
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])

  // 当前展开的菜单
  const [openKeys, setOpenKeys] = useState<string[]>([])

  const [menuList, setMenuList] = useState<MenuItem[]>([])

  useEffect(() => {
    // 刷新页面还原当前选中菜单项
    setSelectedKeys([pathname])
    // 还原展开菜单
    isCollapse ? null : setOpenKeys(getOpenKeys(pathname))
  }, [pathname, isCollapse])

  const getMenuData = async () => {
    const { data } = await getMenuListApi()

    if (!data) return
    // 设置当前页面需要渲染的 menuList
    setMenuList(deepLoopFloat(data))

    // 存储处理过后的所有面包屑导航栏到 redux 中
    // setBreadcrumbList(findAllBreadcrumb(data))

    // 把路由菜单处理成一维数组，存储到 redux 中，做菜单权限判断
    const dynamicRouter = flattenRouteList(data)
    setAuthRouter(dynamicRouter)

    // 储存菜单列表到store中
    setMenuListAction(data)
  }

  useEffect(() => {
    getMenuData()
  }, [])

  // 点击当前菜单跳转页面
  const navigate = useNavigate()

  const clickMenu = ({ key }: { key: string }) => {
    const route = searchRoute(key, props.menuList)

    if (route.isLink) window.open(route.isLink, '_blank')

    navigate(key)
  }

  // 设置当前展开的 subMenu
  // 点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys)

    const latestOpenKey = openKeys[openKeys.length - 1]

    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys)

    setOpenKeys([latestOpenKey])
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      triggerSubMenuAction="click"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      items={menuList}
      onClick={clickMenu}
      onOpenChange={onOpenChange}
    ></Menu>
  )
}

const mapStateToProps = (state: any) => state.menu
const mapDispatchToProps = { setMenuList, setBreadcrumbList, setAuthRouter }
export default connect(mapStateToProps, mapDispatchToProps)(SiderMenu)
