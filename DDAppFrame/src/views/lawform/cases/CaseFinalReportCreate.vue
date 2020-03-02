<template>
  <div class="form_wapper">
    <van-cell-group title="任务信息" v-if="taskInfo">
      <van-cell title="任务" :value="taskInfo.TaskTypeInfo[1]"></van-cell>
      <van-cell title="交办时间" :value="taskInfo.InitiationTime"></van-cell>
      <van-cell title="期望时间" :value="taskInfo.ExpectedCompletionTime"></van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-field
        v-model="caseInfo.CauseOfAction"
        label="案件"
        placeholder="请选择案件"
        :readonly="true"
        clickable
        @click="handleShowSelectCase"
      >
        <van-icon name="arrow" color="#1989fa" slot="right-icon" @click="handleShowSelectCase" size="25" />
      </van-field>
    </van-cell-group>
    <van-cell-group v-if="caseInfo.CauseOfAction">
      <van-form @submit="onSubmit" @failed="onFailed">
        <van-cell title="案件号" :value="caseInfo.DocNo"></van-cell>
        <van-cell title="案件类型" :value="caseInfo.CaseType"></van-cell>
        <van-cell title="案由" :value="caseInfo.CauseOfAction"></van-cell>
        <party-info-view :initData="penalizeBook.LawParties"></party-info-view>
        <van-field
          v-model="caseFinalReport.CaseDetail"
          rows="2"
          autosize
          label="简要案情及调查经过"
          type="textarea"
          required
          :rules="requiredRule"
        />
        <!-- <penalty-decision-view :initData="penalizeBook.decisions"></penalty-decision-view> -->
        <!-- <van-field
        v-model="penalizeBook.RelCaseFormDesc"
        label="关联表单"
        placeholder="请选择关联表单"
        :readonly="true"
      >
        <van-icon name="arrow" color="#1989fa" slot="right-icon" @click="handleShowRelFormsPopup" size="25" />
      </van-field>
      <div class="operate-area single-save">
        <van-button type="info" :loading="loading" size="large" native-type="button">保存</van-button>
      </div> -->
        <van-field
          v-model="penalizeBook.BookTitle"
          label="处罚决定"
          :readonly="true"
        >
          <van-icon name="arrow" color="#1989fa" slot="right-icon" @click="handelViewPenalizeBook" size="25" />
        </van-field>
        <van-cell title="执行情况" value="已执行"></van-cell>
        <div class="operate-area single-save">
          <van-button type="info" :loading="loading" size="large" native-type="submit">提交审批</van-button>
        </div>
      </van-form>
    </van-cell-group>

    <case-list-select :showPopup="showPopup" @onClosePopup="onCloseCase" @onPopupConfirm="onCaseConfirm"></case-list-select>
    <rel-case-form-list-select :showPopup="showRelFormsPopup" @onClosePopup="showRelFormsPopup=false" @onPopupConfirm="onRelFormsPopupConfirm"></rel-case-form-list-select>
  </div>
</template>

<script>
import PartyInfoView from '../../../components/business/PartyInfoView'
import PenaltyDecisionView from '../../../components/business/PenaltyDecisionView'
import CaseListSelect from '../../../components/business/CaseListSelect'
import RelCaseFormListSelect from '../../../components/business/RelCaseFormListSelect'
import { ddcomplexPicker, getApproverIds } from '../../../service/ddJsApi.service'
import { getAgentId, getCurrentUserInfo } from '../../../service/currentUser.service'
import { getMainUrl, isNotEmpty, formatDate, isEmpty } from '../../../utils/util'
import { startProcessInstance } from '../../../api/ddApi'
import { getDetaildata, commonOperateApi, getDictionaryItems, getFormsDetailByEventInfoId } from '../../../api/regulatoryApi'
var timer = null
/**
 * 结案报告
 */
export default {
  name: 'CaseFinalReportCreate',
  components: {
    PartyInfoView,
    PenaltyDecisionView,
    CaseListSelect,
    RelCaseFormListSelect
  },
  props: {

  },
  data () {
    this.requiredRule = [
      { required: true, message: ' ' }
    ]
    return {
      loading: false,
      showPopup: false,
      showRelFormsPopup: false,
      taskInfo: null,
      caseInfo: {},
      penalizeBook: {
        BookTitle: '当场执法决定书'
      },
      caseFinalReport: {
        CaseDetail: ''
      },
      defaultTypesofpartieID: null
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
  mounted () {
  },
  methods: {
    init () {
      const queryParam = this.$route.query
      const taskId = queryParam.taskid
      if (isNotEmpty(taskId)) {
        this.loadTaskInfo(taskId)
      }
      this.loadDic()
    },
    loadDic () {
      getDictionaryItems('Typesofparties').then(items => {
        if (isNotEmpty(items)) {
          this.defaultTypesofpartieID = items[0].ItemCode
        }
      })
    },
    loadTaskInfo (taskId) {
      getDetaildata('work_task', taskId).then(res => {
        this.taskInfo = res
        this.loadCaseInfo(res.CaseID)
        this.loadPenalizeBook(res.EventInfoId)
      })
    },
    loadCaseInfo (CaseID) {
      getDetaildata('case_Info', CaseID).then((res) => {
        if (res) {
          this.caseInfo = res
        }
      })
    },
    loadPenalizeBook (eventInfoId) {
      getFormsDetailByEventInfoId(eventInfoId, 'law_punishmentInfo').then((res) => {
        if (res) {
          this.penalizeBook = {
            ...res.MainForm,
            LawParties: res.Party
          }
          console.log('LawParties', this.penalizeBook)
          this.caseFinalReport.CaseDetail = this.penalizeBook.Illegalfacts + this.penalizeBook.IllegalbasisIDs + this.penalizeBook.PunishmentbasisIDs
        }
      })
    },
    handleShowRelFormsPopup () {
      this.showRelFormsPopup = true
    },
    onRelFormsPopupConfirm (result) {
      this.penalizeBook.RelCaseFormDesc = '已选择'
      this.penalizeBook.RelCaseForms = result
      this.showRelFormsPopup = false
    },
    handleShowSelectCase () {
      this.showPopup = true
    },
    onCloseCase () {
      this.showPopup = false
    },
    onCaseConfirm (caseInfo) {
      this.caseInfo = caseInfo
      this.loadPenalizeBook(caseInfo.EventInfoId)
      this.showPopup = false
    },
    handelViewPenalizeBook () {
      var id = this.penalizeBook.ID
      this.$router.push({ name: 'PenalizeBookDetial', query: { id: id } })
    },
    onSubmit (values) {
      ddcomplexPicker().then((approve) => {
        var caseReport = {
          CaseId: this.caseInfo.Id,
          CaseDetail: this.caseFinalReport.CaseDetail,
          PunishmentId: isNotEmpty(this.penalizeBook) ? this.penalizeBook.ID : null,
          ExecuteState: '已执行'
        }
        var model = {
          SourceTaskId: isNotEmpty(this.taskInfo) ? this.taskInfo.ID : null,
          EventInfoId: this.caseInfo.EventInfoId,
          caseReport
        }
        this.loading = true
        commonOperateApi('FINISH', 'case_report', model).then((result) => {
          if (result) {
            var userInfo = getCurrentUserInfo()
            const data = {}
            data.AgentId = parseInt(getAgentId())
            data.ProcessCode = 'PROC-CEF3CE57-8E80-4718-8B56-44973CF24FA9'
            data.OriginatorUserId = userInfo.userid
            data.DeptId = userInfo.deptid
            data.Approvers = getApproverIds(approve)
            data.FormComponentValues = JSON.stringify(this.getFormComponentValues())
            startProcessInstance(data).then(res => {
              var msg = '提交审批流程成功'
              this.$toast.success(msg)
              this.goToLawForm()
            }).finally(() => {
              this.loading = false
            })
          } else {
            this.loading = false
          }
        }).catch(() => {
          this.loading = false
        })
      })
    },
    onFailed (errorInfo) {
      console.log('failed', errorInfo)
    },
    goToLawForm () {
      timer = setTimeout(() => {
        this.$router.push({ name: 'layforms' })
      }, 1000)
    },
    getFormComponentValues () {
      var webUrl = getMainUrl()
      var lawPartys = this.getLawPartys()
      var formComponentValues = [
        {
          name: '案由',
          value: this.caseInfo.CauseOfAction
        },
        {
          name: '案件来源',
          value: '网络上报'
        },
        {
          name: '立案时间',
          value: formatDate(this.caseInfo.CreateDate, 'YYYY-MM-DD')
        },
        {
          name: '案发地点',
          value: isEmpty(this.caseInfo.IncidentAddress) ? '' : this.caseInfo.IncidentAddress
        },
        {
          name: '简要案情及调查经过',
          value: this.caseFinalReport.CaseDetail
        },
        {
          name: '执行情况',
          value: '已执行'
        },
        {
          name: '处罚决定',
          value: `${webUrl}#/PenalizeBookDetial?id=${this.penalizeBook.ID}`
        },
        {
          name: '案件详情',
          value: `${webUrl}#/caseDetails?id=${this.caseInfo.ID}`
        },
        {
          name: '当事人',
          value: [
            // [ { name: '名称', value: '张三 | 男 | 25岁 | 无职业' },
            //   { name: '身份证', value: '435526198032565545' },
            //   { name: '电话', value: '13548778897' },
            //   { name: '地址', value: '云南省玉溪市' }
            // ],
            // [
            //   { name: '名称', value: '玉溪自然科技有限公司' },
            //   { name: '法人', value: '张某' },
            //   { name: '身份证', value: '435526198032565545' },
            //   { name: '电话', value: '13548778897' },
            //   { name: '地址', value: '云南省玉溪市' }
            // ]
            ...lawPartys
          ]
        }
      ]
      var barInfo = null
      if (isNotEmpty(this.caseInfo.CreateUser)) {
        barInfo = {
          name: '案件承办人',
          value: this.caseInfo.CreateUser
        }
      }
      var zjmhInfo = null
      if (isNotEmpty(this.caseInfo.Jobnumber)) {
        zjmhInfo = {
          name: '证件编号',
          value: this.caseInfo.Jobnumber
        }
      }
      if (isNotEmpty(barInfo)) {
        formComponentValues.push(barInfo)
      }
      if (isNotEmpty(zjmhInfo)) {
        formComponentValues.push(zjmhInfo)
      }
      console.log('formComponentValues', formComponentValues)
      return formComponentValues
    },
    getLawPartys () {
      const lawPartys = []
      if (this.penalizeBook.LawParties) {
        this.penalizeBook.LawParties.forEach(item => {
          var partyItem = this.getLawPartyItem(item)
          lawPartys.push(partyItem)
        })
      }
      return lawPartys
    },
    getLawPartyItem (party) {
      var partyItem = []
      if (party.TypesofpartiesID === this.defaultTypesofpartieID) {
        var title = `${party.Name} | ${party.Gender} | ${party.Occupation}`
        party.title = title
        partyItem = [
          { name: '名称', value: party.title },
          { name: '身份证', value: party.IDcard },
          { name: '电话', value: party.Contactnumber },
          { name: '地址', value: party.address }
        ]
      } else {
        party.title = party.Name
        partyItem = [
          { name: '名称', value: party.title },
          { name: '法人', value: party.Nameoflegalperson },
          { name: '身份证', value: party.IDcard },
          { name: '电话', value: party.Contactnumber },
          { name: '地址', value: party.address }
        ]
      }
      return partyItem
    }

  }
}
</script>

<style lang="less" scoped>

</style>
