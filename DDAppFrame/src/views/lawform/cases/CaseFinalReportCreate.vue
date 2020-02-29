<template>
  <div class="form_wapper">
    <van-cell-group title="任务信息" v-if="taskId">
      <van-cell title="任务" value="创建案件"></van-cell>
      <van-cell title="交办时间" value="2020-02-15"></van-cell>
      <van-cell title="期望时间" value="2020-02-15"></van-cell>
    </van-cell-group>
    <van-cell-group v-else>
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
        <van-cell title="案件号" :value="caseInfo.DocNo"></van-cell>
        <van-cell title="案件类型" :value="caseInfo.CaseType"></van-cell>
        <van-cell title="案由" :value="caseInfo.CauseOfAction"></van-cell>
        <party-info-view :initData="penalizeBook.dsrs"></party-info-view>
        <van-field
          v-model="penalizeBook.Remark"
          rows="2"
          autosize
          label="简要案情及调查经过"
          type="textarea"
          required
          :rules="requiredRule"
        />
        <!-- <penalty-decision-view :initData="penalizeBook.decisions"></penalty-decision-view> -->
        <!-- <van-field
        v-model="penalizeBook.RelCaseFormDesc"
        label="关联表单"
        placeholder="请选择关联表单"
        :readonly="true"
      >
        <van-icon name="arrow" color="#1989fa" slot="right-icon" @click="handleShowRelFormsPopup" size="25" />
      </van-field>
      <div class="operate-area single-save">
        <van-button type="info" :loading="loading" size="large" native-type="button">保存</van-button>
      </div> -->
        <van-field
          v-model="penalizeBook.BookTitle"
          label="处罚决定"
          :readonly="true"
        >
          <van-icon name="arrow" color="#1989fa" slot="right-icon" @click="handelViewPenalizeBook" size="25" />
        </van-field>
        <van-cell title="执行情况" value="已执行"></van-cell>
        <div class="operate-area single-save">
          <van-button type="info" :loading="loading" size="large" native-type="submit">提交审批</van-button>
        </div>
      </van-form>
    </van-cell-group>

    <case-list-select :showPopup="showPopup" @onClosePopup="onCloseCase" @onPopupConfirm="onCaseConfirm"></case-list-select>
    <rel-case-form-list-select :showPopup="showRelFormsPopup" @onClosePopup="showRelFormsPopup=false" @onPopupConfirm="onRelFormsPopupConfirm"></rel-case-form-list-select>
  </div>
</template>

<script>
import PartyInfoView from '../../../components/business/PartyInfoView'
import PenaltyDecisionView from '../../../components/business/PenaltyDecisionView'
import CaseListSelect from '../../../components/business/CaseListSelect'
import RelCaseFormListSelect from '../../../components/business/RelCaseFormListSelect'
import { ddcomplexPicker, getApproverIds } from '../../../service/ddJsApi.service'
import { getAgentId, getCurrentUserInfo } from '../../../service/currentUser.service'
import { getMainUrl } from '../../../utils/util'
import { startProcessInstance } from '../../../api/ddApi'
/**
 * 结案报告
 */
export default {
  name: 'CaseFinalReportCreate',
  components: {
    PartyInfoView,
    PenaltyDecisionView,
    CaseListSelect,
    RelCaseFormListSelect
  },
  props: {

  },
  data () {
    this.requiredRule = [
      { required: true, message: ' ' }
    ]
    return {
      loading: false,
      showPopup: false,
      showRelFormsPopup: false,
      taskId: null,
      caseInfo: {},
      penalizeBook: {
        dsrs: [ {
          partyType: 1,
          name: '李某',
          sex: 1,
          profession: '',
          idCard: '22222222222',
          address: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          phone: '18982332222',
          legalName: '',
          tel: ''
        },
        {
          partyType: 2,
          name: 'XXXXX公司',
          sex: '',
          profession: '',
          idCard: '22222222222',
          address: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          phone: '18982332222',
          legalName: '张某',
          tel: '18982332222'
        }],
        decisions: [
          {
            decisionType: 1,
            amount: 20,
            payment: 1
          },
          {
            decisionType: 2
          }
        ],
        Remark: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        RelCaseFormDesc: null,
        RelCaseForms: null,
        BookTitle: '处罚决定书'
      }
    }
  },
  created () {

  },
  mounted () {
  },
  methods: {
    handleShowRelFormsPopup () {
      this.showRelFormsPopup = true
    },
    onRelFormsPopupConfirm (result) {
      this.penalizeBook.RelCaseFormDesc = '已选择'
      this.penalizeBook.RelCaseForms = result
      this.showRelFormsPopup = false
    },
    handleShowSelectCase () {
      this.showPopup = true
    },
    onCloseCase () {
      this.showPopup = false
    },
    onCaseConfirm (caseInfo) {
      this.caseInfo = caseInfo
      this.showPopup = false
    },
    handelViewPenalizeBook () {
      this.$router.push({ name: 'CaseDetail' })
    },
    onSubmit (values) {
      console.log('submit', values)
      ddcomplexPicker().then((approve) => {
        var userInfo = getCurrentUserInfo()
        const data = {}
        data.AgentId = parseInt(getAgentId())
        data.ProcessCode = 'PROC-CEF3CE57-8E80-4718-8B56-44973CF24FA9'
        data.OriginatorUserId = userInfo.userid
        data.DeptId = userInfo.deptid
        data.Approvers = getApproverIds(approve)
        data.FormComponentValues = JSON.stringify(this.getFormComponentValues())
        this.loading = true
        startProcessInstance(data).then(res => {
          var msg = '提交审批流程成功,实例ID:' + res.ProcessInstanceId
          this.$dialog.alert({
            message: msg
          })
        }).finally(() => {
          this.loading = false
        })
      })
    },
    onFailed (errorInfo) {
      console.log('failed', errorInfo)
    },
    getFormComponentValues () {
      var webUrl = getMainUrl()
      var formComponentValues = [
        {
          name: '案由',
          value: '我是案由'
        },
        {
          name: '案件来源',
          value: '我是案件来源'
        },
        {
          name: '立案时间',
          value: '2020-02-28'
        },
        {
          name: '案发地点',
          value: '我是案发地点'
        },
        {
          name: '案件承办人',
          value: '我是案件承办人'
        },
        {
          name: '证件编号',
          value: '我是证件编号'
        },
        {
          name: '简要案情及调查经过',
          value: '我是简要案情及调查经过'
        },
        {
          name: '执行情况',
          value: '已执行'
        },
        {
          name: '处罚决定',
          value: `${webUrl}#/CaseDetail`
        },
        {
          name: '案件详情',
          value: `${webUrl}#/CaseDetail`
        },
        {
          name: '当事人',
          value: [
            [ { name: '名称', value: '张三 | 男 | 25岁 | 无职业' },
              { name: '身份证', value: '435526198032565545' },
              { name: '电话', value: '13548778897' },
              { name: '地址', value: '云南省玉溪市' }
            ],
            [
              { name: '名称', value: '玉溪自然科技有限公司' },
              { name: '法人', value: '张某' },
              { name: '身份证', value: '435526198032565545' },
              { name: '电话', value: '13548778897' },
              { name: '地址', value: '云南省玉溪市' }
            ]
          ]
        }
      ]
      return formComponentValues
    }
  }
}
</script>

<style lang="less" scoped>

</style>
