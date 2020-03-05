<template>
  <div class="ClosingReport">
    <van-cell-group>
      <van-cell title="案由" :value="loadData.CauseOfAction"></van-cell>
      <van-cell title="案件来源" :value="loadData.sourceOfCase"></van-cell>
      <van-cell-group :title="`${title}信息`">
        <van-panel v-for="(item,index) in partys" :key="index" :title="`${title}(${index+1})`">
          <template v-if="item.partyType==1">
            <van-cell :title="item.title"></van-cell>
            <van-cell title="身份证" :value="item.IDcard"></van-cell>
            <van-cell title="手机号" :value="item.Contactnumber"></van-cell>
            <van-cell title="现住址" :value="item.address"></van-cell>
            <van-cell title="民族" :value="item.Nationality"></van-cell>
            <van-cell title="工作单位" :value="item.WorkUnit"></van-cell>
          </template>
          <template v-else>
            <van-cell :title="item.Name"></van-cell>
            <van-cell title="法人姓名" :value="item.Nameoflegalperson"></van-cell>
            <van-cell title="法人身份证" :value="item.IDcard"></van-cell>
            <van-cell title="地址" :value="item.address"></van-cell>
            <van-cell title="联系电话" :value="item.Contactnumber"></van-cell>
          </template>
        </van-panel>
      </van-cell-group>
      <van-cell title="简要案情及调查经过" :value="loadData.caseInvestigation"></van-cell>
      <PenaltyDecisionView :initData="punishmentInfo"></PenaltyDecisionView>
      <van-cell class="contentFrom">
        <span>关联表单</span>
        <span style="margin-left:20px;">
          <svg
            t="1582606760517"
            class="icon"
            viewBox="0 0 1000 1000"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5583"
            width="20"
            height="20"
          >
            <path
              d="M546.133333 520.533333l59.733334-59.733333 21.333333 21.333333 115.2-115.2-119.466667-119.466666-115.2 115.2 4.266667 8.533333-59.733333 59.733333L384 358.4 614.4 128l243.2 243.2-230.4 230.4-81.066667-81.066667z m-115.2-68.266666L371.2 512l-8.533333-8.533333-115.2 115.2 119.466666 119.466666 115.2-115.2-21.333333-21.333333 59.733333-59.733333 81.066667 81.066666L371.2 853.333333 128 614.4 358.4 384l72.533333 68.266667zM571.733333 341.333333l59.733334 59.733334-230.4 230.4L341.333333 571.733333 571.733333 341.333333z"
              fill="#8a8a8a"
              p-id="5584"
            />
          </svg>
          {{ loadData.contentForm }}
        </span>
      </van-cell>
      <van-cell title="执行情况" :value="loadData.CaseDescription"></van-cell>
      <van-cell title="案件详情" :value="CaseDetail"></van-cell>
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
      loadData: {},
      CaseDetail: '',
      title: '当事人',
      partyInfo: [],
      // 当事人数据
      HandlePartys: [
        {
          partyType: 1,
          Name: '张三',
          Gender: 2,
          Nationality: '汉族',
          IDcard: 12345646513135,
          job: '前端开发人员',
          Contactnumber: 163465131,
          address: '四川成都'
        },
        {
          partyType: 2,
          Name: '成都市建投集团',
          Nameoflegalperson: '张亚楠',
          IDcard: 12345646513135,
          Contactnumber: 163465131,
          address: '四川成都'
        }
      ],
      partys: [], // 处理后的数据
      // 处罚决定
      PenaltyDecision: [
        { decisionType: 1, amount: 20, paymentDesc: 1 },
        { decisionType: 2, amount: 20, paymentDesc: 2 }
      ],
      punishmentInfo: []
    }
  },
  watch: {},
  computed: {},
  methods: {
    returnSubmitForm () {
      this.$router.go(-1)
    },
    initData () {
      const partys = []
      this.partyInfo.forEach(item => {
        if (item.partyType === 1) {
          var Gender = item.Gender === 1 ? '男' : '女'
          var title = `${item.Name} | ${Gender}`
          item.title = title
        }
        partys.push(item)
      })
      this.partys = partys
      console.log(this.partys)
    },
    // 获取页面数据
    init() {
     const queryParam = this.$route.query
      const id = queryParam.id
      console.log(id);
      
      // getDetaildata("case_Info", id).then(res => {
      //   this.loadData = res;
      //   console.log(this.loadData);
      // });
      // getDetaildata("law_punishmentInfo", id).then(res => {
      //   this.punishmentInfo.push(res) ;
      //   console.log(this.punishmentInfo);
      // });
      // getDetialdataByEventInfoId("law_party", EventInfoId).then(res => {
      //   this.partyInfo.push(res);
      //   console.log(this.partyInfo);
      // });
    }
  },
  created () {
    this.initData()
    this.init()
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
</style>
