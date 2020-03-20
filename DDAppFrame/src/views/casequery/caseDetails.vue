<template>
  <div>
    <div class="case-title">
      <h4>{{ caseInfo.CaseNumber }}</h4>
      <van-tag type="success">{{ caseInfo.CaseStatus }}</van-tag>
    </div>
    <van-cell-group>
      <template v-if="caseInfo.CauseOfAction===''|| caseInfo.CauseOfAction=== null">
        <van-cell title="案由：" value="无数据" title-class="title-cell " />
      </template>
      <template v-else>
        <van-cell title="案由：" :value="caseInfo.CauseOfAction" title-class="title-cell " />
      </template>
      <van-cell title="案件类型" :value="caseInfo.CaseType" value-class="con-style" title-class="title-cell" />
      <!-- <van-cell title="适用程序" v-if="caseInfo.ApplicableProcedure" :value="caseInfo.ApplicableProcedure[1]" value-class="con-style" title-class="title-cell" /> -->
      <van-cell title="适用程序" value="简易程序" value-class="con-style" title-class="title-cell" />
      <van-cell title="案发时间" :value="caseInfo.IncidentTime" value-class="con-style" title-class="title-cell" />
      <van-cell title="案发地点" :value="caseInfo.IncidentAddress" value-class="con-style" title-class="title-cell">
        <!-- <van-button
          class="locationBtn"
          slot="right-icon"
          icon="location"
          size="small"
          type="info"
          @click="viewMap"/> -->
      </van-cell>
      <van-cell title="处罚决定文书号" :value="caseInfo.PunishmentTitle" value-class="con-style" title-class="title-cell" />
      <van-cell title="处罚种类" :value="caseInfo.publishtype" value-class="con-style" title-class="title-cell" />
      <van-cell title="执行情况" value="已执行" value-class="con-style" title-class="title-cell" />
      <van-cell title="立案日期" :value="caseInfo.CreateDate" value-class="con-style" title-class="title-cell" />
      <van-cell title="结案日期" :value="caseInfo.closeDate" value-class="con-style" title-class="title-cell" />
      <van-cell title="办案人员" :value="caseInfo.CreateUserID" value-class="con-style" title-class="title-cell" />
      <!-- <van-cell title="归档人员" :value="caseInfo.DocPeople" value-class="con-style" title-class="title-cell" />
      <van-cell title="归档号" :value="caseInfo.CaseNumber" value-class="con-style" title-class="title-cell" />
      <van-cell title="保存期限" :value="caseInfo.DocRetentionTimes" value-class="con-style" title-class="title-cell" /> -->
    </van-cell-group>
    <van-cell-group style="margin-top:0.3rem">
      <van-cell >
        <h5>当事人信息</h5>
      </van-cell>
      <van-cell>
        <!--当事人信息-->
        <PartyInfo :initData="initData" ref="MyPartyInfo"></PartyInfo>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell style="margin-top:0.3rem">
        <h5>附件信息</h5>
      </van-cell>
      <S-upload
        ref="myupload"
        :sync2Dingding="false"
        :isOnlyView="true"
        :initResult="attachment"
      ></S-upload>
    </van-cell-group>
    <van-cell-group>
      <van-cell style="margin-top:0.3rem">
        <h5>案件进度</h5>
      </van-cell>
      <van-steps direction="vertical" :active="caseFlow.length-1">
        <van-step v-for="item in caseFlow" :key="item.id">
          <h6>{{ item.FormType }}</h6>
          <p class="flowState">{{ item.state }}</p>
          <p class="flowState">{{ item.CreateUser }}  {{ item.CreateDate | dayjs('YYYY-MM-DD hh:mm') }}</p>
        </van-step>
      </van-steps>
    </van-cell-group>
    <!--        地图加载-->
    <van-dialog v-model="show" title="地图地址查看">
      <h2>这里显示地图弹窗组件</h2>
    </van-dialog>
    <van-panel class="margintop">
      <div slot="header" class="case-title" @click="goDetails">
        <h4>事件信息</h4>
        <!-- <van-icon name="arrow"/> -->
      </div>
      <div>
        <van-cell-group>
          <van-cell title="事发地点" :value="eventInfo.address" value-class="con-style" title-class="title-cell">
            <!-- <van-button
              class="locationBtn"
              slot="right-icon"
              icon="location"
              size="small"
              type="info"
              @click="viewMap"/> -->
          </van-cell>
          <van-cell title="上报时间" :value="eventInfo.reportTime" value-class="con-style" title-class="title-cell" />
          <!-- <van-cell title="上报来源" :value="eventInfo.eventFrom" value-class="con-style" title-class="title-cell" /> -->
          <van-cell title="上报人" :value="eventInfo.reporterName" value-class="con-style" title-class="title-cell" />
          <van-cell title="事件类型" :value="eventInfo.evtTypeDisplayName" value-class="con-style" title-class="title-cell" />
          <van-cell title="事件描述" :value="eventInfo.remark" value-class="con-style" title-class="title-cell" style="margin-bottom:1.5rem;" />
        </van-cell-group>
      </div>
    </van-panel>
    <van-button class="case-files" type="info" block @click="caseFiles">案卷文件</van-button>
  </div>
</template>

<script>
import { getDetaildata, getPageDate, getDetialdataByEventInfoId, getFormsDetailByEventInfoId, FromType } from '../../api/regulatoryApi'// 引入请求
import PartyInfo from '../../components/business/PartyInfoView'
import SUpload from '../../components/file/StandardUploadFile'
export default {
  name: 'CaseDetails',
  components: {
    PartyInfo,
    SUpload
  },
  data () {
    return {
      caseId: '', // 案件ID
      show: false,
      caseInfo: {},
      lawPartyInfoL: {},
      eventInfo: {},
      attachment: [], // 附件信息
      initData: [], // 组件当事人
      caseFlow: [] // 案件流程
    }
  },
  methods: {
    viewMap () {
      this.show = true
    },
    goDetails () {
      console.log(`到事件详情`)
    },
    caseFiles () {
      // 传递 案件id
      this.$router.push({ path: 'caseFlies', query: { caseId: this.caseId } })
    },
    // 数据请求
    getCaseInfo () {
      getFormsDetailByEventInfoId(null, FromType.caseDetails, this.caseId, ['casedetail']).then(res => {
        console.log(res)
        this.caseInfo = res.MainForm // 案件信息
        this.initData = res.law_party // 当事人
        this.attachment = res.attachment // 附件信息
        this.caseFlow = res.casetimeline // 案件流程
        // 请求案件关联事件
        getDetialdataByEventInfoId('event_info', res.EventInfoId).then((res) => {
          console.log(res)

          this.eventInfo = res
        })
      })
    }
  },
  created () {
    // 接收路由案件ID传参
    this.caseId = this.$route.query.id
    // 执行数据请求
    this.getCaseInfo()
  },
  mounted () {

  }
}
</script>

<style scoped>
    .case-title {
        display: flex;
        justify-content: space-between;
        padding: 0.26rem 0.4rem;
    }

    .case-title > h4 {
        margin: 0px;
        color: #010101;
    }

    .margintop {
        margin-top: 0.3rem;
    }

    .case-files {
        position: fixed;
        bottom: 0px;
    }

    /deep/ .van-field__error-message {
        color: #323232;
    }
    .title-cell{
      width: 2.4rem;
      flex: unset;
    }
    .con-style{
      flex: 1;
      text-align: left;
    }
    .locationBtn{
      background-color: transparent;
      border: none;
    }
    .locationBtn > i{
      color: #1989fa;
    }
    .van-cell__label{
      margin-left: 2.4rem;
    }
    .flowState{
      font-size: 0.28rem;
    }
</style>
