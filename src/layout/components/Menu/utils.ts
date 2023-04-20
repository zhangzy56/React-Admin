import React from 'react'
import { type MenuProps } from 'antd'
import * as Icons from '@ant-design/icons'
import MenuItem from 'antd/es/menu/MenuItem'

// 定义 menu 类型
export type MenuItem = Required<MenuProps>['items'][number]

// 动态渲染 Icon 图标
const customIcons: { [key: string]: any } = Icons

const addIcon = (name: string) => {
  return React.createElement(customIcons[name])
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

// 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
export const deepLoopFloat = (menuList: Menu.MenuOptions[], newArr: MenuItem[] = []) => {
  menuList.forEach((item: Menu.MenuOptions) => {
    if (!item?.children?.length) return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)))
    newArr.push(getItem(item.title, item.path, addIcon(item.icon!), deepLoopFloat(item.children)))
  })

  return newArr
}
