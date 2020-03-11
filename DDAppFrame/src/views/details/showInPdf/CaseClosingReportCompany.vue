<!--行政处罚结案报告企业 PDF展示页面-->
<template>
  <div class="">
    <PdfShow ref="pdf" :fileUrl="PdfFileUrl" :fileName="PdfFileName">

    </PdfShow>
  </div>
</template>

<script>
import PdfShow from '../../../components/business/PDFPreview'
export default {
  components: {
    PdfShow
  },
  data () {
    return {
      PdfFileUrl: 'TestPdfFileUrl', // PDF 文件路径
      PdfFileName: 'TestPdfFileName', // PDF 文件名称
      FormID: '', // 表单id
      Model: '' // 模型名称
    }
  },

  methods: {

  },

  mounted () {
    // this.$route.query.id 准备接受传过来的参数
  }
}
</script>
<style  scoped>

</style>
