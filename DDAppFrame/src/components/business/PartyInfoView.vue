<template>
  <van-cell-group :title="`${title}信息`">
    <van-panel v-for="(item,index) in partys" :key="index" :title="`${title}(${index+1})`">
      <template v-if="item.Typesofparties==defaultTypesofpartieID">
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
// import { getDictionaryItems } from '../../api/regulatoryApi'
// import { isNotEmpty } from '../../utils/util'
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
  watch: {
    initData (val, oldVal) {
      const partys = []
      val.forEach(item => {
        if (item.TypesofpartiesID === this.defaultTypesofpartieID) {
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
      partys: [],
      defaultTypesofpartieID: '个人'
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      // getDictionaryItems('Typesofparties').then(items => {
      //   if (isNotEmpty(items)) {
      //     this.defaultTypesofpartieID = items[0].ItemCode
      //     const partys = []
      //     this.initData.forEach(item => {
      //       if (item.Typesofparties === this.defaultTypesofpartieID) {
      //         var title = `${item.Name} | ${item.Gender} | ${item.Occupation}`
      //         item.title = title
      //       } else {
      //         item.title = item.Name
      //       }
      //       partys.push(item)
      //     })
      //     this.partys = partys
      //   }
      // })
      const partys = []
      this.initData.forEach(item => {
        if (item.Typesofparties === this.defaultTypesofpartieID) {
          var title = `${item.Name} | ${item.Gender} | ${item.Occupation}`
          item.title = title
        } else {
          item.title = item.Name
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
