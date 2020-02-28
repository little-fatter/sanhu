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
      <van-cell title="案件号" :value="caseInfo.DocNo"></van-cell>
      <van-cell title="案件类型" :value="caseInfo.CaseType"></van-cell>
      <van-cell title="案由" :value="caseInfo.CauseOfAction"></van-cell>
      <party-info-view :initData="penalizeBook.dsrs"></party-info-view>
      <van-field
        v-model="penalizeBook.desc"
        rows="2"
        autosize
        label="简要案情及调查经过"
        type="textarea"
        readonly
      />
      <penalty-decision-view :initData="penalizeBook.decisions"></penalty-decision-view>
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
        label="处罚结果"
        :readonly="true"
      >
        <van-icon name="arrow" color="#1989fa" slot="right-icon" @click="handelViewPenalizeBook" size="25" />
      </van-field>
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
/**
 * 结案报告
 */
export default {
  name: 'CaseFinalReport',
  components: {
    PartyInfoView,
    PenaltyDecisionView,
    CaseListSelect,
    RelCaseFormListSelect
  },
  props: {

  },
  data () {
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
        desc: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        RelCaseFormDesc: null,
        RelCaseForms: null,
        BookTitle: '处罚决定书'
      }
    }
  },
  created () {

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
      this.$router.push({ name: 'penalizeBookPreview' })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
