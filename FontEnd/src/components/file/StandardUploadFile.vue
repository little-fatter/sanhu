<template>
  <a-row>
    <a-col :span="10">
      <a-card :bordered="false" title="文件选择">
        <div class="uploadArea">
          <a-upload
            :accept="accept"
            :fileList="fileList"
            :multiple="multiple"
            :remove="remove"
            :beforeUpload="beforeUpload"
          >
            <a-button type="default">
              <a-icon type="upload"></a-icon>选择文件
            </a-button>
          </a-upload>
          <a-button
            type="default"
            :loading="uploading"
            :disabled="uploadBtnDisabled"
            @click="handleUpload"
            class="uploadBtn"
          >{{ uploadBtnName }}</a-button>
        </div>
      </a-card>
      <a-card :bordered="false" title="已上传文件" class="uploadedFileList">
        <a-list
          itemLayout="horizontal"
          :loading="uploading"
        >
          <a-list-item :key="index" v-for="(item, index) in uploadedFileList">
            <div class="list-content">
              <div class="list-content-item">
                {{ item.fileName }}
              </div>
            </div>
            <div slot="actions">
              <a class="opItem" @click="handlePreview(item)" v-if="isImg(item.fileName)">预览</a>
              <a class="opItem" @click="handleDownFile(item)">下载</a>
              <a class="opItem" @click="handleRemoveFile(item)">删除</a>
            </div>
          </a-list-item>
        </a-list>
      </a-card>
    </a-col>
    <a-col :span="14">
      <a-card :bordered="false" title="图片预览" class="imgView">
        <img :src="selectImgUrl" v-if="isNotEmptyForSelectImgUrl"/>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
/**
 * 标准上传组件
 */
import { isNotEmpty } from '@/utils/util'
import { uploadFileHttp, downfileHttp, postHttp } from '@/utils/apiRequest'
import { saveAs } from 'file-saver'
export default {
  name: 'SUpload',
  props: {
    /** 接受上传的文件类型 比如只能上传图片，可传入"image/*" */
    accept: {
      type: String,
      default: null
    },
    /** 接受的最大文件大小,默认是2M */
    maxFileSize: {
      type: Number,
      default: 2
    },
    /** 是否支持多选文件 */
    multiple: {
      type: Boolean,
      default: false
    },
    /** 已上传附件数组，[{fileName,fileCode}] 可不传 */
    uploadedFileList:
    {
      type: Array,
      default: function () {
        return []
      }
    },
    /** 上传文件地址 */
    uploadFileServerUrl: {
      type: String,
      default: '',
      required: true
    },
    /** 下载文件地址 */
    downloadFileServerUrl: {
      type: String,
      default: '',
      required: true
    },
    /** 删除文件地址 */
    removeFileServerUrl: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      fileList: [],
      uploadedFileListByProps: this.uploadedFileList || [],
      addUploadedFileList: [],
      delUploadedFileList: [],
      uploading: false,
      selectImg: null,
      selectImgUrl: ''
    }
  },
  computed: {
    uploadBtnName: function () {
      return this.uploading ? '正在上传中' : '上传'
    },
    uploadBtnDisabled: function () {
      return this.fileList.length === 0
    },
    isNotEmptyForSelectImgUrl: function () {
      return this.selectImgUrl !== ''
    }
  },
  created () {
  },
  methods: {
    handleUpload () {
      const { fileList } = this
      const formData = new FormData()
      fileList.forEach((file) => {
        formData.append('files[]', file)
      })
      this.uploading = true
      uploadFileHttp({
        url: this.uploadFileServerUrl,
        formData: formData
      }).then((res) => {
        if (res.length > 0) {
          for (const fileInfo of res) {
            this.uploadedFileList.push(fileInfo)
            this.addUploadedFileList.push(fileInfo)
          }
        }
        this.fileList = []
        this.$message.success('上传成功')
      }).catch((error) => {
        this.$message.error(`上传失败,原因:${error}`)
      }).finally(() => {
        this.uploading = false
      })
    },
    handlePreview (fileInfo) {
      this.selectImg = fileInfo
      if (!isNotEmpty(this.selectImg)) {
        this.selectImgUrl = ''
      } else {
        this.selectImgUrl = this.downloadFileServerUrl + '?fileCode=' + this.selectImg.fileCode
      }
    },
    handleDownFile (fileInfo) {
      this.uploading = true
      downfileHttp({
        url: this.downloadFileServerUrl,
        params: {
          fileCode: fileInfo.fileCode
        }
      }).then((res) => {
        saveAs(res, decodeURI(fileInfo.fileName))
        this.$message.success('下载成功')
      }).catch(error => {
        this.$message.error(`下载失败,原因:${error}`)
      }).finally(() => {
        this.uploading = false
      })
    },
    handleRemoveFile (fileInfo) {
      this.uploading = true
      postHttp({
        url: this.removeFileServerUrl,
        params: {
          fileCode: fileInfo.fileCode
        }
      }).then((res) => {
        this.uploadedFileList = this.removeFileByArray(this.uploadedFileList, fileInfo)
        this.addUploadedFileList = this.removeFileByArray(this.addUploadedFileList, fileInfo)

        const index = this.getIndexByArray(this.uploadedFileListByProps, fileInfo)
        if (index > -1) {
          this.delUploadedFileList.push(fileInfo)
        }
        const selectImg = this.selectImg
        if (selectImg && selectImg.fileCode === fileInfo.fileCode) {
          this.selectImg = null
          this.selectImgUrl = ''
        }
        this.$message.success('删除成功')
      }).catch((error) => {
        this.$message.error(`下载失败,原因:${error}`)
      }).finally(() => {
        this.uploading = false
      })
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

    getIndexByArray (array, fileInfo) {
      let index = -1
      for (var i = 0; i < array.length; i++) {
        if (array[i].fileCode === fileInfo.fileCode) {
          index = i
          break
        }
      }
      return index
    },
    removeFileByArray (array, fileInfo) {
      const index = this.getIndexByArray(array, fileInfo)
      if (index > -1) {
        array.splice(index, 1)
      }
      return array
    },
    beforeUpload (file) {
      const fileSize = file.size / 1024 / 1024
      if (fileSize > this.maxFileSize) {
        this.$message.error(`最大只能上传${this.maxFileSize}M的文件`)
      } else {
        this.fileList = [...this.fileList, file]
      }
      return false
    },
    remove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    /**
     * 获取操作结果
     */
    getUploadResult () {
      const uploadResult = {
        addUploadedFileList: this.addUploadedFileList,
        delUploadedFileList: this.delUploadedFileList
      }
      return uploadResult
    }
  }
}
</script>

<style lang='less' scoped>
.ant-list-item-action
{
    .opItem {
        margin-right: 10px
    }
}
.uploadedFileList
{
   .ant-card-body
   {
       padding: 0px !important;
   }
}

.imgView
{
    img {
        width:600px;
        height: 300px;
    }
}

.uploadArea
{
    position: relative;
    .uploadBtn
    {
      position: absolute;
      right:0px;
      top: 0px;
    }
}

</style>
