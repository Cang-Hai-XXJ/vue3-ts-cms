import { RouteRecordRaw } from 'vue-router'
export let firstMenu: any = null

export function mapMenus2Routes(menus: any): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  const allRoutes: RouteRecordRaw[] = []

  //使用webpack的require解析main目录下的所有ts文件路径
  const routeFiles = require.context('@/router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    //使用require导入模块
    const route = require('@/router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  function _recurseSetRoute(menus: any) {
    for (const menu of menus) {
      if (menu.type === 2) {
        if (!firstMenu) {
          firstMenu = menu
        }
        const route = allRoutes.find((route) => {
          return route.path === menu.url
        })
        if (route) {
          routes.push(route)
        }
      } else {
        if (menu.children?.length > 0) {
          _recurseSetRoute(menu.children)
        }
      }
    }
  }
  _recurseSetRoute(menus)

  return routes
}

export function pathMap2Menu(menus: any[], path: string): any {
  for (const menu of menus) {
    if (menu.type === 1) {
      const findMenu = pathMap2Menu(menu.children ?? [], path)
      if (findMenu) {
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === path) {
      return menu
    }
  }
}
