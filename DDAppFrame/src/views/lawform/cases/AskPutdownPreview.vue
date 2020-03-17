<template>
  <div>
    <van-cell-group>
      <van-cell title="案件号" :value="model.caseInfo.CaseNumber"></van-cell>
      <van-cell title="案由" :value="model.caseInfo.CauseOfAction"></van-cell>
      <van-cell title="询问对象" :value="model.objectTypeDesc"></van-cell>
      <van-cell title="询问地点" :value="model.eventAddress"></van-cell>
      <party-info-view :initData="model.dsrs" :title="model.objectTypeDesc"></party-info-view>
      <van-cell title="执法检查人员" :value="model.lawPersionNames"></van-cell>
      <van-cell title="记录人员" :value="model.recordPersionNames"></van-cell>
      <van-cell title="开始时间" :value="model.startTime"></van-cell>
      <van-cell title="结束时间" :value="model.endTime"></van-cell>
      <van-cell title="被询问人是否看清执法证件" :value="model.isLookCredentialDesc"></van-cell>
      <van-cell class="explain">
        依照法律规定，被询问人对调查询问，享有申请执法人员回避的权利，有如实接受调查询问的法律义务，如有意隐匿违法行为或者故意作伪证将承担法律责任。
      </van-cell>
      <van-cell title="被询问人是否明白权责义务" :value="model.isUnderstandRightsDesc"></van-cell>
      <van-field
        name="remark"
        v-model="model.remark"
        rows="2"
        autosize
        label="询问记录"
        type="textarea"
        placeholder="请输入询问记录"
        readonly
      />
      <div class="operate-area">
        <div class="person_item">
          <span style="margin-right:20px">{{ model.objectTypeDesc }}:</span>  <van-button type="default" size="small" @click="handleShowSignature('dsrSignature')" >手签</van-button>
          <van-icon name="success" color="green" v-show="dsrSignature" style="margin-left:20px"></van-icon>
        </div>
        <div class="person_item">
          <span style="margin-right:20px">执法人I:</span>  <van-button type="default" size="small" @click="handleShowSignature('zfr1Signature')">手签</van-button>
          <van-icon name="success" color="green" v-show="zfr1Signature" style="margin-left:20px"></van-icon>
        </div>
        <div class="person_item">
          <span style="margin-right:20px">执法人II:</span>  <van-button type="default" size="small" @click="handleShowSignature('zfr2Signature')">手签</van-button>
          <van-icon name="success" color="green" v-show="zfr2Signature" style="margin-left:20px"></van-icon>
        </div>
        <div class="single-save">
          <van-button type="info" :loading="loading" size="large" class="single-save">保存</van-button>
        </div>
      </div>
    </van-cell-group>
    <signature :showPopup="showPopup" @onClosePopup="onCloseSignature" @onPopupConfirm="onSignatureConfirm" v-if="showPopup"></signature>
  </div>
</template>

<script>
import Signature from '../../../components/tools/Signature'
import PartyInfoView from '../../../components/business/PartyInfoView'
/**
 *  询问笔录详情
 */
export default {
  name: 'AskPutdownPreview',
  components: {
    Signature,
    PartyInfoView
  },
  props: {

  },
  data () {
    return {
      loading: false,
      model: null,
      signatureType: null,
      dsrSignature: null,
      zfr1Signature: null,
      zfr2Signature: null,
      showPopup: false
    }
  },
  created () {
    this.init()
  },
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
  }
}
</script>

<style lang="less" scoped>
.person_item
 {
    margin-bottom: 20px;
 }
</style>
