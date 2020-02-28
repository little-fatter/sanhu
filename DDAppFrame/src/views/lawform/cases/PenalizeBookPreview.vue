<template>
  <div>
    <van-cell-group>
      <van-cell title="案件号" :value="penalizeBook.caseInfo.DocNo"></van-cell>
      <van-cell title="案件类型" :value="penalizeBook.caseInfo.CaseType"></van-cell>
      <van-cell title="案由" :value="penalizeBook.caseInfo.penalizeBook"></van-cell>
      <party-info-view :initData="penalizeBook.dsrs"></party-info-view>
      <van-field
        v-model="penalizeBook.factdesc"
        rows="2"
        autosize
        label="违法事实"
        type="textarea"
        readonly
      />
      <item-group title="证据附件">
        <s-upload
          ref="myupload"
          :sync2Dingding="false"
          :isOnlyView="true"
        >
        </s-upload>
      </item-group>
      <van-field
        v-model="penalizeBook.illegalbasis.title"
        rows="2"
        autosize
        label="违法依据"
        type="textarea"
        readonly
      />
      <van-field
        v-model="penalizeBook.punishmentbasis.title"
        rows="2"
        autosize
        label="处罚依据"
        type="textarea"
        readonly
      />
      <penalty-decision-view :initData="penalizeBook.decisions"></penalty-decision-view>
      <van-cell title="协办人" :value="penalizeBook.organiser.name"></van-cell>
      <div class="operate-area">
        <div class="person_item">
          <span style="margin-right:20px">主办人:</span>  <van-button type="default" size="small" @click="handleShowSignature('mainSignature')" >手签</van-button>
          <van-icon name="success" color="green" v-show="mainSignature" style="margin-left:20px"></van-icon>
        </div>
        <div class="person_item">
          <span style="margin-right:20px">协办人:</span>  <van-button type="default" size="small" @click="handleShowSignature('organiserSignature')">手签</van-button>
          <van-icon name="success" color="green" v-show="organiserSignature" style="margin-left:20px"></van-icon>
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
import ItemGroup from '../../../components/tools/ItemGroup'
import SUpload from '../../../components/file/StandardUploadFile'
import PartyInfoView from '../../../components/business/PartyInfoView'
import PenaltyDecisionView from '../../../components/business/PenaltyDecisionView'
// const dsrArray = [
//   {
//     partyType: 1,
//     name: '李某',
//     sex: 1,
//     profession: '',
//     idCard: '22222222222',
//     address: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
//     phone: '18982332222',
//     legalName: '',
//     tel: ''
//   },
//   {
//     partyType: 2,
//     name: 'XXXXX公司',
//     sex: '',
//     profession: '',
//     idCard: '22222222222',
//     address: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
//     phone: '18982332222',
//     legalName: '张某',
//     tel: '18982332222'
//   }
// ]
// const decisionArray = [
//   {
//     decisionType: 1,
//     amount: 20,
//     payment: 1
//   },
//   {
//     decisionType: 2
//   }
// ]
/**
 * 当场处罚决定书预览
 */
export default {
  name: 'PenalizeBookPreview',
  components: {
    Signature,
    ItemGroup,
    SUpload,
    PartyInfoView,
    PenaltyDecisionView
  },
  props: {

  },
  data () {
    return {
      loading: false,
      penalizeBook: {},
      showPopup: false,
      signatureType: null,
      mainSignature: null,
      organiserSignature: null
    }
  },
  created () {
    this.init()
  },
  beforeRouteLeave (to, from, next) {
    to.meta.keepAlive = true
  },
  methods: {
    init () {
      var forms = this.$route.params.forms
      console.log('forms', forms)
      this.penalizeBook = forms
    },
    handleShowSignature (signatureType) {
      this.signatureType = signatureType
      this.showPopup = true
    },
    onCloseSignature () {
      this.showPopup = false
    },
    onSignatureConfirm (signature) {
      if (this.signatureType === 'mainSignature') {
        this.mainSignature = signature
      }

      if (this.signatureType === 'organiserSignature') {
        this.organiserSignature = signature
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
