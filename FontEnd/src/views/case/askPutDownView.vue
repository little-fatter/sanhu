<style scoped lang='less'>
* {
  box-sizing: border-box;
}

.margin-bottom30 {
  margin-bottom: 30px;
  .box {
    display:inline-block;
    .boxItem {
      .span {
      color:#3A9DFA;
    margin-bottom: 30px;
}
    }
  }
}

.margin-bottom15 {
  margin-bottom: 15px;
}

.case-box {
  background-color: #f4f3f3;
  // height: 100vh;
  // overflow: auto;

  .case-top {
    padding: 0px 55px;
    background-color: #fff;
    .border-bottom {
      border-bottom: solid 1px #dcdee2;
      justify-content: flex-start;
      display: flex;
      padding: 25px 0 25px 25px;
      .page-title-border {
        background-color: #3a9dfa;
        height: 20;
        width: 4px;
        border-radius: 4px;
        margin-right: 8px;
      }
      .page-title {
        color: #222328;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }

  .case-body {
    // margin-top: 15px;
    padding: 26px 55px;
    background-color: #fff;
  }
  .case-body span.ant-col-4,.case-body span.ant-col-2 {
    font-size: 14px;
    font-weight: bold;
    color: #64697C;
  }
  .card-sub-style .ant-card-body > div > div > div:first-child {
    text-align: right;
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
}
</style>
<template>
  <div class="case-box">
    <div class="case-top">
      <a-row type="flex" justify="center">
        <a-col :span="20" class="border-bottom">
          <span class="page-title-border"></span>
          <span class="page-title">笔录明细</span>
        </a-col>
      </a-row>
    </div>
    <div class="case-body">
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="20">
          <span class="ant-col-2">案由</span>
          <span class="ant-col-20">
            {{ model.CauseOfAction }}
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="10">
          <span class="ant-col-4">询问对象</span>
          <span class="ant-col-16">
            {{ model.objectTypeDesc }}
          </span>
        </a-col>
        <a-col :span="10">
          <span class="ant-col-4">询问地点</span>
          <span class="ant-col-16">
            {{ model.eventAddress }}
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="10">
          <span class="ant-col-4">开始时间</span>
          <span class="ant-col-16">
            {{ model.startTime }}
          </span>
        </a-col>
        <a-col :span="10">
          <span class="ant-col-4">结束时间</span>
          <span class="ant-col-16">
            {{ model.endTime }}
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="20">
          <span class="ant-col-2">当事人</span>
          <span class="ant-col-16">
            <party-view :caseBreakLow="model.dsrs"></party-view>
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="10">
          <span class="ant-col-4">执法检查人员</span>
          <span class="ant-col-16">
            {{ model.lawPersionNames }}
          </span>
        </a-col>
        <a-col :span="10">
          <span class="ant-col-4">记录人</span>
          <span class="ant-col-16">
            {{ model.recordPersionNames }}
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="10">
          <a-row>
            <span class="ant-col-4">被询问人是否看清执法证件</span>
            <span class="ant-col-16">
              <a-radio-group class="ant-col-24" disabled v-model="model.isLookCredential">
                <a-radio :style="radioStyle" :value="1">看清</a-radio>
                <a-radio :style="radioStyle" :value="2">不清除</a-radio>
              </a-radio-group>
            </span>
          </a-row>
          <a-row>
            <span class="ant-col-4"></span>
            <span class="ant-col-16">
              依照法律规定，被询问人对调查询问，享有申请执法人员回避的权利，有如实接受调查询问的法律义务，如有意隐匿违法行为或者故意作伪证将承担法律责任。              </span>
          </a-row>
        </a-col>
        <a-col :span="10">
          <span class="ant-col-4">被询问人是否明白权责义务</span>
          <span class="ant-col-16">
            <a-radio-group disabled class="ant-col-24" v-model="model.isUnderstandRights">
              <a-radio :style="radioStyle" :value="1">明白</a-radio>
              <a-radio :style="radioStyle" :value="2">不明白</a-radio>
            </a-radio-group>
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="20">
          <span class="ant-col-2">询问记录</span>
          <span class="ant-col-20">
            {{ model.remark }}
          </span>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col :span="5">
          <span style="margin-right:20px">当事人:</span>  <a-button type="default" size="small" @click="handleShowSignature('dsrSignature')" >手签</a-button>
          <a-icon name="success" color="green" v-show="dsrSignature" style="margin-left:20px"></a-icon>
        </a-col>
        <a-col :span="5">
          <span style="margin-right:20px">执法人I:</span>  <a-button type="default" size="small" @click="handleShowSignature('zfr1Signature')">手签</a-button>
          <a-icon name="success" color="green" v-show="zfr1Signature" style="margin-left:20px"></a-icon>
        </a-col>
        <a-col :span="5">
          <span style="margin-right:20px">执法人II:</span>  <a-button type="default" size="small" @click="handleShowSignature('zfr2Signature')">手签</a-button>
          <a-icon name="success" color="green" v-show="zfr2Signature" style="margin-left:20px"></a-icon>
        </a-col>
        <a-col :span="5">
          <a-button type="primary" :loading="loading" class="single-save">保存</a-button>
        </a-col>
      </a-row>
    </div>
    <signature :showPopup="showPopup" @onClosePopup="onCloseSignature" @onPopupConfirm="onSignatureConfirm" v-if="showPopup"></signature>
  </div>
</template>

<script>
import Signature from '../../components/tools/Signature'
import PartyView from './components/partyView'
export default {
  name: 'AskPutdownPreview',

  components: { Signature, PartyView },
  data () {
    return {
      loading: false,
      model: null,
      signatureType: null,
      dsrSignature: null,
      zfr1Signature: null,
      zfr2Signature: null,
      showPopup: false,
      radioStyle: {
        height: '30px',
        margin: '20px'
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    init () {
      var forms = this.$route.params.forms
      this.model = forms
      this.model.isLookCredentialDesc = this.model.isLookCredential === 1 ? '清楚' : '不清楚'
      this.model.isUnderstandRightsDesc = this.model.isUnderstandRights === 1 ? '明白' : '不明白'
    },
    handleShowSignature (signatureType) {
      this.signatureType = signatureType
      this.showPopup = true
    },
    onCloseSignature () {
      this.showPopup = false
    },
    onSignatureConfirm (signature) {
      if (this.signatureType === 'dsrSignature') {
        this.dsrSignature = signature
      }

      if (this.signatureType === 'zfr1Signature') {
        this.zfr1Signature = signature
      }

      if (this.signatureType === 'zfr2Signature') {
        this.zfr2Signature = signature
      }
      this.showPopup = false
    }
  },
  created () {
    this.init()
  },
  mounted () {

  }
}
</script>
<style lang='less' scoped>
</style>
