<template>
  <div>
    <van-search v-model="serchText" show-action placeholder="请输入搜索关键词" class="serch-bar">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <van-dropdown-menu class="filtrate-bar">
      <van-dropdown-item v-model="serchType" :options="serchTypeOptions" @change="serchTypeEvn"></van-dropdown-item>
      <van-dropdown-item v-model="serchFlow" :options="serchFlowOptions" @change="serchFlowEvn"></van-dropdown-item>
      <van-dropdown-item v-model="serchState" :options="serchStateOptions" @change="serchStateEvn"></van-dropdown-item>
      <van-dropdown-item
        v-model="serchRegion"
        :options="serchRegionOptions"
        @change="serchRegionEvn"
      ></van-dropdown-item>
    </van-dropdown-menu>
    <div class="case-panel-roll">
      <!-- list组件-->
      <s-list :dataCallback="loadData" ref="mylist">
        <van-panel
          v-for="(item, index) in caseList"
          :key="index+'@'"
          class="case-panel"
          @click="goCaseDetails(item.ID)"
        >
          <div slot="header">
            <!--使用插槽取消面板头部-->
          </div>
          <div>
            <h4 class="case-title">{{ item.CauseOfAction }}</h4>
            <div class="default-info">
              <span>当事人</span>
              <div v-if="item.LawPartys && item.LawPartys.length>0">
                <span v-for="(msg,i) in item.LawPartys" :key="i+'@'">{{ msg.Name }}</span>
              </div>
              <div v-else>
                <span>测试数据</span>
              </div>
            </div>
            <div class="default-info">
              <span>办案人</span>
              <div>
                <span>{{ item.Investigators? item.Investigators:'测试数据' }}</span>
              </div>
            </div>
            <div class="case-tag">
              <van-tag plain>{{ item.CaseNumber }}</van-tag>
              <!-- <van-tag plain>{{ item.ApplicableProcedure[1] }}</van-tag> -->
              <van-tag plain>简易程序</van-tag>
              <van-tag plain>{{ item.CaseStatus?item.CaseStatus:`已创建` }}</van-tag>
              <span>{{ item.ModifyDate }}更新</span>
            </div>
          </div>
        </van-panel>
      </s-list>
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
import { isNotEmpty, getQueryConditon, getQueryConditonMore } from '../../utils/util' // 引入搜索框判断是否为空,以及搜索规则
import { getPageDate, getDictionaryItems } from '../../api/regulatoryApi' // 引入封装的请求
export default {
  name: 'CaseQuery',
  components: {
    SList
  },
  data () {
    return {
      tips: { type: 'primary', message: '未找到符合条件的信息!' },
      serchText: '', // 搜索内容
      serchType: '0',
      serchTypeOptions: [
        { text: '类型', value: '0' } // ItemCode
      ],
      serchFlow: '0',
      serchFlowOptions: [
        { text: '程序', value: '0' } // ID
      ],
      serchState: '0',
      serchStateOptions: [
        { text: '状态', value: '0' } // 中文字符串
      ],
      serchRegion: '0',
      serchRegionOptions: [
        { text: '区域', value: '0' } //
      ],
      // 案件列表数组  里面放的是对象
      caseList: [],
      // 查询规则
      rules: [
        {
          field: 'CauseOfAction', // 案由
          op: 'like',
          value: this.serchText,
          type: 'string'
        }, {
          field: 'CaseTitle', // 案件标题
          op: 'like',
          value: this.serchText,
          type: 'string'
        }, {
          field: 'Investigators', // 办案人员
          op: 'like',
          value: this.serchText,
          type: 'string'
        }
      ],
      // 交叉查询规则
      groups: [
        {
          rules: [
            {
              field: 'CaseType', // 案件类型
              op: 'equal',
              value: this.serchType,
              type: 'string'
            }, {
              field: 'ApplicableProcedureID', //
              value: this.serchFlow,
              op: 'equal',
              type: 'select'
            }, {
              field: 'CaseStatus', // 案件状态
              op: 'equal',
              value: this.serchState,
              type: 'string'
            }, {
              field: 'RegionID', // 地区区域
              op: 'like',
              value: this.serchRegion,
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
    // 搜索事件
    onSearch () {
      this.caseList = [] // 重新搜索将 搜索结果清空
      this.$refs.mylist.refresh()
    },
    // 处理参数
    dealParameter () {
      this.rules.map(item => {
        item.value = this.serchText
      })
      this.groups[0].rules[0].value = this.serchType
      this.groups[0].rules[1].value = this.serchFlow
      this.groups[0].rules[2].value = this.serchState
      this.groups[0].rules[3].value = this.serchRegion
    },
    // 筛选请求
    serchTypeEvn () {
      this.loadDataMore()
    },
    serchFlowEvn () {
      this.loadDataMore()
    },
    serchStateEvn () {
      this.loadDataMore()
    },
    serchRegionEvn () {
      this.loadDataMore()
    },

    // 搜索菜单
    getSerchMenu () {
      // 案件类型
      getDictionaryItems('CaseType').then((res) => {
        res.map(item => {
          this.serchTypeOptions.push({ text: item.Title, value: item.ItemCode })
        })
      })
      // 案件处理程序
      getDictionaryItems('CaseProcedure').then((res) => {
        res.map(item => {
          this.serchFlowOptions.push({ text: item.Title, value: item.ID })
        })
      })
      // 案件处状态
      getDictionaryItems('CaseStatus').then((res) => {
        res.map(item => {
          this.serchStateOptions.push({ text: item.Title, value: item.Title })
        })
      })
      // 区域
      getDictionaryItems('Lake').then((res) => {
        res.map(item => {
          this.serchRegionOptions.push({ text: item.Title, value: item.ID })
        })
      })
    },
    // 请求页面数据
    loadData (parameter) {
      // 第一次请求 筛选规则为空
      if (!isNotEmpty(this.serchText)) {
        this.rules = []
      } else if (isNotEmpty(this.serchText)) {
        // 如果搜索框有值
        this.rules = [
          {
            field: 'CauseOfAction', // 案由
            op: 'like',
            value: this.serchText,
            type: 'string'
          }, {
            field: 'CaseTitle', // 案件标题
            op: 'like',
            value: this.serchText,
            type: 'string'
          }, {
            field: 'Investigators', // 办案人员
            op: 'like',
            value: this.serchText,
            type: 'string'
          }
        ]
      }
      const conditon = getQueryConditon(this.rules, 'or')
      return getPageDate('case_Info', parameter.pageIndex, parameter.pageSize, conditon).then(res => {
        if (res.Rows) {
          res.Rows.forEach(item => {
            this.caseList.push(item)
          })
        }
        return res
      })
    },
    // 请求页面数据
    loadDataMore () {
      this.dealParameter()
      console.log(this.dealParameter)

      const newGroups = this.groups[0].rules.filter(item => {
        return item.value !== '' && item.value !== undefined && item.value !== '0'
      })
      var groups = []
      groups = [ {
        rules: newGroups, // 错误处 多打了个 []
        op: 'and'
      }]

      if (newGroups.length > 0 && isNotEmpty(this.serchText)) {
        var conditonNew = getQueryConditonMore(this.rules, 'or', groups)
        return getPageDate('case_Info', 1, 10, conditonNew).then(res => {
          if (res.Rows) {
            // res.Rows.forEach(item => {
            //   this.caseList.push(item)
            // })
            this.caseList = res.Rows
          }
          // console.log(this.caseList)
          return res
        })
      } else if (newGroups.length > 0 && !isNotEmpty(this.serchText)) {
        const conditonNew = getQueryConditonMore([], 'or', groups)
        return getPageDate('case_Info', 1, 10, conditonNew).then(res => {
          if (res.Rows) {
            // res.Rows.forEach(item => {
            //   this.caseList.push(item)
            // })
            this.caseList = res.Rows
          }

          // console.log(this.caseList)
          return res
        })
      } else if (newGroups.length === 0 && isNotEmpty(this.serchText)) {
        const conditon = getQueryConditon(this.rules, 'or')
        return getPageDate('case_Info', 1, 10, conditon).then(res => {
          if (res.Rows) {
            // res.Rows.forEach(item => {
            //   this.caseList.push(item)
            // })
            this.caseList = res.Rows
          }
          // console.log(this.caseList)
          return res
        })
      } else {
        this.$notify(this.tips)
      }
    },
    // 跳转到案件详情
    goCaseDetails (msg) {
      this.$router.push({ path: 'caseDetails', query: { id: msg } }) // 案件详情id
    }
  },
  // 生命周期函数
  mounted () {
    // 进入案件列表即刻加载数据
    this.onSearch()
    // 加载搜索菜单
    this.getSerchMenu()
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.case-panel-roll {
  background-color: #f7f8fa !important;
}
/deep/ .footer {
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
.default-info > div >span{
  color: #333;
}
.case-tag {
  display: flex;
  justify-content: space-between;
  margin-top: 0.26rem;
}

.case-tag > span {
  font-size: 0.28rem;
  color: #666;
}
.case-tag > span::after{
  border-color: #c5c5c5;
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
