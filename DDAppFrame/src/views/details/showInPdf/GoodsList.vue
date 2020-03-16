<!--没收物品清单 PDF展示页面-->
<template>
  <div class="">
    <!-- <PdfShow ref="pdf" :fileUrl="PdfFileUrl" :fileName="PdfFileName">
    </PdfShow> -->
  </div>
</template>

<script>
import PdfShow from '../../../components/business/PDFPreview'
import { getFormsDetailByEventInfoId } from '../../../api/regulatoryApi'
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
    // 获取表单详情
    getFormInfo () {
      // getFormsDetailByEventInfoId(null, 'form_confiscated_item', this.FormID, null).then((res) => {
      //   console.log(res.MainForm, 123456789)
      //   // this.lawPartyInfoL = res.Rows
      // })
      getFormsDetailByEventInfoId(
        null,
        'form_printPDF',
        { 'formId': this.FormID, 'formType': 'form_confiscated_item' },
        null)
        .then((res) => {
          console.log(res.MainForm, 6666666666666666666666666666666666666)
        // this.lawPartyInfoL = res.Rows
        })
    }
  },

  mounted () {
    this.FormID = this.$route.query.id // 准备接受传过来的参数
    this.getFormInfo()
  }
}
</script>
<style  scoped>

</style>
