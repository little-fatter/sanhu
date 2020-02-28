<template>
  <van-cell-group :title="`${title}信息`">
    <van-panel v-for="(item,index) in partys" :key="index" :title="`${title}(${index+1})`">
      <template v-if="item.partyType==1">
        <van-cell :title="item.title"></van-cell>
        <van-cell title="身份证" :value="item.idCard"></van-cell>
        <van-cell title="手机号" :value="item.phone"></van-cell>
        <van-cell title="现住址" :value="item.address"></van-cell>
        <van-cell title="民族" :value="item.nation"></van-cell>
        <van-cell title="工作单位" :value="item.company"></van-cell>
      </template>
      <template v-else>
        <van-cell :title="item.name"></van-cell>
        <van-cell title="法人姓名" :value="item.legalName"></van-cell>
        <van-cell title="法人身份证" :value="item.idCard"></van-cell>
        <van-cell title="地址" :value="item.address"></van-cell>
        <van-cell title="联系电话" :value="item.tel"></van-cell>
      </template>
    </van-panel>
  </van-cell-group>
</template>

<script>
/**
 * 当事人查看组件
 */
export default {
  name: 'PartyInfoView',
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
    },
    title: {
      type: String,
      default: '当事人'
    }
  },
  data () {
    return {
      partys: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const partys = []
      this.initData.forEach(item => {
        if (item.partyType === 1) {
          var sex = item.sex === 1 ? '男' : '女'
          var title = `${item.name} | ${sex}`
          item.title = title
        }
        partys.push(item)
      })
      this.partys = partys
    }

  }
}
</script>

<style lang="less" scoped>

</style>
