import { RouteObject } from '../types'

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const searchRoute = (path: string, routes: RouteObject[] = []): RouteObject => {
  let result: RouteObject = {}

  for (let item of routes) {
    if (item.path === path) return item

    if (item.children) {
      const res = searchRoute(path, item.children)
      if (Object.keys(res).length) result = res
    }
  }

  return result
}

/**
 * @description 获取需要展开的 subMenu
 * @param {String} path 当前访问地址
 * @returns array
 */
export const getOpenKeys = (path: string) => {
  let newStr = ''
  let newArr = []
  // eg: home/list/detail -> ['/home', '/list', '/detail']
  let arr = path.split('/').map(i => '/' + i)

  for (let i = 1; i < arr.length - 1; i++) {
    newStr += arr[i]
    newArr.push(newStr)
  }

  // ['/home', '/home/list', 'home/list/detail']
  return newArr
}

export function flattenRouteList(routerList: Menu.MenuOptions[], newArr: string[] = []) {
  routerList.forEach((item: Menu.MenuOptions) => {
    typeof item === 'object' && item.path && newArr.push(item.path)
    item.children?.length && flattenRouteList(item.children, newArr)
  })

  return newArr
}
