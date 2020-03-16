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
        @click="goTodetail(item)"
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
      this.loadData('formwith_eventcase', 1, 10, this.dealParameter(this.searchKeyWords, this.SformType)) // 调用请求
    },
    // 处理参数
    dealParameter (searchKeyWords, SformType) {
      if (isNotEmpty(searchKeyWords) && !isNotEmpty(SformType)) {
        this.rules.splice(0, this.rules.length, {
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
        })
        const data = getQueryConditonMoreForm(this.rules, [], 'or')
        return data
      } else if (!isNotEmpty(searchKeyWords) && isNotEmpty(SformType)) {
        this.groups.splice(0, this.rules.length, {
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
      // 第一次请求 筛选规则为空
      // var rules = []
      return getPageDate(
        'formwith_eventcase',
        1, 10,
        this.dealParameter(this.searchKeyWords, this.SformType)
      ).then(res => {
        this.listData = [] // 重新搜索将搜索结果清空
        if (res.Rows) {
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
      console.log(item, '跳转信息')
      /**
       *
        物品清单 form_confiscated_item
        案件 case_Info
        处罚当场决定书 law_punishmentInfo
        勘验记录 form_inquestrecord
        询问第三人笔录 form_inquiryrecord_third
        结案报告 case_report
        卷宗封面 case_cover
        询问当事人笔录 form_inquiryrecord_litigant
        询问证人笔录 form_inquiryrecord_witness

       */

      // cll 获取字典后判断跳转          // this.$toast('提示信息')
      if (item.FormType === 'form_confiscated_item') {
        // 物品清单
        this.$router.push({ path: '/goodsList', query: { msg: { FormID: item.FormID, FormType: item.FormType } } })
      } else if (item.FormType === 'case_info') {
        // 案件详情
        this.$router.push({ path: '/caseDetails', query: { id: item.FormID } })
      } else if (item.FormType === 'law_punishmentInfo') {
        // 处罚当场决定书
        this.$router.push({ path: '/PromptlyPunishNote', query: { msg: { FormID: item.FormID, FormType: item.FormType } } })
      } else if (item.FormType === 'form_inquestrecord') {
        // 勘验记录
        this.$router.push({ path: '/RecordOfInquest', query: { msg: { FormID: item.FormID, FormType: item.FormType } } })
      } else if (item.FormType === 'case_report') {
        // 结案报告
        this.$router.push({ path: '/caseReport', query: { msg: { FormID: item.FormID, FormType: item.FormType } } })
      } else if (item.FormType === 'case_cover') {
        // 卷宗封面
        this.$router.push({ path: '/form_inquiryrecord', query: { id: item.CaseId } })
      } else if (item.FormType === 'form_inquiryrecord_third') {
        // 询问第三人笔录
        this.$router.push({ path: '/AskThirdPartyNote', query: { msg: { FormID: item.FormID, FormType: item.FormType } } })
      } else if (item.FormType === 'form_inquiryrecord_litigant') {
        // 询问当事人笔录
        this.$router.push({ path: '/AskPartyNote', query: { id: item.CaseId } })
      } else if (item.FormType === 'form_inquiryrecord_witness') {
        // 询问证人笔录
        this.$router.push({ path: '/AskWitnessNote', query: { id: item.CaseId } })
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
