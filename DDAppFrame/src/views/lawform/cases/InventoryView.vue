<template>
  <div>
    <van-cell-group>
      <van-cell title="案件号" :value="inventory.caseInfo.CaseNumber"></van-cell>
      <van-cell title="案由" :value="inventory.caseInfo.CauseOfAction"></van-cell>
      <inventory-form-view :inventory="inventory.inventory"></inventory-form-view>
      <div class="operate-area">
        <div class="person_item">
          <span style="margin-right:20px">当事人:</span>  <van-button type="default" size="small" @click="handleShowSignature('dsrSignature')" >手签</van-button>
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
import InventoryFormView from '../../../components/business/InventoryFormView'
import Signature from '../../../components/tools/Signature'
/**
 * 物品清单明细
 */
export default {
  name: 'InventoryView',
  components: {
    InventoryFormView,
    Signature
  },
  props: {

  },
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
  created () {
    this.init()
  },
  methods: {
    init () {
      var forms = this.$route.params.forms
      console.log('forms', forms)
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
