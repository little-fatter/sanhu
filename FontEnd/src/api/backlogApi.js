import { getHttp, postHttp, delHttp, putHttp } from '@/utils/apiRequest'
import apiConfig from '@/config/api.config'

// 获取消息中心
export function msgCenterGet (parameter) {
  return getHttp({
    url: apiConfig.msgCenter,
    params: {
      ...parameter
    }
  })
}

// 获取消息中心
export function msgCenterPost (parameter) {
  return postHttp({
    url: apiConfig.msgCenter,
    params: {
      ...parameter
    }
  })
}

// 消息中心已读
export function msgCenterPut (parameter) {
  return putHttp({
    url: apiConfig.msgCenter + `/Read`,
    data: parameter
  })
}

// 消息中心删除
export function msgCenterDel (parameter) {
  return delHttp({
    url: apiConfig.msgCenter + `/delete`,
    data: parameter
  })
}
