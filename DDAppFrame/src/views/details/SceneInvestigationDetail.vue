<!--//现场巡查-->
<template>
  <div class="SceneInvestigationDetail">
    <van-cell-group>
      <van-cell >
        <h5>事件信息</h5>
      </van-cell>
      <van-cell title="事发地点：" :value="eventInfo.address"></van-cell>
      <van-cell title="上报时间：" :value="eventInfo.reportTime"></van-cell>
      <van-cell title="上报来源：" :value="eventInfo.ReportSource"></van-cell>
      <van-cell title="上报人：" :value="eventInfo.reporterName"></van-cell>
      <van-cell title="事件类型：" :value="eventInfo.evtTypeDisplayName"></van-cell>
      <van-cell title="事件描述" :value="eventInfo.remark"></van-cell>
    </van-cell-group>
    <van-cell-group style="margin-top:0.3rem">
      <van-cell >
        <h5>现场核查信息</h5>
      </van-cell>
      <van-cell title="事件类型" :value="loadData.EventType" />
      <van-cell title="事发时间" :value="loadData.IncidentTime" />
      <van-cell title="事发地点" :value="loadData.IncidentAddress"></van-cell>
    </van-cell-group>
    <van-cell-group style="margin-top:0.3rem">
      <van-cell>
        <!--当事人-->
        <PartyInfo :initData="Partys"></PartyInfo>
      </van-cell>
    </van-cell-group>
    <van-cell-group style="margin-top:0.3rem">
      <van-cell >
        <h5>处理结果</h5>
      </van-cell>
      <van-cell title="处理结论" :value="loadData.Result" ></van-cell>
      <van-cell title="处理决定" :value="ProcessingDecisions" />
      <van-cell title="是否涉嫌犯罪" :value="loadData.ExistCrim === 0 ? '否' : '是'" />
      <van-cell title="附件">
        <S-upload
          style="margin-left:80px;margin-bottom:5px;"
          ref="myupload"
          :sync2Dingding="false"
          :isOnlyView="true"
          :initResult="eventFile"
        ></S-upload>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import PartyInfo from '../../components/business/PartyInfoView' // 当事人预览组件
import SUpload from '../../components/file/StandardUploadFile'
import { isNotEmpty } from '../../utils/util'
import { getDetaildata, getFormsDetailByEventInfoId, FromType } from '../../api/regulatoryApi'

export default {
  name: 'SceneInvestigationDetail',
  components: {
    SUpload,
    PartyInfo
  },
  props: {},
  data () {
    return {
      loadData: {}, // 勘查基本信息
      eventInfo: {}, // 事件信息
      eventFile: [], // 附件
      EventInfoId: '', // 事件ID
      Partys: [], // 当事人信息
      ProcessingDecisions: '不予处理' // 处理决定
    }
  },
  methods: {
    // 页面数据
    initPage () {
      // 请求现场巡查详情
      getFormsDetailByEventInfoId(this.EventInfoId, FromType.sceneInvestigationDetail).then(res => {
        if (res) {
          this.loadData = res.MainForm
          this.Partys = res.law_party
          this.eventFile = res.attachment // 附件
          getDetaildata('event_info', this.EventInfoId).then(res => {
            if (res) {
              this.eventInfo = res
            }
          })
        }
      })
    },
    theDecision () {
      if (this.loadData.ProcessingDecisions === 1) {
        this.ProcessingDecisions = '不予处理'
      } else if (this.loadData.ProcessingDecisions === 2) {
        this.ProcessingDecisions = '移送其他部门'
      } else {
        this.ProcessingDecisions = '执法程序'
      }
    }
  },
  created () {
    this.EventInfoId = this.$route.query.ID // 事件ID
    this.initPage()
    this.theDecision()
  },
  mounted () {

  }
}
</script>
<style lang="less">
.van-cell__title{
  color: #323232 !important;
}
</style>
