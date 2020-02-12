import Vue from 'vue'

import appConfig from './app.config'

/** 获取当前用户 */
const getCurrentUser = () => {
  return {
    userInfo: Vue.ls.get(appConfig.localStorageKey.userInfo) || null,
    permissionIds: Vue.ls.get(appConfig.localStorageKey.permissionIds) || []
  }
}
export default getCurrentUser
