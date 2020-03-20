/**
 *
 * api——http通用工具函数
 */
import axios from 'axios'
import qs from 'qs'
import { message } from 'ant-design-vue'
import appConfig from '@/config/app.config'
import { isNotEmpty, logoutPost } from './util'

/**
 * 需要自定义处理错误信息的消息头key
 */
const CustomerDealErrorHeaderKey = 'X-CustomerDealError'

/**
 * get请求方法名
 */
export const httpGetMethod = 'get'
/**
 * post请求方法名
 */
export const httpPostMethod = 'post'

/**
 * put请求方法名
 */
export const httpPutMethod = 'put'

/**
 * delete请求方法
 */
export const httpDeleteMethod = 'delete'

/**
 * 公用get请求
 * @param url       接口地址
 * @param params    query参数对象
 * @param options   配置参数，覆盖默认配置
 */
export const getHttp = ({ url, params, options = {} }) => {
  return httpRequest({ url, params, options })
}

/**
 * 公用post请求
 * @param url       接口地址
 * @param params    query参数对象
 * @param data      body参数对象
 * @param options   配置参数，覆盖默认配置
 */
export const postHttp = ({ url, params, data, options = {} }) => {
  return httpRequest({ url, params, data, method: httpPostMethod, options })
}

/**
 * 公用put请求
 * @param url       接口地址
 * @param params    query参数对象
 * @param data      body参数对象
 * @param options   配置参数，覆盖默认配置
 */
export const putHttp = ({ url, params, data, options = {} }) => {
  return httpRequest({ url, params, data, method: httpPutMethod, options })
}

/**
 * 公用delete请求
 * @param url       接口地址
 * @param params    query参数对象
 * @param options   配置参数，覆盖默认配置
 */
export const delHttp = ({ url, params, data, options = {} }) => {
  return httpRequest({ url, params, data, method: httpDeleteMethod, options })
}

/**
 * 上传附件
 * @param url 接口地址
 * @param formData 表单数据
 */
export const uploadFileHttp = ({ url, formData }) => {
  const headers = {
    // 'Content-Type': 'multipart/form-data'
    'Content-Type': 'application/json'
  }
  const options = {
    headers,
    isUseFormData: false
  }
  return httpRequest({ url, data: formData, method: httpPostMethod, options })
}

/**
* 下载附件
* @param url 接口地址
* @param params 接口参数
* @param mimeType 下载文件的mime类型（该参数是客户端指定文件类型，如服务端返回了文件类型，可不指定）
*/
export const downfileHttp = ({ url, params, mimeType = null }) => {
  return axios({
    method: httpGetMethod,
    url,
    params,
    responseType: 'blob'
  }).then(file => {
    console.log('file', file)
    if (mimeType) {
      const blob = new Blob([file], { type: mimeType })
      return blob
    } else {
      return file
    }
  }).catch(err => {
    handleError(err)
  })
}

/**
 * 公用HTTP请求
 * @param url       接口地址
 * @param params    query参数对象
 * @param data      body参数对象
 * @param options   配置参数，覆盖默认配置
 */
export const httpRequest = ({ url, params, data, method = httpGetMethod, options = {} }) => {
  const defalutOptions = {
    headers: {
      ...getContentType('json')
    },
    config: {},
    isUseFormData: false, // 是否需要将data转换为formData
    isAutoDealError: true // 设置是否自动处理错误信息,默认是true,设置为false则页面自己处理错误
  }

  const setOptions = {
    ...defalutOptions,
    ...options
  }

  if (setOptions.isUseFormData) {
    data = qs.stringify(data)
  }
  if (!setOptions.isAutoDealError) {
    const customerDealErrorHeader = {
      'X-CustomerDealError': 'true'
    }
    setOptions.headers = {
      ...setOptions.headers,
      ...customerDealErrorHeader
    }
  }
  const axiosConfig = getAxiosConfig(url, params, data, method, setOptions.headers, setOptions.config = {})
  return axios(axiosConfig).then(res => res).catch(error => {
    handleError(error)
  })
}

/**
 * 请求拦截器
 */
axios.interceptors.request.use(function (config) {
  const token = appConfig.token
  if (isNotEmpty(token)) {
    config.headers['Authorization'] = `Bearer ${token}` // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  // 用于服务端识别是ajax请求
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  return config
}, function (error) {
  return Promise.reject(error)
})
const isNeedLoginMsg = '要求身份验证'
/**
 * 响应拦截器
 */
axios.interceptors.response.use(function (response) {
  let isLocal = false
  isLocal = isLocalRequest(response.config.url)
  // 要根据后端接口调整
  if (!isLocal) {
    if (response.status === 200 && !response.data.Code) {
      return response.data
    } else if (response.status === 200 && (response.data.Code && response.data.Code === 200)) {
      return response.data.Data
    } else {
      handleResposeError(response)
    }
  } else {
    if (response.status === 200) {
      return response.data
    }
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  handleResposeError(error.response)
  return Promise.reject(error)
})

/**
 * 获取HTTP请求配置
 */
const getAxiosConfig = (url, params, data, method, headers, config = {}) => {
  const initConfig = getInitConfig()
  const axiosConfig = { ...initConfig, ...config, url, params, headers, data, method }
  return axiosConfig
}

/**
 * 获取默认的HTTP请求配置
 */
const getInitConfig = () => {
  return {
    // 请求超时的毫秒数
    timeout: appConfig.httpClientTimeout
  }
}

/** 判断请求是否需要自己处理错误信息 */
const hasCustomerDealErrorHeader = (headers) => {
  const customerDealErrorHeader = headers[CustomerDealErrorHeaderKey]
  return isNotEmpty(customerDealErrorHeader)
}

/**
 * 对响应错误处理
 * @param {*} response 响应信息
 */
const handleResposeError = (response) => {
  let errorObj
  if (response) {
    const headers = response.config.headers
    const needCustomerDealError = hasCustomerDealErrorHeader(headers)
    let errorMsg = response.data.message || response.data.Message
    // 表示身份过期
    if (response.status === 401 || response.data.code === 401 || response.data.Code === 401 || response.data.code === 650 || response.data.Code === 650) {
      errorMsg = isNeedLoginMsg
      // window.location.href = appConfig.loginUrl
      logoutPost()
    }
    if (!isNotEmpty(errorMsg)) {
      errorMsg = HttpErrorMsgArray[1].msg
    }
    errorObj = {
      error: errorMsg,
      needCustomerDealError: needCustomerDealError
    }
  } else {
    errorObj = {
      error: '请求服务接口失败或者未找到相关服务接口，请联系管理员！',
      needCustomerDealError: false
    }
  }
  const throwMsg = JSON.stringify(errorObj)
  throw new Error(throwMsg)
}

/**
 * 错误处理
 */
const handleError = (error) => {
  const errorObj = JSON.parse(error.message)
  const errorMsg = errorObj.error
  const needCustomerDealError = errorObj.needCustomerDealError
  const showMsg = getHttpErrorMsg(errorMsg)
  if (!needCustomerDealError) {
    if (showMsg === isNeedLoginMsg) {
      message.error('登录身份已过期，请重新登录')
    } else {
      message.error(showMsg)
    }
  }
  throw new Error(showMsg)
}

/**
 * 是否本地请求
 * @param {*} url
 */
const isLocalRequest = (url) => {
  if (url) {
    return url.includes('assets/')
  } else {
    return true
  }
}

/**
 * 配置网络错误信息
 */
const HttpErrorMsgArray = [
  {
    msg: 'timeout of 10000ms exceeded',
    showMsg: '连接超时，请稍后再试！'
  },
  {
    msg: 'Request failed with status code 404',
    showMsg: '请求服务接口失败或者未找到相关服务接口，请联系管理员！'
  },
  {
    msg: 'Network Error',
    showMsg: '网络请求错误，请稍后再试'
  },
  {
    msg: 'Request failed with status code 400',
    showMsg: '请求服务接口失败，请联系管理员'
  },
  {
    msg: 'Request failed with status code 500',
    showMsg: '服务端内部错误，请联系管理员'
  }
]

/**
 * 获取ContentType
 * @param {*} requestType 请求类型，如果不传，则不设置
 */
const getContentType = (requestType) => {
  let contentType = {}

  if (requestType === 'json') {
    contentType = {
      'Content-Type': 'application/json'
    }
  } else if (requestType === 'formData') {
    contentType = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return contentType
}

/**
 * 处理网络请求错误信息
 * @param {*} msg
 */
const getHttpErrorMsg = (msg) => {
  let showMsg
  const errorMsgObj = HttpErrorMsgArray.find(item => item.msg === msg)
  if (errorMsgObj) {
    showMsg = errorMsgObj.showMsg
  } else {
    showMsg = msg
  }
  return showMsg
}
