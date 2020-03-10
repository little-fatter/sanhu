<!--//我提交的表单-->
<template>
  <div class="SubmitForm">
    <van-cell-group>
      <van-row>
        <van-col span="12">
          <!-- 搜索部分 -->
          <van-popup v-model="searchShow" position="top" :style="{ height: '30%' }">
            <div class="search">
              <div class="searchBox">
                <div class="search-area">
                  <van-search
                    v-model="searchKeyWords"
                    placeholder="请输入搜索关键词"
                    show-action
                    shape="round"
                  >
                    <div slot="action" @click="onSearch">搜索</div>
                  </van-search>
                </div>
              </div>
              <div class="history">
                <div class="bar">搜索历史</div>
                <div class="listBox">
                  <van-tag
                    plain
                    type="primary"
                    v-show="showFlag"
                    class="historyList"
                    :key="index"
                    v-for="(item,index) in historyList"
                  >{{ item }}</van-tag>
                </div>
              </div>
            </div>
          </van-popup>
          <van-cell class="center" @click="searchePage" title="搜索" icon="search" />
        </van-col>
        <van-col span="12">
          <van-popup
            v-model="screenShow"
            closeable
            close-icon-position="top-right"
            position="top"
            :style="{ height: '30%' }"
          >
            <div class="screenForm">
              <van-cell-group>
                <van-cell title="状态" icon="stop" />
                <div class="contentBox status">
                  <button
                    :key="index"
                    @click="screenForm(index,item)"
                    v-for="(item,index) in statusButtonData"
                  >{{ item }}</button>
                </div>
                <van-cell title="类型" icon="stop" />
                <div class="contentBox type">
                  <button
                    :key="index"
                    @click="screenForm(index,item)"
                    v-for="(item,index) in typeButtonData"
                  >{{ item }}</button>
                </div>
              </van-cell-group>
            </div>
            <!-- <ScreenForm></ScreenForm> -->
          </van-popup>
          <van-cell class="center" @click="screenPage" title="筛选" icon="filter-o" />
        </van-col>
      </van-row>
    </van-cell-group>
    <!-- <van-cell title="去详情页" @click="go"></van-cell> -->
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
            v-if="item.FormType =='case_filing_report'||'case_info'||'case_report'||'law_punishmentInfo'? false:true"
          >
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
// import SearcheForm from "@/views/details/SearcheForm.vue";
// import ScreenForm from "@/views/details/ScreenForm.vue";
import SList from '@/components/list/SList.vue'
import { getQueryConditon, isNotEmpty } from '../../utils/util'
import { getPageDate } from '../../api/regulatoryApi'
export default {
  name: 'SubmitForm',
  components: {
    // SearcheForm,
    // ScreenForm,
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
        '非法捕捞',
        '排放污水',
        '非法捕捞',
        '排放污水',
        '非法捕捞',
        '排放污水',
        '非法捕捞',
        '排放污水'
      ],
      showFlag: true, // 历史记录显示隐藏标杆
      statusButtonData: ['全部', '审批中', '已撤销', '审批完成', '已完成'],
      typeButtonData: [
        '全部',
        '行政执法巡查记录表',
        '当场行政处罚决定书',
        '立案报告'
      ]
    }
  },
  watch: {},
  computed: {},
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
      console.log(this.searchKeyWords)
      this.listData = [] // 重新搜索将搜索结果清空
      this.$refs.mylist.refresh()
      // 关闭弹窗
      this.searchePage()
    },
    // 筛选
    screenForm (index, item) {
      const btns = document.querySelectorAll('button')
      btns.forEach(item => {
        item.className = ''
      })
      btns[index].className = 'activeStyle'
      this.searchKeyWords = item
      console.log(this.searchKeyWords)
      this.screenPage()
      this.listData = [] // 重新搜索将 搜索结果清空
      this.$refs.mylist.refresh()
    },
    // 去详情
    goTodetail (item) {
      // 事件巡查
      if (item.FormType === 'task_patrol') {
        this.$router.push({
          path: '/eventDetail',
          query: { id: item }
        })
      } else if (item.FormType === 'task_survey') {
        this.$router.push({
          path: '/sceneInvestigationDetail',
          query: { id: item.FormID }
        })
      } else if (item.FormType === 'case_info') {
        this.$router.push({
          path: '/caseDetails',
          query: { id: item.FormID }
        })
      } else if (item.FormType === 'law_punishmentInfo') {
        this.$router.push({
          path: '/PenalizeBookDetial',
          query: { id: item.FormID }
        })
      } else if (item.FormType === 'case_report') {
        this.$router.push({
          path: '/closingReportDetail',
          query: { id: item.FormID }
        })
      } else if (item.FormType === 'case_filing_report') {
        this.$router.push({
          path: '/createCaseDetails',
          query: { id: item.FormID }
        })
      }
    },
    // 获取列表信息
    loadData (parameter) {
      // 第一次请求 筛选规则为空
      var rules = []
      if (isNotEmpty(this.searchKeyWords)) {
        rules = [
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
          }
        ]
      }
      var conditon = getQueryConditon(rules, 'or')
      return getPageDate(
        'formwith_eventcase',
        parameter.pageIndex,
        parameter.pageSize,
        conditon
      ).then(res => {
        if (res.Rows) {
          res.Rows.forEach(item => {
            this.listData.push(item)
          })
          this.listData.sort(function (a, b) {
            return a.InitiationTime > b.InitiationTime ? 1 : -1
          })
        }
        return res
      })
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
  mounted () {}
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
}
.screenForm {
  .contentBox {
    margin: 5px 0 5px 58px;
    display: flex;
    align-content: center;
    button {
      width: 90px;
      height: 38px;
      font-size: 14px;
      margin: 5px;
      border-radius: 6px;
      border: 1px solid #bbb;
      background-color: #f9f5f5;
    }
    // 激活样式
    .active1 {
      background-color: #9dcfdf;
    }
    .active2 {
      background-color: #9dc69d;
    }
  }
  .status button:first-child {
    background-color: #9dcfdf !important;
  }
  .type button:first-child {
    background-color: #9dc69d !important;
  }
}
.activeStyle {
  color: #0973ec;
  background-color: #bbb;
}
</style>
