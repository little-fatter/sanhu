<!--结案详情 报告-->
<template>
  <div class="ClosingReport">
    <van-cell-group>
      <van-cell >
        <h5>结案报告 未完结</h5>
      </van-cell>
      <van-cell title="案件号" :value="caseInfo.CaseNumber"></van-cell>
      <van-cell title="案件类型" :value="caseInfo.CaseType"></van-cell>
      <van-cell title="案由" :value="caseInfo.CauseOfAction"></van-cell>
      <van-cell title="简要案情及调查经过" :value="initData.CaseDetail"></van-cell>
      <van-cell title="处罚决定" value="查看《处罚决定书》" @click=""></van-cell>
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

<script>
import PartyInfoView from '../../components/business/PartyInfoView'
import { isNotEmpty } from '../../utils/util'
import { getFormsDetailByEventInfoId, getDetaildata, FromType } from '../../api/regulatoryApi'
export default {
  name: 'ClosingReportDetail',
  components: {
    PartyInfoView
  },
  data () {
    return {
      FormID: '',
      initData: {}, // 基本数据
      caseInfo: {}, // 案件基本信息
      law_party: [], // 当事人
      attachment: [] // 附件
    }
  },
  methods: {
    // 页面数据
    initPage () {
      getDetaildata(FromType.caseReport, this.FormID).then(res => {
        console.log(res)
        this.initData = res
        getFormsDetailByEventInfoId(null, FromType.caseDetails, res.CaseId, ['casedetail']).then(res => {
          if (isNotEmpty(res)) {
            console.log(res)
            this.caseInfo = res.MainForm
            this.law_party = res.law_party
            this.attachment = res.attachment
          }
        })
        getDetaildata(FromType.PromptlyPunishNote, res.PunishmentId).then(res => {
          console.log(7777777777777777777777777777, res)
        })
      })
    }
  },
  created () {
    this.FormID = this.$route.query.ID // 事件ID
    this.initPage()
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
.van-cell__title{
  color: #323232 !important;
}
</style>
