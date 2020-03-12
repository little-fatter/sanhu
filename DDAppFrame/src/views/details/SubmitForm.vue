<!--//我提交的表单-->
<template>
  <div class="SubmitForm">
    <!--cll 重写搜索组件-->
    <van-row>
      <van-col span="20">
        <van-search
          v-model="searchKeyWords"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
        >
          <div class="search-text" slot="action" @click="onSearch">搜索</div>
        </van-search>
      </van-col>
      <van-col span="4">
        <div class="filter-btn">
          <span @click="screenPage" > <van-icon name="filter-o" />筛选</span>
        </div>
      </van-col>
      <van-popup v-model="screenShow" closeable close-icon-position="top-right" position="top">
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
            </div> -->
            <van-cell title="表单类型" icon="stop"/>
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
        @click="goTodetail(FormType)"
      >
        <div slot="header"></div>
        <div>
          <h4 class="case-title">{{ item.FormName }}</h4>
          <div class="default-info">
            <span>申请部门：</span>
            <div>
              <span>{{ item.Department }}</span>
            </div>
          </div>
          <div class="default-info">
            <span>申请人：</span>
            <div>
              <span>{{ item.OriginatorID }}</span>
            </div>
          </div>
          <template
            v-if="item.FormType ==='case_filing_report'||'case_info'||'case_report'||'law_punishmentInfo'? false:true">
            <div class="default-info">
              <span>事件编号：</span>
              <div>
                <span>{{ item.evtCode }}</span>
              </div>
            </div>
            <div class="default-info">
              <span>事件类型:</span>
              <div>
                <span>{{ item.evtTypeName }}</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="default-info">
              <span>案件号：</span>
              <div>
                <span>{{ item.CaseNumber }}</span>
              </div>
            </div>
            <div class="default-info">
              <span>案由：</span>
              <div>
                <span>{{ item.CaseType }}</span>
              </div>
            </div>
          </template>
          <div class="case-tag">
            <div>
              <van-tag plain v-show="item.FormState">{{ item.FormState }}</van-tag>
            </div>
            <div>
              <van-tag plain v-show="item.CompletionTime">{{ item.InitiationTime }}</van-tag>
            </div>
          </div>
        </div>
      </van-panel>

    </SList>
  </div>
</template>

<script>
import SList from '@/components/list/SList.vue'
import { getQueryConditon, isNotEmpty, getQueryConditonMoreForm } from '../../utils/util'
import { getPageDate, getDictionaryItems } from '../../api/regulatoryApi'
export default {
  name: 'SubmitForm',
  components: {
    SList
  },
  props: {},
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
      rules: [
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
      ],
      // 交叉查询规则
      groups: [
        {
          rules: [
            {
              field: 'FormType', // 表单类型
              value: this.SformType,
              op: 'equal',
              type: 'select'
            }
          ],
          op: 'and'
        }
      ],
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
        console.log(this.FormType, '表单类型')
      })
    },
    // 筛选 cll 改 筛选菜单
    FormStatusEvn (index, item) {
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
      statusBtns[index].className = 'from_type_active'
      this.screenPage()// 关闭弹窗 cll
      this.SformType = item.ItemCode // 搜索用
      // this.loadData('formwith_eventcase', 1, 10, this.dealParameter(conditon)) // 调用请求
    },
    // 处理参数
    dealParameter (searchKeyWords, SformType) {
      if (isNotEmpty(searchKeyWords) || isNotEmpty(SformType)) {
        const data = getQueryConditonMoreForm(this.rules, this.groups, 'or')
        return data
      } else {
        const data = getQueryConditon([], 'or')
        return data
      }
    },
    // 获取列表信息

    loadData (parameter) {
      console.log(this.dealParameter(this.searchKeyWords), isNotEmpty(this.SformType))
      // 第一次请求 筛选规则为空
      // var rules = []
      this.dealParameter()
      return getPageDate(
        'formwith_eventcase',
        parameter.pageIndex,
        parameter.pageSize,
        this.dealParameter(this.searchKeyWords), isNotEmpty(this.SformType)
      ).then(res => {
        if (res.Rows) {
          console.log(res.Rows, '初次请求结果')
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

    // 请求页面数据
    // loadDataMore () {
    //   this.dealParameter()
    //   const newGroups = this.groups[0].rules.filter(item => {
    //     return isNotEmpty(item.value)
    //     //! == '' && item.value !== undefined && item.value !== '0'
    //   })
    //   var groups = []
    //   groups = [
    //     {
    //       rules: newGroups,
    //       op: 'and'
    //     }
    //   ]
    //   if (newGroups.length > 0 && !isNotEmpty(this.searchKeyWords)) {
    //   //  const conditonNew = getQueryConditonMore([], 'and', groups)
    //     return getPageDate('formwith_eventcase', 1, 10, conditonNew).then(res => {
    //       if (res.Rows) {
    //         console.log(res.Rows, '筛选结果展示')
    //         this.listData = res.Rows
    //       }
    //       return res
    //     })
    //   }
    //   // if (newGroups.length > 0 && isNotEmpty(this.searchKeyWords)) {
    //   //   var conditonNew = getQueryConditonMore(this.rules, 'and', groups)
    //   //   return getPageDate('formwith_eventcase', 1, 10, conditonNew).then(res => {
    //   //     if (res.Rows) {
    //   //       this.caseList = res.Rows
    //   //     }
    //   //     return res
    //   //   })
    //   // } else if (newGroups.length > 0 && !isNotEmpty(this.searchKeyWords)) {
    //   //   const conditonNew = getQueryConditonMore([], 'and', groups)
    //   //   return getPageDate('formwith_eventcase', 1, 10, conditonNew).then(res => {
    //   //     if (res.Rows) {
    //   //       console.log(res.Rows, '筛选结果展示')
    //   //       this.caseList = res.Rows
    //   //     }
    //   //     return res
    //   //   })
    //   // } else if (newGroups.length === 0 && isNotEmpty(this.searchKeyWords)) {
    //   //   const conditon = getQueryConditon(this.rules, 'and')
    //   //   return getPageDate('formwith_eventcase', 1, 10, conditon).then(res => {
    //   //     if (res.Rows) {
    //   //       this.caseList = res.Rows
    //   //     }
    //   //     return res
    //   //   })
    //   // } else {
    //   //   const conditon = getQueryConditon(this.rules, 'and')
    //   //   this.loadData('formwith_eventcase', 1, 10, conditon)
    //   // }
    // },
    // 去详情
    goTodetail (item) {
      console.log(item, '跳转信息')

      /**
       *
        案件移送 caseMove
        巡查记录 patrolrecord
        勘验笔录 inspectiontRecord
        犯罪案件移送书 criminalCaseMoveMain
        犯罪案件移送 criminalCaseMove
        行政处罚案件结案报告_个人 APRPerson
        询问记录 InvestigatingParty
        没收物品清单 inventory
        没收物品清单详情 punishmentInfoDetail
        行政处罚案件结案报告_单位 APROrg
        物品清单 form_confiscated_item
        案件 case_Info
        处罚当场决定书 law_punishmentInfo
       */

      // cll 获取字典后判断跳转
      if (item.FormType === 'caseMove') {
        // 案件移送
        this.$toast('暂无案件移送详情')
      } else if (item.FormType === 'patrolrecord') {
        // 巡查记录
        // this.$router.push({ path: '/eventDetail', query: { id: item } })
      } else if (item.FormType === 'inspectiontRecord') {
        // 勘验笔录
        this.$router.push({ path: '/recordOfInquestDetail', query: { id: item.FormID } })
      } else if (item.FormType === 'criminalCaseMoveMain') {
        // 犯罪案件移送书
        // this.$router.push({ path: '/recordOfInquestDetail', query: { id: item.FormID } })
      } else if (item.FormType === 'criminalCaseMove') {
        // 犯罪案件移送
        // this.$router.push({ path: '/recordOfInquestDetail', query: { id: item.FormID } })
      } else if (item.FormType === 'APRPerson') {
        // 行政处罚案件结案报告_个人
        this.$router.push({ path: '/CaseClosingReportSingle', query: { id: item.FormID } })
      } else if (item.FormType === 'InvestigatingParty') {
        // 询问记录
        this.$router.push({ path: '/AskPartyNote', query: { id: item.FormID } })
      } else if (item.FormType === 'inventory') {
        // 没收物品清单
        this.$router.push({ path: '/GoodsList', query: { id: item.FormID } })
      } else if (item.FormType === 'punishmentInfoDetail') {
        // 没收物品清单详情
        // this.$router.push({ path: '/GoodsList', query: { id: item.FormID } })
      } else if (item.FormType === 'APROrg') {
        // 行政处罚案件结案报告_单位
        this.$router.push({ path: '/CaseClosingReportCompany', query: { id: item.FormID } })
      } else if (item.FormType === 'form_confiscated_item') {
        // 物品清单
        this.$router.push({ path: '/GoodsList', query: { id: item.FormID } })
      } else if (item.FormType === 'case_Info') {
        // 案件信息
        this.$router.push({ path: '/caseDetails', query: { id: item.CaseId } })
      } else if (item.FormType === 'law_punishmentInfo') {
        // 处罚当场决定书
        this.$router.push({ path: '/PromptlyPunishNote', query: { id: item.FormID } })
      } else if (item.FormType === 'task_patrol') {
        // 事件详情  lp
        this.$router.push({ path: '/eventDetail', query: { id: item } })
      } else if (item.FormType === 'task_survey') {
        // 现场巡查 lp
        this.$router.push({ path: '/sceneInvestigationDetail', query: { id: item.FormID } })
      }

      // 事件巡查
      // if (item.FormType === 'task_patrol') {
      //   this.$router.push({
      //     path: '/eventDetail',
      //     query: { id: item }
      //   })
      // } else if (item.FormType === 'task_survey') {
      //   this.$router.push({
      //     path: '/sceneInvestigationDetail',
      //     query: { id: item.FormID }
      //   })
      // } else if (item.FormType === 'case_info') {
      //   this.$router.push({
      //     path: '/caseDetails',
      //     query: { id: item.FormID }
      //   })
      // } else if (item.FormType === 'law_punishmentInfo') {
      //   this.$router.push({
      //     path: '/PenalizeBookDetial',
      //     query: { id: item.FormID }
      //   })
      // } else if (item.FormType === 'case_report') {
      //   this.$router.push({
      //     path: '/closingReportDetail',
      //     query: { id: item.FormID }
      //   })
      // } else if (item.FormType === 'case_filing_report') {
      //   this.$router.push({
      //     path: '/createCaseDetails',
      //     query: { id: item.FormID }
      //   })
      // }
    }
    // 测试页面
    // go() {
    //   this.$router.push({
    //     path: "/eventDetail",
    //     query: { id: "253bac98-c94d-475d-83f4-d36204c4b998" }
    //   });
    // task_patrol: 253bac98-c94d-475d-83f4-d36204c4b998
    // task_survey 253bac98-c94d-475d-83f4-d36204c4b998
    // law_punishmentinfo:  47f6f786-f478-4948-9705-1918cac58f23
    // case_report:  d2440a27-7abf-4cd1-95bf-0b800972f5be
    // case_filing_report:   4d77125c-7352-4a5d-827c-c524cdac07ff
    // }
  },
  created () {},
  mounted () {
    this.getsearchMenu() // 获取筛选菜单
  }
}
</script>
<style lang="less">
.center {
  padding: 20px 35%;
}
.case-panel {
  padding: 0.32rem;
  color: #101010;
  margin-top: 0.32rem;
  .case-title {
    margin: 5px 0 10px;
    color: 16px;
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
      color: #64697C;
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
    margin: 0.2rem 0 0.1rem 1rem;
    button {
      //cll改
      width: auto;
      height: auto;
      font-size: 0.28rem;
      margin: 0 0.15rem 0 0;
      padding: 0.16rem 0.3rem;
      border-radius: 0.08rem;
      border: none;
      background-color: #f4f4f4;
      color: #7f87ae;
      margin-bottom: 0.15rem;
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
.van-search{
  padding: 0.26rem;
}
.van-icon-filter-o::before,.van-icon-search::before{
font-size:   0.4266rem;
color: #7F87AE;
}
.filter-btn{
  height: 1.42rem;
  line-height: 1.42rem;
  background-color: #FFF;
  padding-right: 0.26rem;
  display: flex;
}
.filter-btn span{
  align-items: center;
  display: flex;
  color: #64697C;
  position: relative;
}
.filter-btn span::after{
  content: '';
  height: 0.4rem;
  width: 1px;
  background-color: #b9bcca;
  position: absolute;
  left: -12%;
  top: calc((1.42rem - 0.4rem) / 2);
}
.search-text{
   color: #64697C;
}
</style>
