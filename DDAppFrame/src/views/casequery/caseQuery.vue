<template>
  <div>
    <van-search v-model="searchText" show-action placeholder="请输入搜索关键词"><div slot="action" @click="onSearch">搜索</div></van-search>
    <van-dropdown-menu>
      <van-dropdown-item v-model="searchType" :options="searchTypeOptions" @change="searchTypeEvn" />
      <van-dropdown-item v-model="searchFlow" :options="searchFlowOptions" @change="searchFlowEvn" />
      <van-dropdown-item v-model="searchState" :options="searchStateOptions" @change="searchStateEvn" />
      <van-dropdown-item v-model="searchRegion" :options="searchRegionOptions" @change="searchRegionEvn" />
    </van-dropdown-menu>
    <div class="case-panel-roll">
      <s-list :dataCallback="loadData" ref="mylist">
        <div class="panel_one" v-for="(item, index) in caseList" :key="item.ID + index" @click="goCaseDetails(item.ID)">
          <van-cell :title="item.CauseOfAction" />
          <p>
            <span>当事人：</span>
            <span v-if="item.LawPartys && item.LawPartys.length > 0">
              <span v-for="(msg, i) in item.LawPartys" :key="i + '@'">{{ msg.Name }}</span>
            </span>
            <span v-else>测试数据</span>
          </p>
          <p>
            <span>办案人：</span>
            <span>{{ item.Investigators ? item.Investigators : '测试数据' }}</span>
          </p>
          <h4 class="case-tag">
            <van-tag plain>{{ item.CaseNumber }}</van-tag>
            <!-- <van-tag plain>{{ item.ApplicableProcedure[1] }}</van-tag>-->
            <van-tag plain type="primary">简易程序</van-tag>
            <van-tag plain type="success">{{ item.CaseStatus ? item.CaseStatus : `已创建` }}</van-tag>
            <span>{{ item.ModifyDate }}</span>
          </h4>
        </div>
      </s-list>
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
      caseList: [], // 案件列表信息
      searchText: '', // 搜索框文字
      searchType: '0',
      searchTypeOptions: [
        { text: '类型', value: '0' } // ItemCode
      ],
      searchFlow: '0',
      searchFlowOptions: [
        { text: '程序', value: '0' } // ID
      ],
      searchState: '0',
      searchStateOptions: [
        { text: '状态', value: '0' } // 中文字符串
      ],
      searchRegion: '0',
      searchRegionOptions: [
        { text: '区域', value: '0' } //
      ],
      // 查询规则
      rules: [
        {
          field: 'CauseOfAction', // 案由
          op: 'like',
          value: this.serchText,
          type: 'string'
        },
        {
          field: 'CaseTitle', // 案件标题
          op: 'like',
          value: this.serchText,
          type: 'string'
        },
        {
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
              value: this.searchType,
              type: 'string'
            },
            {
              field: 'ApplicableProcedureID', //
              value: this.serchFlow,
              op: 'equal',
              type: 'select'
            },
            {
              field: 'CaseStatus', // 案件状态
              op: 'equal',
              value: this.serchState,
              type: 'string'
            },
            {
              field: 'RegionID', // 地区区域
              op: 'equal',
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
    // 搜索框
    onSearch () {
      this.caseList = []
      this.$refs.mylist.refresh()
    },
    // 处理参数
    dealParameter () {
      this.rules.map(item => {
        item.value = this.serchText
      })
      this.groups[0].rules[0].value = this.searchType
      this.groups[0].rules[1].value = this.searchFlow
      this.groups[0].rules[2].value = this.searchState
      this.groups[0].rules[3].value = this.searchRegion
    },
    // 搜索菜单
    getsearchMenu () {
      // 案件类型
      getDictionaryItems('CaseType').then(res => {
        res.map(item => {
          this.searchTypeOptions.push({
            text: item.Title,
            value: item.ItemCode
          })
        })
      })
      // 案件处理程序
      getDictionaryItems('CaseProcedure').then(res => {
        res.map(item => {
          this.searchFlowOptions.push({ text: item.Title, value: item.ID })
        })
      })
      // 案件处状态
      getDictionaryItems('CaseStatus').then(res => {
        res.map(item => {
          this.searchStateOptions.push({ text: item.Title, value: item.Title })
        })
      })
      // 区域
      getDictionaryItems('Lake').then(res => {
        res.map(item => {
          this.searchRegionOptions.push({ text: item.Title, value: item.ID })
        })
      })
    },
    // 条件搜索
    searchTypeEvn () {
      // console.log(this.searchType)
      this.loadDataMore()
    },
    searchFlowEvn () {
      // console.log(this.searchFlow)
      this.loadDataMore()
    },
    searchStateEvn () {
      // console.log(this.searchState)
      this.loadDataMore()
    },
    searchRegionEvn () {
      // console.log(this.searchRegion)
      this.loadDataMore()
    },
    // 初次请求
    loadData (parameter) {
      var rules = []
      if (isNotEmpty(this.searchText)) {
        rules = [
          {
            field: 'CauseOfAction', // 案由
            op: 'like',
            value: this.searchText,
            type: 'string'
          },
          {
            field: 'CaseTitle', // 案件标题
            op: 'like',
            value: this.searchText,
            type: 'string'
          },
          {
            field: 'Investigators', // 办案人员
            op: 'like',
            value: this.searchText,
            type: 'string'
          }
        ]
      }
      var conditon = getQueryConditon(rules, 'or')
      return getPageDate('case_Info', parameter.pageIndex, parameter.pageSize, conditon).then(res => {
        if (res.Rows) {
          res.Rows.forEach(item => {
            this.caseList.push(item)
          })
        }
        console.log(res.Rows)
        // 时间排序
        // this.listData.sort(function (a, b) {
        //   return a.InitiationTime > b.InitiationTime ? -1 : 1
        // })
        return res
      })
    },
    // 请求页面数据
    loadDataMore () {
      this.dealParameter()
      const newGroups = this.groups[0].rules.filter(item => {
        return item.value !== '' && item.value !== undefined && item.value !== '0' && item.value !== 0
      })
      var groups = []
      groups = [
        {
          rules: newGroups,
          op: 'and'
        }
      ]
      // console.log(newGroups.length, '新的规则数组长度')

      if (newGroups.length > 0 && isNotEmpty(this.serchText)) {
        var conditonNew = getQueryConditonMore(this.rules, 'and', groups)
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
        const conditonNew = getQueryConditonMore([], 'and', groups)
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
        const conditon = getQueryConditon(this.rules, 'and')
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
        // conditonNew = getQueryConditon(this.rules, 'or')
      }
    },
    // 跳转到案件详情
    goCaseDetails (msg) {
      this.$router.push({ path: 'caseDetails', query: { id: msg } }) // 案件详情id
    }
  },
  // 生命周期函数
  mounted () {
    // 加载搜索菜单
    this.getsearchMenu()
  }
}
</script>

<style scoped>
* {
	box-sizing: border-box;
}

.case-panel-roll {
	/* background-color: #e2e2e2 !important; */
	background-color: #f3f4f6 !important;
	display: table;
	width: 100%;
	min-height: 90vh;
}

.panel_one {
	/* border-radius: 0.3rem; */
	border-radius: 0rem;
	background-color: #fff;
	/* width: calc(100% - 0.52rem); */
	width: calc(100% - 0rem);
	/* margin-left: 0.26rem;
  margin-right: 0.56rem; */
	margin-top: 0.3rem;
	overflow: hidden;
	/* padding: 0 0.26rem 0.26rem 0.26rem; */
	padding: 0 0.3rem 0.26rem 0.3rem;
}

.panel_one .van-cell {
	background-color: #fff;
	padding: 0.22rem 0px !important;
	margin-bottom: 0.12rem;
}

.panel_one .van-cell:not(:last-child)::after {
	border-bottom: 0.02667rem solid #ddd;
	left: 0;
}
.panel_one .van-cell__title {
	font-weight: bold;
	color: #111f2c;
}

.panel_one p {
	margin-top: 0.15rem;
}
.panel_one p span {
	display: inline-block;
	color: #7f87ae;
}
.panel_one p span:first-child {
	margin-right: 0rem;
	color: #2b3946;
}

.case-tag {
	display: flex;
	justify-content: space-between;
	margin-top: 0.26rem;
	align-items: center;
	margin: 0px;
	padding: 0px;
	margin-top: 0.25rem;
}
.case-tag > span {
	font-size: 0.28rem;
	/*color: #666;*/
}
.case-tag > span:first-child {
	color: #a1a6ba !important;
	margin-right: 0rem !important;
}
.case-tag > span:first-child::after {
	border-color: #a1a6ba !important;
}
.case-tag > span:last-child {
	color: #a1a6ba;
}
</style>
