<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-09 17:32:32
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-17 14:42:21
 * @Description:  PDF面板组件
 -->

<template>
  <div class="pdf-panel">
    <div class="pdf-panel-container">
      <div class="pdf-panel-body" ref="pdfWrap">
        <pdf ref="pdf" :page="1" :src="pdfUrl" @num-pages="pageCount = $event" />
        <template v-if="pageCount > 1">
          <template v-for="item in (pageCount - 1)">
            <pdf
              v-if="item <= maxPage"
              :key="item"
              :page="item + 1"
              :src="pdfUrl" />
          </template>
        </template>
      </div>
      <div class="pdf-panel-file" v-if="files.length">
        <file-review :files="files" :showImgCount="3" />
      </div>
      <div class="pdf-panel-action">
        <span>
          <a-button type="primary" icon="save" ghost @click="handleConsole">打印PDF</a-button>
          <a-button type="primary" icon="download" ghost @click="handleDownload">下载PDF</a-button>
        </span>
        <span>
          <a-button type="primary" class="service-btn" @click="handleService">送达</a-button>
          <a-button type="primary" @click="handleForward">转发</a-button>
        </span>
      </div>
    </div>
    <!-- <select-people ref="selectPeopleModal" /> -->
  </div>
</template>

<script>
import moment from 'moment'
import Pdf from 'vue-pdf'
import FileReview from '@/components/file/FileReview'
import appConfig from '@/config/app.config'
// import SelectPeople from './SelectPeople'
import { downloadFile } from '@/utils/util'

export default {
  components: {
    Pdf,
    FileReview
    // SelectPeople
  },
  props: {
    // pdf文件路径
    pdf: {
      type: String,
      default: ''
    },
    // 文件列表
    files: {
      type: Array,
      default: () => []
    },
    // pdf显示的最大页数
    maxPage: {
      type: Number,
      default: 5
    },
    // pdf下载文件名
    pdfName: {
      type: String,
      default: moment().format('YYYY年MM月DD日')
    }
  },
  data () {
    return {
      pageCount: 0
    }
  },
  computed: {
    pdfUrl () {
      console.log(`${appConfig.pdfHost}/${this.pdf}`)
      return Pdf.createLoadingTask(`${appConfig.pdfHost}/${this.pdf}`)
    }
  },
  methods: {
    // 打印
    handleConsole () {
      this.$nextTick(() => {
        // if (this.pageCount > 100) return this.$message.info('当前pdf超过100页，网页打印会有严重的性能问题')
        this.$refs.pdf.print()
      })
      this.$emit('on-console')
    },
    // 下载pdf
    async handleDownload () {
      downloadFile({ url: this.pdfUrl, name: this.pdfName })
      this.$emit('on-download')
    },
    // 送达
    handleService () {
      this.$emit('on-searvice')
    },
    // 转发
    handleForward () {
      this.$emit('on-forward')
      // this.$refs.selectPeopleModal.open()
    }
  }
}
</script>

<style scoped lang="less">
.pdf-panel {
  background-color: #FFFFFF;
  border-radius: 8px;
  &-container {
    width: 944px;
    margin: auto;
    padding: 40px 0;
  }
  &-body, &-file {
    overflow: hidden;
    padding: 0 20px;
    margin-bottom: 10px;
    border: 1px solid #DCDEE2;
    border-radius: 8px;
  }
  &-action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
    & > span:first-child {
      & > * {
        margin-right: 10px;
      }
    }
    & > span:last-child {
      & > * {
        margin-left: 10px;
      }
    }
  }
}
// 送达
.service-btn {
  background-color: #1FC08E;
  border-color: #1FC08E;
}
</style>
