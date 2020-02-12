<template>
  <a-button type="primary" :loading="isLoading" @click="handleDownFile" v-if="controlType==1">
    {{ showTitle }}
  </a-button>
  <a v-else @click="handleDownFile">{{ showALinkTitle }}</a>
</template>

<script>
/**
 * 下载文件组件
 */
import { saveAs } from 'file-saver'
import { downfileHttp } from '@/utils/apiRequest'
export default {
  name: 'DownFile',
  props: {
    /** 下载地址 */
    url: {
      type: String,
      default: '',
      required: true
    },
    /** URL请求参数 */
    params: {
      type: Object,
      default: null
    },
    /** 下载文件显示名 */
    fileName: {
      type: String,
      default: '',
      required: true
    },
    /** 文件类型(如服务端返回了文件类型，可不指定),比如:'.xlsx', '.docx', '.pptx', '.pdf' */
    fileType: {
      type: String,
      default: null
    },
    /** 操作类型，1表示文件下载，2表示浏览器中打开 */
    opeateType: {
      type: Number,
      default: 1
    },
    /** 下载控件的显示名称 */
    showTitle: {
      type: String,
      default: '下载附件'
    },
    /** 控件类型 1表示Button 2表示a标签 */
    controlType: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    showALinkTitle: function () {
      return this.isLoading ? '正在下载,请稍等...' : this.showTitle
    }
  },
  methods: {
    // 下载附件
    handleDownFile () {
      this.isLoading = true
      downfileHttp({
        url: this.url,
        params: this.params,
        mimeType: this.fileType
      }).then(res => {
        console.log('res', res)
        if (!res) {
          this.$message.error('下载失败', 1)
        }
        if (this.opeateType === 1) {
          saveAs(res, decodeURI(this.fileName))
          this.$message.success('下载成功')
        } else {
          this.openFileOnBrowser(res)
        }
      }).catch(() => {
      })
        .finally(() => {
          this.isLoading = false
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
    }
  }
}
</script>

<style lang='less' scoped>

</style>
