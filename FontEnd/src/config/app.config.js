import * as listConfig from './list.config'

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
  ...listConfig,
  ...initAppConig()
}

export default appConfig
