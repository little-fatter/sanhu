<template>
  <div class="CaseDetail">
    <van-cell-group>
      <van-cell class="topHeader">
        <van-row>
          <van-col span="20">案〔2020〕3206号</van-col>
          <van-col span="4">
            <van-button type="default" size="mini">已结案</van-button>
          </van-col>
        </van-row>
      </van-cell>
      <van-cell>违法使用泡沫制品简易浮动设施载人入湖</van-cell>
      <van-cell>案件类型：XXXXXX</van-cell>
      <van-cell>适用程序：一般程序</van-cell>
      <van-cell>
        当事人：王五 152485465635
        610104125455258898
      </van-cell>
      <van-cell>事发时间：2020-02-17 17:06:26</van-cell>
      <van-cell>事发时间：2020-02-17 17:06:26</van-cell>
      <van-cell>事发地点：澄江县XX路10号</van-cell>
      <van-cell>处罚决定书文号：玉抚管罚决字〔2020〕4006号</van-cell>
      <van-cell>处罚种类：罚款</van-cell>
      <van-cell>执行情况：已执行</van-cell>
      <van-cell>立案日期：2020/02/01</van-cell>
      <van-cell>结案日期：2020/1/1</van-cell>
      <van-cell>办案人员：王五（18022330404）</van-cell>
      <van-cell>归档日期：2020/02/01</van-cell>
      <van-cell>归档人：张柳</van-cell>
      <van-cell>归档号：12346</van-cell>
      <van-cell>保存期限：10年</van-cell>
      <van-cell is-link title="事件信息"></van-cell>
      <van-cell>事发地点：澄江县XX路10号</van-cell>
      <van-cell>事发地点：澄江县XX路10号</van-cell>
      <van-cell>上报时间：2020/02/01 12：00</van-cell>
      <van-cell>上报来源：公众号举报</van-cell>
      <van-cell>上报人：王五（18022330404）</van-cell>
      <van-cell>事件类型：非法捕捞</van-cell>
      <van-cell>事件描述：
        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</van-cell>
      <van-button color="#A2D6FF" style="margin-top:20px;" size="large">案卷文件</van-button>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {}
  },
  watch: {},
  computed: {},
  methods: {
    returnSubmitForm () {
      this.$router.go(-1)
    }
  },
  created () {
    console.log('created')
  },
  activated () {
    console.log('activated')
  },
  mounted () {}
}
</script>
<style lang="less">
.CaseDetail {
  .topHeader {
    display: flex;
    color: red;
  }
}
</style>
