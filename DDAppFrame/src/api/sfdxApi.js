import { postHttp } from '@/utils/apiRequest'
import apiConfig from '@/config/api.config'

/**
 * 通用获取法律法规接口
 */
export const getLawData = (params, apiType) => {
  var data = {
    filter: params,
    ApiType: apiType
  }
  return postHttp({
    url: apiConfig.regulatory.commonOperateApi,
    data: {
      id: 'sfapi',
      model: 'cross_domain',
      data
    }
  })
}

/**
 * 通过关键词查询法律条文列表
 * @param {*} pageNo pageNo
 * @param {*} pageSize pageSize
 * @param {*} keyword 关键词
 */
export const getLawRuleItemList = (keyWord, plawRuleFileId) => {
  var params = {
    keyWord,
    plawRuleFileId
  }
  var apiType = 'law_rule_item_list'
  return getLawData(params, apiType)
}

/**
 * 获取法律法规文件列表
 */
export const getLawFileList = () => {
  var params = {
  }
  var apiType = 'law_rule_file_list'
  return getLawData(params, apiType)
}
