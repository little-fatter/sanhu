<template>
  <div>
    <van-cell-group>
      <van-cell title="案件号" :value="model.caseInfo.CaseNumber"></van-cell>
      <van-cell title="案由" :value="model.form.Originofcase"></van-cell>
      <van-cell title="询问对象" :value="model.form.InquiryType"></van-cell>
      <van-cell title="询问地点" :value="model.form.Enquiryplace"></van-cell>
      <party-info-view :initData="model.lawParties" :title="model.form.InquiryType"></party-info-view>
      <van-cell title="执法检查人员" :value="model.lawPersionNames"></van-cell>
      <van-cell title="记录人员" :value="model.recordPersionNames"></van-cell>
      <van-cell title="开始时间" :value="model.form.startTime"></van-cell>
      <van-cell title="结束时间" :value="model.form.endTime"></van-cell>
      <van-cell title="被询问人是否看清执法证件" :value="model.form.Isseeclearly"></van-cell>
      <van-cell class="explain">
        依照法律规定，被询问人对调查询问，享有申请执法人员回避的权利，有如实接受调查询问的法律义务，如有意隐匿违法行为或者故意作伪证将承担法律责任。
      </van-cell>
      <van-cell title="被询问人是否明白权责义务" :value="model.form.Isunderstand"></van-cell>
      <van-field
        name="Inquiryrecord"
        v-model="model.form.Inquiryrecord"
        rows="2"
        autosize
        label="询问记录"
        type="textarea"
        placeholder="请输入询问记录"
        readonly
      />
      <!-- <div class="operate-area">
        <div class="person_item" v-for="(item,index) in model.lawParties" :key="index">
          <span style="margin-right:20px">{{ `${model.form.InquiryType}${index+1}` }}:</span>  <van-button type="default" size="small" @click="handleShowSignature('dsrSignature',index)" >手签</van-button>
          <van-icon name="success" color="green" v-show="dsrSignature" style="margin-left:20px"></van-icon>
        </div>
        <div class="person_item">
          <span style="margin-right:20px">执法人1:</span>  <van-button type="default" size="small" @click="handleShowSignature('zfr1Signature')">手签</van-button>
          <van-icon name="success" color="green" v-show="zfr1Signature" style="margin-left:20px"></van-icon>
        </div>
        <div class="person_item">
          <span style="margin-right:20px">执法人2:</span>  <van-button type="default" size="small" @click="handleShowSignature('zfr2Signature')">手签</van-button>
          <van-icon name="success" color="green" v-show="zfr2Signature" style="margin-left:20px"></van-icon>
        </div>
        <div class="single-save">
          <van-button type="info" :loading="loading" size="large" class="single-save" @click="submit">保存</van-button>
        </div>
      </div> -->

      <div class="operate-area">
        <div class="person_item" v-for="(item,index) in model.lawParties" :key="index">
          <span style="margin-right:20px">{{ `${model.form.InquiryType}${index+1}` }}:</span>
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
import { isNotEmpty } from '../../../utils/util'
import { commonOperateApi } from '../../../api/regulatoryApi'
var timer
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
        this.model.lawParties.forEach((item, mindex) => {
          if (mindex === this.setIndex) {
            item.SignImg1 = signature
          }
        })
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
      var formInquiryrecord = {
        ...this.model.form,
        CaseId: this.model.caseInfo.ID,
        EventInfoId: this.model.caseInfo.EventInfoId,
        Recorder: this.model.recordPersionNames
      }
      var data = {
        formInquiryrecord,
        LawParties: this.model.lawParties,
        lawStaff: []
      }
      data.LawParties.forEach(item => {
        item.InquiryType = this.model.form.InquiryType
      })
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
      commonOperateApi('FINISH', 'form_inquiryrecord', data).then((res) => {
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
