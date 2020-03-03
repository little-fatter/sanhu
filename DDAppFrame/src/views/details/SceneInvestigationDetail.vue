<template>
  <div class="SceneInvestigationDetail">
    <van-cell-group>
      <!-- <van-cell title="交办时间：" :value="loadData.deliveryTime"></van-cell>
      <van-cell title="期望完成时间：" :value="loadData.expectedCompletionTime"></van-cell>
      <van-cell title="协办人：" :value="loadData.person"></van-cell>-->
      <van-cell is-link style="background-color:#DFDDDD;">事件信息</van-cell>
      <van-cell title="事发地点：" :value="loadData.IncidentAddress"></van-cell>
      <van-cell title="上报时间：" :value="loadData.reportTime"></van-cell>
      <van-cell title="上报来源：" :value="loadData.reportType"></van-cell>
      <van-cell title="上报人：" :value="loadData.reporterName"></van-cell>
      <van-cell title="事件类型：" :value="loadData.evtTypeDisplayName"></van-cell>
      <van-cell title="事件描述：">
        <p style="text-align:left;">{{remark}}</p>
      </van-cell>
      <van-cell title="上报来源：" :value="loadData.reportType"></van-cell>
      <van-cell title="事件类型" :value="loadData.evtTypeDisplayName" />
      <van-cell title="事发时间" :value="loadData.eventCheck.IncidentTime|dayjs" />
      <van-cell title="事发地点" :value="loadData.IncidentAddress"></van-cell>
      <van-cell-group>
        <PartyInfoView :initData="surveyParty"></PartyInfoView>
      </van-cell-group>
      <van-cell>
        图片：
        <van-image fit="contain" :src="loadData.finishPhotoUrl" />
        <!-- <SUpload
          ref="myupload"
          :accept="access"
          :sync2Dingding="false"
          :isOnlyView="true"
          style="margin-left:80px;margin-bottom:5px;"
        ></SUpload>-->
      </van-cell>
      <van-cell>
        附件：
        <!-- <SUpload
          style="margin-left:80px;margin-bottom:5px;"
          ref="myupload"
          :accept="access"
          :sync2Dingding="false"
          :isOnlyView="true"
        ></SUpload>-->
      </van-cell>
      <van-cell :value="loadData.Result" title="处理结论"></van-cell>
      <van-cell :value="loadData.ProcessingDecisions" title="处理决定" />
      <van-cell :value="loadData.ExistCrim" title="是否涉嫌犯罪" />
      <van-cell>
        <van-button type="info" @click="returnSubmitForm" native-type="submit" size="large">返回</van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import PartyInfoView from "../../components/business/PartyInfoView";
import SUpload from "../../components/file/StandardUploadFile";
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
  name: "SceneInvestigationDetail",
  components: {
    SUpload,
    PartyInfoView
  },
  props: {},
  data() {
    return {
      loadData: {},
      surveyParty: [],
      access: "",
      deliveryTime: "2020-02-28",
      expectedCompletionTime: "2020-02-28",
      person: "赵子龙",
      eventAddress: "玉溪市澄江县 | 15km",
      reportTime: "2020-02-26 13:52:26",
      reportType: "举报",
      reporterName: "张三丰",
      evtTypeDisplayName: "无",
      remark:
        "玉溪市澄江县玉溪市澄江县玉溪市澄江县玉溪市澄江县玉溪市澄江县玉溪市澄江县",
      eventCheck: {
        eventType: "非法捕捞",
        eventTime: new Date(),
        eventAddress: "成都市",
        partyInfoData: [
          {
            partyType: 1,
            name: "小貂蝉",
            company: "前端工程师",
            nation: "汉族",
            sex: 1,
            idCard: "5113026155355X",
            address: "成都市武侯区",
            phone: 13629091535
          },
          {
            partyType: 2,
            name: "成都建投",
            legalName: "张大千",
            idCard: "5113026155355X",
            address: "成都市武侯区",
            tel: 13629091535
          }
        ],
        dealResult:
          "成都市成都市成都市成都市成都市成都市成都市成都市成都市成都市成都市",
        dealType: "处理结论类型",
        needTailAfter: "尚未查询到犯罪记录"
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    returnSubmitForm() {
      this.$router.push("/submitForm");
    },
    // 获取数据
    init() {
      const id = this.$route.params.item.ID;
      getDetaildata("task_survey", id).then(res => {
        this.loadData = res;
        console.log(this.loadData);
      });
      getDetaildata("task_surveyParty", id).then(res => {
        var law_party={
          partyType:res.partyType,
          idCard:res.IDcard,
          phone:res.Contactnumber,
          address:res.address,
          nation:res.Nationality,
          company:res.WorkUnit,
          name:res.Name,
          legalName:res.Nameoflegalperson,
        };
        this.surveyParty.push(law_party);
        console.log(this.surveyParty);
      });
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
