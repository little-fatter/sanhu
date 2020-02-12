import enquireJs from 'enquire.js'

/** 屏幕类型 */
export const DEVICE_TYPE = {
  /** PC屏幕 */
  DESKTOP: 'desktop',
  /** 平板 */
  TABLET: 'tablet',
  /** 手机 */
  MOBILE: 'mobile'
}

/** 自动响应屏幕类型变化回调函数 */
export const deviceEnquire = function (callback) {
  const matchDesktop = {
    match: () => {
      callback && callback(DEVICE_TYPE.DESKTOP)
    }
  }

  const matchLablet = {
    match: () => {
      callback && callback(DEVICE_TYPE.TABLET)
    }
  }

  const matchMobile = {
    match: () => {
      callback && callback(DEVICE_TYPE.MOBILE)
    }
  }

  /** 通过enquireJs实现自动响应屏幕类型变化 */
  enquireJs
    .register('screen and (max-width: 576px)', matchMobile)
    .register('screen and (min-width: 576px) and (max-width: 1199px)', matchLablet)
    .register('screen and (min-width: 1200px)', matchDesktop)
}
