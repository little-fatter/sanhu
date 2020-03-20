<template>
  <div
    class="ant-col-20 box">
    <div
      class="boxItem"
      v-for="(item,index) in caseBreakLow"
      :key="index+'@23'">
      <span class="ant-col-24 lay_part_info margin-bottom15" >
        <a-select placeholder="请选择" v-model="item.Typesofparties" class="sub_info">
          <a-select-option value="个人">个人</a-select-option>
          <a-select-option value="单位">单位</a-select-option>
        </a-select>

        <template v-if="item.Typesofparties=='个人'">
          <a-input placeholder="请输入姓名" v-model="item.Name" class="sub_info"/>
          <a-select placeholder="请选择" v-model="item.Gender" class="sub_info">
            <a-select-option value="男">男</a-select-option>
            <a-select-option value="女">女</a-select-option>
          </a-select>
          <a-input placeholder="请输入职业" v-model="item.Occupation" class="sub_info"/>
        </template>
        <template v-else>
          <a-input placeholder="请输入单位名称" v-model="item.WorkUnit" class=" sub_info_compy"/>
          <a-input placeholder="请输入法人姓名" v-model="item.Nameoflegalperson" class=" sub_info_compy"/>
        </template>
        <a-input placeholder="请输入身份证号" v-model="item.IDcard" class="sub_info"/>
      </span>
      <span class="ant-col-24 lay_part_info" style="justify-content:start">
        <a-input placeholder="请输入现居住地址" class="sub_info_address" v-model="item.address" />
        <a-input placeholder="手机号" class="sub_info sub_info_hao" v-model="item.Contactnumber" />
        <a-button type="primary" class="sub_info_hao" icon="plus" @click="addCaseBreakLow">添加</a-button>
        <span
          v-show="caseBreakLow.length > 1"
          class="sub_info_hao span"
          @click="delCaseBreakLow(index)"
        >删除</span>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Party',
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
  components: {},
  data () {
    return {
      caseBreakLow: [
        // 当事人信息组
        {
          Typesofparties: '个人', // 违规违法人员性质
          Name: '',
          Gender: '男',
          Occupation: '', // 职业
          IDcard: '', // 身份证号
          address: '', // 住址
          Contactnumber: '', // 手机号
          Nameoflegalperson: '', // 法人姓名
          Nationality: '', // 国籍
          WorkUnit: '' // 工作单位
        }
      ]
    }
  },
  computed: {},
  watch: {
    initData (val) {
      if (val && val.length >= 1) {
        this.initParty(val)
      }
    }
  },
  methods: {
    initParty (initData) {
      if (initData.length === 0) {
        this.addCaseBreakLow()
      } else {
        const caseBreakLow = []
        this.initData.forEach(item => {
          caseBreakLow.push(item)
        })
        this.caseBreakLow = caseBreakLow
      }
    },
    // 新增当事
    addCaseBreakLow () {
      this.caseBreakLow.push({
        Typesofparties: '个人', // 违规违法人员性质
        Name: '',
        Gender: '男',
        Occupation: '', // 职业
        IDcard: '', // 身份证号
        address: '', // 住址
        Contactnumber: '', // 手机号
        Nameoflegalperson: '', // 法人姓名
        Nationality: '', // 国籍
        WorkUnit: '' // 工作单位
      })
    },
    // 删除当事人
    delCaseBreakLow (index) {
      this.caseBreakLow.splice(index, 1)
    },
    getResult () {
      return this.caseBreakLow
    }
  },
  created () {

  },
  mounted () {

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
      width:18%;
    }
    .sub_info_compy{
      width:28%;
    }
    .sub_info_address{
      width: 59%;
    }
    .sub_info_hao{
      margin-left: 2.5%;
    }
  }
</style>
