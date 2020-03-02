import Vue from 'vue'

import * as dd from 'dingtalk-jsapi'

import appConfig from '@/config/app.config'

import menuConfig from '@/config/menu.config.js'

import { getUserPermissions, getUserMenus } from '@/api/userApi.js'

import { converServerMenuTreeToApp, parseQueryToJson } from '@/utils/util'

import { isNotEmpty, appLoading, apphideLoading, isEmpty } from '../utils/util'
import { logindd } from '../api/ddApi'
import { ddAlert } from './ddJsApi.service'

const CurrentUserInfoCacheKey = 'CurrentUser_Info'

const CurrentUserTokenCacheKey = 'CurrentUser_Token'

const CurrentUserPermissionsCacheKey = 'CurrentUser_Permissions'

const CurrentUserMenusCacheKey = 'CurrentUser_Menus'

const CurrentUserIsRequestLoginKey = 'CurrentUser_IsRequestLogin'

const AgentIdCacheKey = 'AgentId_cache'

const ToolIdCacheKey = 'ToolId_cache'

export const saveCurrentUserInfo = (userInfo) => {
    Vue.ls.set(CurrentUserInfoCacheKey, userInfo)
}

export const getCurrentUserInfo = () => {
    return Vue.ls.get(CurrentUserInfoCacheKey)
}

export const getUseridForCurrentUser = () => {
    var userid = ''
    var userInfo = getCurrentUserInfo()
    if (isNotEmpty(userInfo)) {
        userid = userInfo.userid
    }
    return userid
}

export const removeCurrentUserInfo = () => {
    Vue.ls.remove(CurrentUserInfoCacheKey)
}

export const saveCurrentUserToken = (token) => {
    if (appConfig.isForceRefreshToken) {
        Vue.ls.set(CurrentUserTokenCacheKey, token)
    } else {
        Vue.ls.set(CurrentUserTokenCacheKey, token, appConfig.expiresTimeForTokenCache * 1000)
    }
}

export const getCurrentUserToken = () => {
    return Vue.ls.get(CurrentUserTokenCacheKey)
}

export const removeCurrentUserToken = () => {
    Vue.ls.remove(CurrentUserTokenCacheKey)
}

export const hasCurrentUserToken = () => {
    return isNotEmpty(getCurrentUserToken())
}

export const saveCurrentUserPermissions = (permissions) => {
    Vue.ls.set(CurrentUserPermissionsCacheKey, permissions)
}

export const getCurrentUserPermissions = () => {
    return Vue.ls.get(CurrentUserPermissionsCacheKey)
}

export const removeCurrentUserPermissions = () => {
    Vue.ls.remove(CurrentUserPermissionsCacheKey)
}

export const saveCurrentUserMenus = (menus) => {
    Vue.ls.set(CurrentUserMenusCacheKey, menus)
}

export const getCurrentUserMenus = () => {
    return Vue.ls.get(CurrentUserMenusCacheKey)
}

export const removeCurrentUserMenus = () => {
    Vue.ls.remove(CurrentUserMenusCacheKey)
}

export const saveCurrentUserIsRequestLogin = (isRequestLogin = false) => {
    Vue.ls.set(CurrentUserIsRequestLoginKey, isRequestLogin)
}

export const getCurrentUserIsRequestLogin = () => {
    return Vue.ls.get(CurrentUserIsRequestLoginKey)
}

export const saveAgentId = (agentId) => {
    Vue.ls.set(AgentIdCacheKey, agentId)
}

export const getAgentId = () => {
    return Vue.ls.get(AgentIdCacheKey)
}

export const saveToolId = (toolId) => {
    Vue.ls.set(ToolIdCacheKey, toolId)
}

export const getToolId = () => {
    return Vue.ls.get(ToolIdCacheKey)
}

/**
 * 获取当前人的权限和菜单
 */
export const getUserPermissionsAndMenus = () => {
    return new Promise((resolve, reject) => {
        if (!appConfig.isUseLocalMenu) {
            getUserPermissions().then(permissions => {
                getUserMenus().then(menu => {
                    saveCurrentUserPermissions(permissions)
                    const appMenus = converServerMenuTreeToApp(menu.BusinessMenus)
                    saveCurrentUserMenus(appMenus)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            }).catch(error => {
                reject(error)
            })
        } else {
            saveCurrentUserMenus(menuConfig)
            resolve()
        }
    })
}

/**
 * 当前应用的Url获取agentId和toolId
 */
const getParamsFromUrl = () => {
    var url = window.location.href
    var params = parseQueryToJson(url)
    console.log('params', params)
    const result = {
        agentId: null,
        toolId: null
    }
    if (isNotEmpty(params)) {
        if (isNotEmpty(params['agentId'])) {
            result.agentId = params['agentId']
        }
        if (isNotEmpty(params['toolId'])) {
            result.toolId = params['toolId']
        }
    }
    return result
}

/**
 * 判断是否需要从服务端实现免登并获取Token
 */
const isNeedAutoLoginFromSever = () => {
    var isNeed = false
    var agentId = appConfig.agentId
    var toolId = appConfig.toolId
    const params = getParamsFromUrl()
    if (isNotEmpty(params.agentId)) {
        agentId = params.agentId
    }
    if (isNotEmpty(params.toolId)) {
        toolId = params.toolId
        var toolIdCache = getToolId()
        if (isEmpty(toolIdCache) || toolIdCache !== toolId) {
            isNeed = true
        }
    }
    if (!hasCurrentUserToken()) {
        isNeed = true
    }
    if (appConfig.isForceRefreshToken) {
        isNeed = true
    }
    saveAgentId(agentId)
    saveToolId(toolId)
    return isNeed
}

/**
 * 实现免登录并获取用户信息包含token
 */
export const autoLogin = (isInit = true) => {
    return new Promise((resolve, reject) => {
        if (isInit) {
            if (isNeedAutoLoginFromSever()) {
                appLoading()
                autoLoginFromSever().then(() => {
                    apphideLoading()
                    resolve()
                }).catch(error => {
                    var msg = '免登录失败,原因:' + JSON.stringify(error)
                    ddAlert(msg)
                    apphideLoading()
                    reject(error)
                })
            } else {
                resolve()
            }
        } else {
            autoLoginFromSever().then(() => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        }
    })
}

// 实现钉钉免登
const autoLoginFromSever = () => {
    return new Promise((resolve, reject) => {
        dd.runtime.permission.requestAuthCode({
            corpId: appConfig.corpId,
            onSuccess: (res) => {
                logindd(getAgentId(), res.code, getToolId()).then(loginUser => {
                    saveCurrentUserInfo(loginUser)
                    saveCurrentUserToken(loginUser.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            },
            onFail: (err) => {
                dd.alert({
                    content: JSON.stringify(err)
                })
                reject(err)
            }
        })
    })
}

/** 退出登录重新加载获取身份信息 */
export const logout = () => {
    removeAllCache()
        // closePage()
    window.location.reload()
}

/**
 * 刷新重新获取服务端的菜单和权限
 */
export const refreshServerInfo = () => {
    return new Promise((resolve, reject) => {
        if (hasCurrentUserToken()) {
            getUserPermissions().then(permissions => {
                getUserMenus().then(menu => {
                    saveCurrentUserPermissions(permissions)
                    const appMenus = converServerMenuTreeToApp(menu.BusinessMenus)
                    saveCurrentUserMenus(appMenus)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            }).catch(error => {
                reject(error)
            })
        } else {
            resolve()
        }
    })
}

/** 清除所有身份缓存 */
const removeAllCache = () => {
    removeCurrentUserInfo()
    removeCurrentUserPermissions()
    removeCurrentUserMenus()
    removeCurrentUserToken()
}