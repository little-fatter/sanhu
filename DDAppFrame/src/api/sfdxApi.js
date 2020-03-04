import { postHttp } from '@/utils/apiRequest'
import apiConfig from '@/config/api.config'

/**
 * 分页获取法律法规
 * @param {*} pageNo pageNo
 * @param {*} pageSize pageSize
 * @param {*} keyword 关键词
 */
export const getLawRulePage = (pageNo, pageSize, keyword = null) => {
  return postHttp({
    url: apiConfig.sfdx.getLawRulePage,
    data: {
      pageNo,
      pageSize,
      lawRuleName: keyword
    }
  })
}
