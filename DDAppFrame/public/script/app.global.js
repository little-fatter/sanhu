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
      admin: 'http://182.150.28.58:27011/framework',
      file: 'http://182.150.28.58:27012/filesystem',
      // regulatory: 'http://192.168.11.49:8082/webapi', // 黎朗机器
      regulatory: 'http://192.168.0.125:8030/webapi', // 唐周机器
      // regulatory: 'http://192.168.0.169:8030/webapi',  // 本地公用服务器
      // regulatory: 'http://14.205.92.142:10680/webapi', // 远程服务器
      // 四方德信接口
      sfdx: 'http://yuxi.mysinosoft.com/yuxi//api/7FFA47F368D84E1FAD68A57E22975E50'
    },
    mapConfig: {
      regulatory: 'http://zhsh.8e9bcb.grapps.cn/regulatory'
    }
  },
  /** 企业ID */
  corpId: 'ding8fd8d57eb130109b4ac5d6980864d335',
  /** 微应用ID 如果只有一个微应用可以配置在这里，否则请配置为链接参数 */
  agentId: '618943002',
  /** 后台应用的toolid，如果只对应一个后台应用可以配置在这里，否则请配置为链接参数  */
  toolId: 'SHJG',
  /** 是否强制刷新Token,是则每次都调用免登接口 */
  isForceRefreshToken: true,
  /** token的缓存过期时间(秒) */
  expiresTimeForTokenCache: 300,
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
  /** 审批配置 */
  auditCondig: {
    // 结案报告审批模板
    CaseFinalReportProcessCode: 'PROC-24B1FD66-D778-40E4-A0E3-82CEC072C24F'
  },
  /** 配置pc站点host,用于任务PC链接 */
  pcHost: '',
  pdfHost: 'http://192.168.0.125:8083/', // PDF 路径配置
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
