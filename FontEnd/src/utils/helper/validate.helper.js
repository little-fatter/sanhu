/**
 * 验证正则表达式
 */
export const validateRegular = {
  /** 手机格式 */
  phone: /^1[0-9]{10}$/,
  /** 邮箱格式 */
  email: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  /** 整数 */
  digits: /^\d+$/,
  /** 数字 */
  number: /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/,
  /** 空格 */
  whitespace: /^[^\s]*$/
}

/**
  * 通用验证
  */
export const validateRules = {
  /** 手机格式验证 */
  phone: { pattern: validateRegular.phone, message: '请输入正确的格式的手机号' },
  /** 邮箱格式验证 */
  email: { pattern: validateRegular.email, message: '请输入正确的格式的邮箱' },
  /** 整数验证 */
  digits: { pattern: validateRegular.digits, message: '请输入整数' },
  /** 数字验证 */
  number: { pattern: validateRegular.number, message: '请输入数字' },
  /** 空格验证 */
  whitespace: { pattern: validateRegular.whitespace, message: '请不要输入空格' }
}
