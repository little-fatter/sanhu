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

/* 配置API接口应用访问地址 */
const apiConfig = {
  // 用户ID
  userId: `${getHost('list')}/webapi/getuserinfo`,
  // 字典查询
  dictionary: `${getHost('list')}/webapi/api/items`,
  // 详情
  detail: `${getHost('list')}/webapi/detaildata/`,
  // 表单模块
  form_all: `${getHost('list')}/webapi/pageddata?model=form_all&appid=`,
  // 信息中心
  msgCenter: `${getHost('list')}/api/JobMessage`,
  // 列表
  pageData: `${getHost('list')}/webapi/pageddata`,
  // 打印
  print: `${getHost('list')}/webapi/listdata/`,
  commonOperateApi: `${getHost('list')}/webapi/api`
}

export default apiConfig
