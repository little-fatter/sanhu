import { saveAs } from 'file-saver'
import { downfileHttp } from '@/utils/apiRequest'
import { message } from 'ant-design-vue'
import appConfig from '@/config/app.config'
import apiConfig from '../config/api.config'
import { formTypes } from '@/config/list.config'
import router from '@/router'
import moment from 'moment'

const COVER = '/img/common/cover.jpg'

export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : (hour <= 11 ? '上午好' : (hour <= 13 ? '中午好' : (hour < 20 ? '下午好' : '晚上好')))
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要去KTV', '我猜你可能累了']
  const index = Math.floor((Math.random() * arr.length))
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

/**
 * 关闭加载动画
 * @param id
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

/**
 * 返回字符串的实际字符长度
 * @param {*} str
 */
export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1
    }
    return pre + 2
  }, 0)

/**
 * 返回指定长度的字符串的实际字符长度
 * @param {*} str
 * @param {*} maxLength
 */
export const cutStrByFullLength = (str = '', maxLength) => {
  let showLength = 0
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1
    } else {
      showLength += 2
    }
    if (showLength <= maxLength) {
      return pre + cur
    }
    return pre
  }, '')
}

/**
 * 清理空值，对象
 * @param children
 * @returns {*[]}
 */
export function filterEmpty (children = []) {
  return children.filter(c => c.tag || (c.text && c.text.trim() !== ''))
}

/**
 * 设置网站的Title
 * @param {*} title
 */
export const setDocumentTitle = (title) => {
  document.title = title
}

// 设置APP的头
export const setAppTitle = (sysName, sysVerison) => {
  let title
  const whitespace = ' '
  if (sysName.includes('V') || sysName.includes('v')) {
    title = sysName
  } else if (sysVerison.includes('V') || sysVerison.includes('v')) {
    title = `${sysName}${whitespace}${sysVerison}`
  } else {
    title = `${sysName}${whitespace}v${sysVerison}`
  }
  setDocumentTitle(title)
}

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
 * 设置父页面域名
 */
const SourceDomain = '*'

/**
 * 获取IframeHeight的高度
 */
export const getIframeHeight = () => {
  return document.documentElement.clientHeight - 100
}

// 当请求token过期通知框架注销当前用户(外部模块子页面使用)
export const logoutPost = () => {
  const json = {
    type: 'logout'
  }
  if (window.parent) {
    window.parent.postMessage(json, SourceDomain)
  }
}
/**
 * 外模模块根节点挂载时通知主框架其已准备好了，可以传递当前用户给我了
 */
export const childClientReadyStatePost = () => {
  const json = {
    type: 'childClientReadyState',
    data: {
      isReady: true
    }
  }
  if (window.parent) {
    window.parent.postMessage(json, SourceDomain)
  }
}

/**
* 登录后传递当前用户
* @param {*} currentUser 包含 {access_token,isSuperAdmin,permissions}
*/
export const loginPost = (currentUser) => {
  const json = {
    type: 'login',
    data: {
      currentUser
    }
  }
  if (window.frames && window.frames.length > 0) {
    console.log('currentUser', currentUser)
    window.frames[0].postMessage(json, SourceDomain)
  }
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

/**
 * 根据文件名判断该文件是否为图片
 * @param {string} fileName
 */
export const isImg = fileName => {
  const imgTypes = ['png', 'jpg', 'gif', 'bmp', 'jpeg']
  let fileType = ''
  const index = fileName.lastIndexOf('.')
  if (index > -1) {
    fileType = fileName.substr(index + 1)
  }
  return imgTypes.includes(fileType)
}

/**
 * 下载文件
 * @param {string} url
 * @param {string} name
 */
export const downloadFile = async ({ url, name = moment().format('YYYY年MM月DD日'), isOpenBrowser = false } = {}) => {
  if (isOpenBrowser) {
    window.open(url)
  } else {
    const loading = message.loading('下载中…', 0)
    try {
      const res = await downfileHttp({ url })
      saveAs(res, decodeURI(name))
      // loading()
      // message.success('下载成功')
    } catch (error) {
      console.error(error)
      // loading()
      // message.error('下载失败')
    }
    loading()
  }
}

/**
 * 根据图片生成保留短边居中的背景图样式
 * @param {string} img
 */
export const genImgBackground = (img) => {
  return {
    background: `url(${img || COVER})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
}

/**
 * 格式化日期
 * @param {string/object} date
 */
export const formatDay = date => {
  if (!date) return '-'
  return moment(date).format('YYYY-MM-DD')
}

/**
 * 格式化时间
 * @param {string/object} date
 */
export const formatTime = date => {
  if (!date) return '-'
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 跳转表单详情
 * @param {string} type 表单类型
 * @param {object} record 当前数据对象
 */
export const toFormDetail = (record = {}) => {
  const data = formTypes.find(i => i.model === record.FormType)
  if (data) {
    router.push({
      path: data.path,
      query: { id: record.ID }
    })
  } else {
    message.warning('当前表单类型不存在')
  }
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
export const getNextTask = (taskType, assignUsersID, routePath, taskTitle, taskContent, attachments, evtFileUrl, eventInfoId, caseID) => {
  var task = {
    TaskType: taskType,
    TaskTitle: taskTitle,
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
 * 获取APP待办地址
 * @param {*} routePath
 */
export const getAppTaskUrl = (routePath) => {
  var webUrl = appConfig.AppHost
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
 * 获取图片读取地址
 */
export const getFileReadUrl = (fileCode) => {
  return apiConfig.file.download('fileCode') 
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
 * 获取案件相关的任务默认的标题和内容
 * @param {*} caseInfo
 * @param {*} taskTypeDesc
 */
export const getCaseTaskDefault = (caseInfo, taskTypeDesc) => {
  var docNo = isNotEmpty(caseInfo.CaseNumber) ? caseInfo.CaseNumber : ''
  var title = ''
  if (isNotEmpty(docNo)) {
    title = `${docNo}-${taskTypeDesc}`
  } else {
    title = `${taskTypeDesc}`
  }
  var content = `${caseInfo.CauseOfAction}`

  return {
    title,
    content
  }
}