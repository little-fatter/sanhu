
/**
 * 是否是开发环境
 */
export const isDevelopmentENV = () => {
  return process.env.NODE_ENV === 'development'
}

/**
 * 是否是生产环境
 */
export const isProductionENV = () => {
  return process.env.NODE_ENV === 'production'
}
