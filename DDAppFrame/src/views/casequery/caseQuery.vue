<template>
  <div>
    <van-search v-model="searchText" show-action placeholder="请输入搜索关键词">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <van-dropdown-menu>
      <van-dropdown-item v-model="searchType" :options="searchTypeOptions" @change="searchTypeEvn" />
      <van-dropdown-item v-model="searchFlow" :options="searchFlowOptions" @change="searchFlowEvn" />
      <van-dropdown-item v-model="searchState" :options="searchStateOptions" @change="searchStateEvn"/>
      <van-dropdown-item v-model="searchRegion" :options="searchRegionOptions" @change="searchRegionEvn"/>
    </van-dropdown-menu>
    <div class="case-panel-roll">
      <s-list :dataCallback="loadData" ref="mylist">
        <div
          class="panel_one"
          v-for="(item, index) in caseList"
          :key="item.ID + index"
          @click="goCaseDetails(item.ID)"
        >
          <van-cell :title="item.CauseOfAction" />
          <p>
            <span>当事人：</span>
            <span v-if="item.LawPartys && item.LawPartys.length > 0">
              <span style="margin-right:0.15rem" v-for="(msg, i) in item.LawPartys" :key="i + '@'">{{ msg.Name }}</span>
            </span>
            <span v-else>无数据</span>
          </p>
          <p>
            <span>办案人：</span>
            <span>{{ item.Investigators ? item.Investigators : '无数据' }}</span>
          </p>
          <h4 class="case-tag">
            <van-tag plain>{{ item.CaseNumber }}</van-tag>
            <!-- <van-tag plain>{{ item.ApplicableProcedure[1] }}</van-tag>-->
            <van-tag plain type="primary">简易程序</van-tag>
            <van-tag plain type="success">{{ item.CaseStatus ? item.CaseStatus : `已创建` }}</van-tag>
            <span>{{ item.ModifyDate | dayjs('YYYY-MM-DD') }}</span>
          </h4>
        </div>
      </s-list>
    </div>
  </div>
</template>

<script>
import SList from '../../components/list/SList'
import {
  isNotEmpty,
  isEmpty,
  getQueryConditon,
  getQueryConditonMore
} from '../../utils/util' // 引入搜索框判断是否为空,以及搜索规则
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
      searchType: 0,
      searchTypeOptions: [
        { text: '类型', value: 0 } // ItemCode
      ],
      searchFlow: 0,
      searchFlowOptions: [
        { text: '程序', value: 0 } // ID
      ],
      searchState: 0,
      searchStateOptions: [
        { text: '状态', value: 0 } // Title
      ],
      searchRegion: 0,
      searchRegionOptions: [
        { text: '区域', value: 0 } // ID
      ],
      // 查询规则
      rules: [],
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
              field: 'ApplicableProcedureID', // 适用程序
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
    // 搜索菜单
    getsearchMenu () {
      // 案件类型
      getDictionaryItems('CaseType').then(res => {
        res.map(item => {
          this.searchTypeOptions.push({ text: item.Title, value: item.ItemCode })
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
    // 处理参数
    dealParameterNew (searchText, searchType, searchFlow, searchState, searchRegion) {
      if (isNotEmpty(searchText) && (isEmpty(searchType) && isEmpty(searchFlow) && isEmpty(searchState) && isEmpty(searchRegion))) {
        console.log(searchText, 666666666666666666666666666)
        this.rules.splice(0, this.rules.length,
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
          },
          {
            field: 'party', // 当事人
            op: 'like',
            value: this.serchText,
            type: 'string'
          }
        )
        const data = getQueryConditon(this.rules, 'or')
        return data
      } else {
        // this.onSearch()
        const data = getQueryConditon([], 'or')
        return data
      }
      // else if (!isNotEmpty(searchKeyWords) && isNotEmpty(SformType)) {
      //   this.groups.splice(0, this.groups.length, {
      //     rules: [
      //       {
      //         field: 'FormType', // 表单类型
      //         value: this.SformType,
      //         op: 'equal',
      //         type: 'select'
      //       }
      //     ],
      //     op: 'and'
      //   })
      //   const data = getQueryConditonMoreForm([], this.groups, 'or')
      //   return data
      // }
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
      return getPageDate('case_Info', 1, 10, this.dealParameterNew(this.searchText, this.searchType, this.searchFlow, this.searchState, this.searchRegion))
        .then(res => {
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
      const newGroups = this.groups[0].rules.filter(item => {
        return (
          item.value !== '' &&
          item.value !== undefined &&
          item.value !== '0' &&
          item.value !== 0
        )
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
      this.$router.push({ path: 'caseDetails', query: { ID: msg } }) // 案件详情id
    }
  },
  created () { // 加载搜索菜单
    this.getsearchMenu()
  },
  mounted () {

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
  margin-bottom: 0.25rem;
  overflow: hidden;
  /* padding: 0 0.26rem 0.26rem 0.26rem; */
  padding: 0 0.3rem 0.26rem 0.3rem;
}

.panel_one .van-cell {
  background-color: #fff;
  padding: 0.22rem 0px !important;
  /* margin-bottom: 0.12rem; */
}

.panel_one .van-cell:not(:last-child)::after {
  border-bottom: 0.02667rem solid transparent;
  left: 0;
}
.panel_one .van-cell__title {
  font-weight: bold;
  font-size: 0.42667rem;
  color: #64697c;
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
  color: #7f87ae;
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
.van-search__content {
  border-radius: 100px;
}
/deep/.van-ellipsis {
  color: #64697c !important;
}
.van-cell__title{
  width: auto !important;
}
</style>
