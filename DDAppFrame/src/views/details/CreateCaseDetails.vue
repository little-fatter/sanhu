<!--//立案详情-->
<template>
  <div class="CreateCase">
    <van-cell title="案由" :value="loadData.CauseOfAction" />
    <van-cell title="案件类型" :value="loadData.caseType" />
    <van-cell title="案件来源" :value="loadData.sourceOfCase" />
    <van-cell title="适用程序" :value="loadData.ApplicableProcedure" />
    <van-cell title="事发时间" :value="loadData.IncidentTime" />
    <van-cell title="事发地点" :value="loadData.IncidentAddress" />
    <PartyInfoView :initData="partyInfoData"></PartyInfoView>
    <van-cell title="协办人" :value="loadData.CoOrganizer" />
    <van-cell>
      <van-button type="info" native-type="submit" size="large" @click="returnSubmitForm">返回</van-button>
    </van-cell>
  </div>
</template>

<script>
import PartyInfoView from '../../components/business/PartyInfoView.vue'
import {
  getPageDate,
  getDetialdataByEventInfoId,
  getDetaildata,
  getDetialdataByfilter
} from '../../api/regulatoryApi'
export default {
  name: 'CreateCaseDetails',
  components: {
    PartyInfoView
  },
  props: {},
  data () {
    return {
      loadData: {
        IllegalCause: '污染水系',
        caseType: '不知道的类型',
        sourceOfCase: '公众号举报',
        applicableProcedure: '适用于中华人民共和国污染防治法第三条',
        eventTime: '2018-02-03',
        eventAddress: '云南省玉溪市澄江县抚仙湖',
        CauseOfAction: '污染水系',
        CauseOfAction: '污染水系'
      },
      partyInfo: [],
      partyInfoData: [
        {
          partyType: 1,
          name: '小貂蝉',
          company: '前端工程师',
          nation: '汉族',
          sex: 1,
          idCard: '5113026155355X',
          address: '成都市武侯区',
          phone: 13629091535
        },
        {
          partyType: 2,
          name: '成都建投',
          legalName: '张大千',
          idCard: '5113026155355X',
          address: '成都市武侯区',
          tel: 13629091535
        }
      ],
      person: '小貂蝉'
    }
  },
  watch: {},
  computed: {},
  methods: {
    returnSubmitForm () {
      this.$router.go(-1)
    },
    init () {

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
