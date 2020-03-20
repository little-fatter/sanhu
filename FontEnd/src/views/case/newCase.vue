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
  <div>
    <div>
      <select-event ref="selectEvent" @on-select="selectEvent"></select-event>
    </div>
    <div class="case-box">
      <div class="case-top">
        <a-row type="flex" justify="center">
          <a-col :span="17" class="border-bottom">
            <span class="page-title-border"></span>
            <span class="page-title">创建案件</span>
          </a-col>
          <a-col :span="3" class="border-bottom">
            <a-button @click="openEventModal" type="primary">选择关联事件</a-button>
          </a-col>
        </a-row>
      </div>
      <div class="case-body">
        <a-row class="margin-bottom30" type="flex" justify="center">
          <a-col :span="20">
            <span class="ant-col-2">案由</span>
            <span class="ant-col-20">
              <a-textarea
                v-model="caseInfo.CauseOfAction"
                placeholder="请填写案由"
                :autosize="{ minRows: 2, maxRows: 10 }"
              />
            </span>
          </a-col>
        </a-row>
        <a-row class="margin-bottom30" type="flex" justify="center">
          <a-col :span="10">
            <span class="ant-col-4">案件类型</span>
            <span class="ant-col-16">
              <a-select placeholder="请选择" class="ant-col-24" v-model="caseInfo.CaseType" @change="CaseTypeChoiceEvn">
                <a-select-option v-for="item in Case_Type" :key="item.ID+'@'" :value="item.ItemCode" >{{ item.Title }}</a-select-option>
              </a-select>
            </span>
          </a-col>
          <a-col :span="10">
            <span class="ant-col-4">案件来源</span>
            <span class="ant-col-16">
              <a-select placeholder="请选择" class="ant-col-24" v-model="caseInfo.Sourceofcase" @change="CaseSourceEvn">
                <a-select-option v-for="item in CaseSourceType" :key="item.ID+'@'" :value="item.ItemCode">{{ item.Title }}</a-select-option>
              </a-select>
            </span>
          </a-col>
        </a-row>
        <a-row class="margin-bottom30" type="flex" justify="center">
          <a-col :span="10">
            <span class="ant-col-4">适用程序</span>
            <span class="ant-col-16">
              <a-select placeholder="请选择" class="ant-col-24" v-model="caseInfo.caseFunction" @change="CaseApplicableProcedureTypeEvn">
                <a-select-option v-for="item in CaseApplicableProcedureType" :key="item.ID+'@'" :value="item.ID">{{ item.Title }}</a-select-option>
              </a-select>
            </span>
          </a-col>
          <a-col :span="10">
            <span class="ant-col-4">事发时间</span>
            <span class="ant-col-16">
              <a-date-picker
                showTime
                placeholder="请选择时间"
                format="YYYY-MM-DD HH:mm"
                @change="selectTime"
              />
            </span>
          </a-col>
        </a-row>
        <a-row class="margin-bottom30" type="flex" justify="center">
          <a-col :span="20">
            <span class="ant-col-2">事发地点</span>
            <span class="ant-col-8">
              <a-input placeholder="请输入事发地点" class="ant-col-24" v-model="caseInfo.IncidentAddress">
              </a-input>
            </span>
          </a-col>
        </a-row>
        <a-row class="margin-bottom30" type="flex" justify="center">
          <a-col :span="20">
            <span class="ant-col-2">当事人</span>
            <party-info ref="partyInfo" :initData="caseInfo.LawParties"></party-info>
          </a-col>
        </a-row>
        <a-row class="margin-bottom30" type="flex" justify="center">
          <a-col :span="20">
            <span class="ant-col-2">协办人</span>
            <span class="ant-col-20">
              <span v-show="caseInfo.CoOrganizer" style="margin-right:20px;">{{ caseInfo.CoOrganizer }}</span>
              <a-button type="primary" @click="$refs.selectPeople.open()">选择人员</a-button>
            </span>
          </a-col>
        </a-row>
        <a-row class="margin-bottom30" type="flex" justify="center">
          <a-col :span="8">
            <span class="ant-col-4"></span>
            <span class="ant-col-16">
              <a-button @click="onReturn" style="margin-right:20px;">返回</a-button>
              <a-button v-show="isRelated" type="primary" icon="check" @click="onSubmit">确认提交</a-button>
            </span>
          </a-col>
        </a-row>
      </div>
      <select-people ref="selectPeople" @on-select="handleSelect" />
      <next-task-modal @onPopupConfirm="onTaskConfirm" ref="taskModel"></next-task-modal>
    </div>
  </div>
</template>

<script>
import { getDictionary, commonOperateApi, getDetails, getFormDetail, TaskTypeDic } from '../../api/sampleApi'
import SelectPeople from '@/components/business/SelectPeople'
import PartyInfo from './components/party'
import NextTaskModal from '@/components/business/NextTaskModal'
import SelectEvent from '@/components/business/SelectEvent'
import { isNotEmpty, formatTime, getCaseTaskDefault, getNextTask } from '../../utils/util'
export default {
  name: 'NewCase',
  components: { PartyInfo, SelectEvent, SelectPeople, NextTaskModal },
  data () {
    return {
      titleInputShow: false,
      bodyInputShow: false,
      isRelated: false,
      taskTitle: 'title', // 任务名
      taskContent: 'content', // 任务内容
      visible: false, // 弹窗默认不显示,
      taskInfo: null,
      event: {},
      eventInfoId: null,
      caseInfo: {
        CauseOfAction: '', // 案由
        CaseType: null, // 案件类型
        Sourceofcase: null, // 案件来源
        caseFunction: '请选择', // 案件适用程序
        IncidentTime: '', // 事发时间
        IncidentAddress: '', // 事发地点
        IncidentAddressXY: '',
        CoOrganizerId: '',
        CoOrganizer: '', // 协办人数组
        LawParties: []
      },
      waitingCasePartin: [{ id: '1', name: '张柳' }, { id: '2', name: '李思' }, { id: '3', name: '王琴' }, { id: '4', name: '陈华' }], // 候选协办人
      Case_Type: [], // 案件类型
      CaseSourceType: [], // 案件来源
      CaseApplicableProcedureType: []// 处理程序
    }
  },
  created () {
    this.init()
  },
  methods: {
    openEventModal () {
      this.$refs.selectEvent.open()
    },
    selectEvent (record) {
      this.event = record
      this.isRelated = true
      this.loadEventCheck(record)
    },
    onblur () {
      this.titleInputShow = false
      this.bodyInputShow = false
    },
    init () {
      const queryParam = this.$route.query
      const taskId = queryParam.taskid
      if (isNotEmpty(taskId)) {
        this.loadTaskInfo(taskId)
      }
      this.getCaseType()
      this.getCaseSourceType()
      this.getApplicableProcedureType()
    },
    loadTaskInfo (taskId) {
      getDetails('work_task', taskId).then(res => {
        this.taskInfo = res
        this.eventInfoId = res.EventInfoId
        this.loadEventInfo(res.EventInfoId)
      })
    },
    loadEventInfo (EventInfoId) {
      getDetails('event_info', EventInfoId).then((res) => {
        if (res) {
          this.event = res
          this.isRelated = true
          this.loadEventCheck(res)
        }
      })
    },
    loadEventCheck (event) {
      getFormDetail('task_survey', event.objId).then((res) => {
        if (res) {
          this.caseInfo = {
            ...this.caseInfo,
            ...res.MainForm,
            LawParties: res.law_party
          }
        } else {
          this.caseInfo.IncidentTime = formatTime(event.reportTime, 'YYYY-MM-DD HH:mm')
          this.caseInfo.IncidentAddress = event.address
          var incidentAddressXY = ''
          if (isNotEmpty(event.lng) && isNotEmpty(event.lat)) {
            incidentAddressXY = event.lng + ',' + event.lat
          }
          this.caseInfo.IncidentAddressXY = incidentAddressXY
        }
      })
    },
    onTaskConfirm (result) {
      var data = result.data
      var nextTask = null
      var userInfo = {}
      nextTask = getNextTask(TaskTypeDic.Punishment, userInfo.userid, 'penalizeBookCreate', result.taskTitle, result.taskContent, data.Attachments, this.event.evtFileUrl, this.event.objId)
      data.NextTasks.push(nextTask)
      this.save(data)
    },
    onSubmit () {
      var caseBreakLow = this.$refs.partyInfo.getResult()
      var caseInfo = {
        ...this.caseInfo,
        caseBreakLow: caseBreakLow,
        IncidentAddressXY: this.caseInfo.IncidentAddressXY
      }
      var data = {
        SourceTaskId: isNotEmpty(this.taskInfo) ? this.taskInfo.ID : null,
        EventInfoId: this.eventInfoId,
        caseInfo,
        NextTasks: []
      }
      data.LawParties = caseBreakLow
      var nextTask = null
      nextTask = {
        TaskType: '1', // 任务类型
        AssignUsers: '165906044420484870', // 执行人
        TaskContent: this.taskContent, // 任务描述
        EventInfoId: this.eventInfoId, // 事件id
        CaseID: '', // 案件id
        ExpectedCompletionTime: '2020-02-03', // 期望完成时间
        MainHandler: '测试主办人', // 主办人
        CoOrganizer: '协办人', // 协办人
        TaskTitle: this.taskTitle, // 任务标题
        TaskImg: '', // 任务图片
        AppLinks: '', // app跳转地址
        PCLinks: '' // pc跳转地址
      }
      data.NextTasks.push(nextTask)
      var defaultTask = getCaseTaskDefault(this.caseInfo, '当场处罚')
      this.$refs.taskModel.show(defaultTask.title, defaultTask.content, data)
    },
    // 返回表单类型
    onReturn () {
      this.$router.push('/data-manage/form/form-add-list')
    },
    // 创建案件
    save (data) {
      commonOperateApi('FINISH', 'case_Info', data).then((res) => {
        if (res) {
          this.$message.success('创建成功', 1)
          this.$router.push('/data-manage/form/form-add-list')
        } else {
          this.$message.error('创建失败', 1)
        }
      })
    },
    // 案发时间选择
    selectTime (value, dateString) {
      this.caseInfo.IncidentTime = dateString
    },
    // 获取案件类型
    getCaseType () {
      getDictionary({ model: 'res_dictionary', context: 'CaseType' }).then(res => {
        res.map(item => {
          this.Case_Type.push({ ID: item.ID, Title: item.Title, ItemCode: item.ItemCode })
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取案件来源
    getCaseSourceType () {
      getDictionary({ model: 'res_dictionary', context: 'CaseSourceType' }).then(res => {
        res.map(item => {
          this.CaseSourceType.push({ ID: item.ID, Title: item.Title, ItemCode: item.ItemCode })
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取案件适用程序
    getApplicableProcedureType () {
      getDictionary({ model: 'res_dictionary', context: 'ApplicableProcedureType' }).then(res => {
        res.map(item => {
          this.CaseApplicableProcedureType.push({ ID: item.ID, Title: item.Title, ItemCode: item.ItemCode })
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 选中的案件类型
    CaseTypeChoiceEvn (msg) {
      this.caseInfo.CaseType = msg
    },
    // 选中的案件来源
    CaseSourceEvn (msg) {
      this.caseInfo.Sourceofcase = msg
    },
    // 选中案件 处理程序
    CaseApplicableProcedureTypeEvn (msg) {
      console.log(msg)
    },
    handleSelect (record) {
      this.caseInfo.CoOrganizer = record.Name
      this.caseInfo.CoOrganizerId = record.Id
    }
  },
  // 生命周期钩子
  mounted () {
  }
}
</script>

<style scoped lang="less">
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
