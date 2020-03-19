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
    <van-cell-group v-if="caseInfo.CauseOfAction">
      <van-cell title="案由" :value="caseInfo.CauseOfAction"></van-cell>
      <van-form @submit="onSubmit" @failed="onFailed">
        <inventory-form :dsrs="caseInfo.LawParties" ref="inventoryForm"></inventory-form>
        <div class="operate-area single-save">
          <van-button type="info" :loading="loading" size="large" native-type="submit">确定</van-button>
        </div>
      </van-form>
    </van-cell-group>
    <case-list-select :showPopup="showPopup" @onClosePopup="onCloseCase" @onPopupConfirm="onCaseConfirm"></case-list-select>
  </div>
</template>

<script>
import CaseListSelect from '../../../components/business/CaseListSelect'
import InventoryForm from '../../../components/business/InventoryForm'
import { getFormsDetailByEventInfoId } from '../../../api/regulatoryApi'
/**
 * 物品清单表单  成林龙 要做详情
 */
export default {
  name: 'InventoryCreate',
  components: {
    CaseListSelect,
    InventoryForm
  },
  props: {

  },
  data () {
    return {
      loading: false,
      showPopup: false,
      caseInfo: {
        ay: null
      }
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
        if (res) {
          this.caseInfo = {
            ...res.MainForm,
            LawParties: res.law_party
          }
        }
      }).finally(() => {
        this.showPopup = false
      })
    },
    onSubmit (values) {
      var forms = {
        caseInfo: this.caseInfo,
        inventory: this.$refs.inventoryForm.getResult()
      }
      this.$router.push({ name: 'inventoryView', params: { forms: forms } })
    },
    onFailed (errorInfo) {
      console.log('failed', errorInfo)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
