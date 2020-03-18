<!--结案详情 报告-->
<template>
  <div class="ClosingReport">
    <van-cell-group>
      <van-cell title="案件号" :value="caseInfo.CaseNumber"></van-cell>
      <van-cell title="案件类型" :value="caseInfo.CaseType"></van-cell>
      <van-cell title="案由" :value="caseInfo.CauseOfAction"></van-cell>
      <party-info-view :initData="penalizeBook.LawParties"></party-info-view>
      <van-field
        v-model="caseFinalReport.CaseDetail"
        rows="2"
        autosize
        label="简要案情及调查经过"
        type="textarea"
        required
        :rules="requiredRule"
      />
      <van-field
        v-model="penalizeBook.BookTitle"
        label="处罚决定"
        :readonly="true"
      >
        <van-icon name="arrow" color="#1989fa" slot="right-icon" @click="handelViewPenalizeBook" size="25" />
      </van-field>
      <van-cell title="执行情况" value="已执行"></van-cell>
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
      dataInfo: {}
    }
  },
  methods: {
    // 页面数据
    initPage () {
      // 请求现场巡查详情
      getFormsDetailByEventInfoId(this.EventInfoId, FromType.caseReport).then(res => {
        if (res) {
          console.log(res)

          // this.loadData = res.MainForm
          // this.Partys = res.law_party
          // this.eventFile = res.attachment // 附件
          // getDetaildata('event_info', this.EventInfoId).then(res => {
          //   if (res) {
          //     this.eventInfo = res
          //   }
          // })
        }
      })
    }
  },
  created () {
    this.EventInfoId = this.$route.query.ID // 事件ID
    this.initPage()
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
</style>
