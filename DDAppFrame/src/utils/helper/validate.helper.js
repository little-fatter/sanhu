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
  whitespace: /^[^\s]*$/,
  /** 身份证 */
  idcard: /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/
}

/**
  * 通用验证
  */
export const validateMessage = {
  /** 手机格式验证 */
  phone: '请输入正确的格式的手机号',
  /** 邮箱格式验证 */
  email: '请输入正确的格式的邮箱',
  /** 整数验证 */
  digits: '请输入整数',
  /** 数字验证 */
  number: '请输入数字',
  /** 空格验证 */
  whitespace: '请不要输入空格'
}

/**
 * 获取通用验证规则数组
 */
export const getValidateRules = (rules) => {

}

export const getValidateRule = (rule) => {
  var validate = null
  var name = rule.name
  switch (name) {
    case 'required':
      validate = { required: true, message: rule.message }
      break
    case 'email':
      validate = { validator: this.phoneValidator, message: '手机号格式错误' }
      break
  }
  return validate
}

/**
 * 手机验证
 */
export const phoneValidator = (val) => {
  return validateRegular.phone.test(val)
}

/**
 * 邮箱验证
 * @param {*} val
 */
export const emailValidator = (val) => {
  return validateRegular.email.test(val)
}

/**
 * 整数验证
 * @param {*} val
 */
export const digitsValidator = (val) => {
  return validateRegular.digits.test(val)
}

/**
 * 数字验证
 * @param {*} val
 */
export const numberValidator = (val) => {
  return validateRegular.number.test(val)
}

/**
 * 空格验证
 * @param {*} val
 */
export const whitespaceValidator = (val) => {
  return validateRegular.whitespace.test(val)
}

/**
 * 身份证验证
 * @param {*} val
 */
export const idcardValidator = (val) => {
  return validateRegular.idcard.test(val)
}
