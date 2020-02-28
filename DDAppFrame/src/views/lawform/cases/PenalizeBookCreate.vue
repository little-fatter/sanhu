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
        <van-cell title="案件号" :value="caseInfo.code"></van-cell>
        <van-cell title="案件类型" :value="caseInfo.CaseType"></van-cell>
        <van-cell title="案由" :value="caseInfo.CauseOfAction"></van-cell>
        <party-info :initData="caseInfo.dsrs" ref="partyInfo"></party-info>
        <van-field
          name="factdesc"
          v-model="penalizeBook.factdesc"
          rows="2"
          autosize
          label="违法事实"
          type="textarea"
          maxlength="200"
          placeholder="请输入违法事实"
          show-word-limit
          required
          :rules="requiredRule"
        />
        <item-group title="证据附件">
          <s-upload
            ref="myupload"
            :sync2Dingding="false"
          >
          </s-upload>
        </item-group>
        <van-field
          v-model="illegalbasis.title"
          label="违法依据"
          placeholder="请选择违法依据"
          :readonly="true"
          clickable
          required
          :rules="requiredRule"
          @click="handleShowSelectLaw('illegalbasis')"
        >
          <van-icon name="arrow" color="#1989fa" slot="right-icon" @click="handleShowSelectLaw('illegalbasis')" size="25" />
        </van-field>
        <van-field
          v-model="punishmentbasis.title"
          label="处罚依据"
          placeholder="请选择处罚依据"
          :readonly="true"
          clickable
          required
          :rules="requiredRule"
          @click="handleShowSelectLaw('punishmentbasis')"
        >
          <van-icon name="arrow" color="#1989fa" slot="right-icon" @click="handleShowSelectLaw('punishmentbasis')" size="25" />
        </van-field>
        <penalty-decision ref="penaltyDecision"></penalty-decision>
        <van-field
          v-model="penalizeBook.organiser.name"
          label="协办人"
          placeholder="请选择协办人"
          :readonly="true"
        >
          <van-icon name="arrow" color="#1989fa" slot="right-icon" @click="handleSelecOrganiser" size="30" />
        </van-field>

        <div class="operate-area single-save">
          <van-button type="info" :loading="loading" size="large" native-type="submit">确定</van-button>
        </div>
      </van-form>
    </van-cell-group>
    <law-list-select :showPopup="showLaw" @onClosePopup="onCloseLaw" @onPopupConfirm="onLawConfirm"></law-list-select>
    <case-list-select :showPopup="showPopup" @onClosePopup="onCloseCase" @onPopupConfirm="onCaseConfirm"></case-list-select>
  </div>
</template>

<script>
import CaseListSelect from '../../../components/business/CaseListSelect'
import PartyInfo from '../../../components/business/PartyInfo'
import PenaltyDecision from '../../../components/business/PenaltyDecision'
import ItemGroup from '../../../components/tools/ItemGroup'
import SUpload from '../../../components/file/StandardUploadFile'
import LawListSelect from '../../../components/business/LawListSelect'
import { ddcomplexPicker } from '../../../service/ddJsApi.service'
import { isEmpty } from '../../../utils/util'
/**
 * 当场处罚决定书
 */
export default {
  name: 'PenalizeBookCreate',
  components: {
    CaseListSelect,
    PartyInfo,
    ItemGroup,
    SUpload,
    PenaltyDecision,
    LawListSelect
  },
  data () {
    this.requiredRule = [
      { required: true, message: ' ' }
    ]
    return {
      loading: false,
      showPopup: false,
      showLaw: false,
      selectLawType: null,
      taskId: null,
      caseInfo: {

      },
      penalizeBook: {
        factdesc: '',
        organiser: {}
      },
      illegalbasis: {},
      punishmentbasis: {}
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
      this.showPopup = false
    },
    handleShowSelectLaw (selectLawType) {
      this.selectLawType = selectLawType
      this.showLaw = true
    },
    onCloseLaw () {
      this.selectLawType = null
      this.showLaw = false
    },
    onLawConfirm (law) {
      if (this.selectLawType === 'illegalbasis') {
        this.illegalbasis = law
      }
      if (this.selectLawType === 'punishmentbasis') {
        this.punishmentbasis = law
      }
      this.showLaw = false
    },
    handleSelecOrganiser () {
      ddcomplexPicker().then((res) => {
        var organiserTemp = {
          name: res.users[0].name,
          id: res.users[0].emplId
        }
        this.penalizeBook.organiser = organiserTemp
      })
    },
    onSubmit (values) {
      console.log('submit', values)
      if (isEmpty(this.caseInfo.code)) {
        this.$toast('请选择案件')
        return
      }
      const dsrs = this.$refs.partyInfo.getResult()
      const decisions = this.$refs.penaltyDecision.getResult()
      var forms = {
        ...values,
        caseInfo: {
          ...this.caseInfo
        },
        organiser: {
          ...this.penalizeBook.organiser
        },
        illegalbasis: {
          ...this.illegalbasis
        },
        punishmentbasis: {
          ...this.punishmentbasis
        },
        dsrs: dsrs,
        decisions: decisions
      }
      this.$router.push({ name: 'penalizeBookPreview', params: { forms: forms } })
    },
    onFailed (errorInfo) {
      console.log('failed', errorInfo)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
