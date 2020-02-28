<template>
  <div class="ClosingReport">
    <van-cell-group>
      <van-cell title="案由" value="1235"></van-cell>
      <van-cell title="案件来源" value="网上举报"></van-cell>
      <van-cell-group title="当事人">
        <van-panel v-for="(item,index) in partys" :key="index" :title="`当事人(${index+1})`">
          <template v-if="item.partyType==1">
            <van-cell>
              <p>{{ item.name }} | {{ item.sex }} | {{ item.age }} | {{ item.job }}</p>
              <p>身份证：{{ item.id }}</p>
              <p>电话：{{ item.phone }}</p>
              <p>地址：{{ item.address }}</p>
            </van-cell>
          </template>
          <template v-else>
            <van-cell>
              <p>{{ item.name }}</p>
              <p>法人姓名:{{ item.legalName }} | {{ item.idCard }}</p>
              <p>电话：{{ item.phone }}</p>
              <p>地址：{{ item.address }}</p>
            </van-cell>
          </template>
        </van-panel>
      </van-cell-group>
      <van-cell title="简要案情及调查经过" value="简要案情及调查经过"></van-cell>
      <PenaltyDecisionView :initData="PenaltyDecision"></PenaltyDecisionView>
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
          </svg> 李四提交的笔录
        </span>
      </van-cell>
      <van-cell title="执行情况" value="简要案情及调查经过"></van-cell>
      <van-cell title="案件详情" value="http://url.cn"></van-cell>
      <van-cell>
        <van-button type="info" native-type="submit" size="large" @click="returnSubmitForm">返回</van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import PenaltyDecisionView from '../../components/business/PenaltyDecisionView.vue'
export default {
  name: '',
  components: {
    PenaltyDecisionView
  },
  props: {},
  data () {
    return {
      // 当事人数据
      HandlePartys: [
        {
          partyType: 1,
          name: '张三',
          sex: 1,
          age: 18,
          id: 12345646513135,
          job: '前端开发人员',
          phone: 163465131,
          address: '四川成都'
        },
        {
          partyType: 2,
          name: '成都市建投集团',
          legalName: '张亚楠',
          idCard: 12345646513135,
          phone: 163465131,
          address: '四川成都'
        }
      ],
      partys: [], // 处理后的数据
      // 处罚决定
      PenaltyDecision: [{ decisionType: 1, amount: 20, paymentDesc: 1 }, { decisionType: 2, amount: 20, paymentDesc: 2 }]
    }
  },
  watch: {},
  computed: {},
  methods: {
    init () {
      const partys = []
      this.HandlePartys.forEach(item => {
        if (item.partyType === 1) {
          var sex = item.sex === 1 ? '男' : '女'
          var title = `${item.name} | ${sex}`
          item.title = title
        }
        partys.push(item)
      })
      this.partys = partys
    },
    returnSubmitForm () {
      this.$router.go(-1)
    }
  },
  created () {
    this.init()
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
</style>
