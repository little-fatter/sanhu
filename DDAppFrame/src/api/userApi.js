import { getHttp, postHttp, putHttp } from '@/utils/apiRequest'
import apiConfig from '@/config/api.config'

/**
 * 获取用户身份信息
 * @param {*} authcode 认证票据
 * @param {*} deviceId 设备ID
 * @param {*} deviceName 设备名称
 */
export const getToken = (authcode, deviceId, deviceName) => {
  return postHttp(
    {
      url: apiConfig.admin.login.getToken,
      data: {
        Code: authcode,
        DeviceId: deviceId,
        DeviceName: deviceName
      }
    }
  )
}

/**
 * 获取用户的菜单
 */
export const getUserMenus = () => {
  return getHttp(
    {
      url: apiConfig.admin.base.getUserMenus,
      params: {
        MenuType: 1
      }
    }
  )
}

/**
 * 获取用户所拥有的权限
 */
export const getUserPermissions = () => {
  return getHttp(
    {
      url: apiConfig.admin.base.getUserPermissions
    }
  )
}

/**
 * 获取用户基本信息
 */
export const getUserInfo = () => {
  return getHttp(
    {
      url: apiConfig.admin.base.getUserInfo,
      options: {
        isAutoDealError: true
      }
    }
  )
}

/**
 * 保存意见反馈
 * @param {*} feedBack
 */
export const saveFeedBack = (feedBack) => {
  return postHttp({
    url: apiConfig.admin.base.saveFeedBack,
    data: {
      ...feedBack
    }
  })
}

/**
 * 修改密码
 * @param {*} oldPassword 旧密码
 * @param {*} newPassword 新密码
 */
export const updatePassword = (oldPassword, newPassword) => {
  return putHttp({
    url: apiConfig.admin.base.updatePassword,
    data: {
      OldPassword: oldPassword,
      NewPassword: newPassword
    }
  })
}

/**
 * 获取轮播图
 */
export const getAppBannersForApp = () => {
  return getHttp({
    url: apiConfig.admin.base.getAppBannersForApp
  })
}

/** 二维码登录 */
export const qrCodeLogin = (code) => {
  const url = apiConfig.admin.base.qrCodeLogin + '/' + code
  return getHttp({
    url
  })
}

/** 获取当前用户下的行政区划全部数据 */
export function getNowUserAreaInfo (parameter) {
  return getHttp({
    url: `${apiConfig.admin.area.getNowUserAreaInfo}`,
    params: {
      ...parameter
    }
  })
}

/** 获取行政区划全部数据 */
export function getAllUserAreaInfo (parameter) {
  return getHttp({
    url: `${apiConfig.admin.area.getAllUserAreaInfo}`,
    params: {
      ...parameter
    }
  })
}
