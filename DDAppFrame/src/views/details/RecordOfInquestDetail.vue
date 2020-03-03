<template>
  <div class="RecordOfInquest">
    <van-cell title="检查事由" :value="loadData.Reason"></van-cell>
    <van-cell title="事发地点" :value="loadData.Address"></van-cell>
    <PartyInfoView :initData="partyInfo"></PartyInfoView>
    <van-cell title="执法检查人员" :value="lawexecutorAndInspector"></van-cell>
    <van-cell title="记录人" :value="loadData.NoteTaker"></van-cell>
    <van-cell title="监督检查类别" :value="loadData.InspectiontType"></van-cell>
    <van-cell title="开始时间" :value="loadData.InitiationTime|dayjs"></van-cell>
    <van-cell title="结束时间" :value="loadData.CompletionTime|dayjs"></van-cell>
    <van-cell title="被检查陪同人" :value="loadData.handler"></van-cell>
    <van-cell title="勘察记录" :value="loadData.Content"></van-cell>
    <van-cell>
      <van-button @click="returnSubmitForm" type="info" native-type="submit" size="large">返回</van-button>
    </van-cell>
  </div>
</template>

<script>
import PartyInfoView from '../../components/business/PartyInfoView'
import {
  getDetaildata,
  commonOperateApi,
  getDictionaryItems,
  DictionaryCode,
  commonSaveApi,
  getDetialdataByfilter,
  getDetialdataByEventInfoId
} from '../../api/regulatoryApi'
export default {
  name: 'RecordOfInquestDetail',
  components: {
    PartyInfoView
  },
  props: {},
  data () {
    return {
      partyInfo: [],
      loadData: {},
      lawexecutorAndInspector: ''
    }
  },
  watch: {},
  computed: {},
  methods: {
    returnSubmitForm () {
      this.$router.go(-1)
    },
    // 获取数据
    init () {
      const id = this.$route.query.item
      getDetaildata('from_inspectiontRecord', id).then(res => {
        this.loadData = res
        console.log(this.loadData)
        this.lawexecutorAndInspector = `${res.Inspector1}、${res.Inspector2}、${res.lawexecutor1}、${res.lawexecutor2}`
      })
      getDetaildata('law_party', id).then(res => {
        var law_party = {
          partyType: res.partyType,
          idCard: res.IDcard,
          phone: res.Contactnumber,
          address: res.address,
          nation: res.Nationality,
          company: res.WorkUnit,
          name: res.Name,
          legalName: res.Nameoflegalperson
        }
        this.partyInfo.push(law_party)
        // console.log(this.initData);
      })
      console.log(id)
    }
  },
  created () {
    this.init()
  },
  mounted () {
    // 接收路由传参
    console.log(this.$route.query.id, '这是案件文卷传过来的表单ID值')
  }
}
</script>
<style lang="less">
.van-field__control {
  color: #969799;
}
</style>
