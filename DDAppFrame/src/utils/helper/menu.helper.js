import store from '@/store'
import { setJsonArray, isNotEmpty, isEmpty } from '../util'
import { getCurrentUserMenus } from '../../service/currentUser.service'

/**
 * 获取可显示的所有菜单菜单
 */
export const getAppMenus = () => {
  return getCurrentUserMenus()
}

/**
 * 获取第一级菜单
 */
export const getFirstLevelMenus = () => {
  const appMenus = getAppMenus()
  const firstLevelMenus = []
  if (appMenus && appMenus.length > 0) {
    for (const menu of appMenus) {
      firstLevelMenus.push(menu)
    }
  }
  return firstLevelMenus
}

/**
 * 首页的下级菜单
 */
export const getChildMenusForHomePage = () => {
  let childMenusForHomePage = []
  const firstLevelMenus = getFirstLevelMenus()
  if (firstLevelMenus.length > 0) {
    const homePage = firstLevelMenus[0]
    if (homePage && homePage.children) {
      childMenusForHomePage = homePage.children
    }
  }
  return childMenusForHomePage
}

/**
 * 个人中心的下级菜单
 */
export const getChildMenusForAccountPage = () => {
  let childMenusForAccountPage = []
  const firstLevelMenus = getFirstLevelMenus()
  if (firstLevelMenus.length > 0) {
    const accountPage = firstLevelMenus[firstLevelMenus.length - 1]
    if (accountPage && accountPage.children) {
      childMenusForAccountPage = accountPage.children
    }
  }
  return childMenusForAccountPage
}

/**
 * 判断当前路由是否是一级菜单
 * @param {*} routePath 当前路由路径
 */
export const isFirstLevelMenu = (routePath) => {
  const firstLevelMenus = getFirstLevelMenus()
  const menu = firstLevelMenus.find(item => item.menuUrl === routePath)
  const isFirstLevelMenu = routePath === '/' || routePath === '/dashboard' || isNotEmpty(menu)
  return isFirstLevelMenu
}

/**
 * 当前路径是否首页面
 * @param {*} routePath
 */
export const isHomePageByCurrentPath = (routePath) => {
  console.log('111')
  const firstLevelMenus = getFirstLevelMenus()
  let homePage
  if (firstLevelMenus.length > 0) {
    homePage = firstLevelMenus[0]
  }
  console.log('homePage', homePage)
  if (isEmpty(homePage)) {
    return true
  }
  const isHomePage = homePage.menuUrl === routePath
  return routePath === '/' || routePath === '/dashboard' || isHomePage
}

/**
 * 根据路由路径获取显示的名称
 * @param {*} routPath
 */
export const getTitleByRoutPath = (routPath) => {
  const menus = store.getters.menus
  const menuArray = setJsonArray(menus)
  const menu = menuArray.find(item => item.menuUrl === routPath)
  let title = ''
  if (menu) {
    title = menu.menuName
  }
  return title
}

/**
 * 根据菜单Id获取菜单对象
 */
export const getMenuById = (menuId) => {
  const menus = store.getters.menus
  const menuArray = setJsonArray(menus)
  const menu = menuArray.find(item => item.menuId === menuId)
  return menu
}

/**
 * 根据路由路径获取菜单对象
 * @param {*} routPath
 */
export const getMenuByRoutPath = (routPath) => {
  const menus = store.getters.menus
  const menuArray = setJsonArray(menus)
  const menu = menuArray.find(item => item.menuUrl === routPath)
  return menu
}
