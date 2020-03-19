<template>
  <div>
    <van-cell-group title="物品清单">
      <van-cell :title="obj.lawPartyName"></van-cell>
      <van-panel v-for="(item,mindex) in obj.list" :key="mindex" :title="`物品(${mindex+1})`">
        <van-cell title="名称" :value="item.ProductName"></van-cell>
        <van-cell title="生产企业或经营单位" :value="item.Enterprise"></van-cell>
        <van-cell title="规格" :value="item.Specifications"></van-cell>
        <van-cell title="生产批次或者生产日期" :value="item.DateOfManufacture"></van-cell>
        <van-cell title="数量" :value="item.Number"></van-cell>
        <van-cell title="价格" :value="item.UnitPrice"></van-cell>
        <van-cell title="包装" :value="item.Packing"></van-cell>
        <van-cell title="备注" :value="item.Remarks"></van-cell>
      </van-panel>
      <van-cell title="其他物品" :value="obj.Othergoods"></van-cell>
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
