import { Toast } from 'vant'
import appConfig from '@/config/app.config'
import apiConfig from '../config/api.config'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
/**
 * 判断js对象为空
 */
export const isEmpty = (value) => {
  return (value === null || value === undefined || value === '' || value === {} || value === [] || value.length === 0)
}

/**
  * 判断js对象不为空
  */
export const isNotEmpty = (value) => {
  return !isEmpty(value)
}

/**
 * 对数组分页，返回新数组
 * @param {*} pageNo 当前页码，从1开始
 * @param {*} pageSize 分页大小
 * @param {*} array 数组
 */
export const paginationForArray = (pageNo, pageSize, array) => {
  var offset = (pageNo - 1) * pageSize
  return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize)
}

/**
 * 嵌套JSON数组转平级
 */
export const setJsonArray = (data, subParam = 'children') => {
  let result = []
  data.forEach(json => {
    if (json) {
      if (isNotEmpty(json[subParam])) {
        result = result.concat(setJsonArray(json[subParam]))
      }
      result.push(json)
    }
  })
  return result
}

/**
 * 将平级JSON数组转嵌套树
 * @param {*} data
 * @param {*} parentId
 * @param {*} subParam
 * @param {*} dataId
 */
export const setCommonJsonArrayNest = (data, parentId = '0', subParam = 'children', dataId = 'menuId') => {
  const result = []; let temp
  if (data) {
    data.forEach(json => {
      if (json.parentId === parentId) {
        temp = setCommonJsonArrayNest(data, json[dataId], subParam, dataId)
        if (isNotEmpty(temp)) {
          json[subParam] = temp
        }
        result.push(json)
      }
    })
  }
  return result
}

/**
 * 通用根据层级Level把平级JSON数组转嵌套树
 * @param {*} data
 * @param {*} parentId
 * @param {*} subParam
 * @param {*} dataId
 * @param {*} leveParam
 */
export const convertArrayToTreeJson = (data, parentId = '0', subParam = 'children', dataId = 'menuId', leveParam = 'menuLevel') => {
  const result = []
  if (data) {
    const rootParentIds = findRootParentIds(data, leveParam)
    if (rootParentIds.length > 0) {
      for (const rootParentId of rootParentIds) {
        const tempResultArray = setCommonJsonArrayNest(data, rootParentId, subParam, dataId)
        for (const tempResult of tempResultArray) {
          result.push(tempResult)
        }
      }
    }
  }
  return result
}

/**
 * 根据平级JSON数组和Level字段名获取RootParentIds
 * @param {*} data
 * @param {*} leveParam
 */
const findRootParentIds = (data, leveParam) => {
  const rootParentIds = []
  let minLevel
  let isFirst = true
  for (const item of data) {
    const levelData = parseInt(item[leveParam])
    if (isNaN(levelData)) {
      continue
    } else {
      if (isFirst) {
        minLevel = levelData
        isFirst = false
      } else if (minLevel > levelData) {
        minLevel = levelData
      }
    }
  }
  if (isNotEmpty(minLevel)) {
    const dataByMinLevel = data.filter(item => item[leveParam] && parseInt(item[leveParam]) === minLevel)
    for (const dataItem of dataByMinLevel) {
      const parentId = dataItem.parentId
      if (parentId && !rootParentIds.includes(parentId)) {
        rootParentIds.push(parentId)
      }
    }
  }
  return rootParentIds
}

/**
 * 将服务器的菜单数转换成App需要的菜单
 * @param {*} serverMenus
 */
export const converServerMenuTreeToApp = (serverMenus) => {
  const appMenus = []
  if (serverMenus) {
    for (const serverMenu of serverMenus) {
      const appMenu = converServerMenuToApp(serverMenu)
      if (serverMenu.Children && serverMenu.Children.length > 0) {
        appMenu.children = converServerMenuTreeToApp(serverMenu.Children)
      }
      appMenus.push(appMenu)
    }
  }

  return appMenus
}

/**
 * 将金额转换为中文
 * @param {*} currencyDigits 金额
 */
export const convertToChineseNumber = (currencyDigits) => {
  // 转换数字到中文大写，请用prop传递给模版组件，这个函数在网上扣的。
  const MAXIMUM_NUMBER = 99999999999.99
  const CN_ZERO = '零'
  const CN_ONE = '壹'
  const CN_TWO = '贰'
  const CN_THREE = '叁'
  const CN_FOUR = '肆'
  const CN_FIVE = '伍'
  const CN_SIX = '陆'
  const CN_SEVEN = '柒'
  const CN_EIGHT = '捌'
  const CN_NINE = '玖'
  const CN_TEN = '拾'
  const CN_HUNDRED = '佰'
  const CN_THOUSAND = '仟'
  const CN_TEN_THOUSAND = '万'
  const CN_HUNDRED_MILLION = '亿'
  const CN_SYMBOL = '' // 可以设置前缀 比如 人民币
  const CN_DOLLAR = '元'
  const CN_TEN_CENT = '角'
  const CN_CENT = '分'
  const CN_INTEGER = '整'

  let integral
  let decimal
  let outputCharacters
  let zeroCount
  let i, p, d
  let quotient, modulus

  // Validate input string:
  if (currencyDigits === undefined) {
    return ''
  }
  currencyDigits = currencyDigits.toString()
  if (currencyDigits === '') {
    return ''
  }
  if (currencyDigits.match(/[^,.\d]/) != null) {
    return ''
  }
  if (
    currencyDigits.match(
      /^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/
    ) == null
  ) {
    return ''
  }
  currencyDigits = currencyDigits.replace(/,/g, '')
  currencyDigits = currencyDigits.replace(/^0+/, '')
  if (Number(currencyDigits) > MAXIMUM_NUMBER) {
    alert('您输入的金额太大，请重新输入!')
    return ''
  }
  const parts = currencyDigits.split('.')
  if (parts.length > 1) {
    integral = parts[0]
    decimal = parts[1]
    decimal = decimal.substr(0, 2)
  } else {
    integral = parts[0]
    decimal = ''
  }
  const digits = [CN_ZERO,
    CN_ONE,
    CN_TWO,
    CN_THREE,
    CN_FOUR,
    CN_FIVE,
    CN_SIX,
    CN_SEVEN,
    CN_EIGHT,
    CN_NINE
  ]
  const radices = ['', CN_TEN, CN_HUNDRED, CN_THOUSAND]
  const bigRadices = ['', CN_TEN_THOUSAND, CN_HUNDRED_MILLION]
  const decimals = [CN_TEN_CENT, CN_CENT]
  outputCharacters = ''
  if (Number(integral) > 0) {
    zeroCount = 0
    for (i = 0; i < integral.length; i++) {
      p = integral.length - i - 1
      d = integral.substr(i, 1)
      quotient = p / 4
      modulus = p % 4
      if (d === '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          outputCharacters += digits[0]
        }
        zeroCount = 0
        outputCharacters +=
                          digits[Number(d)] + radices[modulus]
      }
      if (modulus === 0 && zeroCount < 4) {
        outputCharacters += bigRadices[quotient]
      }
    }
    outputCharacters += CN_DOLLAR
  }
  if (decimal !== '') {
    for (i = 0; i < decimal.length; i++) {
      d = decimal.substr(i, 1)
      if (d !== '0') {
        outputCharacters += digits[Number(d)] + decimals[i]
      }
    }
  }
  if (outputCharacters === '') {
    outputCharacters = CN_ZERO + CN_DOLLAR
  }
  if (decimal === '') {
    outputCharacters += CN_INTEGER
  }
  outputCharacters = CN_SYMBOL + outputCharacters
  return outputCharacters
}

/**
 * 将服务器的菜单转换成App需要的菜单
 * @param {*} serverMenu
 */

const converServerMenuToApp = (serverMenu) => {
  const url = serverMenu.Url
  const name = serverMenu.Name
  const appMenu = {
    menuId: serverMenu.Id,
    menuUrl: url,
    menuIcon: serverMenu.Icon,
    menuName: name,
    menuLevel: serverMenu.Index,
    parentId: serverMenu.ParentId
  }

  return appMenu
}

/**
 * url参数转JSON参数
 * @param {url}} url
 */
export const parseQueryToJson = function (url) {
  var regUrl = /^[^?]+\?([\w\W]+)$/
  var regPara = /([^&=]+)=([\w\W]*?)(&|$|#)/g
  var arrUrl = regUrl.exec(url)
  var ret = {}
  if (arrUrl && arrUrl[1]) {
    var strPara = arrUrl[1]
    var result
    while ((result = regPara.exec(strPara)) != null) {
      ret[result[1]] = result[2]
    }
  }
  return ret
}

/**
 * 获取当前页面的URL(不带参数)
 */
export const getMainUrl = () => {
  var url = window.location.href
  var index = url.indexOf('#')
  if (index > -1) {
    url = url.substr(0, index)
  }
  index = url.indexOf('?')
  if (index > -1) {
    url = url.substr(0, index)
  }
  return url
}

/**
* 注册PostMessage事件
* @param {*} receivePostMessageFunc 接受数据方法
*/
export const createPostMessageEvent = (receivePostMessageFunc) => {
  const receiveMessageFromIndex = function (event) {
    if (event !== undefined && event.data && event.data.type) {
      receivePostMessageFunc(event)
    }
  }

  // 监听message事件
  if (window.addEventListener) {
    window.addEventListener('message', receiveMessageFromIndex, false)
  } else if (window.attachEvent) {
    window.attachEvent('onmessage', receiveMessageFromIndex)
  }
}

/** 加载中 */
export const appLoading = (title = '加载中…', mask = true) => {
  Toast.loading({
    mask: mask,
    message: title,
    duration: 0
  })
}

/** 清除加载 */
var timer = null
export const apphideLoading = () => {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    Toast.clear()
    clearTimeout(timer)
    timer = null
  }, 100)
}

/**
 * 获取当前时间戳
 */
export const GetTimestamp = () => {
  var timestamp = new Date().getTime()
  return timestamp
}

/**
 * 转换时间格式
 * @param {*} date
 * @param {*} pattern
 */
export const formatDate = (date, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  if (isEmpty(date)) {
    return ''
  } else {
    return moment(date).format(pattern)
  }
}

/**
 * 获取查询条件
 * @param {*} rules  {field,op,value,type}
 * @param {*} op  or或者and
 */
export const getQueryConditon = (rules = [], op = 'and') => {
  var conditon = {
    rules: [],
    groups: [{
      rules: rules,
      op
    }],
    op: 'and'
  }

  return conditon
}

/**
 * 获取查询条件多层级
 * @param {*} rules  {field,op,value,type}
 * @param {*} op  or或者and
 */
export const getQueryConditonMore = (rules = [], op = 'or', groups) => {
  var conditonMore = {
    rules: [],
    groups: [{
      rules: rules,
      op,
      groups
    }],
    op: 'and'
  }

  return conditonMore
}

/**
 * 获取APP待办地址
 * @param {*} routePath
 */
export const getAppTaskUrl = (routePath) => {
  var webUrl = getMainUrl()
  return `${webUrl}#/${routePath}`
}

/**
 * 获取PC的待办地址
 * @param {*} routePath
 */
export const getPCTaskUrl = (routePath) => {
  var hostUrl = appConfig.pcHost
  return `${hostUrl}/${routePath}`
}

/**
 * 获取下一步任务信息
 * @param {*} taskType
 * @param {*} assignUsersID
 * @param {*} routePath
 * @param {*} taskContent
 * @param {*} eventInfoId
 * @param {*} caseID
 */
export const getNextTask = (taskType, assignUsersID, routePath, TaskTitle, taskContent, attachments, evtFileUrl, eventInfoId, caseID) => {
  var task = {
    TaskType: taskType,
    TaskTitle: TaskTitle,
    TaskImg: getTaskImg(attachments, evtFileUrl),
    TaskContent: taskContent,
    AssignUsers: assignUsersID,
    AppLinks: getAppTaskUrl(routePath),
    PCLinks: getPCTaskUrl(routePath),
    EventInfoId: eventInfoId,
    CaseID: caseID
  }

  return task
}

/**
 * 获取图片读取地址
 */
export const getFileReadUrl = (fileCode) => {
  return apiConfig.admin.file.downloadFile + '/' + fileCode
}

/**
 * 获取任务图片
 * @param {*} attachments
 * @param {*} evtFileUrl
 */
export const getTaskImg = (attachments, evtFileUrl) => {
  var taskImg = ''
  if (isNotEmpty(attachments) && attachments.length > 0) {
    var attachment = attachments.find(item => isImg(item.fileName || item.FileName))
    if (isNotEmpty(attachment)) {
      var fileCode = attachment.fileCode || attachment.FileCode
      taskImg = getFileReadUrl(fileCode)
    }
  }
  if (isEmpty(taskImg) && isNotEmpty(evtFileUrl)) {
    var evtFileUrlArray = evtFileUrl.split(',')
    if (evtFileUrlArray.length > 0) {
      taskImg = evtFileUrlArray[0]
    }
  }
  return taskImg
}

/**
 * 根据文件名称判断是否图片
 * @param {*} fileName
 */
export const isImg = (fileName) => {
  const imgTypes = ['png', 'jpg', 'gif', 'bmp', 'jpeg']
  let fileType = ''
  const index = fileName.lastIndexOf('.')
  if (index > -1) {
    fileType = fileName.substr(index + 1)
  }
  return imgTypes.includes(fileType)
}

/**
 * 获取事件相关的任务默认的标题和内容
 * @param {*} event
 * @param {*} taskTypeDesc
 */
export const getEventTaskDefault = (event, taskTypeDesc) => {
  var title = `${event.evtTypeDisplayName}-${taskTypeDesc}`
  var content = `${event.reportTime}上报在${event.address}发现${event.evtTypeDisplayName}事件`

  return {
    title,
    content
  }
}

/**
 * 获取案件相关的任务默认的标题和内容
 * @param {*} caseInfo
 * @param {*} taskTypeDesc
 */
export const getCaseTaskDefault = (caseInfo, taskTypeDesc) => {
  var title = `${caseInfo.DocNo}-${taskTypeDesc}`
  var content = `${caseInfo.CauseOfAction}`

  return {
    title,
    content
  }
}
