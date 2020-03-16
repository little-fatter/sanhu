/*
 * @Author: 616749285@qq.com
 * @Date: 2020-03-13 09:53:27
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-13 10:44:28
 * @Description:  第三方接口请求
 */

import { getHttp, postHttp, delHttp, putHttp } from '@/utils/apiRequest'
import apiConfig from '@/config/api.config'

/**
 * 获取法律法规列表
 * @param {object} parameter 
 */
export const getRegulations = parameter => {
  return postHttp({
    url: apiConfig.other.regulations,
    data: parameter
  })
}
