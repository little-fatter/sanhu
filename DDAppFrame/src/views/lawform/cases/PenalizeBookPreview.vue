<template>
  <div>
    <van-cell-group>
      <van-cell title="案件号" :value="penalizeBook.caseInfo.CaseNumber"></van-cell>
      <van-cell title="案由" :value="penalizeBook.caseInfo.CauseOfAction"></van-cell>
      <van-cell title="案件类型" :value="penalizeBook.caseInfo.CaseType"></van-cell>
      <party-info-view :initData="penalizeBook.LawParties"></party-info-view>
      <van-field
        v-model="penalizeBook.Illegalfacts"
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
          :initResult="penalizeBook.attachments"
        >
        </s-upload>
      </item-group>
      <van-field
        v-model="penalizeBook.illegalbasis"
        rows="2"
        autosize
        label="违法依据"
        type="textarea"
        readonly
      />
      <van-field
        v-model="penalizeBook.punishmentbasis"
        rows="2"
        autosize
        label="处罚依据"
        type="textarea"
        readonly
      />
      <penalty-decision-view :initData="penalizeBook.decisions"></penalty-decision-view>
      <van-cell title="协办人" :value="penalizeBook.CoOrganizer"></van-cell>
      <div class="operate-area">
        <div class="person_item">
          <span style="margin-right:20px">主办人:</span>
          <van-button type="default" size="small" @click="handleShowSignature('mainSignature')" v-if="!mainSignature">手签</van-button>
          <div class="signature-img-wapper" v-else>
            <img :src="mainSignature">
          </div>
        </div>
        <div class="person_item">
          <span style="margin-right:20px">协办人:</span>
          <van-button type="default" size="small" @click="handleShowSignature('organiserSignature')" v-if="!organiserSignature">手签</van-button>
          <div class="signature-img-wapper" v-else>
            <img :src="organiserSignature">
          </div>
        </div>
        <div class="single-save">
          <van-button type="info" :loading="loading" size="large" class="single-save" @click="onSubmit">保存</van-button>
        </div>
      </div>

    </van-cell-group>
    <signature :showPopup="showPopup" @onClosePopup="onCloseSignature" @onPopupConfirm="onSignatureConfirm" v-if="showPopup"></signature>
    <next-task-modal @onPopupConfirm="onTaskConfirm" ref="taskModel"></next-task-modal>
  </div>
</template>

<script>
import Signature from '../../../components/tools/Signature'
import ItemGroup from '../../../components/tools/ItemGroup'
import SUpload from '../../../components/file/StandardUploadFile'
import PartyInfoView from '../../../components/business/PartyInfoView'
import PenaltyDecisionView from '../../../components/business/PenaltyDecisionView'
import { commonOperateApi, TaskTypeDic, getDetaildata } from '../../../api/regulatoryApi'
import { isNotEmpty, getNextTask, getCaseTaskDefault } from '../../../utils/util'
import { getCurrentUserInfo } from '../../../service/currentUser.service'
import NextTaskModal from '../../../components/business/NextTaskModal'
var timer = null
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
    PenaltyDecisionView,
    NextTaskModal
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
      organiserSignature: null,
      event: {}
    }
  },
  created () {
    this.init()
  },
  beforeDestroy () {
    if (isNotEmpty(timer)) {
      clearTimeout(timer)
    }
  },
  methods: {
    init () {
      var forms = this.$route.params.forms
      this.penalizeBook = forms
      this.loadEventInfo(this.penalizeBook.caseInfo.EventInfoId)
    },
    loadEventInfo (EventInfoId) {
      getDetaildata('event_info', EventInfoId).then((res) => {
        if (res) {
          this.event = res
        }
      })
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
    },
    onTaskConfirm (result) {
      var data = result.data
      var nextTask = null
      var userInfo = getCurrentUserInfo()
      nextTask = getNextTask(TaskTypeDic.finalReport, userInfo.userid, 'caseFinalReportCreate', result.taskTitle, result.taskContent, data.Attachments, this.event.evtFileUrl, this.penalizeBook.caseInfo.EventInfoId, this.penalizeBook.caseInfo.ID)
      data.NextTasks.push(nextTask)
      this.save(data)
    },
    onSubmit () {
      // if (isEmpty(this.mainSignature)) {
      //   this.$toast('请主办人签字')
      //   return
      // }
      // if (isEmpty(this.organiserSignature) && isNotEmpty(this.penalizeBook.CoOrganizer)) {
      //   this.$toast('协办人签字')
      //   return
      // }
      var fine = this.penalizeBook.decisions.find(item => item.decisionType === 1)
      var decision = {}
      if (fine) {
        decision.Isfine = true
        decision.Amountofpenalty = fine.amount
        decision.Paymentmethod = fine.payment === 1 ? '当场缴费' : '银行缴款'
      }
      var inventory = this.penalizeBook.decisions.find(item => item.decisionType === 2)
      if (inventory) {
        decision.IsConfiscationgoods = true
      }
      var lawpunishmentInfo = {
        CaseID: this.penalizeBook.caseInfo.ID,
        EventInfoId: this.penalizeBook.caseInfo.EventInfoId,
        Illegalfacts: this.penalizeBook.Illegalfacts,
        IllegalbasisIDs: this.penalizeBook.illegalbasis,
        PunishmentbasisIDs: this.penalizeBook.punishmentbasis,
        CoOrganizer: this.penalizeBook.CoOrganizer,
        CoorganizerID: this.penalizeBook.CoOrganizerId,
        ...decision,
        MainHanderSign: this.mainSignature
        // MainHanderSign: this.mainSignature,
        // CoOrganizerSign: this.organiserSignature
      }
      var data = {
        SourceTaskId: isNotEmpty(this.penalizeBook.taskInfo) ? this.penalizeBook.taskInfo.ID : null,
        EventInfoId: this.penalizeBook.caseInfo.EventInfoId,
        lawpunishmentInfo,
        NextTasks: []
      }
      var attachments = this.penalizeBook.attachments
      if (attachments && attachments.length > 0) {
        data.Attachments = attachments
      }
      data.LawParties = this.penalizeBook.LawParties
      var defaultTask = getCaseTaskDefault(this.penalizeBook.caseInfo, '结案报告')
      this.$refs.taskModel.show(defaultTask.title, defaultTask.content, data)
    },
    save (data) {
      this.loading = true
      commonOperateApi('FINISH', 'law_punishmentInfo', data).then((res) => {
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
