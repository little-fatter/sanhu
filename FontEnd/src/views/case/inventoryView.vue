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
  .margin-right20 {
      margin-right: 20px;
  }
}

.case-box {
  background-color: #f4f3f3;

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
          <span class="page-title">物品清单</span>
        </a-col>
      </a-row>
    </div>
    <div class="case-body">
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="10">
          <span class="ant-col-4">案由</span>
          <span class="ant-col-16">
            {{ inventory.caseInfo.CauseOfAction || '乱丢垃圾' }}
          </span>
        </a-col>
        <a-col :span="10">
          <span class="ant-col-4">案件号</span>
          <span class="ant-col-16">
            {{ inventory.caseInfo.CaseNumber || '案456【12】36号' }}
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="20">
          <span class="ant-col-2">当事人</span>
          <span class="ant-col-20">
            {{ inventory.inventory.dsr.name }}
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="20">
          <span class="ant-col-2">物品</span>
          <div class="ant-col-20" >
            <div v-for="(item,index) in inventory.inventory.list" :key="index+'111'">
              <a-row class="margin-bottom15" type="flex" justify="space-between">
                <a-col :span="10" class="margin-right20">
                  <div >
                    <span>物品名称：</span>
                    <span>{{ item.name }}</span>
                  </div>
                </a-col>
                <a-col :span="10">
                  <div >
                    <span>生产企业或经营单位：</span>
                    <span>{{ item.enterprise }}</span>
                  </div>
                </a-col>
              </a-row>
              <a-row class="margin-bottom15" type="flex" justify="space-between">
                <a-col :span="10" class="margin-right20">
                  <div >
                    <span>规格：</span>
                    <span>{{ item.specification }}</span>
                  </div>
                </a-col>
                <a-col :span="10">
                  <div >
                    <span>生产批次：</span>
                    <span>{{ item.batchNumber }}</span>
                  </div>
                </a-col>
              </a-row>
              <a-row class="margin-bottom15" type="flex" justify="space-between">
                <a-col :span="10" class="margin-right20">
                  <div >
                    <span>生产时间：</span>
                    <span>{{ item.produceDate }}</span>
                  </div>
                </a-col>
                <a-col :span="10">
                  <div >
                    <span>数量：</span>
                    <span>{{ item.count }}</span>
                  </div>
                </a-col>
              </a-row>
              <a-row class="margin-bottom15" type="flex" justify="space-between">
                <a-col :span="10" class="margin-right20">
                  <div >
                    <span>单价：</span>
                    <span>{{ item.price }}</span>
                  </div>
                </a-col>
                <a-col :span="10">
                  <div >
                    <span>包装：</span>
                    <span>{{ item.pack }}</span>
                  </div>
                </a-col>
              </a-row>
              <a-row class="margin-bottom15" type="flex" justify="space-between">
                <a-col :span="10" class="margin-right20">
                  <div >
                    <span>备注：</span>
                    <span>{{ item.remark }}</span>
                  </div>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="20">
          <span class="ant-col-2">其他物品</span>
          <div class="ant-col-20" >
            {{ inventory.inventory.others }}
          </div>
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

export default {
  name: 'InventoryView',
  components: { Signature },
  data () {
    return {
      loading: false,
      inventory: null,
      signatureType: null,
      dsrSignature: null,
      zfr1Signature: null,
      zfr2Signature: null,
      showPopup: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    init () {
      var forms = this.$route.params.forms
      console.log(forms)
      this.inventory = forms
    },
    handleShowSignature (signatureType) {
      this.signatureType = signatureType
      this.showPopup = true
    },
    onCloseSignature () {
      this.showPopup = false
    },
    onSignatureConfirm (signature) {
      console.log(signature)
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
<style lang='' scoped>
</style>
