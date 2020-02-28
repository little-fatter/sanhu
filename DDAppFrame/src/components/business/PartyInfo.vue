<template>
  <van-cell-group :title="`${title}信息`">
    <van-panel v-for="(item,index) in partys" :key="index" :title="`${title}(${index+1})`">
      <van-field>
        <van-radio-group v-model="item.partyType" direction="horizontal" slot="input">
          <van-radio :name="1">个人</van-radio>
          <van-radio :name="2">单位</van-radio>
        </van-radio-group>
      </van-field>
      <template v-if="item.partyType==1">
        <van-field
          v-model="item.name"
          placeholder="请输入姓名"
          required
          :rules="requiredRule"
        />
        <van-field>
          <van-radio-group v-model="item.sex" direction="horizontal" slot="input">
            <van-radio :name="1">男</van-radio>
            <van-radio :name="2">女</van-radio>
          </van-radio-group>
        </van-field>
        <van-field
          v-model="item.idCard"
          placeholder="请输入身份证"
          required
          :rules="idCardRules"
        />
        <van-field
          v-model="item.address"
          rows="2"
          autosize
          type="textarea"
          maxlength="100"
          placeholder="请输入现住址"
          show-word-limit
          required
          :rules="requiredRule"
        />
        <van-field
          v-model="item.phone"
          placeholder="请输入手机"
          required
          :rules="phoneRules"
        />
        <van-field
          v-model="item.nation"
          placeholder="请输入民族"
        />
        <van-field
          v-model="item.company"
          placeholder="请输入工作单位"
        />
      </template>
      <template v-else>
        <van-field
          v-model="item.name"
          placeholder="请输入名称"
          required
          :rules="requiredRule"
        />
        <van-field
          v-model="item.legalName"
          placeholder="请输入法人姓名"
          required
          :rules="requiredRule"
        />
        <van-field
          v-model="item.idCard"
          placeholder="请输入法人身份证"
          required
          :rules="idCardRules"
        />
        <van-field
          v-model="item.address"
          rows="2"
          autosize
          type="textarea"
          maxlength="100"
          placeholder="请输入单位地址"
          show-word-limit
          required
          :rules="requiredRule"
        />
        <van-field
          v-model="item.tel"
          placeholder="请输入联系电话"
          required
          :rules="requiredRule"
        />
      </template>

      <div slot="footer">
        <van-button
          plain
          hairline
          size="small"
          type="info"
          @click="addparty"
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
</template>

<script>
import { phoneValidator, idcardValidator } from '../../utils/helper/validate.helper'
import ItemGroup from '../../components/tools/ItemGroup'

/**
 * 当事人信息组件（单位个人）
 */
export default {
  name: 'PartyInfo',
  components: {
    ItemGroup
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
    this.requiredRule = [
      { required: true, message: ' ' }
    ]
    this.phoneRules = [
      { required: true, message: ' ' }
      // { validator: phoneValidator, message: '手机号格式错误' }
    ]
    this.idCardRules = [
      { required: true, message: ' ' }
      // { validator: idcardValidator, message: '身份证号格式错误' }
    ]
    return {
      partys: []
    }
  },
  created () {
    this.init()
  },
  watch: {
    initData (val) {
      if (val && val.length >= 1) {
        const partys = []
        this.initData.forEach(item => {
          partys.push(item)
        })
        this.partys = partys
      }
    }
  },
  methods: {
    init () {
      if (this.initData.length === 0) {
        this.addparty()
      } else {
        const partys = []
        this.initData.forEach(item => {
          partys.push(item)
        })
        this.partys = partys
      }
    },
    partyTypeSelectChange (value, index) {
      var party = this.partys[index]
      party.partyType = value
    },
    addparty () {
    //   var index = this.partys.length + 1
      var party = {
        partyType: 1,
        name: '',
        sex: 1,
        profession: '',
        idCard: '',
        address: '',
        phone: '',
        legalName: '',
        tel: '',
        company: '',
        nation: ''
      }
      //   party.title = '当事人(' + index + ')'
      this.partys.push(party)
    },
    removeParty (index) {
      this.partys.splice(index, 1)
    },
    getResult () {
      return this.partys
    }
  }
}
</script>

<style lang="less" scoped>

</style>
