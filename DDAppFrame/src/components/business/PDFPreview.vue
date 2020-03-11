<template>
  <div>
    <div class="pdf-wapper">
      <pdf
        ref="pdf"
        :src="fileUrl">
      </pdf>
      <slot></slot>
    </div>

    <div class="operate-area-center">
      <van-button
        icon="desktop-o"
        type="default"
        size="small"
        native-type="button"
        class="item">
        云打印
      </van-button>
      <van-button
        icon="down"
        type="default"
        size="small"
        native-type="button"
        class="item"
        @click="pdfDownload">
        下载
      </van-button>
      <van-button icon="idcard" type="default" native-type="button" size="small" class="item">
        送达
      </van-button>
      <van-button icon="share" type="default" native-type="button" size="small" class="item">
        转发
      </van-button>
      <van-button icon="balance-pay" type="default" native-type="button" size="small" class="item">
        收缴
      </van-button>
    </div>
  </div>
</template>

<script>
/**
 * PDF预览组件
 */
import pdf from 'vue-pdf'
import { saveAs } from 'file-saver'
export default {
  name: 'PDFPreview',
  components: {
    pdf
  },
  props: {
    /**
     * 文件地址
     */
    fileUrl: {
      type: String,
      default: '',
      required: true
    },
    /**
     * 文件名称
     */
    fileName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  created () {

  },
  methods: {
    pdfPrint () {
      this.$refs.pdf.print()
    },
    pdfDownload () {
      saveAs(this.fileUrl)
    }
  }
}
</script>

<style lang="less" scoped>
.pdf-wapper
{
   width: 100%;
   height: 100%;
}
.operate-area-center
{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin-top: 10px;
  background-color: #ffffff;
  border: 1px solid #ebedf0;
  text-align: center;
   .van-button
   {
      display: inline-block;
      margin-right: 5px;
   }
}
</style>
