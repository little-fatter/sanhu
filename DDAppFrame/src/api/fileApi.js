import { uploadFileHttp, downfileHttp, delHttp } from '../utils/apiRequest'
import apiConfig from '../config/api.config'

/**
 * 上传附件
 * @param {*} formData 表单对象
 */
export const uploadFile = (formData, sync2Dingding = true) => {
  return uploadFileHttp({
    url: `${apiConfig.admin.file.uploadFile}?sync2Dingding=${sync2Dingding}`,
    formData
  })
}

/**
 * 下载附件
 * @param {*} fileCode 附件编号
 */
export const downloadFile = (fileCode) => {
  return downfileHttp({
    url: apiConfig.admin.file.downloadFile + '/' + fileCode
  })
}

/**
 * 预览图片地址
 * @param {*} fileCode 附件编号
 */
export const previewServerImgPath = (fileCode) => {
  return apiConfig.admin.file.downloadFile + '/' + fileCode
}

/**
 * 删除附件
 * @param {*} fileCode 附件编号
 */
export const deleteFile = (fileCode) => {
  return delHttp(
    {
      url: apiConfig.admin.file.deleteFile + '/' + fileCode
    }
  )
}
