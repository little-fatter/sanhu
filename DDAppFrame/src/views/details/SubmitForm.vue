<!--//我提交的表单-->
<template>
  <div class="SubmitForm">
    <!--cll 重写搜索组件-->
    <van-row>
      <van-col span="20">
        <van-search v-model="searchKeyWords" placeholder="请输入搜索关键词" show-action shape="round">
          <div class="search-text" slot="action" @click="onSearch">搜索</div>
        </van-search>
      </van-col>
      <van-col span="4">
        <div class="filter-btn">
          <span @click="screenPage">
            <van-icon name="filter-o" />筛选
          </span>
        </div>
      </van-col>
      <van-popup v-model="screenShow" position="top">
        <div class="screenForm">
          <van-cell-group>
            <!--表单没有状态 不做搜索 cll-->
            <!-- <van-cell title="状态" icon="stop" />
            <div class="contentBox status">
              <button
                v-for="(item,index) in FormState"
                :key="item.ID"
                @click="FormStatusEvn(index,item)"
              >{{ item.Title }}</button>
            </div>-->
            <van-cell title="表单类型" icon="stop" />
            <div class="contentBox type">
              <button
                v-for="(item,index) in FormType"
                :key="item.ID"
                @click="FormTypeEvn(index,item)"
              >{{ item.Title }}</button>
            </div>
          </van-cell-group>
        </div>
      </van-popup>
    </van-row>
    <!-- 表格列表组件 -->
    <SList :dataCallback="loadData" ref="mylist">
      <van-panel
        v-for="(item, index) in listData"
        class="case-panel"
        :key="index+'@'"
        @click="goTodetail(item)"
      >
        <div slot="header"></div>
        <div>
          <div class="case-title-head">
            <h4 class="case-title">
              <template v-if="item.FormName===''||item.FormName===null">表单名称-无数据</template>
              <template v-else>{{ item.FormName }}</template>
            </h4>
            <span>{{ item.InitiationTime }}</span>
          </div>
          <div class="default-info">
            <span>申请部门：</span>
            <div>
              <span>
                <template v-if="item.Department===''||item.Department===null">无数据</template>
                <template v-else>{{ item.Department }}</template>
              </span>
            </div>
          </div>
          <div class="default-info">
            <span>申请人员：</span>
            <div>
              <span>
                <template v-if="item.handler===''||item.handler===null">无数据</template>
                <template v-else>{{ item.handler }}</template>
              </span>
            </div>
          </div>
          <template
            v-if="item.FormType === 'form_confiscated_item'||'case_info'||'case_report'||'case_report'||'law_punishmentInfo'||'form_inquestrecord'||'form_inquiryrecord_litigant'||'form_inquiryrecord_witness'? false:true"
          >
            <div class="default-info">
              <span>事件编号：</span>
              <div>
                <span>
                  <template v-if="item.evtCode===''||item.evtCode===null">无数据</template>
                  <template v-else>{{ item.evtCode }}</template>
                </span>
              </div>
            </div>
            <div class="default-info">
              <span>事件类型:</span>
              <div>
                <span>
                  <template v-if="item.evtTypeName===''||item.evtTypeName===null">无数据</template>
                  <template v-else>{{ item.evtTypeName }}</template>
                </span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="default-info">
              <span>案件编号：</span>
              <div>
                <span>
                  <template v-if="item.CaseNumber===''||item.CaseNumber===null">无数据</template>
                  <template v-else>{{ item.CaseNumber }}</template>
                </span>
              </div>
            </div>
            <div class="default-info">
              <span>案件案由：</span>
              <div>
                <span>
                  <template v-if="item.CauseOfAction===''||item.CauseOfAction===null">无数据</template>
                  <template v-else>{{ item.CauseOfAction }}</template>
                </span>
              </div>
            </div>
          </template>
        </div>
      </van-panel>
    </SList>
  </div>
</template>

<script>
import SList from '@/components/list/SList.vue'
import {
  getQueryConditon,
  isNotEmpty,
  getQueryConditonMoreForm
} from '../../utils/util'
import { getPageDate, getDictionaryItems, FromType } from '../../api/regulatoryApi'
export default {
  name: 'SubmitForm',
  components: {
    SList
  },
  data () {
    return {
      searchShow: false,
      screenShow: false,
      type: true,
      Total: '',
      searchKeyWords: '',
      listData: [],
      // 历史记录
      historyList: [
        // '非法捕捞',
        // '排放污水',
        // '非法捕捞',
        // '排放污水',
        // '非法捕捞',
        // '排放污水',
        // '非法捕捞',
        // '排放污水'
      ],
      showFlag: true, // 历史记录显示隐藏标杆
      // statusButtonData: ['全部', '审批中', '已撤销', '审批完成', '已完成'],
      // typeButtonData: [
      //   '全部',
      //   '行政执法巡查记录表',
      //   '当场行政处罚决定书',
      //   '立案报告'
      // ],
      // 成林龙增加 表单状态动态菜单
      FormState: [], // 状态
      FormType: [], // 类型
      SformType: '', // 待搜索的表单类型
      // 查询规则
      rules: [],
      // 交叉查询规则
      groups: [],
      newGroups: []
    }
  },
  methods: {
    // 搜索弹窗显示隐藏
    searchePage () {
      this.searchShow = !this.searchShow
    },
    // 筛选弹窗显示隐藏
    screenPage () {
      this.screenShow = !this.screenShow
    },
    // 搜索关键字
    onSearch () {
      this.listData = [] // 重新搜索将搜索结果清空
      this.$refs.mylist.refresh()
      // 关闭弹窗
      // this.searchePage()
    },
    // 成林龙 增加从字典获取表单状态 和类型
    getsearchMenu () {
      getDictionaryItems('FormState').then(res => {
        res.map(item => {
          this.FormState.push({
            ID: item.ID,
            Title: item.Title,
            ItemCode: item.ItemCode
          })
        })
      })
      getDictionaryItems('FormType').then(res => {
        res.map(item => {
          this.FormType.push({
            ID: item.ID,
            Title: item.Title,
            ItemCode: item.ItemCode
          })
        })
        // 处理不需要的 案件封面
        const data = this.FormType.filter(item => {
          return item.ItemCode !== 'case_cover'
        })
        this.FormType = data
      })
    },
    // 筛选 cll 改 筛选菜单
    FormStatusEvn (index, item) {
      // 表单状态不需要
      var statusBtns = document.querySelectorAll('.status > button')
      statusBtns.forEach(item => {
        item.className = ''
      })
      statusBtns[index].className = 'from_state_active'
      // this.searchKeyWords = item
      // this.screenPage()
      // this.listData = [] // 重新搜索将 搜索结果清空
      // this.$refs.mylist.refresh()
    },
    FormTypeEvn (index, item) {
      var statusBtns = document.querySelectorAll('.type > button')
      statusBtns.forEach(item => {
        item.className = ''
      })
      statusBtns[index].className = 'from_state_active'
      this.screenPage() // 关闭弹窗 cll
      this.SformType = item.ItemCode // 搜索用
      this.listData = [] // 重新搜索将 搜索结果清空
      this.loadData(
        'formwith_eventcase',
        1,
        10,
        this.dealParameter(this.searchKeyWords, this.SformType)
      ) // 调用请求
    },
    // 处理参数
    dealParameter (searchKeyWords, SformType) {
      if (isNotEmpty(searchKeyWords) && !isNotEmpty(SformType)) {
        this.rules.splice(
          0,
          this.rules.length,
          {
            field: 'ContentValidity',
            op: 'like',
            value: this.searchKeyWords,
            type: 'string'
          },
          {
            field: 'FormName',
            op: 'like',
            value: this.searchKeyWords,
            type: 'string'
          },
          {
            field: 'FormState',
            op: 'like',
            value: this.searchKeyWords,
            type: 'string'
          },
          {
            field: 'OriginatorID',
            op: 'like',
            value: this.searchKeyWords,
            type: 'string'
          },
          {
            field: 'handler',
            op: 'like',
            value: this.searchKeyWords,
            type: 'string'
          },
          {
            field: 'CaseNumber',
            op: 'like',
            value: this.searchKeyWords,
            type: 'string'
          }
        )
        const data = getQueryConditonMoreForm(this.rules, [], 'or')
        return data
      } else if (!isNotEmpty(searchKeyWords) && isNotEmpty(SformType)) {
        this.groups.splice(0, this.groups.length, {
          rules: [
            {
              field: 'FormType', // 表单类型
              value: this.SformType,
              op: 'equal',
              type: 'select'
            }
          ],
          op: 'and'
        })
        const data = getQueryConditonMoreForm([], this.groups, 'or')
        return data
      } else {
        const data = getQueryConditon([], 'or')
        return data
      }
    },
    // 获取列表信息

    loadData (parameter) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      // 第一次请求 筛选规则为空
      // var rules = []
      return getPageDate(
        'formwith_eventcase',
        1,
        10,
        this.dealParameter(this.searchKeyWords, this.SformType)
      ).then(res => {
        if (res.Rows) {
          this.$toast.clear()
          res.Rows.forEach(item => {
            this.listData.push(item)
          })
          // 时间排序
          this.listData.sort(function (a, b) {
            return a.InitiationTime > b.InitiationTime ? -1 : 1
          })
        }
        return res
      })
    },
    // 去详情
    goTodetail (item) {
      // console.log(item)
      /**
        goodsList: 'form_confiscated_item', // 物品清单
        caseDetails: 'case_info', // 案件详情
        PromptlyPunishNote: 'law_punishmentInfo', // 当场处罚决定书
        RecordOfInquest: 'form_inquestrecord', // 勘验记录
        caseReport: 'case_report', // 结案报告
        caseCover: 'case_cover', // 卷宗封面
        AskPartyNote: 'form_inquiryrecord_litigant', // 询问当事笔录
        AskWitnessNote: 'form_inquiryrecord_witness', // 询问证人笔录
        AskThirdPartyNote: 'form_inquiryrecord_third', // 询问第三人笔录
        sceneInvestigationDetail: 'task_survey', // 现场勘查
        eventDetail: 'task_patrol'// 事件核查
       */
      // cll 获取字典后判断跳转          // this.$toast('提示信息')
      if (item.FormType === FromType.goodsList) {
        // 物品清单
        this.$router.push({
          path: '/goodsList', query: { ID: item.FormID }
        })
      } else if (item.FormType === FromType.caseDetails) {
        // 案件详情
        this.$router.push({
          path: '/caseDetails', query: { ID: item.FormID }
        })
      } else if (item.FormType === FromType.PromptlyPunishNote) {
        // 处罚当场决定书
        this.$router.push({
          path: '/PromptlyPunishNote', query: { ID: item.FormID }
        })
      } else if (item.FormType === FromType.RecordOfInquest) {
        // 勘验记录
        this.$router.push({
          path: '/RecordOfInquest',
          query: { ID: item.FormID }
        })
      } else if (item.FormType === FromType.caseReport) {
        if (item.FormState === 1) {
          // 结案报告
          this.$router.push({
            path: '/caseReport',
            query: { ID: item.FormID }
          })
        } else {
          // 结案报告未审批
          this.$router.push({
            path: '/closingReportDetail',
            query: { ID: item.FormID }
          })
        }
      } else if (item.FormType === FromType.caseCover) {
        // 卷宗封面
        this.$router.push({
          path: '/form_inquiryrecord',
          query: { id: item.CaseId }
        })
      } else if (item.FormType === FromType.AskThirdPartyNote) {
        // 询问第三人笔录
        this.$router.push({
          path: '/AskThirdPartyNote',
          query: { ID: item.FormID }
        })
      } else if (item.FormType === FromType.AskPartyNote) {
        // 询问当事人笔录
        this.$router.push({
          path: '/AskPartyNote',
          query: { ID: item.FormID }
        })
      } else if (item.FormType === FromType.AskWitnessNote) {
        // 询问证人笔录
        this.$router.push({
          path: '/AskWitnessNote',
          query: { ID: item.FormID }
        })
      } else if (item.FormType === FromType.sceneInvestigationDetail) {
        // 现场勘查
        this.$router.push({
          path: '/sceneInvestigationDetail',
          query: { ID: item.EventInfoId }
        })
      } else if (item.FormType === FromType.eventDetail) {
        // 事件核查
        this.$router.push({
          path: '/eventDetail',
          query: { ID: item.EventInfoId }
        })
      }
    }
  },
  created () {},
  mounted () {
    this.getsearchMenu() // 获取筛选菜单
  }
}
</script>
<style lang="less">
.van-list {
  background-color: #f6f6f6;
}
.center {
  padding: 20px 35%;
}
.case-panel {
  padding: 0.32rem;
  color: #101010;
  margin-bottom: 0.25rem;
  .case-title-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.1rem;
    .case-title {
      margin: 0px 0 10px 0;
      color: 16px;
      color: #64697c;
    }
    span{
      color: #A1A6BA;
      font-size: 0.3rem;
    }
  }

  .default-info {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    margin-bottom: 0.15rem;
  }
  .default-info > span {
    color: #7f87ae;
  }
  .default-info > div {
    flex: 1;
    // padding-left: 0.2rem;
    color: #7f87ae;
  }
  .case-tag {
    display: flex;
    justify-content: space-between;
    padding: 0 2px;
  }
  .case-tag > span {
    font-size: 0.26rem;
    color: #969696;
  }
}
.van-popup__close-icon {
  right: 30px;
  top: 20px;
}
// 搜索样式
.search {
  .history {
    .bar {
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      padding: 0 20px;
      margin-bottom: 5px;
      color: #64697c;
    }
    .listBox {
      padding: 0 20px;
      .historyList {
        display: inline-block;
        min-width: 50px;
        margin: 10px 10px;
      }
    }
  }
  .noContent {
    margin-top: 20px;
    text-align: center;
  }
}
// 筛选样式
.van-icon-stop::before {
  color: #0973ec;
  border-radius: 50%;
  line-height: 0.2rem;
  content: "·";
  font-size: 1.5rem;
}
//cll 增加
.van-cell__title {
  color: #64697c;
}
.screenForm {
  .contentBox {
    margin: 0.3rem;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    button {
      //cll改
      // width: auto;
      // height: auto;
      width: 30%;
      height: 1rem;
      font-size: 0.32rem;
      // margin: 0 0.15rem 0 0;
      // padding: 0.16rem 0.3rem;
      border-radius: 0.08rem;
      border: none;
      background-color: #f4f4f4;
      color: #7f87ae;
      margin-bottom: 0.4rem;
    }
    // 激活样式 cll改
    .from_state_active {
      background-color: #e5f2fc;
      color: #3a9dfa;
    }
    .from_type_active {
      background-color: #dcf6ef;
      color: #1fc08e;
    }
  }
  //cll 改
  // .status button:first-child {
  //   background-color: #E5F2FC ;
  // }
  // .type button:first-child {
  //   background-color: #9dc69d ;
  // }
}
.activeStyle {
  color: #0973ec;
  background-color: #bbb;
}
.van-search {
  padding: 0.26rem;
}
.van-icon-filter-o::before,
.van-icon-search::before {
  font-size: 0.4266rem;
  color: #7f87ae;
}
.filter-btn {
  height: 1.42rem;
  line-height: 1.42rem;
  background-color: #fff;
  padding-right: 0.26rem;
  display: flex;
}
.filter-btn span {
  align-items: center;
  display: flex;
  color: #64697c;
  position: relative;
}
.filter-btn span::after {
  content: "";
  height: 0.4rem;
  width: 1px;
  background-color: #b9bcca;
  position: absolute;
  left: -12%;
  top: calc((1.42rem - 0.4rem) / 2);
}
.search-text {
  color: #64697c;
}
</style>
