<template>
  <div>
    <div class="case-title">
      <h4>{{ caseInfo.caseNumber }}</h4>
      <van-tag type="success">{{ caseInfo.caseState }}</van-tag>
    </div>
    <van-cell-group>
      <van-field v-model="caseInfo.caseTitle" readonly/>
      <van-field label="案件类型" v-model="caseInfo.caseType" readonly/>
      <van-field label="适用程序" v-model="caseInfo.caseFlow" readonly/>
      <van-field
        readonly
        label="当事人"
        v-model="caseInfo.caseBreakLow"
        error-message="123456789635874158"
      />
      <van-field label="事发时间" v-model="caseInfo.caseTime" readonly/>
      <van-field label="案发地点" v-model="caseInfo.caseLocation" readonly>
        <van-button slot="button" icon="location" size="small" type="info" @click="viewMap"/>
      </van-field>
      <van-field label="处罚决定文书号" v-model="caseInfo.caseJudgementNum" readonly/>
      <van-field label="处罚种类" v-model="caseInfo.caseJudgmentType" readonly/>
      <van-field label="执行情况" v-model="caseInfo.caseJudgementState" readonly/>
      <van-field label="立案日期" v-model="caseInfo.caseCreateTime" readonly/>
      <van-field label="结案日期" v-model="caseInfo.caseFinishTime" readonly/>
      <van-field label="办案人员" v-model="caseInfo.caseLaw" readonly/>
      <van-field label="归档人员" v-model="caseInfo.caseFileSavePeople" readonly/>
      <van-field label="归档号" v-model="caseInfo.caseFileSaveNum" readonly/>
      <van-field label="保存期限" v-model="caseInfo.caseSaveTime" readonly/>
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
          <van-field label="事发地点" v-model="eventInfo.location" readonly>
            <van-button slot="button" icon="location" size="small" type="info" @click="viewMap"/>
          </van-field>
          <van-field label="上报时间" v-model="eventInfo.happenTime" readonly/>
          <van-field label="上报来源" v-model="eventInfo.eventFrom" readonly/>
          <van-field label="上报人" v-model="eventInfo.updatePeople" readonly/>
          <van-field label="事件类型" v-model="eventInfo.eventType" readonly/>
          <van-field
            v-model="eventInfo.eventDesc"
            readonly
            rows="2"
            autosize
            label="事件描述"
            type="textarea"
          />
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
      this.$router.push({ name: 'caseFlies', params: { caseId: this.caseInfo.caseId } })
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
</style>
