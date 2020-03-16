<template>
  <div
    class="ant-col-20 box">
    <div
      class="boxItem"
      v-for="(item,index) in caseBreakLow"
      :key="index+'@23'">
      <div class="ant-col-24 lay_part_info margin-bottom15" >
        <template v-if="item.Typesofparties=='gr'">
          <div class="sub_info">
            <span >姓名:</span>
            <span>{{ item.Name }} </span>
          </div>
          <div class="sub_info">
            <span >性别:</span>
            <span>{{ item.Gender }} </span>
          </div>
          <div class="sub_info">
            <span >职业:</span>
            <span>{{ item.Occupation }} </span>
          </div>
        </template>
        <template v-else>
          <div class="sub_info_compy">
            <span>单位名称：</span>
            <span>{{ item.WorkUnit }} </span>
          </div>
          <div class="sub_info_compy">
            <span>法人姓名：</span>
            <span>{{ item.Nameoflegalperson }} </span>
          </div>
        </template>
        <div class="sub_info">
          <span>手机号：</span>
          <span>{{ item.Contactnumber }}</span>
        </div>
      </div>
      <div class="ant-col-24 lay_part_info" style="justify-content:start">
        <div class="sub_info_address">
          <span>现居住地址：</span>
          <span>{{ item.address }}</span>
        </div>
        <div class="sub_info_hao">
          <span>身份证号：</span>
          <span>{{ item.IDcard}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PartyView',
  components: {},
  props: {
    /**
     * 初始化数组
     */
    caseBreakLow: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  methods: {

  },
  created () {

  },
  mounted () {
    console.log(this.caseBreakLow)
  }
}
</script>
<style lang='less' scoped>
.box {
    display:inline-block;
    .boxItem {
      .span {
      color:#3A9DFA;
    margin-bottom: 30px;
}
    }
  }
   .margin-bottom15 {
  margin-bottom: 15px;
}
  .lay_part_info{
    display: flex;
    justify-content: space-between;
    width: 100%;
    .sub_info{
      width:25%;
    }
    .sub_info_compy{
      width:25%;
    }
    .sub_info_address{
      width: 50%;
    }
    .sub_info_hao{
      // margin-left: 2.5%;
    }
  }
</style>
