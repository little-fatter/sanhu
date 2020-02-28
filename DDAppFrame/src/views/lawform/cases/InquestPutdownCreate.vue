<template>
  <div class="form_wapper">
    <van-cell-group>
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
    <van-cell-group>
      <van-form @submit="onSubmit" @failed="onFailed">
        <van-field
          name="CauseOfAction"
          v-model="model.CauseOfAction"
          rows="2"
          autosize
          label="检查事由"
          type="textarea"
          maxlength="200"
          placeholder="请输入检查事由"
          show-word-limit
          required
          :rules="requiredRule"
        />
        <van-field
          name="EventAddress"
          v-model="model.eventAddress"
          label="事发地点"
          placeholder="请输入事发地点"
          required
          :rules="requiredRule"
        >
          <van-icon name="location" color="#1989fa" slot="right-icon" @click="handleShowLocation" size="30" />
        </van-field>
        <party-info ref="partyInfo"></party-info>
        <van-field
          v-model="lawPersionNames"
          label="执法检查人员"
          placeholder="请选择执法检查人员"
          :readonly="true"
        >
          <van-icon name="arrow" color="#1989fa" slot="right-icon" @click="handleSelecLawPersions" size="30" />
        </van-field>
        <van-field
          v-model="recordPersionNames"
          label="记录人员"
          placeholder="请选择记录人员"
          :readonly="true"
        >
          <van-icon name="arrow" color="#1989fa" slot="right-icon" @click="handleSelecRecordPersions" size="30" />
        </van-field>

        <van-field
          name="checkType"
          v-model="model.checkType"
          label="监督检查类别"
          readonly
          required
          :rules="requiredRule"
          class="dropdown-menu_noboder">
          <template slot="input">
            <van-dropdown-menu>
              <van-dropdown-item v-model="model.checkType" :options="checkTypeOptions" @change="checkTypeSelectChange" />
            </van-dropdown-menu>
          </template>
        </van-field>
        <van-field
          readonly
          clickable
          name="startTime"
          :value="model.startTime"
          label="开始时间"
          :rules="requiredRule"
          placeholder="点击选择日期"
          @click="handleShowCalendar('startTime')"
          required
        />
        <van-field
          readonly
          clickable
          name="endTime"
          :value="model.endTime"
          label="结束时间"
          :rules="requiredRule"
          placeholder="点击选择日期"
          @click="handleShowCalendar('endTime')"
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
          name="accompanys"
          v-model="model.accompanys"
          rows="2"
          autosize
          label="被检查陪同人"
          type="textarea"
          maxlength="200"
          placeholder="请输入被检查陪同人"
          show-word-limit
        />

        <van-field
          name="remark"
          v-model="model.remark"
          rows="2"
          autosize
          label="勘验记录"
          type="textarea"
          maxlength="500"
          placeholder="请输入勘验记录"
          show-word-limit
          required
          :rules="requiredRule"
        />

        <div class="operate-area single-save">
          <van-button type="info" :loading="loading" size="large" native-type="submit">确定</van-button>
        </div>
      </van-form>
    </van-cell-group>
    <case-list-select :showPopup="showPopup" @onClosePopup="onCloseCase" @onPopupConfirm="onCaseConfirm"></case-list-select>
  </div>
</template>

<script>
import PartyInfo from '../../../components/business/PartyInfo'
import CaseListSelect from '../../../components/business/CaseListSelect'
import { ddgetMapLocation, ddMapSearch, ddcomplexPicker } from '../../../service/ddJsApi.service'
import { formatDate } from '../../../utils/util'
/**
 * 勘验笔录表单
 */
export default {
  name: 'InquestPutdownCreate',
  components: {
    PartyInfo,
    CaseListSelect
  },
  data () {
    this.requiredRule = [
      { required: true, message: ' ' }
    ]
    return {
      caseInfo: {},
      model: {
        checkType: 1,
        CauseOfAction: '',
        remark: '',
        accompanys: ''
      },
      loading: false,
      showPopup: false,
      lawPersions: [],
      lawPersionNames: '',
      recordPersions: [],
      recordPersionNames: [],
      accompanys: [],
      accompanyNames: [],
      checkTypeOptions: [
        {
          text: '类型1', value: 1
        },
        {
          text: '类型2', value: 2
        }
      ],
      showCalendar: false,
      seletTimeType: null,
      currentDate: new Date()
    }
  },
  created () {

  },
  methods: {
    handleShowSelectCase () {
      this.showPopup = true
    },
    onCloseCase () {
      this.showPopup = false
    },
    onCaseConfirm (caseInfo) {
      console.log('caseInfo', caseInfo)
      this.caseInfo = caseInfo
      this.model.CauseOfAction = caseInfo.CauseOfAction
      this.showPopup = false
    },
    handleShowCalendar (seletTimeType) {
      this.seletTimeType = seletTimeType
      this.showCalendar = true
    },
    handleCloseCalendar () {
      this.showCalendar = false
    },
    handleEventTimeConfirm (date) {
      if (this.seletTimeType === 'startTime') {
        this.model.startTime = formatDate(date, 'YYYY-MM-DD HH:mm')
      }
      if (this.seletTimeType === 'endTime') {
        this.model.endTime = formatDate(date, 'YYYY-MM-DD HH:mm')
      }
      this.showCalendar = false
    },
    handleShowLocation () {
      ddgetMapLocation().then(location => {
        ddMapSearch(location.latitude, location.longitude).then((res) => {
          this.model.eventAddress = `${res.province}${res.city}${res.adName}${res.snippet}`
        })
      })
    },
    checkTypeSelectChange (value) {
      this.model.checkType = value
    },
    handleSelecLawPersions () {
      var that = this
      ddcomplexPicker(0, '选择人员', true).then((res) => {
        console.log('res', res)
        // var organiserTemp = {
        //   name: res.users[0].name,
        //   id: res.users[0].emplId
        // }
        that.lawPersions = res.users
        var lawPersions = []
        res.users.forEach(item => {
          lawPersions.push(item.name)
        })
        console.log('lawPersions', lawPersions)
        console.log('lawPersions', lawPersions.join())
        that.lawPersionNames = lawPersions.join()
        console.log('that.model.lawPersions', that.lawPersionNames)
      })
    },
    handleSelecRecordPersions () {
      ddcomplexPicker(0, '选择人员', true).then((res) => {
        this.recordPersions = res.users
        var recordPersions = []
        res.users.forEach(item => {
          recordPersions.push(item.name)
        })
        this.recordPersionNames = recordPersions.join()
      })
    },
    handleSelecAccompanys () {
      ddcomplexPicker(0, '选择人员', true).then((res) => {
        this.accompanys = res.users
        var accompanys = []
        res.users.forEach(item => {
          accompanys.push(item.name)
        })
        this.accompanyNames = accompanys.join()
      })
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
