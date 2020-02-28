<template>
  <div>
    <van-cell-group title="处罚决定">
      <van-panel v-for="(item,index) in list" :key="index" :title="`处罚(${index+1})`">
        <template v-if="item.decisionType==1">
          <van-cell title="处罚方式" :value="item.decisionTypeDesc"></van-cell>
          <van-cell title="罚款金额" :value="`${item.amount}元`"></van-cell>
          <van-cell title="付款方式" :value="item.paymentDesc"></van-cell>
        </template>
        <template v-else>
          <van-cell title="处罚方式" :value="item.decisionTypeDesc"></van-cell>
        </template>
      </van-panel>
    </van-cell-group>
  </div>
</template>

<script>
/**
 * 处罚决定查看组件
 */
export default {
  name: 'PenaltyDecisionView',
  components: {

  },
  props: {
    /**
     * 初始化数组
     */
    initData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      list: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const list = []
      this.initData.forEach(item => {
        item.decisionTypeDesc = item.decisionType === 1 ? '罚款' : '没收物品'
        if (item.decisionType === 1) {
          item.paymentDesc = item.payment === 1 ? '当场缴费' : '银行缴款'
        }
        list.push(item)
      })
      this.list = list
    }
  }
}
</script>

<style lang="less" scoped>

</style>
