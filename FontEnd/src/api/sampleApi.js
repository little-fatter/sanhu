import { getHttp, postHttp } from '@/utils/apiRequest'
import apiConfig from '@/config/api.config'

export function getServiceList (parameter) {
  return postHttp({
    url: apiConfig.list.serviceList,
    data: {
      ...parameter
    }
  })
}

export function getOrgTree (parameter) {
  return getHttp({
    url: apiConfig.list.orgList,
    params: {
      ...parameter
    }
  })
}

export function saveService (parameter) {
  return postHttp({
    url: apiConfig.list.serviceAdd,
    data: {
      ...parameter
    }
  })
}
