<template>
  <div>
    <van-cell-group>
      <van-cell title="案件号" :value="model.caseInfo.CaseNumber"></van-cell>
      <van-cell title="案由" :value="model.caseInfo.CauseOfAction"></van-cell>
      <van-cell title="检查事由" :value="model.form.Inspectionreason"></van-cell>
      <van-cell title="检查地点" :value="model.form.Incidentlocation"></van-cell>
      <party-info-view :initData="model.caseInfo.LawParties"></party-info-view>
      <van-cell title="执法检查人员" :value="model.lawPersionNames"></van-cell>
      <van-cell title="记录人员" :value="model.recordPersionNames"></van-cell>
      <van-cell title="监督检查类别" :value="model.form.InspectiontypeName"></van-cell>
      <van-cell title="开始时间" :value="model.form.startTime"></van-cell>
      <van-cell title="结束时间" :value="model.form.endTime"></van-cell>
      <van-cell title="被检查陪同人" :value="model.form.Companions"></van-cell>
      <van-cell title="勘验记录" :value="model.form.Inspectionrecord"></van-cell>
      <div class="operate-area">
        <div class="person_item" v-for="(item,index) in model.caseInfo.LawParties" :key="index">
          <span style="margin-right:20px">{{ `当事人${index+1}` }}:</span>
          <van-button type="default" size="small" @click="handleShowSignature('dsrSignature',index)" v-if="!item.SignImg1">手签</van-button>
          <div class="signature-img-wapper" v-else>
            <img :src="item.SignImg1">
          </div>
        </div>
        <div class="person_item">
          <span style="margin-right:20px">执法人1:</span>
          <van-button type="default" size="small" @click="handleShowSignature('zfr1Signature')" v-if="!zfr1Signature">手签</van-button>
          <div class="signature-img-wapper" v-else>
            <img :src="zfr1Signature">
          </div>
        </div>
        <div class="person_item">
          <span style="margin-right:20px">执法人2:</span>
          <van-button type="default" size="small" @click="handleShowSignature('zfr2Signature')" v-if="!zfr2Signature">手签</van-button>
          <div class="signature-img-wapper" v-else>
            <img :src="zfr2Signature">
          </div>
        </div>
        <div class="single-save">
          <van-button type="info" :loading="loading" size="large" class="single-save" @click="submit">保存</van-button>
        </div>
      </div>
    </van-cell-group>
    <signature :showPopup="showPopup" @onClosePopup="onCloseSignature" @onPopupConfirm="onSignatureConfirm" v-if="showPopup"></signature>
  </div>
</template>

<script>
import Signature from '../../../components/tools/Signature'
import PartyInfoView from '../../../components/business/PartyInfoView'
import { commonOperateApi } from '../../../api/regulatoryApi'
import { isNotEmpty } from '../../../utils/util'
var timer
/**
 *  勘查笔录预览详情
 */
export default {
  name: 'InquestPutdownPreview',
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
      dsrSignature: [],
      zfr1Signature: null,
      zfr2Signature: null,
      showPopup: false,
      setIndex: null
    }
  },
  beforeDestroy () {
    if (isNotEmpty(timer)) {
      clearTimeout(timer)
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      var forms = this.$route.params.forms
      this.model = forms
    },
    handleShowSignature (signatureType, index) {
      this.signatureType = signatureType
      this.setIndex = index
      this.showPopup = true
    },
    onCloseSignature () {
      this.showPopup = false
    },
    onSignatureConfirm (signature) {
      if (this.signatureType === 'dsrSignature') {
        this.model.caseInfo.LawParties.forEach((item, mindex) => {
          if (mindex === this.setIndex) {
            item.SignImg1 = signature
          }
        })
        console.log('this.model.caseInfo.LawParties', this.model.caseInfo.LawParties)
      }
      if (this.signatureType === 'zfr1Signature') {
        this.zfr1Signature = signature
      }

      if (this.signatureType === 'zfr2Signature') {
        this.zfr2Signature = signature
      }
      this.showPopup = false
    },
    submit () {
      var formInquestrecord = {
        ...this.model.form,
        CaseId: this.model.caseInfo.ID,
        EventInfoId: this.model.caseInfo.EventInfoId,
        Recorder: this.model.recordPersionNames
      }
      var data = {
        formInquestrecord,
        LawParties: this.model.caseInfo.LawParties,
        lawStaff: []
      }
      this.model.lawPersions.forEach(item => {
        var user = {
          UserId: item.emplId,
          Username: item.name
        }
        data.lawStaff.push(user)
      })
      this.save(data)
    },
    save (data) {
      this.loading = true
      commonOperateApi('FINISH', 'form_inquestrecord', data).then((res) => {
        this.$toast.success('操作成功')
        this.goToLawForm()
      }).finally(() => {
        this.loading = false
      })
    },
    goToLawForm () {
      timer = setTimeout(() => {
        this.$router.push({ name: 'layforms' })
      }, 1000)
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
