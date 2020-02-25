<template>
  <div>
    <div v-for="(item,index) in datalist" :key="index+'party'">
      <div style="display:flex;justify-content:space-between;">
        <div>当事人（{{ index+1 }}）</div>
        <div v-show="datalist.length > 1" style="color:#1989FA;" @click="deletePartyItem(index)">删除</div>
      </div>
      <div>
        <a-select
          v-model="item.category"
        >
          <a-select-option value="个人">
            个人
          </a-select-option>
          <a-select-option value="单位">
            单位
          </a-select-option>
        </a-select>
      </div>
      <div>
        <a-input v-if="item.category == '个人'" v-model="item.personName" placeholder="请输入姓名"></a-input>
        <a-input v-else v-model="item.companyName" placeholder="请输入名称"></a-input>
      </div>
      <div v-show="item.category == '个人'">
        <a-radio-group v-model="item.sex">
          <a-radio :value="1">男</a-radio>
          <a-radio :value="0">女</a-radio>
        </a-radio-group>
      </div>
      <div>
        <a-input v-if="item.category == '个人'" v-model="item.occupation" placeholder="请输入职业"></a-input>
        <a-input v-else v-model="item.legalName" placeholder="请输入法人名称"></a-input>
      </div>
      <div>
        <a-input v-model="item.IDnumber" placeholder="请输入身份证"></a-input>
      </div>
      <div>
        <a-input v-model="item.address" placeholder="请输入现住址"></a-input>
      </div>
      <div>
        <a-input v-model="item.phone" placeholder="请输入联系电话"></a-input>
      </div>
    </div>
    <div style="display:flex;justify-content:center;">
      <a-button type="primary" @click="addParty">+ 增加当事人</a-button>
    </div>
  </div>
</template>

<script>

export default {
  props: { datalist: {
    type: Array,
    default: function () {
      return [
        { category: '个人', // 当事人类型
          personName: null, // 当事人名称
          companyName: null, // 当事单位名称
          legalName: null, // 法人名称
          sex: 1, // 当事人性别
          occupation: null, // 当事人职位
          IDnumber: null, // 身份证号
          address: null, // 地址
          phone: null // 联系方式
        }
      ]
    }
  } },
  components: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  methods: {
    addParty () {
      this.datalist.push(
        { category: '个人',
          personName: null,
          companyName: null,
          legalName: null,
          sex: 1,
          occupation: null,
          IDnumber: null,
          address: null,
          phone: null
        }
      )
    },
    deletePartyItem (index) {
      this.datalist.splice(index, 1)
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>
<style lang='' scoped>
</style>
