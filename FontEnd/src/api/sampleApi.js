import { getHttp, postHttp } from '@/utils/apiRequest'
import apiConfig from '@/config/api.config'
function condition (params = []) {
  return {
    Condition: {
      rules: [],
      groups: [params.length > 0 ? params : ''],
      op: 'and'
    },
    PageIndex: 1,
    PageSize: 30,
    SortName: 'ID',
    SortOrder: 'asc'
  }
}
// 案件
export function getcaseinfo (parameter) {
  return postHttp({
    url: apiConfig.case_info,
    data: condition(parameter)
  })
}
// 任务列表
export function getWorkTaskList (parameter) {
  return postHttp({
    url: apiConfig.work_task,
    data: condition(parameter)
  })
}

// 任务详情
export function getTaskDetails (parameter) {
  return postHttp({
    url: apiConfig.detail,
    data: { model: 'work_task', id: parameter }
  })
}

// 事件详情
export function getEventDetails (parameter) {
  return postHttp({
    url: apiConfig.detail,
    data: { model: 'event_info', id: parameter }
  })
}

// 字典
export function getDictionary (parameter) {
  return postHttp({
    url: apiConfig.dictionary,
    data: parameter
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
