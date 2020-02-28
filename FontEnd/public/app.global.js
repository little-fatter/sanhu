
var publicAppConfig = {
  /**
   * 是否使用环境变量来区分Api的host地址
   */
  isUseENVWay: false,
  /**
   * 是否使用网关
   */
  isUseGateWare: false,
  /**
  * 网关地址
  */
  gatewayAddress: '',

  /** 不启用网关时配置模块host地址 */
  hostConfig: {
    readHost: {
      admin: 'http://localhost:9666',
      order: 'http://localhost:9002'
    },
    writeHost: {
      admin: '/api',
      list: '/api'
    }
  },
  /** 配置业务localStorage的key值 */
  localStorageKey: {
    userInfo: 'userInfo', // 获取用户信息
    permissionIds: 'permissionId' // 获取当前用户权限id集合
  },
  /** 配置cookie或者session过期后跳转的登录页面 */
  loginUrl: '',
  /**
  * 请求超时的毫秒数
  */
  httpClientTimeout: 10000
}

localStorage.setItem('publicAppConfig', JSON.stringify(publicAppConfig))
