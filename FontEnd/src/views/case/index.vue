<style scoped lang='less'>
* {
  box-sizing: border-box;
}
.mr10 {
  margin-right: 10px;
}
.mt10 {
  margin-top: 10px;
}
.mt15 {
  margin-top: 15px;
}
.case-box {
  background-color: #f4f3f3;

  .case-top,
  .case-body {
    padding: 26px 55px 0 55px;
    background-color: #fff;
  }

  .case-top {
    // height: 166px;

    h5 {
      font-size: 18px;
      color: #101010;
    }

    .case-serch-bar {
      display: flex;
      justify-content: space-between;
      .search-input {
        flex: 1;
        margin-right: 10px;
        .search-input-ul {
          width: 100%;
          list-style: none;
          padding: 0px;
          margin: 0px;
          display: flex;
          justify-content: space-between;
          .search-input-ul-li {
            width: 19%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
      }
      .maigin-top {
        margin-top: 20px;
      }
      .searchBar {
        color: #7f87ae;
      }
    }
    .search-input-ul-li span {
      width: 35%;
    }
    .search-input-ul-li div,.search-input-ul-li input {
      width: 65%;
    }
    .two{
      margin-top: 12px !important;
      justify-content: flex-start !important;
    }
    .two li{
      margin-right: 1.2%;
    }
    .special{
      width: 36% !important;
    }
  }
  .case-body {
    // margin-top: 15px;
  }
}
</style>
<template>
  <div class="case-box">
    <div class="case-top">
      <!-- <h5>案件档案列表</h5> -->
      <div class="case-serch-bar">
        <div class="search-input">
          <ul class="search-input-ul">
            <li class="search-input-ul-li">
              <span>案件类型：</span>
              <a-select v-model="caseType">
                <a-select-option v-for="item in Case_Type" :key="item.ID+'@'" :value="item.ItemCode" >{{ item.Title }}</a-select-option>
              </a-select>
            </li>
            <li class="search-input-ul-li">
              <span>案件程序：</span>
              <a-select v-model="caseCourse">
                <a-select-option value="全部">全部</a-select-option>
              </a-select>
            </li>
            <li class="search-input-ul-li">
              <span>案件状态：</span>
              <a-select v-model="caseState">
                <a-select-option value="全部">全部</a-select-option>
              </a-select>
            </li>
            <li class="search-input-ul-li">
              <span>案件区域：</span>
              <a-select v-model="caseDistrict">
                <a-select-option value="全部">全部</a-select-option>
              </a-select>
            </li>
            <li class="search-input-ul-li">
              <span>办案人：</span>
              <a-input v-model="caseLaw" placeholder="请输入办案人名称" />
            </li>
          </ul>
          <ul class="search-input-ul two">
            <li class="search-input-ul-li">
              <span>当事人：</span>
              <a-input v-model="caseBreakLow" placeholder="请输入当事人名称" />
            </li>
            <li class="search-input-ul-li">
              <span>案件号：</span>
              <a-input v-model="caseNumber" placeholder="请输入案件号" />
            </li>
            <li class="search-input-ul-li">
              <span>处罚决定书编号：</span>
              <a-input v-model="caseJudgementNum" placeholder="请输入编号" />
            </li>
            <li class="search-input-ul-li special">
              <span style="width: 18%;">案发时间：</span>
              <a-range-picker style="width: 81%" @change="onChange" />
            </li>
          </ul>
        </div>
        <div class="case-btn">
          <a-button @click="searchBtn" type="primary" class="mr10">搜索</a-button>
          <a-button @click="resetBtn" type="default">重置</a-button>
        </div>
      </div>
    </div>
    <div class="case-body">
      <s-table ref="table" size="default" :columns="columns" :dataCallback="loadData">
        <template slot="details" slot-scope="text, record">
          <div class="editable-row-operations">
            <span>
              <a @click="gotoDetail(record.ID,record.EventInfoId)">查看</a>
            </span>
          </div>
        </template>
        <template slot="ApplicableProcedure" slot-scope="text">
          <span>{{ text[1] }}</span>
        </template>
        <template slot="Region" slot-scope="text">
          <span>{{ text[1] }}</span>
        </template>
        <template slot="LawPartys" slot-scope="text,data">
          <span v-if=" data.LawPartys && data.LawPartys .length>0">
            <span v-for="(msg,i) in data.LawPartys" :key="i+'@'">{{ msg.Name }}</span>
          </span>
          <span v-else>测试数据</span>
        </template>
      </s-table>
      <!--案件列表-->
      <!-- <a-table
        class="caseTable"
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        bordered>

        <template slot="details" slot-scope="text,record">
          <a-button size="small" @click="caseDetails(record)">查看</a-button>
        </template>
      </a-table>-->
    </div>
  </div>
</template>

<script>
import { getPageData, getDictionary } from '@/api/sampleApi'
import STable from '@/components/table/'
import { isNotEmpty } from '@/utils/util'
export default {
  name: 'CaseList',
  components: {
    STable
  },
  data: function () {
    return {
      columns: [
        {
          title: '案件编号',
          dataIndex: 'CaseNumber',
          align: 'center'
        },
        {
          title: '案由',
          dataIndex: 'CauseOfAction',
          align: 'center'
        },
        {
          title: '案件类别',
          dataIndex: 'CaseType',
          align: 'center'
        },
        {
          title: '适用程序',
          dataIndex: 'ApplicableProcedure',
          align: 'center',
          scopedSlots: { customRender: 'ApplicableProcedure' }
        },
        {
          title: '办案人',
          dataIndex: 'Investigators',
          align: 'center'
        },
        {
          title: '当事人',
          dataIndex: 'LawPartys',
          align: 'center',
          scopedSlots: { customRender: 'LawPartys' }
        },
        {
          title: '案件状态',
          dataIndex: 'CaseStatus',
          align: 'center'
        },
        {
          title: '区域',
          dataIndex: 'Region',
          align: 'center',
          scopedSlots: { customRender: 'Region' }
        },
        {
          title: '处罚决定书文号',
          dataIndex: 'PenaltyDecisionNo',
          align: 'center'
        },
        {
          title: '最后更新时间',
          dataIndex: 'ModifyDate',
          align: 'center'
        },
        {
          title: '查看详情',
          dataIndex: 'details',
          align: 'center',
          scopedSlots: { customRender: 'details' }
        }
      ],

      data: [],
      Case_Type: [], // 案件类型
      CaseSourceType: [], // 案件来源
      CaseApplicableProcedureType: []// 处理程序
    }
  },
  methods: {
    // 案发时间  时间选择器
    onChange: function (date, dateString) {
      this.caseTime = dateString
      console.log(this.caseTime) // data中 案发时间
    },
    // 搜索按钮
    searchBtn () {
      console.log(this.caseType, this.caseCourse)
    },
    // 重置搜索俺就
    resetBtn () {},
    // 获取案件列表
    loadData (parameter) {
      // 这里拼搜索参数
      var allParameter = {}
      return getPageData('case_Info', allParameter, parameter.pageIndex, parameter.pageSize)
        .then(res => {
          return res
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取案件类型
    getCaseType () {
      getDictionary({ model: 'res_dictionary', context: 'CaseType' }).then(res => {
        res.map(item => {
          this.Case_Type.push({ ID: item.ID, Title: item.Title, ItemCode: item.ItemCode })
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取案件来源
    getCaseSourceType () {
      getDictionary({ model: 'res_dictionary', context: 'CaseSourceType' }).then(res => {
        res.map(item => {
          this.CaseSourceType.push({ ID: item.ID, Title: item.Title, ItemCode: item.ItemCode })
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取案件适用程序
    getApplicableProcedureType () {
      getDictionary({ model: 'res_dictionary', context: 'ApplicableProcedureType' }).then(res => {
        res.map(item => {
          this.CaseApplicableProcedureType.push({ ID: item.ID, Title: item.Title, ItemCode: item.ItemCode })
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 查看案件详情跳转
    gotoDetail (caseId, EventInfoId) {
      this.$router.push({ name: 'caseDetails', params: { caseId: caseId, EventInfoId: EventInfoId } }) // 案件id
    }
  },
  mounted () {
    // 获案件类型
    this.getCaseType()
    // 获取案件来源
    this.getCaseSourceType()
    // 获取案件适用程序
    this.getApplicableProcedureType()
  }
}
</script>
<style scoped>
/*限制最多案由最多字数*/
/deep/ .ant-table-row > td:nth-child(2) {
  max-width: 335px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/deep/ td {
  color: #7f87ae !important;
}
</style>
