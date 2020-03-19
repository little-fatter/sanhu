/*
 * @Author: 616749285@qq.com
 * @Date: 2020-03-18 09:23:30
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-18 09:28:50
 * @Description:  四方德信
 */

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
    url: apiConfig.commonOperateApi,
    data: {
      id: 'sfapi',
      model: 'cross_domain',
      data
    }
  })
}

/**
 * 通过关键词查询法律条文列表
 * @param {number} pageNo pageNo
 * @param {number} pageSize pageSize
 * @param {string} keyword 关键词
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
