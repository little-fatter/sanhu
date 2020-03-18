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
        <van-icon name="arrow" color="#1989fa" slot="right-icon" @click="handleShowSelectCase" size="25" />
      </van-field>
    </van-cell-group>
    <van-cell-group title="笔录详情" v-if="caseInfo.CauseOfAction">
      <van-form @submit="onSubmit" @failed="onFailed">
        <van-field
          name="InquiryType"
          v-model="model.InquiryType"
          label="询问对象"
          readonly
          required
          :rules="requiredRule"
          class="dropdown-menu_noboder">
          <template slot="input">
            <van-dropdown-menu>
              <van-dropdown-item v-model="model.InquiryType" :options="inquiryTypeOptions" />
            </van-dropdown-menu>
          </template>
        </van-field>
        <van-field
          name="Originofcase"
          v-model="model.Originofcase"
          rows="2"
          autosize
          label="案由"
          type="textarea"
          readonly
        />
        <van-field
          name="Enquiryplace"
          v-model="model.Enquiryplace"
          label="询问地点"
          placeholder="请输入询问地点"
          required
          :rules="requiredRule"
          rows="2"
          autosize
          type="textarea"
        >
          <van-icon name="location" color="#1989fa" slot="right-icon" @click="handleShowLocation" size="30" />
        </van-field>

        <party-info-view :initData="caseInfo.LawParties" :title="model.InquiryType" v-if="model.InquiryType=='当事人'"></party-info-view>
        <party-info ref="partyInfo" :title="model.InquiryType" v-else></party-info>
        <van-field
          v-model="lawPersionNames"
          label="执法检查人员"
          placeholder="请选择执法检查人员"
          required
          :rules="requiredRule"
          readonly
          @click="handleSelecLawPersions"
        >
          <van-icon name="arrow" color="#1989fa" slot="right-icon" @click="handleSelecLawPersions" size="30" />
        </van-field>
        <van-field
          v-model="recordPersionNames"
          label="记录人员"
          placeholder="请选择记录人员"
          readonly
          @click="handleSelecRecordPersions"
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
        <van-field name="Isseeclearly" label="被询问人是否看清执法证件" required :rules="requiredMsgRule">
          <van-radio-group v-model="model.Isseeclearly" direction="horizontal" slot="input">
            <van-radio :name="'清楚'">清楚</van-radio>
            <van-radio :name="'不清楚'">不清楚</van-radio>
          </van-radio-group>
        </van-field>
        <van-cell class="explain">
          依照法律规定，被询问人对调查询问，享有申请执法人员回避的权利，有如实接受调查询问的法律义务，如有意隐匿违法行为或者故意作伪证将承担法律责任。
        </van-cell>
        <van-field name="Isunderstand" label="被询问人是否明白权责义务" required :rules="requiredMsgRule">
          <van-radio-group v-model="model.Isunderstand" direction="horizontal" slot="input">
            <van-radio :name="'明白'">明白</van-radio>
            <van-radio :name="'不明白'">不明白</van-radio>
          </van-radio-group>
        </van-field>
        <van-field
          name="Inquiryrecord"
          v-model="model.Inquiryrecord"
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
import PartyInfoView from '../../../components/business/PartyInfoView'
import CaseListSelect from '../../../components/business/CaseListSelect'
import { ddgetMapLocation, ddMapSearch, ddcomplexPicker } from '../../../service/ddJsApi.service'
import { formatDate } from '../../../utils/util'
import { getFormsDetailByEventInfoId } from '../../../api/regulatoryApi'
/**
 * 询问笔录   成林龙  要做详情
 */
export default {
  name: 'AskPutdownCreate',
  components: {
    PartyInfo,
    CaseListSelect,
    PartyInfoView
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
        InquiryType: '当事人',
        Originofcase: '',
        Inquiryrecord: '',
        accompanys: '',
        isseeclearly: null,
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
      inquiryTypeOptions: [
        {
          text: '当事人', value: '当事人'
        },
        {
          text: '证人', value: '证人'
        },
        {
          text: '第三人', value: '第三人'
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
      getFormsDetailByEventInfoId(null, 'case_Info', caseInfo.ID).then((res) => {
        console.log('case_Info', res)
        this.caseInfo = {
          ...res.MainForm,
          LawParties: res.law_party
        }
        this.model.Originofcase = caseInfo.CauseOfAction
        this.model.Enquiryplace = caseInfo.IncidentAddress
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
          this.model.Enquiryplace = `${res.province}${res.city}${res.adName}${res.snippet}`
        })
      })
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
      var lawParties = this.caseInfo.LawParties
      if (this.model.InquiryType !== '当事人') {
        lawParties = this.$refs.partyInfo.getResult()
      }
      var forms = {
        caseInfo: this.caseInfo,
        lawParties: lawParties,
        form: this.model,
        lawPersions: this.lawPersions,
        lawPersionNames: this.lawPersionNames,
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
