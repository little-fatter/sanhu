<template>
  <div>
    <div class="case-title">
      <h4>{{ caseInfo.caseNumber }}</h4>
      <van-tag type="success">{{ caseInfo.caseState }}</van-tag>
    </div>
    <van-cell-group>
      <van-cell :title="caseInfo.caseTitle" title-class="title-cell title-cell-div" />
      <van-cell title="案件类型" :value="caseInfo.caseType" value-class="con-style" title-class="title-cell" />
      <van-cell title="适用程序" :value="caseInfo.caseFlow" value-class="con-style" title-class="title-cell" />
      <van-cell title="当事人" :value="caseInfo.caseBreakLow" :label="caseInfo.caseBreakLowId" value-class="con-style" title-class="title-cell" />
      <van-cell title="案发时间" :value="caseInfo.caseTime" value-class="con-style" title-class="title-cell" />
      <van-cell title="案发地点" :value="caseInfo.caseLocation" value-class="con-style" title-class="title-cell">
        <van-button
          class="locationBtn"
          slot="right-icon"
          icon="location"
          size="small"
          type="info"
          @click="viewMap"/>
      </van-cell>
      <van-cell title="处罚决定文书号" :value="caseInfo.caseJudgementNum" value-class="con-style" title-class="title-cell" />
      <van-cell title="处罚种类" :value="caseInfo.caseJudgmentType" value-class="con-style" title-class="title-cell" />
      <van-cell title="执行情况" :value="caseInfo.caseJudgementState" value-class="con-style" title-class="title-cell" />
      <van-cell title="立案日期" :value="caseInfo.caseCreateTime" value-class="con-style" title-class="title-cell" />
      <van-cell title="结案日期" :value="caseInfo.caseFinishTime" value-class="con-style" title-class="title-cell" />
      <van-cell title="办案人员" :value="caseInfo.caseLaw" value-class="con-style" title-class="title-cell" />
      <van-cell title="归档人员" :value="caseInfo.caseFileSavePeople" value-class="con-style" title-class="title-cell" />
      <van-cell title="归档号" :value="caseInfo.caseFileSaveNum" value-class="con-style" title-class="title-cell" />
      <van-cell title="保存期限" :value="caseInfo.caseSaveTime" value-class="con-style" title-class="title-cell" />
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
          <van-cell title="事发地点" :value="eventInfo.location" value-class="con-style" title-class="title-cell">
            <van-button
              class="locationBtn"
              slot="right-icon"
              icon="location"
              size="small"
              type="info"
              @click="viewMap"/>
          </van-cell>
          <van-cell title="上报时间" :value="eventInfo.happenTime" value-class="con-style" title-class="title-cell" />
          <van-cell title="上报来源" :value="eventInfo.eventFrom" value-class="con-style" title-class="title-cell" />
          <van-cell title="上报人" :value="eventInfo.updatePeople" value-class="con-style" title-class="title-cell" />
          <van-cell title="事件类型" :value="eventInfo.eventType" value-class="con-style" title-class="title-cell" />
          <van-cell title="事件描述" :value="eventInfo.eventDesc" value-class="con-style" title-class="title-cell" />
        </van-cell-group>
      </div>
    </van-panel>
    <van-button class="case-files" type="info" block @click="caseFiles">案卷文件</van-button>
  </div>
</template>

<script>
export default {
  name: 'CaseDetails',
  data () {
    return {
      show: false,
      caseInfo: {
        caseId: '35M4o8IG6OA0G0PJ',
        caseTitle: '违法使用泡沫制品简易浮动设施载人入湖', // 案由
        caseType: '水政',
        caseBreakLow: '张三', // 违法人员
        caseBreakLowId: '123456789874858747', // 违法人员 身份证
        caseLaw: '李明', // 执法人员
        caseNumber: '案〔2020〕1234号', // 案件编号
        caseFlow: '一般流程',
        caseState: '处理中',
        caseTime: '2020-02-19 12:10:30',
        caseLocation: '澄江县XX路10号',
        caseJudgementNum: '玉抚管罚决字〔2020〕4006号',
        caseJudgmentType: '罚款',
        caseJudgementState: '已执行',
        caseCreateTime: '2020-02-20 12:25:30',
        caseFinishTime: '2020-02-20 12:30:15',
        caseFileSavePeople: '赵华',
        caseFileSaveNum: 123456,
        caseSaveTime: '10年'
      },
      eventInfo: {
        location: '澄江县XX路10号',
        happenTime: '2020-02-19 12:10:30',
        eventFrom: '网上举报',
        updatePeople: '张三 13569874158',
        eventType: '非法捕捞',
        eventDesc: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
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
    }
  },
  mounted () {
    // 接收路由传参
    console.log(this.$route.params.info)
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
