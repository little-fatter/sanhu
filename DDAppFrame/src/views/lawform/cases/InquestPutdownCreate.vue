<template>
  <div class="form_wapper">
    <van-cell-group>
      <van-field
        v-model="caseInfo.CaseNumber"
        label="案件"
        placeholder="请选择案件"
        :readonly="true"
        clickable
        @click="handleShowSelectCase"
      >
        <van-icon name="arrow" color="#1989fa" slot="right-icon" size="25" />
      </van-field>
    </van-cell-group>
    <van-cell-group title="笔录详情" v-if="caseInfo.CauseOfAction">
      <van-form @submit="onSubmit" @failed="onFailed">
        <van-field
          name="Inspectionreason"
          v-model="model.Inspectionreason"
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
          name="Incidentlocation"
          v-model="model.Incidentlocation"
          label="检查地点"
          placeholder="请输入检查地点"
          required
          :rules="requiredRule"
          rows="2"
          autosize
          type="textarea"
        >
          <van-icon name="location" color="#1989fa" slot="right-icon" @click="handleShowLocation" size="30" />
        </van-field>
        <party-info-view :initData="caseInfo.LawParties" ref="party"></party-info-view>
        <van-field
          v-model="lawPersionNames"
          label="执法检查人员"
          placeholder="请选择执法检查人员"
          required
          :rules="requiredRule"
          :readonly="true"
          @click="handleSelecLawPersions"
        >
          <van-icon name="arrow" color="#1989fa" slot="right-icon" size="30" />
        </van-field>
        <van-field
          v-model="recordPersionNames"
          label="记录人员"
          placeholder="请选择记录人员"
          :readonly="true"
          @click="handleSelecRecordPersions"
        >
          <van-icon name="arrow" color="#1989fa" slot="right-icon" size="30" />
        </van-field>

        <van-field
          name="inspectiontype"
          v-model="model.Inspectiontype"
          label="监督检查类别"
          readonly
          required
          :rules="requiredRule"
          class="dropdown-menu_noboder">
          <template slot="input">
            <van-dropdown-menu>
              <van-dropdown-item v-model="model.Inspectiontype" :options="inspectiontypeOptions" @change="inspectiontypeChange" />
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
          name="Companions"
          v-model="model.Companions"
          rows="2"
          autosize
          label="被检查陪同人"
          type="textarea"
          maxlength="200"
          placeholder="请输入被检查陪同人"
          show-word-limit
        />

        <van-field
          name="Inspectionrecord"
          v-model="model.Inspectionrecord"
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
import PartyInfoView from '../../../components/business/PartyInfoView'
import CaseListSelect from '../../../components/business/CaseListSelect'
import { ddgetMapLocation, ddMapSearch, ddcomplexPicker } from '../../../service/ddJsApi.service'
import { formatDate, isNotEmpty } from '../../../utils/util'
import { getFormsDetailByEventInfoId, getDictionaryItems, DictionaryCode } from '../../../api/regulatoryApi'
/**
 * 勘验笔录表单   成林龙 要做详情
 */
export default {
  name: 'InquestPutdownCreate',
  components: {
    PartyInfoView,
    CaseListSelect
  },
  data () {
    this.requiredRule = [
      { required: true, message: ' ' }
    ]
    return {
      caseInfo: {},
      model: {
        Inspectionreason: '',
        Companions: '',
        Inspectionrecord: '',
        Inspectiontype: '',
        InspectiontypeName: ''
      },
      loading: false,
      showPopup: false,
      lawPersions: [],
      lawPersionNames: '',
      recordPersions: [],
      recordPersionNames: '',
      accompanys: [],
      accompanyNames: '',
      inspectiontypeOptions: [],
      showCalendar: false,
      seletTimeType: null,
      currentDate: new Date()
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.loadInspectiontypeOptions()
    },
    loadInspectiontypeOptions () {
      getDictionaryItems(DictionaryCode.CheckType).then((items) => {
        var inspectiontypeOptions = []
        if (isNotEmpty(items)) {
          items.forEach(item => {
            inspectiontypeOptions.push({
              text: item.Title, value: item.ItemCode
            })
          })
          this.model.Inspectiontype = items[0].ItemCode
        }
        this.inspectiontypeOptions = inspectiontypeOptions
      })
    },
    handleShowSelectCase () {
      this.showPopup = true
    },
    onCloseCase () {
      this.showPopup = false
    },
    onCaseConfirm (caseInfo) {
      getFormsDetailByEventInfoId(null, 'case_Info', caseInfo.ID).then((res) => {
        this.caseInfo = {
          ...res.MainForm,
          LawParties: res.law_party
        }
        this.model.Inspectionreason = caseInfo.CauseOfAction
        this.model.Incidentlocation = caseInfo.IncidentAddress
      }).finally(() => {
        this.showPopup = false
      })
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
          this.model.Incidentlocation = `${res.province}${res.city}${res.adName}${res.snippet}`
        })
      })
    },
    handleSelecLawPersions () {
      var that = this
      ddcomplexPicker(0, '选择人员', true).then((res) => {
        console.log('res', res)
        that.lawPersions = res.users
        var lawPersions = []
        res.users.forEach(item => {
          lawPersions.push(item.name)
        })
        that.lawPersionNames = lawPersions.join()
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
    inspectiontypeChange (value) {
      this.model.Inspectiontype = value
      this.model.InspectiontypeName = this.inspectiontypeOptions.find(item => item.value === value).text
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
      var forms = {
        caseInfo: this.caseInfo,
        form: this.model,
        lawPersions: this.lawPersions,
        lawPersionNames: this.lawPersionNames,
        recordPersionNames: this.recordPersionNames
      }
      this.$router.push({ name: 'inquestPutdownPreview', params: { forms: forms } })
    },
    onFailed (errorInfo) {
      console.log('failed', errorInfo)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
