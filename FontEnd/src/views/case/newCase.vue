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
      <select-case ref="selectCase" @on-select="selectCase"></select-case>
    </div>
    <div class="case-box">
      <div class="case-top">
        <a-row type="flex" justify="center">
          <a-col :span="20" class="border-bottom">
            <span class="page-title-border"></span>
            <span class="page-title">创建案件</span>
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
            <party-info ref="partyInfo"></party-info>
          </a-col>
        </a-row>
        <a-row class="margin-bottom30" type="flex" justify="center">
          <a-col :span="20">
            <span class="ant-col-2">协办人</span>
            <span class="ant-col-20">
              <a-select class="ant-col-9" labelInValue @change="handleChange" placeholder="请选择">
                <a-select-option v-for="(item,index) in waitingCasePartin" :value="item.id" :key="index + '12'">{{ item.name }}</a-select-option>
              </a-select>
            </span>
          </a-col>
        </a-row>
        <a-row class="margin-bottom30" type="flex" justify="center">
          <a-col :span="8">
            <span class="ant-col-4"></span>
            <span class="ant-col-16">
              <a-button block type="primary" icon="check" @click="onSubmit">确认提交</a-button>
            </span>
          </a-col>
        </a-row>
      </div>
      <a-modal
        v-model="visible"
        onOk="handleOk"
      >
        <template slot="title">
          <span v-show="!titleInputShow" @click="titleInputShow = true">{{ taskTitle }}</span>
        <!-- <a-input v-show="titleInputShow" v-model="taskTitle" @pressEnter="onblur"></a-input> -->
        </template>
        <p v-show="!bodyInputShow" @click="bodyInputShow = true">{{ taskContent }}</p>
        <a-input v-show="bodyInputShow" v-model="taskContent" @pressEnter="onblur"></a-input>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { getDictionary, commonOperateApi, getDetails } from '../../api/sampleApi'
import { getCurrentUser } from '../../config/currentUser'
import PartyInfo from './components/party'
import SelectCase from '../../components/business/SelectCase'
import { isNotEmpty } from '../../utils/util'
export default {
  name: 'NewCase',
  components: { PartyInfo, SelectCase },
  data () {
    return {
      titleInputShow: false,
      bodyInputShow: false,
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
        IncidentTime: '', // 案发时间
        IncidentAddress: '',
        IncidentAddressXY: '',
        CoOrganizerId: '',
        CoOrganizer: '' // 协办人数组
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
    selectCase (record) {
      this.caseInfo = record
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
        }
      })
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
      // var userInfo = getCurrentUser()
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
      if (isNotEmpty(caseInfo.CauseOfAction) && isNotEmpty(caseInfo.CoOrganizer)) {
        this.save(data)
      } else {
        this.$message.error('填写不完整', 1)
      }
    },
    save (data) {
      commonOperateApi('FINISH', 'case_Info', data).then((res) => {
        if (res) {
          this.$message.success('创建成功', 1)
          this.$router.push('/data-manage/form/form-add-list')
        } else {
          this.$message.error('创建失败', 1)
        }
      }).finally(() => {
      })
    },
    // 协办人输入
    handleChange (value, index) {
      this.caseInfo.CoOrganizer = value.label
      this.caseInfo.CoOrganizerId = value.key
    },
    // 案发时间选择
    selectTime (value, dateString) {
      this.caseInfo.IncidentTime = dateString
    },
    // 获取案件类型
    getCaseType () {
      getDictionary({ model: 'res_dictionary', context: 'CaseType' }).then(res => {
        console.log(res)
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
    }
  },
  // 生命周期钩子
  mounted () {
    this.$refs.selectCase.open()
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
