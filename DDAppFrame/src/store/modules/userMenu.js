// import menuConfig from '@/config/menu.config.js'
import { getUserMenus } from '@/api/userApi.js'
import { getFirstLevelMenus } from '@/utils/helper/menu.helper.js'
import { converServerMenuTreeToApp } from '../../utils/util'
/**
 * 定义store模块：用户菜单
 */
const userMenu = {
  state: {
    // 可显示的所有菜单菜单
    menus: [],
    // 第一级菜单
    firstLevelMenus: [],
    // 首页的下级菜单
    childMenusForHomePage: [],
    // 个人中心的下级菜单
    childMenusForAccountPage: []
  },
  mutations: {
    SET_MENUS: (state, menus) => {
      state.menus = menus
      state.firstLevelMenus = getFirstLevelMenus(menus)
      if (state.firstLevelMenus.length > 0) {
        const homePage = state.firstLevelMenus[0]
        if (homePage && homePage.children) {
          state.childMenusForHomePage = homePage.children
        }

        const accountPage = state.firstLevelMenus[state.firstLevelMenus.length - 1]
        if (accountPage && accountPage.children) {
          state.childMenusForAccountPage = accountPage.children
        }
      }
    }
  },
  actions: {
    GenerateMenus ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserMenus().then(res => {
          const appMenus = converServerMenuTreeToApp(res.BusinessMenus)
          console.log('appMenus', appMenus)
          commit('SET_MENUS', appMenus)
          resolve()
        }).catch((error) => {
          reject(error)
        }).finally(() => {
        })
      })
    }
  }
}

export default userMenu
