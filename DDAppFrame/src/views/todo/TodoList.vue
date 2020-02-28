<template>
  <div>
    <PDF-Preview :fileUrl="pdfUrl" :fileNmae="fileName"></PDF-Preview>
  </div>
</template>

<script>
import PDFPreview from '../../components/business/PDFPreview'
export default {
  name: 'TodoList',
  components: {
    PDFPreview
  },
  data () {
    return {
      pdfUrl: './img/temp/Taxamount.pdf',
      fileName: '测试文件'
    }
  },
  created () {

  },
  methods: {
  }
}
</script>

<style lang="less" scoped>

</style>
