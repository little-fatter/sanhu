<template>
  <div>
    <form action="/">
      <van-search
        v-model="serchText"
        show-action
        placeholder="请输入搜索关键词"
        class="serch-bar"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
      <van-dropdown-menu class="filtrate-bar">
        <van-dropdown-item v-model="serchType" :options="serchTypeOptions" @change="serchTypeText"></van-dropdown-item>
        <van-dropdown-item v-model="serchFlow" :options="serchFlowOptions" @change="serchFlowText"></van-dropdown-item>
        <van-dropdown-item v-model="serchState" :options="serchStateOptions" @change="serchStateText"></van-dropdown-item>
        <van-dropdown-item v-model="serchRegion" :options="serchRegionOptions" @change="serchRegionText"></van-dropdown-item>
      </van-dropdown-menu>
    </form>
    <div class="case-panel-roll">
      <!-- list组件-->
      <SList :dataCallback="loadData" ref="mylist">
        <van-panel v-for="(item, index) in caseList" :key="index+'@'" class="case-panel" @click="goCaseDetails(item.caseId)">
          <div slot="header">
            <!--使用插槽取消面板头部-->
          </div>
          <div>
            <h4 class="case-title">{{ item.caseTitle }}</h4>
            <div class="default-info">
              <span>当事人</span>
              <div>
                <span v-for="msg in item.caseBreakLow" :key="msg+'@'">{{ msg }} </span>
              </div>
            </div>
            <div class="default-info">
              <span>办案人</span>
              <div>
                <span>{{ item.caseLaw }} </span>
              </div>
            </div>
            <div class="case-tag">
              <van-tag plain>{{ item.caseNumber }}</van-tag>
              <van-tag plain>{{ item.caseFlow }}</van-tag>
              <van-tag plain>{{ item.caseState }}</van-tag>
              <span>{{ item.caseTime }}</span>
              <!--                            <van-tag plain>2020/02/11 12:00更新</van-tag>-->
            </div>
          </div>
        </van-panel>
      </SList>
      <!-- <template>
                 <van-divider class="tip">到底了</van-divider>
             </template>
             <template>
                 <p class="empty"><img src="../../assets/icons/img/empty.png"/></p>
             </template>-->
    </div>
  </div>
</template>

<script>
import SList from '../../components/list/SList'
import { isNotEmpty, getQueryConditon } from '../../utils/util'
import { getPageDate } from '../../api/regulatoryApi'

export default {
  name: 'CaseQuery',
  components: {
    SList
  },
  data () {
    return {
      serchText: '', // 搜索内容
      list: [],
      // 搜索条件
      serchType: 0,
      serchTypeOptions: [
        { text: '类型', value: 0 },
        { text: '非法捕捞', value: '非法捕捞' },
        { text: '污染环境', value: '污染环境' }
      ],
      serchFlow: 0,
      serchFlowOptions: [
        { text: '程序', value: 0 },
        { text: '简易程序', value: '简易程序' },
        { text: '一般程序', value: '一般程序' }
      ],
      serchState: 0,
      serchStateOptions: [
        { text: '状态', value: 0 },
        { text: '受理中', value: '受理中' },
        { text: '已立案', value: '已立案' },
        { text: '调查取证', value: '调查取证' }
      ],
      serchRegion: 0,
      serchRegionOptions: [
        { text: '区域', value: 0 },
        { text: '抚仙湖', value: '抚仙湖' },
        { text: '星云湖', value: '星云湖' },
        { text: '杞麓湖', value: '杞麓湖' }
      ],
      caseList: [
        {
          caseId: 'LpSLt1iTtFKUBjD7',
          caseTitle: '违法使用泡沫制品简易浮动设施载人入湖', // 案由
          caseBreakLow: ['张三', '李思', '王麻子'], // 违法人员
          caseLaw: '王五', // 执法人员
          caseNumber: '案〔2020〕3206号', // 案件编号
          caseFlow: '简易流程',
          caseState: '已结案',
          caseTime: '2020-02-25 15:20:30'
        },
        {
          caseId: '35M4o8IG6OA0G0PJ',
          caseTitle: '这是案由', // 案由
          caseBreakLow: ['网二', '哈哈'], // 违法人员
          caseLaw: '李明', // 执法人员
          caseNumber: '案〔2020〕1234号', // 案件编号
          caseFlow: '一般流程',
          caseState: '处理中',
          caseTime: '2020-02-19 12:10:30'
        }
      ]
    }
  },
  methods: {
    // 搜索事件
    onSearch () {
      // console.log(this.serchText)
      this.list = []
      this.$refs.mylist.refresh()
    },
    // 筛选
    serchTypeText () {
      console.log(this.serchType)
    },
    serchFlowText () {
      console.log(this.serchFlow)
    },
    serchStateText () {
      console.log(this.serchState)
    },
    serchRegionText () {
      console.log(this.serchRegion)
    },
    // 跳转到案件详情
    goCaseDetails (msg) {
      this.$router.push({ name: 'caseDetails', params: { info: msg } })
    },
    // 配置请求参数
    loadData (parameter) {
      var rules = []
      if (isNotEmpty(this.serchText)) {
        console.log(1111)
        rules = [
          {
            field: 'CaseType', // 案件类型
            op: 'equal',
            value: this.serchType,
            type: 'string'
          },
          {
            field: 'ApplicableProcedureID', // 案件适用程序
            op: 'like',
            value: this.serchFlow,
            type: 'select'
          },
          {
            field: 'CaseStatus', // 案件状态
            op: 'equal',
            value: this.serchState,
            type: 'string'
          },
          {
            field: 'CaseTitle', // 区域
            op: 'equal',
            value: this.serchRegion,
            type: 'string'
          }
        ]
      }
      console.log('如果打印出来则没进入if判断')
      var conditon = getQueryConditon(rules, 'and')
      return getPageDate('case_Info', parameter.pageIndex, parameter.pageSize, conditon).then((res) => {
        if (res.Rows) {
          res.Rows.forEach(item => {
            this.list.push(item)
          })
        }
        // console.log(res)
        return res
      })
    }
  },
  // 生命周期函数
  mounted () {

  }

}
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    /deep/ .content {
        background-color: #f7f8fa !important;
    }

    .case-panel {
        padding: 0.32rem;
        color: #101010;
        margin-top: 0.32rem;
    }

    .case-title {
        margin-bottom: 0.18rem;
    }

    .default-info {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        margin-bottom: 0.15rem;
    }

    .default-info > div {
        flex: 1;
        padding-left: 0.32rem;
        color: #666;
    }

    .case-tag {
        display: flex;
        justify-content: space-between;
    }

    .case-tag > span {
        font-size: 0.26rem;
        color: #969696;
    }

    .empty {
        padding: 0;
        margin: 0;
        text-align: center;
    }

    .empty img {
        width: 20%;
    }

    .tip {
        width: 60%;
        margin-left: 20%;
    }

    .case-panel-roll {
        overflow-y: auto;
    }
</style>
