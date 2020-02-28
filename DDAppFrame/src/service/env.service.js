import { isNotEmpty } from '../utils/util'

const ISAPPENVCacheKey = 'ISAPPENV_Cache'

export const setIsAppEnvCache = () => {
  localStorage.setItem(ISAPPENVCacheKey, 'true')
}

export const getIsAppEnvCache = () => {
  return localStorage.getItem(ISAPPENVCacheKey)
}

export const removeIsAppEnvCache = () => {
  return localStorage.removeItem(ISAPPENVCacheKey)
}

/**
 * 判断是否是手机环境
 */
export const isAppEnv = () => {
  const isApp = getIsAppEnvCache()
  return isNotEmpty(isApp)
}
