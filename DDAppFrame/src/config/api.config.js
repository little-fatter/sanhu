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
    host = appConfig.hostConfig.appHost[moduleName]
  }
  return host
}

/* 配置API接口应用访问地址 */
const apiConfig = {
  // 系统管理
  admin: {
    // 基础信息模块
    base: {
      // 用户基本信息
      getUserInfo: getHost('admin') + '/api/Accounts/Current',
      // 用户菜单
      getUserMenus: getHost('admin') + '/api/Menus/UserPages',
      // 用户权限
      getUserPermissions: getHost('admin') + '/api/Menus/UserPermissions',
      // 修改密码
      updatePassword: getHost('admin') + '/api/Accounts/Current/Password',
      // 意见反馈
      saveFeedBack: getHost('admin') + '/api/FeedBack',
      // 获取轮播图
      getAppBannersForApp: getHost('admin') + '/api/AppBanner/AppBannersForApp',
      // 二维码登录
      qrCodeLogin: getHost('admin') + '/api/Accounts/QRCodeLogin'
    },
    dd: {
      getJsApiAuth: getHost('admin') + '/api/DingDing/GetJsApiSigurate',
      getCustomSpace: getHost('admin') + '/api/DingDing/getCustomSpace',
      grantCustomSpace: getHost('admin') + '/api/DingDing/grantCustomSpace',
      logindd: getHost('admin') + '/api/DingDing/login',
      startProcessInstance: getHost('admin') + '/api/DingDing/ProcessInstanceCreate',
      postTest: getHost('admin') + '/api/DingDing/PostTest',
      processinstanceCspacePreview: getHost('admin') + '/api/DingDing/ProcessinstanceCspacePreview',
      processinstanceCspaceInfo: getHost('admin') + '/api/DingDing/processinstanceCspaceInfo',
      workrecordAdd: getHost('admin') + '/api/DingDing/workrecordAdd',
      workrecordUpdate: getHost('admin') + '/api/DingDing/workrecordUpdate',
      getWorkrecordPageListbyCurrent: getHost('admin') + '/api/DingDing/getWorkrecordPageListbyCurrent'
    },
    // 文件信息模块
    file: {
      // 上传文件
      uploadFile: getHost('file') + '/api/file/UploadFilesByform',
      // 下载文件
      downloadFile: getHost('file') + '/api/file/Get',
      // 删除文件
      deleteFile: getHost('file') + '/api/Default/Delete'
    }
  },
  /**
   * 业务Api
   */
  regulatory: {
    getPageDate: getHost('regulatory') + '/pageddata',
    getDetaildata: getHost('regulatory') + '/detaildata',
    commonOperateApi: getHost('regulatory') + '/api',
    getDictionaryItems: getHost('regulatory') + '/api/items',
    commonSaveApi: getHost('regulatory') + '/save'
  }
}

export default apiConfig
