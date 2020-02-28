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
    <van-cell-group v-if="caseInfo.CauseOfAction">
      <van-form @submit="onSubmit" @failed="onFailed">
        <van-field
          name="objectType"
          v-model="model.objectType"
          label="询问对象"
          readonly
          required
          :rules="requiredRule"
          class="dropdown-menu_noboder">
          <template slot="input">
            <van-dropdown-menu>
              <van-dropdown-item v-model="model.objectType" :options="objectTypeOptions" @change="objectTypeSelectChange" />
            </van-dropdown-menu>
          </template>
        </van-field>
        <van-field
          name="CauseOfAction"
          v-model="model.CauseOfAction"
          rows="2"
          autosize
          label="案由"
          type="textarea"
          readonly
        />
        <van-field
          name="EventAddress"
          v-model="model.eventAddress"
          label="询问地点"
          placeholder="请输入询问地点"
          required
          :rules="requiredRule"
        >
          <van-icon name="location" color="#1989fa" slot="right-icon" @click="handleShowLocation" size="30" />
        </van-field>
        <party-info ref="partyInfo" :title="model.objectTypeDesc"></party-info>
        <van-field
          v-model="lawPersionNames"
          label="执法检查人员"
          placeholder="请选择执法检查人员"
          readonly
        >
          <van-icon name="arrow" color="#1989fa" slot="right-icon" @click="handleSelecLawPersions" size="30" />
        </van-field>
        <van-field
          v-model="recordPersionNames"
          label="记录人员"
          placeholder="请选择记录人员"
          readonly
        >
          <van-icon name="arrow" color="#1989fa" slot="right-icon" @click="handleSelecRecordPersions" size="30" />
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

        <!-- <van-field
          name="accompanys"
          v-model="model.accompanys"
          rows="2"
          autosize
          label="被检查陪同人"
          type="textarea"
          maxlength="200"
          placeholder="请输入被检查陪同人"
          show-word-limit
        /> -->
        <van-field name="isLookCredential" label="被询问人是否看清执法证件" required :rules="requiredMsgRule">
          <van-radio-group v-model="model.isLookCredential" direction="horizontal" slot="input">
            <van-radio :name="1">清楚</van-radio>
            <van-radio :name="2">不清楚</van-radio>
          </van-radio-group>
        </van-field>
        <van-cell class="explain">
          依照法律规定，被询问人对调查询问，享有申请执法人员回避的权利，有如实接受调查询问的法律义务，如有意隐匿违法行为或者故意作伪证将承担法律责任。
        </van-cell>
        <van-field name="isUnderstandRights" label="被询问人是否明白权责义务" required :rules="requiredMsgRule">
          <van-radio-group v-model="model.isUnderstandRights" direction="horizontal" slot="input">
            <van-radio :name="1">明白</van-radio>
            <van-radio :name="2">不明白</van-radio>
          </van-radio-group>
        </van-field>
        <van-field
          name="remark"
          v-model="model.remark"
          rows="2"
          autosize
          label="询问记录"
          type="textarea"
          maxlength="500"
          placeholder="请输入询问记录"
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
 * 询问笔录
 */
export default {
  name: 'AskPutdownCreate',
  components: {
    PartyInfo,
    CaseListSelect
  },
  data () {
    this.requiredRule = [
      { required: true, message: ' ' }
    ]
    this.requiredMsgRule = [
      { required: true, message: '请选择' }
    ]
    return {
      caseInfo: {},
      model: {
        objectType: 1,
        objectTypeDesc: '当事人',
        CauseOfAction: '',
        remark: '',
        accompanys: '',
        isLookCredential: null,
        isUnderstandRights: null
      },
      loading: false,
      showPopup: false,
      lawPersions: [],
      lawPersionNames: '',
      recordPersions: [],
      recordPersionNames: [],
      accompanys: [],
      accompanyNames: [],
      objectTypeOptions: [
        {
          text: '当事人', value: 1
        },
        {
          text: '证人', value: 2
        },
        {
          text: '第三人', value: 2
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
    objectTypeSelectChange (value) {
      var item = this.objectTypeOptions.find(p => p.value === value)
      if (item) {
        this.model.objectTypeDesc = item.text
      }
      this.model.objectType = value
    },
    handleSelecLawPersions () {
      var that = this
      ddcomplexPicker(0, '选择人员', true).then((res) => {
        // var organiserTemp = {
        //   name: res.users[0].name,
        //   id: res.users[0].emplId
        // }
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
      const dsrs = this.$refs.partyInfo.getResult()
      var forms = {
        caseInfo: this.caseInfo,
        dsrs,
        ...this.model,
        lawPersionNames: this.lawPersionNames,
        recordPersions: this.recordPersions,
        recordPersionNames: this.recordPersionNames
      }
      this.$router.push({ name: 'askPutdownPreview', params: { forms: forms } })
    },
    onFailed (errorInfo) {
      console.log('failed', errorInfo)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
