import { postHttp } from '@/utils/apiRequest'
import apiConfig from '@/config/api.config'
import { getQueryConditon } from '../utils/util'
const defaultCondition = { 'rules': [], 'groups': [], 'op': 'and' }

/** 任务类型 */
export const TaskTypeDic = {
  // 事件巡查
  EventCheck: 'EventCheck',
  // 现场勘查
  OnSpot: 'OnSpot',
  // 案件创建
  CaseInfo: 'CaseInfo',
  // 现场处罚决定书
  Punishment: 'Punishment',
  // 结案报告
  finalReport: 'finalReport'
}
/**
 * 字典表类型编号
 */
export const DictionaryCode = {
  // 事件类型
  EventType: 'EventType',
  // 当事人类型
  Typesofparties: 'Typesofparties',
  // 案件类型
  CaseType: 'CaseType',
  // 案件来源
  CaseSourceType: 'CaseSourceType',
  //
  CheckType: 'CheckType'
}
/**
 * 表单类型
 */
export const FromType = {
  // 物品清单
  goodsList: 'form_confiscated_item',
  // 案件详情
  caseDetails: 'case_info',
  // 当场处罚决定书
  PromptlyPunishNote: 'law_punishmentInfo',
  // 勘验记录
  RecordOfInquest: 'form_inquestrecord',
  // 结案报告
  caseReport: 'case_report',
  // 卷宗封面
  caseCover: 'case_cover',
  // 询问当事笔录
  AskPartyNote: 'form_inquiryrecord_litigant',
  // 询问证人笔录
  AskWitnessNote: 'form_inquiryrecord_witness',
  // 询问第三人笔录
  AskThirdPartyNote: 'form_inquiryrecord_third',
  // 现场勘查
  sceneInvestigationDetail: 'task_survey',
  // 事件核查
  eventDetail: 'task_patrol',
  // 没收物品清单
  confiscatoryGoodsList: 'form_confiscated'
}

/**
 * 通用分页查询接口
 * @param {*} model 模块名称
 * @param {*} PageIndex PageIndex
 * @param {*} PageSize PageSize
 * @param {*} Condition 查询条件
 */
export const getPageDate = (model, PageIndex, PageSize, Condition = defaultCondition) => {
  var url = `${apiConfig.regulatory.getPageDate}?model=${model}&appid=`
  return postHttp({
    url: url,
    data: {
      Condition,
      PageIndex,
      PageSize
    }
  })
}

/**
 * 通用详情查询接口
 * @param {*} model 模块名称
 * @param {*} id id
 */
export const getDetaildata = (model, id) => {
  return postHttp({
    url: apiConfig.regulatory.getDetaildata,
    data: {
      model,
      id
    }
  })
}

/**
 * 根据过滤器获取详情接口
 * @param {*} model 模块名称
 * @param {*} Condition 查询条件
 */
export const getDetialdataByfilter = (model, Condition = defaultCondition) => {
  return postHttp({
    url: apiConfig.regulatory.getDetaildata,
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
  var conditon = getQueryConditon(rules)
  return getDetialdataByfilter(model, conditon)
}

/**
 * 根据事件ID获取表单明细接口
 * @param {*} eventInfoid
 * @param {*} model
 */
export const getFormsDetailByEventInfoId = (eventInfoid = null, model, formId = null, filterModels = null) => {
  return postHttp({
    url: apiConfig.regulatory.commonOperateApi,
    data: {
      id: 'FORMDATA',
      model: 'work_task',
      data: {
        eventInfoid,
        model,
        formId,
        filterModels
      }
    }
  })
}
/**
 * 根据表单ID获取PDF
 * @param {*} eventInfoid
 * @param {*} model
 */
export const getFormsDetailByEventInfoIdPdf = (formId = '', formType = '') => {
  return postHttp({
    url: apiConfig.regulatory.commonOperateApi,
    data: {
      id: '',
      model: 'form_printPDF',
      data: {
        formId,
        formType
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
    url: apiConfig.regulatory.commonOperateApi,
    data: {
      id,
      model,
      data: dataStr,
      context
    }
  })
}

/**
 * 字典表接口
 * @param {*} context
 */
export const getDictionaryItems = (context) => {
  return postHttp({
    url: apiConfig.regulatory.getDictionaryItems,
    data: {
      model: 'res_dictionary',
      context
    }
  })
}

/**
 * 通用保存接口
 * @param {*} data 数据
 * @param {*} model 模块名称
 * @param {*} method 操作
 */
export const commonSaveApi = (data, model, method = 'create') => {
  return postHttp({
    url: apiConfig.regulatory.commonSaveApi,
    data: {
      data,
      model,
      method
    }
  })
}
