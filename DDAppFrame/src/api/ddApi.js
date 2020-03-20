import { getHttp, postHttp } from '@/utils/apiRequest'
import apiConfig from '@/config/api.config'

/**
 * 免登接口
 * @param {*} agentId 应用ID
 * @param {*} code 授权码
 * @param {*} toolid 后台工具ID
 */
export const logindd = (agentId, code, toolid) => {
  return getHttp({
    url: apiConfig.admin.dd.logindd,
    params: {
      agentId,
      code,
      toolid
    }
  })
}

/**
 * 发起审批流程
 * @param {*} parameter
 */
export const startProcessInstance = (parameter) => {
  return postHttp({
    url: apiConfig.admin.dd.startProcessInstance,
    data: parameter
  })
}

/**
 * 获取企业下的自定义空间
 * @param {*} domain 企业内部调用时传入，需要为10个字节以内的字符串，仅可包含字母和数字，大小写不敏感
 * @param {*} agentId 应用ID
 */
export const getCustomSpace = (domain, agentId) => {
  return getHttp({
    url: apiConfig.admin.dd.getCustomSpace,
    params: {
      domain,
      agentId
    }
  })
}

/**
 * 钉钉JSAPI授权
 */
export const getJsApiAuth = (url, nonceStr, agentId, corpId) => {
  return getHttp({
    url: apiConfig.admin.dd.getJsApiAuth,
    params: {
      url,
      nonceStr,
      agentId,
      corpId
    }
  })
}

/**
 * 授权用户访问企业下的自定义空间
 */
export const grantCustomSpace = (agentId, type, userid, domain, fileids, path) => {
  return getHttp({
    url: apiConfig.admin.dd.grantCustomSpace,
    params: {
      agentId,
      type,
      userid,
      domain,
      fileids
    }
  })
}

/**
 * 授权用户预览审批流程附件
 */
export const processinstanceCspacePreview = (agentId, fileId, fileIdList, processInstanceId, userid) => {
  const request = JSON.stringify({
    agentId,
    file_id: fileId,
    fileid_list: fileIdList,
    process_instance_id: processInstanceId,
    userid
  })
  return postHttp({
    url: apiConfig.admin.dd.processinstanceCspacePreview,
    data: {
      Request: request
    }
  })
}

/**
 * 获取审批钉盘空间
 */
export const processinstanceCspaceInfo = (agentId, userId) => {
  return postHttp({
    url: apiConfig.admin.dd.processinstanceCspaceInfo,
    data: {
      agentId,
      userId
    }
  })
}

/**
 * 新增待办
 * @param {*} parameter
 */
export const workrecordAdd = (parameter) => {
  return postHttp({
    url: apiConfig.admin.dd.workrecordAdd,
    data: parameter
  })
}

/**
 * 更新用户待办
 * @param {*} recordId 待办ID
 * @param {*} userid 用户ID
 */
export const workrecordUpdate = (recordId, userid) => {
  return postHttp({
    url: apiConfig.admin.dd.workrecordUpdate,
    data: {
      recordId,
      userid
    }
  })
}

/**
 * 分页获取当前用户的待办任务列表
 * @param {*} offset  分页游标，从0开始，如返回结果中has_more为true，则表示还有数据，offset再传上一次的offset+limit
 * @param {*} limit 分页大小，最多50
 * @param {*} status 待办事项状态，0表示未完成，1表示完成
 */
export const getWorkrecordPageListbyCurrent = (offset, limit = 10, status = 0) => {
  return postHttp({
    url: apiConfig.admin.dd.getWorkrecordPageListbyCurrent,
    data: {
      offset,
      limit,
      status
    }
  })
}

/**
 * 发送群消息
 * @param {*} parameter
 */
export const sendChatMsg = (parameter) => {
  return postHttp({
    url: apiConfig.admin.dd.sendChatMsg,
    data: parameter
  })
}

/**
 * 保存群ID和Title到数据库
 * @param {*} chatId
 * @param {*} title
 */
export const addChat = (chatId, title) => {
  return postHttp({
    url: apiConfig.admin.dd.addChat,
    data: {
      chatId,
      title
    }
  })
}
