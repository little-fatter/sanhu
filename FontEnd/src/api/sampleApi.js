import { getHttp, postHttp } from '@/utils/apiRequest'
import apiConfig from '@/config/api.config'
const defaultCondition = { 'rules': [], 'groups': [], 'op': 'and' }

function condition (params = {}, pageiIndex = 1, pageSize = 10) {
  return {
    Condition: {
      rules: [],
      groups: [(params.rules && params.rules.length > 0) || (params.groups && params.groups.length > 0) ? params : ''],
      op: 'and'
    },
    PageIndex: pageiIndex,
    PageSize: pageSize,
    SortName: 'ModifyDate',
    SortOrder: 'desc'
  }
}

/**
 * 根据过滤器获取详情接口
 * @param {*} model 模块名称
 * @param {*} Condition 查询条件
 */
export const getDetialdataByfilter = (model, Condition = defaultCondition) => {
  return postHttp({
    url: apiConfig.detail,
    data: {
      model,
      filter: Condition
    }
  })
}
/**
 * 根据事件ID获取详情接口
 * @param {*} model 模块名称
 * @param {*} eventInfoId 事件ID
 */
export const getDetialdataByEventInfoId = (model, eventInfoId) => {
  var rules = [{
    field: 'EventInfoId',
    op: 'equal',
    value: eventInfoId,
    type: 'string'
  }]
  var conditons = condition({ rules: rules, op: 'and' })
  return getDetialdataByfilter(model, conditons)
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
/**
 * 通用操作接口
 * @param {*} id 操作标识
 * @param {*} model 模块名称
 * @param {*} data 数据对象
 * @param {*} context
 */
export const commonOperateApi = (id, model, data, context = '') => {
  var dataStr = JSON.stringify(data)
  return postHttp({
    url: apiConfig.commonOperateApi,
    data: {
      id,
      model,
      data: dataStr,
      context
    }
  })
}

/**
 * 发起审批流程
 * @param {*} parameter
 */
export const startProcessInstance = (parameter) => {
  return postHttp({
    url: apiConfig.startProcessInstance,
    data: parameter
  })
}

/**
 * 获取【表单】详情
 * @param {string} eventId 事件id，只有eventId时，获取的数据为当前事件最新的表单详情
 * @param {string} model 表单类型
 * @param {string} formId 表单的id，优先级最高，会覆盖eventId，获取的是当前表单的详情
 * @param {array<string>} filters 过滤数据项，默认不过滤，全部获取
 * @author 616749285@qq.com
 * 注释的原因为已有实现方法，在上面
 */
// export const getFormDetail = ({ eventId, model, formId, filters = []} = {}) => {
//   return postHttp({
//     url: apiConfig.commonOperateApi,
//     data: {
//       id: 'FORMDATA',
//       model: 'work_task',
//       data: {
//         eventInfoId: eventId,
//         model,
//         formId,
//         filterModels: filters
//       }
//     }
//   })
// }
