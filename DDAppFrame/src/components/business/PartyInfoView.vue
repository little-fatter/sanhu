<template>
  <van-cell-group :title="`${title}信息`">
    <van-panel v-for="(item,index) in partys" :key="index" :title="`${title}(${index+1})`">
      <template v-if="item.Typesofparties==defaultTypesofpartie">
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
</template>

<script>
import { getDictionaryItems } from '../../api/regulatoryApi'
import { isNotEmpty } from '../../utils/util'
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
    initData: { // 页面传过来的数据
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
  watch: {
    initData (val, oldVal) {
      const partys = []
      val.forEach(item => {
        if (item.Typesofparties === this.defaultTypesofpartie) {
          var title = `${item.Name} | ${item.Gender} | ${item.Occupation}`
          item.title = title
        } else {
          item.title = item.Name
        }
        partys.push(item)
      })
      this.partys = partys
    }
  },
  data () {
    return {
      partys: [], // 数据承载数组
      defaultTypesofpartie: null // 当事人类型
    }
  },
  methods: {
    init () {
      getDictionaryItems('Typesofparties').then(items => {
        if (isNotEmpty(items)) {
          this.defaultTypesofpartie = items[0].Title // 沟通之后 用Title 不用 ItemCode
          const partys = []
          this.initData.forEach(item => { // 遍历页面传过来的当事人信息
            if (item.Typesofparties === this.defaultTypesofpartie) {
              var title = `${item.Name}  |  ${item.Gender}  |  ${item.Occupation}`
              item.title = title
            } else {
              item.title = item.Name
            }
            partys.push(item)
          })
          this.partys = partys
        }
      })
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>

</style>
