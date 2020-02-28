<template>
  <div class="form_wapper">
    <van-cell-group title="任务信息" v-if="taskId">
      <van-cell title="任务" value="创建案件"></van-cell>
      <van-cell title="交办时间" value="2020-02-15"></van-cell>
      <van-cell title="期望时间" value="2020-02-15"></van-cell>
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
    <van-cell-group title="案件信息">
      <van-form @submit="onSubmit" @failed="onFailed">
        <van-cell title="案件号" value="自动生成"></van-cell>
        <van-field
          name="ay"
          v-model="caseInfo.ay"
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
          name="caseType"
          v-model="caseInfo.caseType"
          label="案件类型"
          readonly
          required
          :rules="requiredRule"
          class="dropdown-menu_noboder">
          <template slot="input">
            <van-dropdown-menu>
              <van-dropdown-item v-model="caseInfo.caseType" :options="caseTypeoptions" @change="caseTypeSelectChange" />
            </van-dropdown-menu>
          </template>
        </van-field>
        <van-field
          readonly
          clickable
          name="eventTime"
          :value="event.eventTime"
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
          name="eventAddress"
          v-model="event.eventAddress"
          label="事发地点"
          placeholder="请输入事发地点"
          required
          :rules="requiredRule"
        >
          <van-icon name="location" color="#1989fa" slot="right-icon" @click="handleShowLocation" size="30" />
        </van-field>
        <party-info></party-info>
        <van-field
          v-model="caseInfo.organiser.name"
          label="协办人"
          placeholder="请选择协办人"
          :readonly="true"
        >
          <van-icon name="arrow" color="#1989fa" slot="right-icon" @click="handleSelecOrganiser" size="30" />
        </van-field>

        <div class="operate-area single-save">
          <van-button type="info" :loading="loading" size="large" native-type="submit">保存</van-button>
        </div>
      </van-form>
    </van-cell-group>
    <event-list-select :showPopup="showPopup" @onClosePopup="onCloseEvent" @onPopupConfirm="onEventConfirm"></event-list-select>
  </div>
</template>

<script>
import { formatDate } from '../../../utils/util'
import { ddMapSearch, ddgetMapLocation, ddcomplexPicker } from '../../../service/ddJsApi.service'
import PartyInfo from '../../../components/business/PartyInfo'
import EventListSelect from '../../../components/business/EventListSelect'
export default {
  name: 'CaseCreate',
  components: {
    PartyInfo,
    EventListSelect
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
      taskId: null,
      caseInfo: {
        ay: '',
        desc: '',
        caseType: 1,
        organiser: {
        }
      },
      event: {},
      caseTypeoptions: [
        { text: '非法捕捞', value: 1 }
      ],
      showCalendar: false,
      currentDate: new Date()
    }
  },
  created () {

  },
  methods: {
    handleEventTimeConfirm (date) {
      this.caseInfo.eventTime = formatDate(date, 'YYYY-MM-DD HH:mm')
      this.showCalendar = false
    },
    handleShowLocation () {
      ddgetMapLocation().then(location => {
        ddMapSearch(location.latitude, location.longitude).then((res) => {
          this.caseInfo.eventAddress = `${res.province}${res.city}${res.adName}${res.snippet}`
        })
      })
    },
    caseTypeSelectChange (value) {
      this.caseInfo.caseType = value
    },
    handleSelecOrganiser () {
      ddcomplexPicker().then((res) => {
        var organiserTemp = {
          name: res.users[0].name,
          id: res.users[0].emplId
        }
        this.caseInfo.organiser = organiserTemp
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
      this.event.remark = event.remark
      this.event.eventTime = formatDate(event.reportTime, 'YYYY-MM-DD HH:mm')
      this.event.eventAddress = event.address
      this.showPopup = false
    },
    onSubmit (values) {
      console.log('submit', values)
    },
    onFailed (errorInfo) {
      console.log('failed', errorInfo)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
