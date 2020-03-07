import { getHttp, postHttp } from '@/utils/apiRequest'
import apiConfig from '@/config/api.config'

function condition (params = {}, pageiIndex = 1, pageSize = 10) {
  return {
    Condition: {
      rules: [],
      groups: [(params.rules && params.rules.length > 0) || (params.groups && params.groups.length > 0) ? params : ''],
      op: 'and'
    },
    PageIndex: pageiIndex,
    PageSize: pageSize,
    SortName: 'ID',
    SortOrder: 'asc'
  }
}

function relatedCon (params = {}, pageiIndex = 1, pageSize = 10) {
  return {
    Condition: {
      rules: params
    },
    PageIndex: pageiIndex,
    PageSize: pageSize
  }
}
// 详情关联查询
export function getPageDataDetails (model, parameter, PageIndex, PageSize) {
  return postHttp({
    url: `${apiConfig.pageData}?model=${model}&appid=`,
    data: relatedCon(parameter, PageIndex, PageSize)
  })
}
// 列表
export function getPageData (model, parameter, PageIndex, PageSize) {
  return postHttp({
    url: `${apiConfig.pageData}?model=${model}&appid=`,
    data: condition(parameter, PageIndex, PageSize)
  })
}
// 详情
export function getDetails (model, parameter) {
  return postHttp({
    url: apiConfig.detail,
    data: { model, id: parameter }
  })
}
// 当前用户
export function getUser (parameter) {
  return getHttp({
    url: apiConfig.userId,
    params: {
      ...parameter
    }
  })
}
// 关联表单
export function getRelateForm (parameter) {
  return postHttp({
    url: apiConfig.detail,
    data: { model: 'form_all', filter: parameter }
  })
}

// 字典
export function getDictionary (parameter) {
  return postHttp({
    url: apiConfig.dictionary,
    data: parameter
  })
}
// 打印预览
var filter = {
  ModelName: 'core_printTemplate',
  Name: 'pdf打印'
}
export function printPreview (parameter) {
  return postHttp({
    url: apiConfig.print,
    data: { model: 'core_printTemplate', filter: filter }
  })
}
// 根据表单ID或者事件ID获取表单所有详情
export function getFormDetail (model, eventInfoid = null, formId = null, filterModels = null) {
  return postHttp({
    url: apiConfig.commonOperateApi,
    data: {
      id: 'FORMDATA',
      model: 'work_task',
      data: {
        model,
        eventInfoid,
        formId,
        filterModels
      }
    }
  })
}
