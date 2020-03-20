<style scoped>
/deep/ .ant-calendar-picker {
  width: 100% !important;
}

/deep/ .ant-col-20 .ant-input-group-addon {
  background-color: #1890ff;
}

/deep/ .ant-col-20 .ant-btn {
  box-shadow: none;
}

/deep/ .ant-col-20 .ant-btn:hover,
/deep/ .ant-col-20 .ant-btn:focus {
  background-color: #1890ff;
  border-color: #1890ff;
}
</style>
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
        <a-col :span="17" class="border-bottom">
          <span class="page-title-border"></span>
          <span class="page-title">结案报告</span>
        </a-col>
        <a-col :span="3" class="border-bottom">
          <a-button @click="openEventModal" type="primary">选择关联案件</a-button>
        </a-col>
      </a-row>
    </div>
    <div class="case-body">
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="10">
          <span class="ant-col-4">案由</span>
          <span class="ant-col-16">
            {{ caseInfo.CauseOfAction }}
          </span>
        </a-col>
        <a-col :span="10">
          <span class="ant-col-4">案件号</span>
          <span class="ant-col-16">
            {{ caseInfo.CaseNumber }}
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="20">
          <span class="ant-col-2">当事人</span>
          <span class="ant-col-16">
            <party-view :caseBreakLow="penalizeBook.LawParties"></party-view>
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="10">
          <span class="ant-col-4">案件类型</span>
          <span class="ant-col-16">
            {{ caseInfo.CaseType }}
          </span>
        </a-col>
        <a-col :span="10">
          <span class="ant-col-4">简要案情及调查经过</span>
          <span class="ant-col-16">
            {{ caseFinalReport.CaseDetail }}
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="10">
          <span class="ant-col-4">处罚决定</span>
          <div class="ant-col-16" @click="handelViewPenalizeBook" style="cursor: pointer">
            {{ penalizeBook.BookTitle }}
          </div>
        </a-col>
        <a-col :span="10">
          <span class="ant-col-4">执行情况</span>
          <div class="ant-col-16" >
            已执行
          </div>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="8">
          <span class="ant-col-4"></span>
          <span class="ant-col-16">
            <a-button @click="onReturn" style="margin-right:20px;">返回</a-button>
            <a-button v-show="isRelated" type="primary" icon="check" @click="onSubmit">提交审批</a-button>
          </span>
        </a-col>
      </a-row>
    </div>
    <div>
      <select-case ref="selectCase" @on-select="selectCase"></select-case>
      <select-people ref="selectPeople" @on-select="handleSelect" />
    </div>
  </div>
</template>

<script>
import SelectPeople from '@/components/business/SelectPeople'
import { getDictionary, commonOperateApi, getDetails, getFormDetail } from '../../api/sampleApi'
import appConfig from '@/config/app.config'
import SelectCase from '../../components/business/SelectCase'
import PartyView from './components/partyView'
import moment from 'moment'
import { isNotEmpty } from '../../utils/util'
export default {
  name: 'InventoryCreate',
  components: { SelectCase, PartyView, SelectPeople },

  props: {

  },
  data () {
    return {
      isRelated: false,
      taskInfo: null,
      caseInfo: {},
      penalizeBook: {
      },
      caseFinalReport: {
        CaseDetail: ''
      },
      defaultTypesofpartieID: null
    }
  },
  created () {
  },
  mounted () {
    if (this.$route.query.taskid) {
      this.init()
    }
  },
  methods: {
    // 返回表单类型
    onReturn () {
      this.$router.push('/data-manage/form/form-add-list')
    },
    openEventModal () {
      this.$refs.selectCase.open()
    },
    selectCase (record) {
      this.caseInfo = record
      this.isRelated = true
      this.loadPenalizeBook(record.EventInfoId)
      this.loadDic()
    },
    init () {
      const queryParam = this.$route.query
      const taskId = queryParam.taskid
      if (isNotEmpty(taskId)) {
        this.loadTaskInfo(taskId)
      }
      this.loadDic()
    },
    loadDic () {
      getDictionary({ model: 'res_dictionary', context: 'Typesofparties' }).then(items => {
        if (isNotEmpty(items)) {
          this.defaultTypesofpartieID = items[0].ItemCode
        }
      })
    },
    loadTaskInfo (taskId) {
      getDetails('work_task', taskId).then(res => {
        this.taskInfo = res
        this.loadCaseInfo(res.CaseID)
        this.loadPenalizeBook(res.EventInfoId)
      })
    },
    loadCaseInfo (CaseID) {
      getDetails('case_Info', CaseID).then((res) => {
        if (res) {
          this.caseInfo = res
          this.isRelated = true
        }
      })
    },
    loadPenalizeBook (eventInfoId) {
      getFormDetail('law_punishmentInfo', eventInfoId).then((res) => {
        if (res) {
          this.penalizeBook = {
            ...res.MainForm,
            LawParties: res.law_party,
            BookTitle: '当场执法决定书'
          }
          this.caseFinalReport.CaseDetail = this.penalizeBook.Illegalfacts + this.penalizeBook.IllegalbasisIDs + this.penalizeBook.PunishmentbasisIDs
        }
      })
    },
    // 查看处罚决定书
    handelViewPenalizeBook () {
      var id = this.penalizeBook.ID
      this.$router.push({ name: 'judgmentDetail', query: { id: id } })
    },
    onSubmit () {
      // 提交结案报告审批
      this.$refs.selectPeople.open()
    },
    handleSelect (record) {
      console.log(record)
      this.onApproval(record.AccountId)
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
    },
    getFormComponentValues () {
      var webUrl = appConfig.AppHost
      var lawPartys = this.getLawPartys()
      var formComponentValues = [
        {
          name: '案由',
          value: this.caseInfo.CauseOfAction
        },
        {
          name: '案件类型',
          value: '网络上报'
        },
        {
          name: '立案时间',
          value: moment(this.caseInfo.CreateDate).format('YYYY-MM-DD')
        },
        {
          name: '案发地点',
          value: isNotEmpty(this.caseInfo.IncidentAddress) ? this.caseInfo.IncidentAddress : ''
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
          value: `${webUrl}#/PromptlyPunishNote?id=${this.penalizeBook.ID}`
        },
        {
          name: '案件详情',
          value: `${webUrl}#/caseDetails?id=${this.caseInfo.ID}`
        },
        {
          name: '当事人',
          value: [
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
      return formComponentValues
    },
    onApproval (id) {
      var FormComponentValues = JSON.stringify(this.getFormComponentValues())
      var caseReport = {
        CaseId: this.caseInfo.ID,
        CaseDetail: this.caseFinalReport.CaseDetail,
        PunishmentId: isNotEmpty(this.penalizeBook) ? this.penalizeBook.ID : null,
        ExecuteState: '已执行'
      }
      var oapiProcessinstanceCreateRequest = {
        AgentId: appConfig.agentId,
        ProcessCode: appConfig.auditCondig.CaseFinalReportProcessCode,
        approvers: id,
        FormComponentValues
      }
      var model = {
        SourceTaskId: isNotEmpty(this.caseInfo) ? this.caseInfo.TaskId : null,
        EventInfoId: this.caseInfo.EventInfoId,
        CaseId: this.caseInfo.ID,
        caseReport,
        oapiProcessinstanceCreateRequest
      }
      commonOperateApi('FINISH', 'case_report', model).then((result) => {
        this.$message.success('操作成功')
        this.$router.push('/data-manage/form/form-add-list')
      })
    }
  }
}
</script>
