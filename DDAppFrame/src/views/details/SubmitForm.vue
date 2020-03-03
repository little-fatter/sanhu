<template>
  <div class="SubmitForm">
    <van-cell-group>
      <van-row>
        <van-col span="12">
          <!-- 搜索部分 -->
          <van-popup v-model="searchShow" position="top" :style="{ height: '40%' }">
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
                <div class="bar">
                  搜索历史
                  <span @click="closeHistory">x</span>
                </div>
                <div class="listBox">
                  <span
                    v-show="showFlag"
                    class="historyList"
                    :key="index"
                    v-for="(item,index) in historyList"
                  >{{ item }}</span>
                </div>
              </div>
            </div>
            <!-- <SearcheForm @show="show" @getSearchKeyword='getSearchKeyword'></SearcheForm> -->
          </van-popup>
          <van-cell class="center" @click="searchePage" title="搜索" icon="search" />
        </van-col>
        <van-col span="12">
          <van-popup
            v-model="screenShow"
            closeable
            close-icon-position="top-right"
            position="top"
            :style="{ height: '50%' }"
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
    <van-cell title="去详情页" @click="go"></van-cell>
    <!-- 表格列表组件 -->
    <Slist :dataCallback="loadData" ref="mylist">
      <van-panel v-for="(item, index) in listData" :key="index+'@'" @click="goTodetail(item)">
        <!-- <div slot="header">
        </div>-->
        <div style="margin：0 30px;">
          <van-cell :title="item.FormName" :value="item.InitiationTime"></van-cell>
          <van-cell title="申请部门：" :value="item.Department"></van-cell>
          <van-cell title="申请人：" :value="item.OriginatorID"></van-cell>
          <van-cell title="事件编号：" :value="item.EventInfoId"></van-cell>
          <van-cell title="事件类型：" :value="item.InitiationTime"></van-cell>
          <van-tag plain style="margin:20px 15px;">{{ item.FormState }}</van-tag>
        </div>
      </van-panel>
    </Slist>
  </div>
</template>

<script>
import SearcheForm from "@/views/details/SearcheForm.vue";
import ScreenForm from "@/views/details/ScreenForm.vue";
import Slist from "@/components/list/SList.vue";
import { isNotEmpty, getQueryConditon } from "../../utils/util";
import { getPageDate } from "../../api/regulatoryApi";
export default {
  name: "SubmitForm",
  components: {
    SearcheForm,
    ScreenForm,
    Slist
  },
  props: {},
  data() {
    return {
      searchShow: false,
      screenShow: false,
      searchKeyWords: "",
      listData: [],
      // 历史记录
      historyList: [
        "非法捕捞",
        "排放污水",
        "非法捕捞",
        "排放污水",
        "非法捕捞",
        "排放污水",
        "非法捕捞",
        "排放污水"
      ],
      showFlag: true, // 历史记录显示隐藏标杆
      statusButtonData: ["全部", "审批中", "已撤销", "审批完成", "已完成"],
      typeButtonData: [
        "全部",
        "行政执法巡查记录表",
        "当场行政处罚决定书",
        "立案报告"
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 搜索弹窗显示隐藏
    searchePage() {
      this.searchShow = !this.searchShow;
    },
    // 筛选弹窗显示隐藏
    screenPage() {
      this.screenShow = !this.screenShow;
    },
    //
    show(value) {
      this.searchShow = value;
    },
    // 搜索关键字
    onSearch() {
      this.listData = []; // 重新搜索将 搜索结果清空
      this.$refs.mylist.refresh();
      // 关闭弹窗
      this.searchShow = !this.searchShow;
    },
    // 筛选
    screenForm(index, item) {
      let btns = document.querySelectorAll("button");
      btns.forEach(item => {
        item.className = "";
      });
      btns[index].className = "activeStyle";
      this.searchKeyWords = item;
      this.screenShow = !this.screenShow;
      this.listData = []; // 重新搜索将 搜索结果清空
      this.$refs.mylist.refresh();
    },
    // 去详情
    goTodetail(item) {
      if (item.FormType === "form_patrolrecord") {
        this.$router.push({
          path: "/recordOfInquestDetail",
          query: { id: item.id }
        });
      } else if (item.FormType === "task_patrol") {
        this.$router.push({
          path: "/eventDetail",
          query: { id: item.id }
        });
      } else if (item.FormType === "task_survey") {
        this.$router.push({
          path: "/sceneInvestigationDetail",
          query: { id: item.id }
        });
      } else if (item.FormType === "from_inspectiontRecord") {
        this.$router.push({
          path: "/recordOfInquestDetail",
          query: { id: item.id }
        });
      } else if (item.FormType === "form_confiscated_item") {
        this.$router.push({
          path: "/itemDetails",
          query: { id: item.id }
        });
      } else if (item.FormType === "case_Info") {
        this.$router.push({
          path: "/createCaseDetails",
          query: { id: item.id }
        });
      } else if (item.FormType === "law_punishmentInfo") {
        this.$router.push({
          path: "/PenalizeBookDetial",
          query: { id: item.id }
        });
      }
    },
    // 关闭历史记录
    closeHistory() {
      this.showFlag = !this.showFlag;
    },
    // 获取列表信息
    loadData(parameter) {
      var rules = [];
      if (isNotEmpty(this.searchKeyWords)) {
        rules = [
          {
            field: "FormType",
            op: "equal",
            value: this.searchKeyWords,
            type: "string"
          },
          {
            field: "FormState",
            op: "equal",
            value: this.searchKeyWords,
            type: "string"
          },
          {
            field: "FormName",
            op: "equal",
            value: this.searchKeyWords,
            type: "string"
          }
        ];
      }
      var conditon = getQueryConditon(rules, "or");
      return getPageDate(
        "form_all",
        parameter.pageIndex,
        parameter.pageSize,
        conditon
      ).then(res => {
        if (res.Rows) {
          res.Rows.forEach(item => {
            this.listData.push(item);
          });
        }
        console.log(this.listData);

        return res;
      });
    },
    // 模拟详情页
    go() {
      this.$router.push({
        path: "/eventDetail",
        query: { id: 123 }
      });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less">
.center {
  padding: 20px 35%;
}
.careBox {
  border: 1px solid #bbb;
  padding: 12px;
  margin-bottom: 12px;
  .careTop {
    display: flex;
    justify-content: space-between;
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
      background-color: rgba(174, 174, 178, 0.36);
      line-height: 50px;
      padding: 0 20px;
      color: #101010;
      margin-bottom: 5px;
    }
    .listBox {
      padding: 0 20px;
      .historyList {
        color: #1989fa;
        display: inline-block;
        min-width: 50px;
        margin: 2px 10px;
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
