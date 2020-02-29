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
    appHost: {
      admin: 'http://182.150.28.58:27016/framework',
      file: 'http://ddfile.vaiwan.com/filesystem',
      regulatory: 'http://192.168.0.125:8030/webapi'
    }
  },
  /** 企业ID */
  corpId: 'ding7013c3694123290a24f2f5cc6abecb85',
  /** 微应用ID 如果只有一个微应用可以配置在这里，否则请配置为链接参数 */
  agentId: '456468162',
  /** 后台应用的toolid，如果只对应一个后台应用可以配置在这里，否则请配置为链接参数  */
  toolId: 'SHJG',
  /** 是否强制刷新Token,是则每次都调用免登接口 */
  isForceRefreshToken: false,
  /** token的缓存过期时间(秒) */
  expiresTimeForTokenCache: 600,
  /** 是否使用本地菜单 */
  isUseLocalMenu: true,
  /** 用于jsapi的应用签名鉴权 */
  nonceStr: 'abcdef',
  /** 需要鉴权的jsApi列表，用于实现鉴权 */
  ddjsApiList: [
    'biz.util.uploadAttachment',
    'biz.cspace.preview',
    'biz.cspace.saveFile',
    'biz.contact.complexPicker',
    'biz.map.search',
    'device.geolocation.get'
  ],
  /**
     * 请求超时的毫秒数
     */
  httpClientTimeout: 20000,
  /**
     * signalr服务端地址
     */
  signalrServerUrl: 'http://192.168.0.200:63192/IMHub'
}

localStorage.setItem('publicAppConfig', JSON.stringify(publicAppConfig))
