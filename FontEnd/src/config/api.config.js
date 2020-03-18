import appConfig from './app.config'

/**
 * 根据模块名称获取对于的HOST配置
 * @param {*} moduleName
 * @param {*} isRead
 */
const getHost = (moduleName) => {
  var host = ''
  if (appConfig.isUseGateWare) {
    host = appConfig.gatewayAddress
  } else {
    host = appConfig.hostConfig[moduleName]
  }
  return host
}

/* 配置API接口应用访问地址 */
const apiConfig = {
  // 《框架》
  framework: {
    // 用户列表
    users: `${getHost('framework')}/api/Users`
  },
  // 文件服务
  file: {
    download: code => `${getHost('file')}/api/file/Get/${code}`
  },
  // 第三方
  other: {
    // 法律法规
    regulations: `${getHost('sfdx')}/law_rule_page`
  },
  // 信息中心
  msgCenter: `${getHost('framework')}/webapi/api/JobMessage`,
  // 用户ID
  userId: `${getHost('list')}/webapi/getuserinfo`,
  // 字典查询
  dictionary: `${getHost('list')}/webapi/api/items`,
  // 详情
  detail: `${getHost('list')}/webapi/detaildata/`,
  // 表单模块
  form_all: `${getHost('list')}/webapi/pageddata?model=form_all&appid=`,
  // 列表
  pageData: `${getHost('list')}/webapi/pageddata`,
  // 打印
  print: `${getHost('list')}/webapi/listdata/`,
  // 通用接口
  commonOperateApi: `${getHost('list')}/webapi/api`,
  // dd审批
  startProcessInstance: `${getHost('admin')}/api/DingDing/ProcessInstanceCreate`

}

export const formType = {
  // 询问笔录
  form_inquiryrecord_third: 'form_inquiryrecord_third',
  // 勘验笔录
  form_inquestrecord: 'form_inquestrecord',
  // 处罚当场决定书
  law_punishmentInfo: 'law_punishmentInfo',
  // 物品清单
  form_confiscated_item: 'form_confiscated_item'
}

export default apiConfig
