<template>
  <div class="uploadArea">
    <a-upload
      :accept="accept"
      :fileList="fileList"
      :disabled="uploading"
      :showUploadList="false"
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
</template>

<script>
/**
 * 导入文件组件，一般用于Excel导入
 */
import { uploadFileHttp } from '@/utils/apiRequest'
export default {
  name: 'ImportFile',
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
    /** 上传文件地址 */
    uploadFileServerUrl: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      fileList: [],
      uploading: false
    }
  },
  computed: {
    uploadBtnName: function () {
      return this.uploading ? '正在上传中' : '上传'
    },
    uploadBtnDisabled: function () {
      return this.fileList.length === 0
    }
  },
  methods: {
    beforeUpload (file) {
      console.log('file', file)
      const fileSize = file.size / 1024 / 1024
      if (fileSize > this.maxFileSize) {
        this.$message.error(`最大只能上传${this.maxFileSize}M的文件`)
      } else {
        this.fileList = [...this.fileList, file]
      }
      return false
    },
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
        this.fileList = []
        this.$message.success('上传成功')
      }).catch((error) => {
        this.$message.error(`上传失败,原因:${error}`)
      }).finally(() => {
        this.uploading = false
      })
    }
  }
}
</script>

<style lang='less' scoped>
.uploadArea
{
    .uploadBtn
    {
        margin-left: 10px;
    }
}
</style>
