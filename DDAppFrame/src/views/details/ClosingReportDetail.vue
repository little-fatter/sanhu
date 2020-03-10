<!--结案详情 报告-->
<template>
  <div class="ClosingReport">
    <van-cell-group>
      <van-cell title="案由" :value="caseInfo.CauseOfAction"></van-cell>
      <van-cell title="案件来源" :value="caseInfo.sourceOfCase"></van-cell>
      <!-- 当事人 -->
      <PartyInfoView :initData="partyInfo"></PartyInfoView>
      <van-cell title="简要案情及调查经过" :value="caseInfo.CaseDescription"></van-cell>
      <!-- 处罚决定 -->
      <PenaltyDecisionView :initData="punishmentInfo"></PenaltyDecisionView>
      <van-cell title="执行情况" :value="closeCaseInfo.ExecuteState"></van-cell>
      <van-cell title="案件详情" :value="closeCaseInfo.CaseDetail"></van-cell>
      <van-cell>
        <van-button type="info" native-type="submit" size="large" @click="returnSubmitForm">返回</van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import PenaltyDecisionView from '../../components/business/PenaltyDecisionView.vue'
import PartyInfoView from '../../components/business/PartyInfoView'
import {
  isNotEmpty,
  formatDate,
  isEmpty,
  getQueryConditon
} from '../../utils/util'
import {
  getPageDate,
  getDetialdataByEventInfoId,
  getDetaildata,
  getDetialdataByfilter
} from '../../api/regulatoryApi'
export default {
  name: 'ClosingReportDetail',
  components: {
    PenaltyDecisionView,
    PartyInfoView
  },
  props: {},
  data () {
    return {
      closeCaseInfo: {}, // 案件基本信息
      caseInfo: {}, // 案件信息
      punishmentInfo: [], // 处罚信息
      title: '当事人',
      partyInfo: [] // 当事人数据
      // HandlePartys: [
      //   {
      //     partyType: 1,
      //     Name: "张三",
      //     Gender: 2,
      //     Nationality: "汉族",
      //     IDcard: 12345646513135,
      //     job: "前端开发人员",
      //     Contactnumber: 163465131,
      //     address: "四川成都"
      //   },
      //   {
      //     partyType: 2,
      //     Name: "成都市建投集团",
      //     Nameoflegalperson: "张亚楠",
      //     IDcard: 12345646513135,
      //     Contactnumber: 163465131,
      //     address: "四川成都"
      //   }
      // ],
      // partys: [], // 处理后的数据
      // // 处罚决定
      // PenaltyDecision: [
      //   { decisionType: 1, amount: 20, paymentDesc: 1 },
      //   { decisionType: 2, amount: 20, paymentDesc: 2 }
      // ],
    }
  },
  watch: {},
  computed: {},
  methods: {
    returnSubmitForm () {
      this.$router.go(-1)
    },
    // 获取页面数据
    init () {
      const queryParam = this.$route.query
      const id = queryParam.id
      // 获取结案报告基本信息
      getDetaildata('case_report', id).then(res => {
        if (isNotEmpty(res)) {
          this.closeCaseInfo = res
          this.loadCaseInfo(res.CaseId)
          // 当事人信息
          if (isNotEmpty(res.LawPartyIds)) {
            getDetaildata(res.LawPartyIds, 'law_party').then(res => {
              if (res) {
                this.partyInfo.push(res)
              }
            })
          }
          // 处罚信息
          if (isNotEmpty(res.PunishmentId)) {
            getDetaildata(res.PunishmentId, 'law_punishmentInfo').then(res => {
              if (res) {
                this.punishmentInfo.push(res)
              }
            })
          }
        }
      })
    },
    // 获取案件基本信息
    loadCaseInfo (caseID) {
      getDetaildata('case_Info', caseID).then(res => {
        this.caseInfo = res
      })
    }
  },
  created () {
    this.init()
  },
  mounted () {},
  activated () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
</style>
