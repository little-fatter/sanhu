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
        <van-panel v-for="(item, index) in caseList" :key="index+'@'" class="case-panel" @click="goCaseDetails(item.ID)">
          <div slot="header">
            <!--使用插槽取消面板头部-->
          </div>
          <div>
            <h4 class="case-title">{{ item.CauseOfAction }}</h4>
            <div class="default-info">
              <span>当事人</span>
              <div>
                <span v-for="(msg,i) in item.LawPartys" :key="i+'@'">{{ msg.Name }} </span>
              </div>
            </div>
            <div class="default-info">
              <span>办案人</span>
              <div>
                <span>{{ item.Investigators }} </span>
              </div>
            </div>
            <div class="case-tag">
              <van-tag plain>{{ item.CaseNumber }}</van-tag>
              <van-tag plain>{{ item.ApplicableProcedure[1] }}</van-tag>
              <van-tag plain>{{ item.CaseStatus }}</van-tag>
              <span>{{ item.ModifyDate }}</span>
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
import { isNotEmpty, getQueryConditon } from '../../utils/util' // 引入搜索框判断是否为空,以及搜索规则
import { getPageDate } from '../../api/regulatoryApi' // 引入封装的请求

export default {
  name: 'CaseQuery',
  components: {
    SList
  },
  data () {
    return {
      serchText: '', // 搜索内容
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
      // 案件列表数组  里面放的是对象
      caseList: []
    }
  },
  methods: {
    // 搜索事件
    onSearch () {
      // console.log(this.serchText)
      this.caseList = []// 重新搜索将 搜索结果清空
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
      this.$router.push({ name: 'caseDetails', params: { id: msg } }) // 案件详情id
    },
    // 配置请求参数
    loadData (parameter) {
      var rules = []
      if (isNotEmpty(this.serchText)) {
        rules = [
          {
            field: 'CaseType', // 案件类型
            op: 'equal',
            value: this.serchType,
            type: 'string'
          },
          {
            field: 'ApplicableProcedureID', // 案件适用程序
            op: 'equal',
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
      var conditon = getQueryConditon(rules, 'and')
      return getPageDate('case_Info', parameter.pageIndex, parameter.pageSize, conditon).then((res) => {
        if (res.Rows) {
          res.Rows.forEach(item => {
            this.caseList.push(item)
          })
        }
        console.log(this.caseList)
        return res
      })
    }
  },
  // 生命周期函数
  mounted () {
    // 进入案件列表即刻加载数据
    this.onSearch()
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
