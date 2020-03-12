<template>
  <div class="form_wapper">
    <van-cell-group title="任务信息" v-if="taskInfo">
      <van-cell title="任务" :value="taskInfo.TaskTypeInfo[1]"></van-cell>
      <van-cell title="交办时间" :value="taskInfo.InitiationTime"></van-cell>
      <van-cell title="期望时间" :value="taskInfo.ExpectedCompletionTime"></van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-field
        v-model="event.evtTypeDisplayName"
        label="事件"
        placeholder="请选择事件"
        :readonly="true"
        clickable
        @click="handleShowSelectEvent"
      >
        <van-icon name="arrow" color="#1989fa" slot="right-icon" @click="handleShowSelectEvent" size="25" />
      </van-field>
    </van-cell-group>
    <van-cell-group title="案件信息" v-if="event.evtTypeDisplayName">
      <van-form @submit="onSubmit" @failed="onFailed">
        <van-cell title="案件号" value="自动生成"></van-cell>
        <van-field
          name="CauseOfAction"
          v-model="caseInfo.CauseOfAction"
          rows="2"
          autosize
          label="案由"
          type="textarea"
          maxlength="200"
          placeholder="请输入案由"
          show-word-limit
          required
          :rules="requiredRule"
        />
        <van-field
          name="CaseType"
          v-model="caseInfo.CaseType"
          label="案件类型"
          readonly
          required
          :rules="requiredRule"
          class="dropdown-menu_noboder">
          <template slot="input">
            <van-dropdown-menu>
              <van-dropdown-item v-model="caseInfo.CaseType" :options="caseTypeoptions" />
            </van-dropdown-menu>
          </template>
        </van-field>
        <van-field
          name="Sourceofcase"
          v-model="caseInfo.Sourceofcase"
          label="案件来源"
          readonly
          required
          :rules="requiredRule"
          class="dropdown-menu_noboder">
          <template slot="input">
            <van-dropdown-menu>
              <van-dropdown-item v-model="caseInfo.Sourceofcase" :options="sourceofcaseoptions" />
            </van-dropdown-menu>
          </template>
        </van-field>
        <van-field
          readonly
          clickable
          name="IncidentTime"
          :value="caseInfo.IncidentTime"
          label="事发时间"
          :rules="requiredRule"
          placeholder="点击选择日期"
          @click="showCalendar = true"
          required
        />
        <!-- <van-calendar v-model="showCalendar" @confirm="handleEventTimeConfirm" /> -->
        <van-popup v-model="showCalendar" position="bottom" :style="{ height: '80%' }">
          <van-datetime-picker
            type="datetime"
            v-model="currentDate"
            @confirm="handleEventTimeConfirm"
            @cancel="showCalendar = false"
          />
        </van-popup>
        <van-field
          name="IncidentAddress"
          v-model="caseInfo.IncidentAddress"
          label="事发地点"
          placeholder="请输入事发地点"
          required
          :rules="requiredRule"
          rows="2"
          autosize
          type="textarea"
        >
          <van-icon name="location" color="#1989fa" slot="right-icon" @click="handleShowLocation" size="30" />
        </van-field>
        <party-info ref="party" :initData="caseInfo.LawParties"></party-info>
        <van-field
          v-model="caseInfo.CoOrganizer"
          label="协办人"
          placeholder="请选择协办人"
          :readonly="true"
          @click="handleSelecOrganiser"
        >
          <van-icon name="arrow" color="#1989fa" slot="right-icon" @click="handleSelecOrganiser" size="30" />
        </van-field>

        <div class="operate-area single-save">
          <van-button type="info" :loading="loading" size="large" native-type="submit">保存</van-button>
        </div>
      </van-form>
    </van-cell-group>
    <event-list-select :showPopup="showPopup" @onClosePopup="onCloseEvent" @onPopupConfirm="onEventConfirm"></event-list-select>
    <next-task-modal @onPopupConfirm="onTaskConfirm" ref="taskModel"></next-task-modal>
  </div>
</template>

<script>
import { formatDate, isNotEmpty, getNextTask, getCaseTaskDefault } from '../../../utils/util'
import { ddMapSearch, ddgetMapLocation, ddcomplexPicker } from '../../../service/ddJsApi.service'
import PartyInfo from '../../../components/business/PartyInfo'
import EventListSelect from '../../../components/business/EventListSelect'
import { getDictionaryItems, DictionaryCode, getDetaildata, commonOperateApi, TaskTypeDic, getFormsDetailByEventInfoId } from '../../../api/regulatoryApi'
import { getCurrentUserInfo } from '../../../service/currentUser.service'
import NextTaskModal from '../../../components/business/NextTaskModal'
var timer = null
export default {
  name: 'CaseCreate',
  components: {
    PartyInfo,
    EventListSelect,
    NextTaskModal
  },
  props: {

  },
  data () {
    this.requiredRule = [
      { required: true, message: '必填' }
    ]
    return {
      loading: false,
      showPopup: false,
      taskInfo: null,
      caseInfo: {
        CauseOfAction: '',
        CaseType: null,
        Sourceofcase: null,
        IncidentTime: null,
        IncidentAddress: '',
        IncidentAddressXY: '',
        CoOrganizer: '',
        CoOrganizerId: '',
        LawParties: []
      },
      event: {},
      caseTypeoptions: [
      ],
      sourceofcaseoptions: [
      ],
      showCalendar: false,
      currentDate: new Date()
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
      const queryParam = this.$route.query
      const taskId = queryParam.taskid
      if (isNotEmpty(taskId)) {
        this.loadTaskInfo(taskId)
      }
      this.loadCaseTypes()
      this.loadSourceofcases()
    },
    loadTaskInfo (taskId) {
      getDetaildata('work_task', taskId).then(res => {
        this.taskInfo = res
        this.loadEventInfo(res.EventInfoId)
      })
    },
    loadEventInfo (EventInfoId) {
      getDetaildata('event_info', EventInfoId).then((res) => {
        if (res) {
          this.event = res
          this.loadEventCheck(res)
        }
      })
    },
    loadEventCheck (event) {
      getFormsDetailByEventInfoId(event.objId, 'task_survey').then((res) => {
        if (res) {
          this.caseInfo = {
            ...this.caseInfo,
            ...res.MainForm,
            LawParties: res.law_party
          }
        } else {
          this.caseInfo.IncidentTime = formatDate(event.reportTime, 'YYYY-MM-DD HH:mm')
          this.caseInfo.IncidentAddress = event.address
          var incidentAddressXY = ''
          if (isNotEmpty(event.lng) && isNotEmpty(event.lat)) {
            incidentAddressXY = event.lng + ',' + event.lat
          }
          this.caseInfo.IncidentAddressXY = incidentAddressXY
        }
      }).finally(() => {
        this.showPopup = false
      })
    },
    loadSourceofcases () {
      getDictionaryItems(DictionaryCode.CaseSourceType).then((items) => {
        var sourceofcaseoptions = []
        if (isNotEmpty(items)) {
          items.forEach(item => {
            sourceofcaseoptions.push({
              text: item.Title, value: item.ItemCode
            })
          })
          this.caseInfo.Sourceofcase = items[0].ItemCode
        }
        this.sourceofcaseoptions = sourceofcaseoptions
      })
    },
    loadCaseTypes () {
      getDictionaryItems(DictionaryCode.CaseType).then((items) => {
        var caseTypeoptions = []
        if (isNotEmpty(items)) {
          items.forEach(item => {
            caseTypeoptions.push({
              text: item.Title, value: item.ItemCode
            })
          })
          this.caseInfo.CaseType = items[0].ItemCode
        }
        this.caseTypeoptions = caseTypeoptions
      })
    },
    handleEventTimeConfirm (date) {
      this.caseInfo.IncidentTime = formatDate(date, 'YYYY-MM-DD HH:mm')
      this.showCalendar = false
    },
    handleShowLocation () {
      ddgetMapLocation().then(location => {
        ddMapSearch(location.latitude, location.longitude).then((res) => {
          this.caseInfo.IncidentAddress = `${res.province}${res.city}${res.adName}${res.snippet}`
          var incidentAddressXY = ''
          if (isNotEmpty(res.latitude) && isNotEmpty(res.longitude)) {
            incidentAddressXY = res.longitude + ',' + res.latitude
          }
          this.caseInfo.IncidentAddressXY = incidentAddressXY
        })
      })
    },
    caseTypeSelectChange (value) {
      this.caseInfo.CaseType = value
    },
    handleSelecOrganiser () {
      ddcomplexPicker().then((res) => {
        var organiserTemp = {
          name: res.users[0].name,
          id: res.users[0].emplId
        }
        this.caseInfo.CoOrganizer = organiserTemp.name
        this.caseInfo.CoOrganizerId = organiserTemp.id
      })
    },
    onCloseEvent () {
      this.showPopup = false
    },
    handleShowSelectEvent () {
      this.showPopup = true
    },
    onEventConfirm (event) {
      this.event = event
      this.loadEventCheck(event)
    },
    save (data) {
      this.loading = true
      commonOperateApi('FINISH', 'case_Info', data).then((res) => {
        this.$toast.success('操作成功')
        this.goToLawForm()
      }).finally(() => {
        this.loading = false
      })
    },
    onTaskConfirm (result) {
      var data = result.data
      var nextTask = null
      var userInfo = getCurrentUserInfo()
      nextTask = getNextTask(TaskTypeDic.Punishment, userInfo.userid, 'penalizeBookCreate', result.taskTitle, result.taskContent, data.Attachments, this.event.evtFileUrl, this.event.objId)
      data.NextTasks.push(nextTask)
      this.save(data)
    },
    onSubmit (values) {
      var caseInfo = {
        ...this.caseInfo,
        IncidentAddressXY: this.caseInfo.IncidentAddressXY
      }
      var data = {
        SourceTaskId: isNotEmpty(this.taskInfo) ? this.taskInfo.ID : null,
        EventInfoId: this.event.objId,
        caseInfo,
        NextTasks: []
      }
      data.LawParties = this.$refs.party.getResult()
      var defaultTask = getCaseTaskDefault(this.caseInfo, '当场处罚')
      this.$refs.taskModel.show(defaultTask.title, defaultTask.content, data)
    },
    onFailed (errorInfo) {
      console.log('failed', errorInfo)
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

</style>
