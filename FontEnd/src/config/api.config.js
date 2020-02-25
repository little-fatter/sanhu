import appConfig from './app.config'

/**
 * 根据模块名称获取对于的HOST配置
 * @param {*} moduleName
 * @param {*} isRead
 */
const getHost = (moduleName, isRead = false) => {
  var host = ''
  if (appConfig.isUseGateWare) {
    host = appConfig.gatewayAddress
  } else {
    if (isRead) {
      host = appConfig.hostConfig.readHost[moduleName]
    } else {
      host = appConfig.hostConfig.writeHost[moduleName]
    }
  }
  return host
}

// const getHost = () => {
//   var host = ''
//   if (appConfig.isUseGateWare) {
//     host = appConfig.gatewayAddress
//   } else {
//     host = appConfig.hostConfig.host
//   }
//   return host
// }

/* 配置API接口应用访问地址 */
const apiConfig = {
  // 系统管理
  admin: {
    // 登录模块
    login: {
      login: getHost('admin') + '/api/auth/login'
    },
    // 基础信息模块
    base: {
      userInfo: getHost('admin') + '/api/auth/userInfo'
    }
  },
  // 表格模块
  list: {
    serviceList: getHost('list') + '/api/service/list',
    serviceAdd: getHost('list') + '/api/service/add',
    orgList: getHost('list') + '/api/org/list'
  },
  // 任务模块
  work_task: `${getHost('list')}?model=work_task&appid=`
}

export default apiConfig
