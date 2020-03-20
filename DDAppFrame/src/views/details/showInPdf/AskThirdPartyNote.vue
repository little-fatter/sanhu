<!--询问第三人笔录 PDF展示页面-->
<template>
  <div class="">
    <PdfShow ref="pdf" :fileUrl="PdfFileUrl" :fileName="PdfFileName">
    </PdfShow>
  </div>
</template>

<script>
import PdfShow from '../../../components/business/PDFPreview'
import { getFormsDetailByEventInfoIdPdf, FromType } from '../../../api/regulatoryApi'
export default {
  components: {
    PdfShow
  },
  data () {
    return {
      PdfFileUrl: '', // PDF 文件路径
      PdfFileName: '', // PDF 文件名称
      FormID: '' // 表单id
    }
  },

  methods: {
    // 获取表单详情
    getFormInfo () {
      getFormsDetailByEventInfoIdPdf(this.FormID, FromType.AskThirdPartyNote)
        .then((res) => {
          this.PdfFileUrl = res // PDF 文件路径
          this.PdfFileName = this.FormType
        })
    }
  },
  created () {
    this.FormID = this.$route.query.id // 表单ID
    this.getFormInfo()
  },
  mounted () {

  }
}
</script>
<style  scoped>

</style>
