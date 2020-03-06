<template>
  <div class="eventDetail">
    <van-cell-group>
      <!-- <van-cell border="none">任务类型：事件巡查</van-cell>
      <van-cell>巡查类型：巡查类型</van-cell>
      <van-cell>交办时间：2020-02-15 12：54：03</van-cell>
      <van-cell>期望完成时间：2020-02-15 12：54：03</van-cell>-->
      <van-cell>
        <van-cell is-link style="background-color:#DFDDDD;" value="事件信息"></van-cell>
      </van-cell>
      <van-cell title="事发地点：" :value="eventInfo.address"></van-cell>
      <van-cell title="上报时间：" :value="eventInfo.reportTime"></van-cell>
      <van-cell title="上报来源：" :value="loadData.reportType"></van-cell>
      <van-cell title="上报人：" :value="eventInfo.reporterName"></van-cell>
      <van-cell title="事件类型：" :value="eventInfo.evtTypeDisplayName"></van-cell>
      <van-cell title="事件描述：" :value="eventInfo.remark"></van-cell>
      <van-cell title="关联表单：">
        <span>
          <svg
            t="1582606760517"
            class="icon"
            viewBox="0 0 1000 1000"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5583"
            width="20"
            height="20"
          >
            <path
              d="M546.133333 520.533333l59.733334-59.733333 21.333333 21.333333 115.2-115.2-119.466667-119.466666-115.2 115.2 4.266667 8.533333-59.733333 59.733333L384 358.4 614.4 128l243.2 243.2-230.4 230.4-81.066667-81.066667z m-115.2-68.266666L371.2 512l-8.533333-8.533333-115.2 115.2 119.466666 119.466666 115.2-115.2-21.333333-21.333333 59.733333-59.733333 81.066667 81.066666L371.2 853.333333 128 614.4 358.4 384l72.533333 68.266667zM571.733333 341.333333l59.733334 59.733334-230.4 230.4L341.333333 571.733333 571.733333 341.333333z"
              fill="#8a8a8a"
              p-id="5584"
            />
          </svg>
          {{loadData.Associatedforms}}
        </span>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="事件描述" :value="loadData.EventDescribe"></van-cell>
      <van-cell title="事件类型" :value="loadData.EventType"></van-cell>
      <van-cell title="事发时间" :value="loadData.IncidentTime"></van-cell>
      <van-cell title="事发地点" :value="loadData.IncidentAddress"></van-cell>
      <van-cell title="处理结果" :value="loadData.Result"></van-cell>
      <!-- <van-cell title="" :value=""></van-cell>-->
      <van-cell title="图片">
        <SUpload
          ref="myupload"
          :sync2Dingding="false"
          :isOnlyView="true"
          style="margin-left:80px;margin-bottom:5px;"
        ></SUpload>
      </van-cell>
      <van-cell title="附件">
        <SUpload
          ref="myupload"
          :sync2Dingding="false"
          :isOnlyView="true"
          style="margin-left:80px;margin-bottom:5px;"
        ></SUpload>
      </van-cell>
      <van-cell title="是否请求执法人员处理" :value="eventCheck.Needlawenforcement===0? '是':'否'"></van-cell>
      <van-cell title="是否需要跟踪整改" :value="eventCheck.Needtracking===0? '是':'否'"></van-cell>
      <van-cell>
        <van-button type="info" native-type="submit" @click="returnSubmitForm" size="large">返回</van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import SUpload from "../../components/file/StandardUploadFile";
import {
  isNotEmpty,
  formatDate,
  isEmpty,
  getQueryConditon
} from "../../utils/util";
import {
  getDetaildata,
  commonOperateApi,
  getDictionaryItems,
  DictionaryCode,
  commonSaveApi,
  getDetialdataByfilter,
  getDetialdataByEventInfoId
} from "../../api/regulatoryApi";
export default {
  name: "EventDetail",
  components: {
    SUpload
  },
  props: {},
  data() {
    return {
      loadData: {},
      eventInfo:{},
      eventAddress: "玉溪市澄江县 | 1.5km",
      reportTime: "123",
      reportType: "公众号举报",
      reporterName: "小马哥",
      evtTypeDisplayName: "非法捕捞",
      remark:
        "武汉一名患者的这句话让医生红了双眼，也让无数人泪目。让医生远点，是担心传染，是希望“他们为更多武汉市民护佑生命”。“一个人撑起一片天，一颗心温暖一座城……”很多人这样留言。在这座城市，这些天来，这样的故事每天都在发生。",
      eventCheck: {
        desc:
          "武汉一名患者的这句话让医生红了双眼，也让无数人泪目。让医生远点，是担心传染，是希望“他们为更多武汉市民护佑生命”。“一个人撑起一片天，一颗心温暖一座城……”很多人这样留言。在这座城市，这些天来，这样的故事每天都在发生。",
        eventType: "非法捕捞",
        eventTime: "2018-12-01",
        eventAddress: "成都市",
        dealResult:
          "武汉一名患者的这句话让医生红了双眼，也让无数人泪目。让医生远点，是担心传染，是希望“他们为更多武汉市民护佑生命”。“一个人撑起一片天，一颗心温暖一座城……”很多人这样留言。",
        dealType: "自行处理",
        needTailAfter: "需要跟踪"
      },
      rejectReason: "",
      eventTypeption: "465456",
      access: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    returnSubmitForm() {
      this.$router.go(-1);
    },
    // 页面数据
    init() {
      const id = this.$route.query.id;
      // 请求事件巡查详情
      getDetaildata("task_patrol", id).then(res => {
        this.loadData = res;
      });
      // 请求事件信息详情
      getDetialdataByEventInfoId("event_info", this.loadData.EventInfoId).then(
        resolve => {
          this.eventInfo=resolve;
          console.log();
          
        }
      );
      console.log(id);
    }
  },
  created() {
    this.init();
  },
  mounted() {}
};
</script>
<style lang="less">
</style>
