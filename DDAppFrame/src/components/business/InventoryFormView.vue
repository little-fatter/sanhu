<template>
  <div>
    <van-cell-group title="物品清单">
      <van-cell :title="obj.dsr.name"></van-cell>
      <van-panel v-for="(item,mindex) in obj.list" :key="mindex" :title="`物品(${mindex+1})`">
        <van-cell title="名称" :value="item.name"></van-cell>
        <van-cell title="生产企业或经营单位" :value="item.enterprise"></van-cell>
        <van-cell title="规格" :value="item.specification"></van-cell>
        <van-cell title="生产批次" :value="item.batchNumber"></van-cell>
        <van-cell title="生产时间" :value="item.produceDate"></van-cell>
        <van-cell title="数量" :value="item.count"></van-cell>
        <van-cell title="价格" :value="item.price"></van-cell>
        <van-cell title="包装" :value="item.pack"></van-cell>
        <van-field
          v-model="item.remark"
          label="备注"
          rows="2"
          autosize
          type="textarea"
          maxlength="200"
          readonly
        />
      </van-panel>
      <van-field
        v-model="obj.otherItem"
        rows="2"
        autosize
        label="其他物品"
        type="textarea"
        maxlength="200"
        readonly
      />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'InventoryFormView',
  components: {

  },
  props: {
    /**
     * 初始化对象
     */
    inventory: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      obj: {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.obj = this.inventory
    }
  }
}
</script>

<style lang="less" scoped>

</style>
