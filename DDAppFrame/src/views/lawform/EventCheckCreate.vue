<template>
  <div class="form_wapper">
    <van-cell-group title="任务信息" v-if="taskInfo">
      <van-cell title="任务标题" :value="taskInfo.TaskTitle"></van-cell>
      <van-cell title="任务内容" :value="taskInfo.TaskContent"></van-cell>
      <van-cell title="任务派发时间" :value="taskInfo.InitiationTime"></van-cell>
      <van-cell title="期望完成时间" :value="taskInfo.ExpectedCompletionTime"></van-cell>
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
        <van-icon name="arrow" color="#1989fa" slot="right-icon" size="25" />
      </van-field>
    </van-cell-group>
    <template v-if="event.evtTypeDisplayName">
      <van-cell-group title="事件信息">
        <van-cell title="事发地点">
          <div>
            {{ event.address }}
          </div>
        </van-cell>
        <van-cell title="上报时间">
          <div>
            {{ event.reportTime | dayjs('YYYY-MM-DD HH:mm') }}
          </div>
        </van-cell>
        <van-cell title="上报来源" :value="event.ReportSource"></van-cell>
        <van-cell title="上报人" :value="event.reporterName"></van-cell>
        <van-cell title="事件类型" :value="event.evtTypeDisplayName"></van-cell>
        <van-cell title="事件描述" :value="event.remark"></van-cell>
      </van-cell-group>
      <van-cell-group title="核查处理">
        <van-form @submit="onSubmit" @failed="onFailed">
          <van-field
            name="EventDescribe"
            v-model="eventCheck.EventDescribe"
            rows="2"
            autosize
            label="事件描述"
            type="textarea"
            maxlength="200"
            placeholder="请输入事件描述"
            show-word-limit
            required
            :rules="requiredRule"
          />
          <van-field
            name="EventType"
            v-model="eventCheck.EventType"
            label="事件类型"
            readonly
            required
            :rules="requiredRule"
            class="dropdown-menu_noboder">
            <template slot="input">
              <van-dropdown-menu>
                <van-dropdown-item v-model="eventCheck.EventType" :options="eventTypeption" @change="eventTypeSelectChange" />
              </van-dropdown-menu>
            </template>
          </van-field>
          <van-field
            readonly
            clickable
            name="IncidentTime"
            :value="eventCheck.IncidentTime"
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
            v-model="eventCheck.IncidentAddress"
            label="事发地点"
            placeholder="请输入事发地点"
            rows="2"
            autosize
            type="textarea"
            maxlength="200"
            show-word-limit
            required
            :rules="requiredRule"
          >
            <van-icon name="location" color="#1989fa" slot="right-icon" @click="handleShowLocation" size="30" />
          </van-field>

          <van-field
            name="Result"
            v-model="eventCheck.Result"
            rows="2"
            autosize
            label="处理结果"
            type="textarea"
            maxlength="200"
            placeholder="请输入处理结果"
            show-word-limit
            required
            :rules="requiredRule"
            :border="false"
          />
          <item-group title="证据附件">
            <s-upload
              ref="myupload"
              :accept="accept"
              :initResult="eventCheck.Attachment"
              :sync2Dingding="true"
            >
            </s-upload>
          </item-group>
          <van-field name="Needlawenforcement" label="是否请求执法人员处理">
            <van-radio-group v-model="eventCheck.Needlawenforcement" direction="horizontal" slot="input" @change="handleDealTypeChange">
              <van-radio :name="0">自行处理</van-radio>
              <van-radio :name="1">请求执法</van-radio>
            </van-radio-group>
          </van-field>
          <van-field name="Needtracking" label="是否需要跟踪整改" v-show="showTailAfter">
            <van-radio-group v-model="eventCheck.Needtracking" direction="horizontal" slot="input">
              <van-radio :name="0" style="margin-right:0.7rem">不需要</van-radio>
              <van-radio :name="1">需要跟踪</van-radio>
            </van-radio-group>
          </van-field>
          <div class="operate-area_leftright" v-if="taskInfo">
            <div class="operate-area_left">
              <van-button
                icon="share"
                type="default"
                size="small"
                native-type="button"
                :loading="loading"
                @click="handlePassTo">
                转交
              </van-button>
            </div>
            <div class="operate-area_right">
              <van-button type="default" size="small" native-type="button" :loading="loading" @click="handleShowRejectDialog">
                拒绝
              </van-button>
              <van-button type="info" native-type="submit" size="small" :loading="loading">
                完成
              </van-button>
            </div>
          </div>
          <div class="operate-area single-save" v-else>
            <van-button type="info" :loading="loading" size="large" native-type="submit">保存</van-button>
            <!-- <van-button type="info" :loading="loading" size="large" native-type="button" @click="test">测试</van-button> -->
          </div>
        </van-form>
      </van-cell-group>
    </template>

    <event-list-select :showPopup="showPopup" @onClosePopup="onCloseEvent" @onPopupConfirm="onEventConfirm"></event-list-select>
    <next-task-modal @onPopupConfirm="onTaskConfirm" ref="taskModel"></next-task-modal>
    <van-dialog
      v-model="showRejectDialog"
      title="您确认拒绝吗？"
      show-cancel-button
      :before-close="handleRejectDialogBeforeClose">
      <van-field
        v-model="rejectReason"
        rows="2"
        autosize
        type="textarea"
        maxlength="200"
        placeholder="请输入拒绝理由"
        show-word-limit
        required
      />
    </van-dialog>
  </div>
</template>

<script>
import { isNotEmpty, formatDate, isEmpty, getNextTask, getEventTaskDefault } from '../../utils/util'
import { ddMapSearch, ddgetMapLocation, ddcomplexPicker } from '../../service/ddJsApi.service'
import ItemGroup from '../../components/tools/ItemGroup'
import SUpload from '../../components/file/StandardUploadFile'
import EventListSelect from '../../components/business/EventListSelect'
import { getDetaildata, commonOperateApi, getDictionaryItems, DictionaryCode, TaskTypeDic, getFormsDetailByEventInfoId } from '../../api/regulatoryApi'
import { getCurrentUserInfo } from '../../service/currentUser.service'
import { getWorkrecordPageListbyCurrent } from '../../api/ddApi'
import { AcceptImageAll } from '../../utils/helper/accept.helper'
import NextTaskModal from '../../components/business/NextTaskModal'
var timer = null
/**
 * 事件巡查
 */
export default {
  name: 'EventCheckCreate',
  components: {
    ItemGroup,
    SUpload,
    EventListSelect,
    NextTaskModal
  },
  data () {
    // 必填规则
    this.requiredRule = [
      { required: true, message: ' ' }
    ]
    return {
      accept: AcceptImageAll,
      loading: false,
      taskInfo: null,
      event: {},
      eventCheck: {
        EventDescribe: '',
        EventType: null,
        IncidentTime: null,
        IncidentAddress: '',
        IncidentAddressXY: '',
        Result: '',
        Needlawenforcement: 0,
        Needtracking: 0,
        Attachment: []
      },
      rejectReason: '',
      eventTypeption: [],
      showTailAfter: true,
      showCalendar: false,
      showPopup: false,
      showRejectDialog: false,
      currentDate: new Date(),
      showTaskModel: false
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
      this.loadEventTypes()
    },
    loadEventTypes () {
      getDictionaryItems(DictionaryCode.EventType).then((items) => {
        var eventTypeOptions = []
        if (isNotEmpty(items)) {
          items.forEach(item => {
            eventTypeOptions.push({
              text: item.Title, value: item.ItemCode
            })
          })
          this.eventCheck.EventType = items[0].ItemCode
        }
        this.eventTypeption = eventTypeOptions
      })
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
          this.loadEventCheck(EventInfoId, this.event)
        }
      })
    },
    loadEventCheck (EventInfoId, event) {
      getFormsDetailByEventInfoId(EventInfoId, 'task_patrol').then((res) => {
        console.log('res111', res)
        if (res) {
          this.eventCheck = {
            ...this.eventCheck,
            ...res.MainForm,
            Attachment: res.attachment
          }
        } else {
          this.eventCheck.EventDescribe = event.remark
          // this.eventCheck.EventType = event.evtTypeId
          this.eventCheck.IncidentTime = formatDate(event.reportTime, 'YYYY-MM-DD HH:mm')
          this.eventCheck.IncidentAddress = event.address
          var incidentAddressXY = ''
          if (isNotEmpty(event.lng) && isNotEmpty(event.lat)) {
            incidentAddressXY = event.lng + ',' + event.lat
          }
          this.eventCheck.IncidentAddressXY = incidentAddressXY
        }
      })
    },
    handlePassTo () {
      ddcomplexPicker().then((res) => {
        // var organiserTemp = {
        //   name: res.users[0].name,
        //   id: res.users[0].emplId
        // }
        var user = res.users[0]
        var nextTask = getNextTask(TaskTypeDic.EventCheck, user.emplId, 'eventCheckCreate', '事件核查', this.event.objId)
        var data = {
          SourceTaskId: this.taskInfo.ID,
          EventInfoId: this.event.objId,
          NextTasks: [
            nextTask
          ]
        }
        this.loading = true
        commonOperateApi('HANDOVER', 'work_task', data).then((res) => {
          this.$toast.success('操作成功')
          this.goToLawForm()
        }).finally(() => {
          this.loading = false
        })
      })
    },
    handleShowTailAfter (show) {
      this.showTailAfter = show
    },
    handleDealTypeChange (value) {
      if (value === 1) {
        this.handleShowTailAfter(false)
      } else {
        this.handleShowTailAfter(true)
      }
    },
    eventTypeSelectChange (eventType) {
      this.eventCheck.EventType = eventType
    },
    handleEventTimeConfirm (date) {
      this.eventCheck.IncidentTime = formatDate(date, 'YYYY-MM-DD HH:mm')
      this.showCalendar = false
    },
    handleShowLocation () {
      ddgetMapLocation().then(location => {
        ddMapSearch(location.latitude, location.longitude).then((res) => {
          this.eventCheck.IncidentAddress = `${res.province}${res.city}${res.adName}${res.snippet}`
          var incidentAddressXY = ''
          if (isNotEmpty(res.latitude) && isNotEmpty(res.longitude)) {
            incidentAddressXY = res.longitude + ',' + res.latitude
          }
          this.eventCheck.IncidentAddressXY = incidentAddressXY
        })
      })
    },
    onCloseEvent () {
      console.log('this.showPopup', this.showPopup)
      this.showPopup = false
    },
    handleShowSelectEvent () {
      this.showPopup = true
    },
    onEventConfirm (event) {
      this.event = event
      getFormsDetailByEventInfoId(event.objId, 'task_patrol').then((res) => {
        console.log('res', res)
        if (res) {
          this.eventCheck = {
            ...this.eventCheck,
            ...res.MainForm,
            Attachment: res.attachment
          }
        } else {
          // this.eventCheck.EventType = event.evtTypeId
          this.eventCheck.EventDescribe = event.remark
          this.eventCheck.IncidentTime = formatDate(event.reportTime, 'YYYY-MM-DD HH:mm')
          this.eventCheck.IncidentAddress = event.address
          var incidentAddressXY = ''
          if (isNotEmpty(event.lng) && isNotEmpty(event.lat)) {
            incidentAddressXY = event.lng + ',' + event.lat
          }
          this.eventCheck.IncidentAddressXY = incidentAddressXY
        }
      }).finally(() => {
        this.showPopup = false
      })
      // this.eventCheck.EventDescribe = event.remark
      // this.eventCheck.IncidentTime = formatDate(event.reportTime, 'YYYY-MM-DD HH:mm')
      // this.eventCheck.IncidentAddress = event.address
      // var incidentAddressXY = ''
      // if (isNotEmpty(event.lng) && isNotEmpty(event.lat)) {
      //   incidentAddressXY = event.lng + ',' + event.lat
      // }
      // this.eventCheck.IncidentAddressXY = incidentAddressXY
      // this.showPopup = false
    },
    handleRejectDialogBeforeClose (action, done) {
      if (action === 'confirm') {
        if (isEmpty(this.rejectReason)) {
          this.$toast.fail('请输入拒绝理由')
          done(false)
        } else {
          var data = {
            SourceTaskId: this.taskInfo.ID,
            EventInfoId: this.event.objId,
            Reason: this.rejectReason
          }
          this.loading = true
          commonOperateApi('REJECT', 'work_task', data).then((res) => {
            this.$toast.success('操作成功')
            done()
            this.goToLawForm()
          }).finally(() => {
            this.loading = false
          })
        }
      } else {
        done()
      }
    },
    handleShowRejectDialog () {
      this.showRejectDialog = true
    },
    onTaskConfirm (result) {
      var data = result.data
      var nextTask = null
      var userInfo = getCurrentUserInfo()
      if (this.eventCheck.Needlawenforcement === 1) {
        ddcomplexPicker().then((res) => {
          var user = res.users[0]
          nextTask = getNextTask(TaskTypeDic.OnSpot, user.emplId, 'lawCheckCreate', result.taskTitle, result.taskContent, data.Attachments, this.event.evtFileUrl, this.event.objId)
          data.NextTasks.push(nextTask)
          this.save(data)
        })
      } else {
        nextTask = getNextTask(TaskTypeDic.EventCheck, userInfo.userid, 'eventCheckCreate', result.taskTitle, result.taskContent, data.Attachments, this.event.evtFileUrl, this.event.objId)
        data.NextTasks.push(nextTask)
        this.save(data)
      }
    },
    onSubmit (values) {
      var TaskPatrol = {
        ...values,
        IncidentAddressXY: this.eventCheck.IncidentAddressXY
      }
      var data = {
        SourceTaskId: isNotEmpty(this.taskInfo) ? this.taskInfo.ID : null,
        EventInfoId: this.event.objId,
        TaskPatrol,
        NextTasks: []
      }
      var attachments = this.$refs.myupload.getUploadResult()
      if (attachments && attachments.length > 0) {
        data.Attachments = attachments
      }
      var defaultTask = null
      if (this.eventCheck.Needlawenforcement === 1) {
        defaultTask = getEventTaskDefault(this.event, '现场勘查')
        this.$refs.taskModel.show(defaultTask.title, defaultTask.content, data)
      } else if (this.eventCheck.Needtracking === 1) {
        defaultTask = getEventTaskDefault(this.event, '事件核查')
        this.$refs.taskModel.show(defaultTask.title, defaultTask.content, data)
      } else {
        this.save(data)
      }
    },
    save (data) {
      this.loading = true
      commonOperateApi('FINISH', 'task_patrol', data).then((res) => {
        this.$toast.success('操作成功')
        this.goToLawForm()
      }).finally(() => {
        this.loading = false
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
    test () {
      console.log('test')
      getWorkrecordPageListbyCurrent(0).then(res => {
        console.log('WorkrecordPage', res)
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
