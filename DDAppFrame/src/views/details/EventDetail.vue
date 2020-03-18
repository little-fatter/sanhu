<!--//事件详情-->
<template>
  <div class="eventDetail">
    <van-cell-group>
      <van-cell >
        <h5>事件信息</h5>
      </van-cell>
      <van-cell title="事发地点：" :value="eventInfo.address"></van-cell>
      <van-cell title="上报时间：" :value="eventInfo.reportTime "></van-cell>
      <van-cell title="上报来源：" :value="eventInfo.ReportSource"></van-cell>
      <van-cell title="上报人：" :value="eventInfo.reporterName"></van-cell>
      <van-cell title="事件类型：" :value="eventInfo.evtTypeDisplayName"></van-cell>
      <van-cell title="事件描述：" :value="eventInfo.remark"></van-cell>
    </van-cell-group>
    <van-cell-group style="margin-top:0.3rem">
      <van-cell >
        <h5>事件核查信息</h5>
      </van-cell>
      <van-cell title="事件描述" :value="loadData.EventDescribe"></van-cell>
      <van-cell title="事件类型" :value="loadData.evtTypeName"></van-cell>
      <van-cell title="事发时间" :value="loadData.IncidentTime"></van-cell>
      <van-cell title="事发地点" :value="loadData.IncidentAddress"></van-cell>
      <van-cell title="处理结果" :value="loadData.Result"></van-cell>
      <van-cell title="附件">
        <S-upload
          style="margin-left:80px;margin-bottom:5px;"
          ref="myupload"
          :sync2Dingding="false"
          :isOnlyView="true"
          :initResult="eventFile"
        ></S-upload>
      </van-cell>
      <van-cell title="是否请求执法人员处理" :value="loadData.Needlawenforcement === 0 ? '自行处理' : '请求执法'"></van-cell>
      <van-cell title="是否需要跟踪整改" :value="loadData.Needtracking === 0 ? '不需要' : '需要跟踪'"></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import SUpload from '../../components/file/StandardUploadFile'
import { isNotEmpty } from '../../utils/util'
import { getDetaildata, getFormsDetailByEventInfoId, FromType } from '../../api/regulatoryApi'
export default {
  name: 'EventDetail',
  components: {
    SUpload
  },
  data () {
    return {
      loadData: {}, // 详情信息
      eventInfo: {}, // 事件信息
      eventFile: [], // 附件
      EventInfoId: '' // 事件ID
    }
  },
  methods: {
    // 页面数据
    initPage () {
      // 请求事件巡查详情
      getFormsDetailByEventInfoId(this.EventInfoId, FromType.eventDetail).then(res => {
        if (res) {
          this.loadData = res.MainForm
          this.eventFile = res.attachment // 附件
          getDetaildata('event_info', this.EventInfoId).then(res => {
            if (res) {
              this.eventInfo = res
            }
          })
        }
      })
    }
  },
  created () {
    this.EventInfoId = this.$route.query.ID // 事件ID
    this.initPage()
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
