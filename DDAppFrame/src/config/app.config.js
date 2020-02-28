/**
 * 初始化配置环境
 */
const initAppConig = () => {
  let publicAppConfig = {}
  const publicAppConfigStr = localStorage.getItem('publicAppConfig')
  if (publicAppConfigStr) {
    publicAppConfig = JSON.parse(publicAppConfigStr)
  }
  return publicAppConfig
}

/**
 * 系统配置
 */
const appConfig = {
  ...initAppConig(),
  // vue-ls配置
  storageOptions: {
    namespace: 'pro__',
    name: 'ls',
    storage: 'local'
  }
}

export default appConfig
