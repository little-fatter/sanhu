<!--询问第三人笔录 PDF展示页面-->
<template>
  <div class="">
    <h1>第三人</h1>
    <PdfShow ref="pdf" :fileUrl="PdfFileUrl" :fileName="PdfFileName">
    </PdfShow>
  </div>
</template>

<script>
import PdfShow from '../../../components/business/PDFPreview'
import { getFormsDetailByEventInfoIdPdf } from '../../../api/regulatoryApi'
export default {
  components: {
    PdfShow
  },
  data () {
    return {
      PdfFileUrl: '', // PDF 文件路径
      PdfFileName: '', // PDF 文件名称
      FormID: '', // 表单id
      FormType: '' // 表单类型
    }
  },

  methods: {
    // 获取表单详情
    getFormInfo () {
      getFormsDetailByEventInfoIdPdf(this.FormID, this.FormType)
        .then((res) => {
          this.PdfFileUrl = res // PDF 文件路径
          this.PdfFileName = this.FormType
        })
    }
  },

  mounted () {
    this.FormID = this.$route.query.msg.FormID // 表单ID
    this.FormType = this.$route.query.msg.FormType // 表单类型
    this.getFormInfo()
  }
}
</script>
<style  scoped>

</style>
