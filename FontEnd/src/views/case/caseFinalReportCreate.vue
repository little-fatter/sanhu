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
        <a-col :span="20" class="border-bottom">
          <span class="page-title-border"></span>
          <span class="page-title">结案报告</span>
        </a-col>
      </a-row>
    </div>
    <div class="case-body">
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="10">
          <span class="ant-col-4">案由</span>
          <span class="ant-col-16">
            {{ caseInfo.CauseOfAction || '乱丢垃圾' }}
          </span>
        </a-col>
        <a-col :span="10">
          <span class="ant-col-4">案件号</span>
          <span class="ant-col-16">
            {{ caseInfo.CaseNumber || '案456【12】36号' }}
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
            {{ caseInfo.CaseType || 'other' }}
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
          <div class="ant-col-16" @click="handelViewPenalizeBook">
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
            <a-button block type="primary" icon="check" @click="onSubmit">提交审批</a-button>
          </span>
        </a-col>
      </a-row>
    </div>
    <div>
      <select-case ref="selectCase" @on-select="selectCase"></select-case>
    </div>
  </div>
</template>

<script>
import { getDictionary, commonOperateApi, getDetails, getFormDetail } from '../../api/sampleApi'
import SelectCase from '../../components/business/SelectCase'
import PartyView from './components/partyView'
import { isNotEmpty } from '../../utils/util'
export default {
  name: 'InventoryCreate',
  components: { SelectCase, PartyView },

  props: {

  },
  data () {
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
  created () {
  },
  mounted () {
    if (!this.$route.query.taskid) { this.$refs.selectCase.open() } else {
      this.init()
    }
  },
  methods: {
    selectCase (record) {
      this.caseInfo = record
      console.log(this.caseInfo)
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
        }
      })
    },
    loadPenalizeBook (eventInfoId) {
      getFormDetail(eventInfoId, 'law_punishmentInfo').then((res) => {
        if (res) {
          this.penalizeBook = {
            ...res.MainForm,
            LawParties: res.law_party
          }
          console.log('LawParties', this.penalizeBook)
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
    }
  }
}
</script>
