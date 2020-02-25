import { getHttp, postHttp } from '@/utils/apiRequest'
import apiConfig from '@/config/api.config'
function condition (params = []) {
  return {
    Condition: {
      rules: [],
      groups: [{
        rules: params,
        op: 'and'
      }],
      op: 'and'
    },
    PageIndex: 1,
    PageSize: 30,
    SortName: 'ID',
    SortOrder: 'asc'
  }
}

export function getWorkTaskList (parameter) {
  return postHttp({
    url: apiConfig.work_task,
    data: condition(parameter)
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
