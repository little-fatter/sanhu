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
      // admin: '/api',
      // list: '/api'
      admin: 'http://8030.gr2abce8.fhmpsbz4.8e9bcb.grapps.cn',
      list: 'http://8030.gr2abce8.fhmpsbz4.8e9bcb.grapps.cn'
    }
  },
  /** 配置业务localStorage的key值 */
  localStorageKey: {
    userInfo: 'userInfo', // 获取用户信息
    permissionIds: 'permissionId' // 获取当前用户权限id集合
  },
  /** 配置cookie或者session过期后跳转的登录页面 */
  loginUrl: '',
  /** App根据域名 */
  AppHost: 'http://192.168.1.115:8080/sh#/',
  /**
     * API跟目录
     */
  // ApiWebContext: '/regulatory',
  ApiWebContext: 'http://zhsh.8e9bcb.grapps.cn/regulatory',
  /**
   * 静态文件根目录
   */
  // StaticWebContext: 'http://zhsh.8e9bcb.grapps.cn/webregulatory',
  StaticWebContext: '',
  /**
     * 地图相关
     */
  MapOption: {
    WMS_URL: 'http://14.205.92.142:8090/iserver/services/map-jichudili/wms130/%E5%9F%BA%E7%A1%80%E5%9C%B0%E7%90%86%E5%9B%BE%E5%B1%82_white',
    // WMS_URL: 'http://14.205.92.142:8090/iserver/services/map-jichudili/wms130/%E5%9F%BA%E7%A1%80%E5%9C%B0%E7%90%86%E5%9B%BE%E5%B1%82_blue',
    ZOOM_TO_POINT_RADIUS: 5 // 缩放至点目标时的半径范围，单位千米
  },
  /**
     * 请求超时的毫秒数
     */
  httpClientTimeout: 10000
}

localStorage.setItem('publicAppConfig', JSON.stringify(publicAppConfig))
