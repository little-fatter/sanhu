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
    // admin: '/api',
    // list: '/api'
    admin: 'http://182.150.28.58:27016/framework',
    file: 'http://182.150.28.58:27012/filesystem',
    list: 'http://192.168.0.125:8030',
    // 四方德信接口
    sfdx: 'http://yuxi.mysinosoft.com/yuxi//api/7FFA47F368D84E1FAD68A57E22975E50'
  },
  /** 微应用ID 如果只有一个微应用可以配置在这里，否则请配置为链接参数 */
  agentId: '456468162',
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
