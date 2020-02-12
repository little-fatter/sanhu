
import { isDevelopmentENV } from './env.config'

/** adminApi代理名称 */
export const adminApiProxyName = '/Admin_api'

/** orderApi代理名称 */
export const orderApiProxyName = '/Order_api'

/**
 * 根据Api名称获取HOST
 *
*/
export const getApiHost = (proxyName) => {
  let apiHost = ''
  switch (proxyName) {
    case adminApiProxyName:
      apiHost = getApiHostByENV(adminApiProxyName, process.env.VUE_APP_ADMINAPI)
      break
    case orderApiProxyName:
      apiHost = getApiHostByENV(orderApiProxyName, process.env.VUE_APP_ORDERAPI)
      break
    default:
      break
  }
  return apiHost
}

/**
 * 根据环境变量获取API相关HOST
 * @param {*} proxyName
 * @param {*} apihost
 */
const getApiHostByENV = (proxyName, apihost) => {
  let apiHost = ''
  if (isDevelopmentENV()) {
    apiHost = proxyName
  } else {
    apiHost = apihost
  }
  return apiHost
}
