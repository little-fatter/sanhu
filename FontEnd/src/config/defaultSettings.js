/**
 * 项目功能默认配置项
 * primaryColor - 默认主题色
 * storageOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 *
 */

export default {
  primaryColor: '#1890FF',
  // VUE-LS配置
  storageOptions: {
    namespace: 'pro__',
    name: 'ls',
    storage: 'local' // 定义storage类型,有session, local, memory三个选项
  }
}
