<template>
  <div>
    <van-cell-group title="处罚决定">
      <van-panel v-for="(item,index) in list" :key="index" :title="`处罚(${index+1})`">
        <van-field>
          <van-radio-group v-model="item.decisionType" direction="horizontal" slot="input" @change="e=>handleDecisionTypeChange(e,index)">
            <van-radio :name="1">罚款</van-radio>
            <van-radio :name="2">没收物品</van-radio>
          </van-radio-group>
        </van-field>
        <template v-if="item.decisionType==1">
          <van-field
            v-model="item.amount"
            type="number"
            placeholder="请输入金额"
            required
            :rules="requiredRule">
            <span slot="button">人民币/元</span>
          </van-field>
          <van-field>
            <van-radio-group v-model="item.payment" direction="horizontal" slot="input">
              <van-radio :name="1">当场缴费</van-radio>
              <van-radio :name="2">银行缴款</van-radio>
            </van-radio-group>
          </van-field>
        </template>
        <div slot="footer">
          <van-button
            plain
            hairline
            size="small"
            type="info"
            @click="addItem"
            native-type="button"
            icon="plus">添加</van-button>
          <van-button
            plain
            hairline
            size="small"
            type="danger"
            @click="removeParty(index)"
            native-type="button"
            icon="delete">删除</van-button>
        </div>
      </van-panel>
    </van-cell-group>
  </div>
</template>

<script>
/**
 * 处罚决定表单组件
 */
export default {
  name: 'PenaltyDecision',
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
    this.requiredRule = [
      { required: true, message: ' ' }
    ]
    return {
      list: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.initData.length === 0) {
        this.addItem()
      } else {
        const list = []
        this.initData.forEach(item => {
          list.push(item)
        })
        this.list = list
      }
    },
    addItem () {
      var item = {
        title: '',
        decisionType: 1,
        amount: null,
        payment: 1
      }
      this.list.push(item)
    },
    removeParty (index) {
      this.list.splice(index, 1)
    },
    handleDecisionTypeChange (value, index) {
      var item = this.list[index]
      if (item) {
        item.decisionType = value
      }
    },
    getResult () {
      return this.list
    }
  }
}
</script>

<style lang="less" scoped>

</style>
