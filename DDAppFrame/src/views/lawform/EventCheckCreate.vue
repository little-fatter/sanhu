<template>
  <div class="form_wapper">
    <van-cell-group title="任务信息" v-if="taskInfo">
      <van-cell title="任务" :value="taskInfo.Tasktype"></van-cell>
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
        <van-cell title="上报来源" :value="event.reportType"></van-cell>
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
          <item-group title="附件">
            <s-upload
              ref="myupload"
              :sync2Dingding="false"
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
          </div>
        </van-form>
      </van-cell-group>
    </template>

    <event-list-select :showPopup="showPopup" @onClosePopup="onCloseEvent" @onPopupConfirm="onEventConfirm"></event-list-select>
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
import { isNotEmpty, formatDate, isEmpty } from '../../utils/util'
import { ddMapSearch, ddgetMapLocation, ddcomplexPicker } from '../../service/ddJsApi.service'
import ItemGroup from '../../components/tools/ItemGroup'
import SUpload from '../../components/file/StandardUploadFile'
import EventListSelect from '../../components/business/EventListSelect'
import { getDetaildata, commonOperateApi, getDictionaryItems, DictionaryCode, commonSaveApi, getDetialdataByEventInfoId } from '../../api/regulatoryApi'
var timer = null
/**
 * 事件巡查
 */
export default {
  name: 'EventCheckCreate',
  components: {
    ItemGroup,
    SUpload,
    EventListSelect
  },
  data () {
    // 必填规则
    this.requiredRule = [
      { required: true, message: ' ' }
    ]
    return {
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
        Needtracking: 0
      },
      rejectReason: '',
      eventTypeption: [],
      showTailAfter: true,
      showCalendar: false,
      showPopup: false,
      showRejectDialog: false,
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
      const taskId = queryParam.taskId
      if (isNotEmpty(taskId)) {
        this.loadTaskInfo()
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
        this.loadEventCheck(res.EventInfoId)
      })
    },
    loadEventInfo (EventInfoId) {
      getDetaildata('event_info', EventInfoId).then((res) => {
        if (res) {
          this.event = res
        }
      })
    },
    loadEventCheck (EventInfoId) {
      getDetialdataByEventInfoId('task_patrol', EventInfoId).then((res) => {
        if (res) {
          this.eventCheck = res
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
        var data = {
          TaskId: this.taskInfo.ID,
          UserId: user.emplId
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
      console.log('event', event)
      this.event = event
      getDetialdataByEventInfoId('task_patrol', event.objId).then((res) => {
        console.log('task_patrol', res)
        if (res) {
          this.eventCheck = res
        } else {
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
    },
    handleRejectDialogBeforeClose (action, done) {
      if (action === 'confirm') {
        if (isEmpty(this.rejectReason)) {
          this.$toast.fail('请输入拒绝理由')
          done(false)
        } else {
          var data = {
            TaskId: this.taskInfo.ID,
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
    onSubmit (values) {
      console.log('submit', values)
      // var data = {
      //   TaskId: isNotEmpty(this.taskInfo) ? this.taskInfo.ID : null,
      //   EventId: this.event.objId,
      //   TaskPatrol: {
      //     ...values,
      //     IncidentAddressXY: this.eventCheck.IncidentAddressXY
      //   }
      // }
      // console.log('data', data)
      // this.loading = true
      // commonOperateApi('FINISH', 'task_patrol', data).then((res) => {
      //   this.$toast.success('操作成功')
      //   // this.goToLawForm()
      // }).finally(() => {
      //   this.loading = false
      // })
      var data = {
        EventInfoId: this.event.objId,
        ID: this.eventCheck.ID,
        ...values,
        IncidentAddressXY: this.eventCheck.IncidentAddressXY
      }
      this.loading = true
      var method = isNotEmpty(data.ID) ? 'update' : 'create'
      commonSaveApi(data, 'task_patrol', method).then((res) => {
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
    }
  }
}
</script>

<style lang="less" scoped>

</style>
