<template>
  <div>
    <van-uploader
      v-if="!isOnlyView"
      :accept="accept"
      :disabled="isDisabled"
      :max-size="maxFileSize"
      :upload-text="uploadText"
      :before-read="beforeRead"
      :after-read="afterRead"
    >
      <van-icon name="plus" />
    </van-uploader>
    <div class="upload-result" v-if="hasFile">
      <template v-if="previewImgs.length>0">
        <ul class="upload-img-result">
          <li
            v-for="(item,index) in previewImgs"
            :key="index"
            class="item"
            @click="viewBigImg(item.Url)"
          >
            <img :src="item.Url" :alt="item.fileName" :title="item.fileName">
            <van-icon name="clear" class="close" @click="removeFile(item.fileCode)" v-if="!isOnlyView"></van-icon>
          </li>
        </ul>
      </template>
      <template v-if="commonFiles.length>0">
        <ul class="upload-file-result">
          <li
            v-for="(file,index) in commonFiles"
            :key="index">
            <van-row>
              <van-col span="18"> <a @click="downFile(file)">{{ file.fileName }}</a></van-col>
              <van-col span="6" style="text-align:center">
                <!-- <van-icon name="down" class="opeate" @click="downFile(file)" color="#1989fa"></van-icon> -->
                <van-icon name="clear" class="opeate" @click="removeFile(file.fileCode)" v-if="!isOnlyView"></van-icon>
              </van-col>
            </van-row>
          </li>
        </ul>
      </template>
    </div>
    <van-image-preview
      v-model="isShowBigImg"
      :images="bigImgs"
      @onClose="bigImgClose"
    >

    </van-image-preview>
  </div>
</template>

<script>
/**
 * 标准文件上传组件
 * 上传成功后发起uploadSuccess事件
 */
import { uploadFile, downloadFile, deleteFile } from '../../api/fileApi'
import { isNotEmpty } from '../../utils/util'
import { setTimeout, clearTimeout } from 'timers'
import { ddprocessinstanceCspaceInfo, ddgetCode } from '../../service/ddJsApi.service'
import { getAgentId } from '../../service/currentUser.service'
import { saveAs } from 'file-saver'
export default {
  name: 'SUpload',
  props: {
    /** 接受上传的文件类型 比如只能上传图片，可传入"image/*" */
    accept: {
      type: String,
      default: null
    },
    /** 接受的最大文件大小,默认是40M,单位byte */
    maxFileSize: {
      type: Number,
      default: 40 * 1024 * 1024
    },
    /** 上传区域文字提示 */
    uploadText: {
      type: String,
      default: '正在上传，请稍等'
    },
    /** 标识符，可以在回调函数的第二项参数中获取 */
    name: {
      type: String,
      default: ''
    },
    /** 授权类型,可设置为Anonymous和Authentication */
    authenticationType: {
      type: String,
      default: null
    },
    /**
     * 访问权限 当集合为空时表示所有登录用户均可访问
     * 权限格式：[{'ObjectId':'',AccessObject:'','Allow':true}]
    */
    permissions: {
      type: Array,
      default: null
    },
    /** 编辑权限,格式同上 */
    updatePermissions: {
      type: Array,
      default: null
    },
    /** 删除权限,格式同上 */
    deletePermissions: {
      type: Array,
      default: null
    },
    /** 上传成功的回调函数 */
    uploadSuccess: {
      type: Function,
      default: null,
      required: false
    },
    /** 是否需要显示结果页面 */
    needShowResult: {
      type: Boolean,
      default: true,
      required: false
    },
    /** 是否只是查看 */
    isOnlyView: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * 初始结果
     */
    initResult: {
      type: Array,
      default: function () {
        return []
      }
    },
    /** 是否同步到钉钉 */
    sync2Dingding: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data () {
    return {
      isShowBigImg: false,
      bigImgs: [],
      fileList: [],
      isDisabled: false,
      uploadResult: [],
      previewImgs: [],
      commonFiles: [],
      spaceId: ''
    }
  },
  created () {
    if (this.initResult.length > 0) {
      this.uploadResult = [
        ...this.initResult
      ]
      this.uploadResult.forEach(item => {
        var fileCode = item.fileCode || item.FileCode
        var fileName = item.fileName || item.FileName
        const file = {
          ...item,
          fileCode,
          fileName
        }
        if (this.isImg(file.fileName)) {
          this.addPrevieImgs(file)
        } else {
          this.commonFiles.push(item)
        }
      })
    }
    if (this.sync2Dingding) {
      ddprocessinstanceCspaceInfo().then((res) => {
        this.spaceId = res
      })
    }
  },
  computed: {
    hasFile: function () {
      return this.needShowResult && this.uploadResult && this.uploadResult.length > 0
    }
  },
  watch: {
    initResult (newVal, oldVal) {
      if (newVal.length !== oldVal.length) {
        if (newVal.length > 0) {
          this.uploadResult = [
            ...newVal
          ]
          this.uploadResult.forEach(item => {
            if (this.isImg(item.FileName)) {
              this.addPrevieImgs(item)
            } else {
              this.commonFiles.push(item)
            }
          })
        }
      }
    }
  },
  methods: {
    // 刷新
    refresh () {
      this.fileList = []
      this.isDisabled = false
      this.uploadResult = []
      this.previewImgs = []
      this.commonFiles = []
    },
    // 获取上传结果
    getUploadResult () {
      return this.uploadResult
    },
    // 文件读取前的回调函数，返回false可终止文件读取
    beforeRead (file, detail) {
      const fileData = file
      this.fileList = [...this.fileList, fileData]
      const formData = new FormData()
      this.fileList.forEach((item) => {
        formData.append('files[]', item)
      })

      if (isNotEmpty(this.authenticationType)) {
        formData.append('authenticationType', this.authenticationType)
      }
      if (isNotEmpty(this.permissions)) {
        formData.append('permissions', JSON.stringify(this.permissions))
      }
      if (isNotEmpty(this.updatePermissions)) {
        formData.append('updatePermissions', JSON.stringify(this.updatePermissions))
      }
      if (isNotEmpty(this.permissions)) {
        formData.append('deletePermissions', JSON.stringify(this.deletePermissions))
      }
      this.isDisabled = true
      this.$toast.loading({
        mask: true,
        message: '正在上传，请稍等...'
      })
      if (this.sync2Dingding) {
        formData.append('agentId', getAgentId())
        formData.append('spaceId', this.spaceId)
        ddgetCode().then(code => {
          formData.append('code', code)
          uploadFile(formData, this.sync2Dingding).then((res) => {
            for (const serveFile of res) {
              var fileCode = serveFile.fileCode || serveFile.FileCode
              var fileName = serveFile.fileName || serveFile.FileName
              var file = {
                ...serveFile,
                fileCode,
                fileName
              }
              this.uploadResult.push(file)
              if (this.isImg(fileName)) {
                this.addPrevieImgs(file)
              } else {
                this.commonFiles.push(file)
              }
            }
            if (this.uploadSuccess) {
              this.uploadSuccess(this.uploadResult)
            }
            this.$toast.success('上传成功')
          }).catch(() => {
          }).finally(() => {
            this.fileList = []
            this.isDisabled = false
          })
          return true
        })
      } else {
        uploadFile(formData, this.sync2Dingding).then((res) => {
          for (const serveFile of res) {
            var fileCode = serveFile.fileCode || serveFile.FileCode
            var fileName = serveFile.fileName || serveFile.FileName
            var file = {
              ...serveFile,
              fileCode,
              fileName
            }
            this.uploadResult.push(file)
            if (this.isImg(fileName)) {
              this.addPrevieImgs(file)
            } else {
              this.commonFiles.push(file)
            }
          }
          if (this.uploadSuccess) {
            this.uploadSuccess(this.uploadResult)
          }
          this.$toast.success('上传成功')
        }).catch((error) => {
          console.log('uploadError', error)
          this.$toast.fail('上传附件失败,原因：' + error.message)
        }).finally(() => {
          this.fileList = []
          this.isDisabled = false
        })
        return true
      }
    },
    // 文件读取完成后的回调函数
    afterRead (file, detail) {
    },
    removeFile (fileCode) {
      if (this.isOnlyView) {
        return
      }
      this.$dialog.confirm({
        message: '您确认要删除该附件吗'
      }).then(() => {
        this.$toast.loading({
          mask: true,
          message: '正在删除，请稍等...'
        })
        deleteFile(fileCode).then((res) => {
          this.removeItemForUploadResult(fileCode)
          this.removeItemForPrevieImgs(fileCode)
          this.$toast.success('删除成功')
        }).catch(() => {

        }).finally(() => {

        })
      }).catch(() => {

      })
    },
    removeItemForUploadResult (fileCode) {
      const serveFile = this.uploadResult.find(item => item.FileCode === fileCode)
      if (serveFile) {
        const index = this.uploadResult.indexOf(serveFile)
        this.uploadResult.splice(index, 1)
      }
    },
    removeItemForPrevieImgs (fileCode) {
      const serveFile = this.previewImgs.find(item => item.FileCode === fileCode)
      if (serveFile) {
        const index = this.previewImgs.indexOf(serveFile)
        this.previewImgs.splice(index, 1)
      }
    },
    addPrevieImgs (serveFile) {
      const that = this
      const timer = setTimeout(function () {
        downloadFile(serveFile.fileCode).then((res) => {
          window.URL = window.URL || window.webkitURL
          const url = window.URL.createObjectURL(res)
          const fileInfo = {
            ...serveFile,
            Url: url
          }
          that.previewImgs.push(fileInfo)
          clearTimeout(timer)
        }).catch(() => {
        })
      }, 200)
    },
    // 下载附件
    downFile (file) {
      downloadFile(file.fileCode).then((res) => {
        saveAs(res, decodeURI(file.fileName))
        // this.openFileOnBrowser(res)
      }).catch(() => {
      })
    },
    /** 在浏览器中打开文件 */
    openFileOnBrowser (file) {
      const objectUrl = URL.createObjectURL(file)
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.setAttribute('style', 'display:none')
      a.setAttribute('href', objectUrl)
      a.setAttribute('target', '_blank')
      a.click()
      setTimeout(() => {
        URL.revokeObjectURL(objectUrl)
        a.remove()
      }, 5000)
    },
    isImg (fileName) {
      const imgTypes = ['png', 'jpg', 'gif', 'bmp']
      let fileType = ''
      const index = fileName.lastIndexOf('.')
      if (index > -1) {
        fileType = fileName.substr(index + 1)
      }
      return imgTypes.includes(fileType)
    },
    viewBigImg (url) {
      this.bigImgs = [url]
      this.isShowBigImg = true
    },
    bigImgClose () {
      this.isShowBigImg = false
    }
  }
}
</script>

<style lang='less' scoped>
.upload-img-result
{
   margin-top: 10px;
   ul {
      width: 100%;
   }
   .item
   {
     margin-left: 14px;
     margin-right: 10px;
     margin-bottom: 10px;
     display: inline-block;
     position: relative;
     border: 1px solid rgb(228, 230, 240);
     width: 100px;
     height: 100px;
     text-align: center;
     img
     {
       width: 80px;
       height: 80px;
       margin-top: 10px;
     }
     .close
     {
        position: absolute;
        right: 0px;
        top:0px;
     }
   }
}

.upload-file-result
{
      padding: 10px 20px;
      li
      {
          height: 30px;
          line-height: 30px;
          a
          {
              display: inline-block;
              color: #9299a0;
          }
          .opeate
          {
             display: inline-block;
             vertical-align: middle;
                margin-left: 20px;
          }
      }
}
</style>
