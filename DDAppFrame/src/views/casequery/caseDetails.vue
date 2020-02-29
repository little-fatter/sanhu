<template>
  <div>
    <div class="case-title">
      <h4>{{ caseInfo.CaseNumber }}</h4>
      <van-tag type="success">{{ caseInfo.CaseStatus }}</van-tag>
    </div>
    <van-cell-group>
      <van-cell :title="caseInfo.caseTitle" title-class="title-cell title-cell-div" />
      <van-cell title="案件类型" :value="caseInfo.CauseOfAction" value-class="con-style" title-class="title-cell" />
      <van-cell title="适用程序" v-if="caseInfo.ApplicableProcedure" :value="caseInfo.ApplicableProcedure[1]" value-class="con-style" title-class="title-cell" />

      <!-- <van-cell title="当事人" :value="caseInfo.caseBreakLow" :label="caseInfo.caseBreakLowId" value-class="con-style" title-class="title-cell" /> -->

      <template>
        <van-cell
          title="当事人"
          v-for="item in lawPartyInfoL"
          :key="item.ID+'@'"
          :value="item.Name"
          :label="caseInfo.IDcard"
          value-class="con-style"
          title-class="title-cell" />
      </template>

      <van-cell title="案发时间" :value="caseInfo.IncidentTime" value-class="con-style" title-class="title-cell" />
      <van-cell title="案发地点" :value="caseInfo.IncidentAddress" value-class="con-style" title-class="title-cell">
        <van-button
          class="locationBtn"
          slot="right-icon"
          icon="location"
          size="small"
          type="info"
          @click="viewMap"/>
      </van-cell>
      <van-cell title="处罚决定文书号" :value="caseInfo.PenaltyDecisionNo" value-class="con-style" title-class="title-cell" />
      <van-cell title="处罚种类" v-if="caseInfo.PenaltyType" :value="caseInfo.PenaltyType[1]" value-class="con-style" title-class="title-cell" />
      <!-- <van-cell title="执行情况" :value="caseInfo.caseJudgementState" value-class="con-style" title-class="title-cell" /> -->
      <van-cell title="立案日期" :value="caseInfo.CaseRegisterDay" value-class="con-style" title-class="title-cell" />
      <van-cell title="结案日期" :value="caseInfo.CaseCloseDay" value-class="con-style" title-class="title-cell" />
      <van-cell title="办案人员" :value="caseInfo.Investigators" value-class="con-style" title-class="title-cell" />
      <van-cell title="归档人员" :value="caseInfo.DocPeople" value-class="con-style" title-class="title-cell" />
      <van-cell title="归档号" :value="caseInfo.DocNo" value-class="con-style" title-class="title-cell" />
      <van-cell title="保存期限" :value="caseInfo.DocRetentionTimes" value-class="con-style" title-class="title-cell" />
    </van-cell-group>
    <!--        地图加载-->
    <van-dialog v-model="show" title="地图地址查看">
      <h2>这里显示地图弹窗组件</h2>
    </van-dialog>
    <van-panel class="margintop">
      <div slot="header" class="case-title" @click="goDetails">
        <h4>事件信息</h4>
        <van-icon name="arrow"/>
      </div>
      <div>
        <van-cell-group>
          <van-cell title="事发地点" :value="eventInfo.address" value-class="con-style" title-class="title-cell">
            <van-button
              class="locationBtn"
              slot="right-icon"
              icon="location"
              size="small"
              type="info"
              @click="viewMap"/>
          </van-cell>
          <van-cell title="上报时间" :value="eventInfo.reportTime" value-class="con-style" title-class="title-cell" />
          <!-- <van-cell title="上报来源" :value="eventInfo.eventFrom" value-class="con-style" title-class="title-cell" /> -->
          <van-cell title="上报人" :value="eventInfo.reporterName" value-class="con-style" title-class="title-cell" />
          <van-cell title="事件类型" :value="eventInfo.evtTypeDisplayName" value-class="con-style" title-class="title-cell" />
          <van-cell title="事件描述" :value="eventInfo.remark" value-class="con-style" title-class="title-cell" />
        </van-cell-group>
      </div>
    </van-panel>
    <van-button class="case-files" type="info" block @click="caseFiles">案卷文件</van-button>
  </div>
</template>

<script>
import { getQueryConditon } from '../../utils/util' // 以及搜索规则
import { getDetaildata, getPageDate, getDetialdataByEventInfoId } from '../../api/regulatoryApi'// 引入请求
export default {
  name: 'CaseDetails',
  data () {
    return {
      caseId: '', // 案件ID
      show: false,
      caseInfo: {

      },
      lawPartyInfoL: {

      },
      eventInfo: {

      }
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
      this.$router.push({ name: 'caseFlies', params: { caseId: '4d77125c-7352-4a5d-827c-c524cdac07ff' } })
    },
    // 数据请求
    getCaseInfo () {
      const conditon = {
        rules: [
          {
            field: 'CaseID',
            op: 'equal',
            value: this.caseId,
            type: 'string'
          },
          {
            field: 'Associatedobjecttype',
            op: 'equal',
            value: 'case_Info',
            type: 'string'
          }
        ]
      }
      // 请求案件详情
      getDetaildata('case_Info', this.caseId).then((res) => {
        this.caseInfo = res
        console.log('案件详情', res)
      })
      // 请求当事人
      getPageDate('law_party', 1, 100, conditon).then((res) => {
        this.lawPartyInfoL = res.Rows
        console.log('当事人', res.Rows)
      })
      // 请求案件 关联事件
      getDetialdataByEventInfoId('event_info', this.caseId.EventInfoId).then((res) => {
        this.eventInfo = res
        console.log('事件信息', res)
      })
    }
  },
  mounted () {
    // 接收路由案件ID传参
    this.caseId = this.$route.params.caseId
    this.getCaseInfo()
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
    .title-cell-div{
      width: 100%;
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
</style>
