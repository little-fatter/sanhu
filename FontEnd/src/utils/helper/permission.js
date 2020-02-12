import getCurrentUser from '@/config/currentUser'

/**
 * 判断功能权限VUE插件
 * @param {*} Vue
 */
function plugin (Vue) {
  if (plugin.installed) {
    return
  }

  /**
   * 根据permissionCode判断功能权限
   * 使用方式：v-if="$auth('order-list-add')"
   */
  !Vue.prototype.$auth && Object.defineProperties(Vue.prototype, {
    $auth: {
      get () {
        return (permissionCode) => {
          const permissionIds = getCurrentUser().permissionIds
          if (!permissionIds.includes(permissionCode)) {
            return false
          }
          return true
        }
      }
    }
  })
}
export default plugin
