<!--结案报告 PDF展示页面-->
<template>
  <div class="">
    <template v-if="showPdf">
      <PdfShow ref="pdf" :fileUrl="PdfFileUrl" :fileName="PdfFileName"></PdfShow>
    </template>
    <template v-else>
      <div class="ClosingReport">
        <van-cell-group>
          <van-cell >
            <h5>结案报告</h5>
          </van-cell>
          <van-cell title="案件号" :value="caseInfo.CaseNumber"></van-cell>
          <van-cell title="案件类型" :value="caseInfo.CaseType"></van-cell>
          <van-cell title="案由" :value="caseInfo.CauseOfAction"></van-cell>
          <van-cell title="简要案情及调查经过" :value="initData.CaseDetail"></van-cell>
          <van-cell title="处罚决定" :value="`${Punishment.PunishmentTitle} 点击查看详情`" @click="goPunishment(Punishment.ID)"></van-cell>
          <van-cell title="执行情况" :value="initData.ExecuteState"></van-cell>
        </van-cell-group>
        <van-cell-group style="margin-top:0.3rem">
          <van-cell>
            <h5>当事人信息</h5>
          </van-cell>
          <van-cell>
            <party-info-view :initData="law_party"></party-info-view>
          </van-cell>
        </van-cell-group>
      </div>
    </template>
  </div>
</template>

<script>
import PdfShow from '../../../components/business/PDFPreview'
import PartyInfoView from '../../../components/business/PartyInfoView'
import { getFormsDetailByEventInfoId, getDetaildata, getFormsDetailByEventInfoIdPdf, FromType } from '../../../api/regulatoryApi'
export default {
  components: {
    PdfShow,
    PartyInfoView
  },
  data () {
    return {
      PdfFileUrl: '', // PDF 文件路径
      PdfFileName: '', // PDF 文件名称
      FormID: '', // 表单id
      initData: {}, // 基本数据
      caseInfo: {}, // 案件基本信息
      law_party: [], // 当事人
      attachment: [], // 附件
      Punishment: {}, // 处罚决定
      showPdf: false
    }
  },

  methods: {
    // 页面数据
    initPage () {
      getDetaildata(FromType.caseReport, this.FormID).then(res => {
        if (res.FormState === '完结') {
          this.showPdf = true
          getFormsDetailByEventInfoIdPdf(this.FormID, FromType.caseReport)
            .then((res) => {
              this.PdfFileUrl = res // PDF 文件路径
              this.PdfFileName = this.FormType
            })
        } else {
          this.showPdf = false
          this.initData = res
          getFormsDetailByEventInfoId(null, FromType.caseDetails, res.CaseId, ['casedetail']).then(res => {
            this.caseInfo = res.MainForm
            this.law_party = res.law_party
            this.attachment = res.attachment
          })
          getDetaildata(FromType.PromptlyPunishNote, res.PunishmentId).then(res => {
            this.Punishment = res
          })
        }
      })
    },
    // 去 处罚决定PDF
    goPunishment (id) {
      this.$router.push({
        path: '/PromptlyPunishNote', query: { ID: id }
      })
    }
  },
  created () {
    this.FormID = this.$route.query.ID // 事件ID
    this.initPage()
  },
  mounted () {

  }
}
</script>
<style  scoped>
.van-cell__title{
  color: #323232 !important;
}
</style>
