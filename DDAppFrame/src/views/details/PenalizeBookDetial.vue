<template>
  <div>
    <van-cell-group>
      <party-info-view :initData="penalizeBook.LawParties"></party-info-view>
      <van-field
        v-model="penalizeBook.Illegalfacts"
        rows="2"
        autosize
        label="违法事实"
        type="textarea"
        readonly
      />
      <item-group title="证据附件">
        <s-upload
          ref="myupload"
          :sync2Dingding="false"
          :isOnlyView="true"
          :initData="penalizeBook.Attachment"
        >
        </s-upload>
      </item-group>
      <van-field
        v-model="penalizeBook.IllegalbasisIDs"
        rows="2"
        autosize
        label="违法依据"
        type="textarea"
        readonly
      />
      <van-field
        v-model="penalizeBook.PunishmentbasisIDs"
        rows="2"
        autosize
        label="处罚依据"
        type="textarea"
        readonly
      />
      <!-- <penalty-decision-view :initData="penalizeBook.decisions"></penalty-decision-view> -->
      <van-cell title="协办人" :value="penalizeBook.CoOrganizer"></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import ItemGroup from '../../components/tools/ItemGroup'
import SUpload from '../../components/file/StandardUploadFile'
import PartyInfoView from '../../components/business/PartyInfoView'
import PenaltyDecisionView from '../../components/business/PenaltyDecisionView'
import { getDetaildata, getFormsDetailByEventInfoId } from '../../api/regulatoryApi'
import { isNotEmpty } from '../../utils/util'
/**
 * 执法决定书明细
 */
export default {
  name: 'PenalizeBookDetial',
  components: {
    ItemGroup,
    SUpload,
    PartyInfoView,
    PenaltyDecisionView
  },
  props: {

  },
  data () {
    return {
      penalizeBook: {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const queryParam = this.$route.query
      const id = queryParam.id
      getDetaildata('law_punishmentInfo', id).then(res => {
        // this.penalizeBook = res
        if (isNotEmpty(res.EventInfoId)) {
          getFormsDetailByEventInfoId(res.EventInfoId, 'law_punishmentInfo').then((res) => {
            if (res) {
              this.penalizeBook = {
                ...res.MainForm,
                LawParties: res.Party,
                Attachment: res.Attachment
              }
              console.log('this.penalizeBook', this.penalizeBook)
            }
          })
        }
      })
    }
  },
  activated () {
    this.init()
  }
}
</script>

<style lang="less" scoped>

</style>
