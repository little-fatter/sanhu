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
  background-color: #fff;
  min-height: 90vh;
  height: auto;

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
    .search-input-ul-li div,
    .search-input-ul-li input {
      width: 65%;
    }
    .two {
      margin-top: 12px !important;
      justify-content: flex-start !important;
    }
    .two li {
      margin-right: 1.2%;
    }
    .special {
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
              <a-select placeholder="请选择" v-model="s_case_type">
                <a-select-option value>全部</a-select-option>
                <a-select-option
                  v-for="item in Case_Type"
                  :key="item.ID+'@'"
                  :value="item.ItemCode"
                >{{ item.Title }}</a-select-option>
              </a-select>
            </li>
            <li class="search-input-ul-li">
              <span>适用程序：</span>
              <a-select placeholder="请选择" v-model="s_case_ApplicableProcedureType">
                <a-select-option value>全部</a-select-option>
                <a-select-option
                  v-for="item in CaseApplicableProcedureType"
                  :key="item.ID+'@'"
                  :value="item.ID"
                >{{ item.Title }}</a-select-option>
              </a-select>
            </li>
            <li class="search-input-ul-li">
              <span>案件状态：</span>
              <a-select placeholder="请选择" v-model="s_case_CaseStatus">
                <a-select-option value>全部</a-select-option>
                <a-select-option
                  v-for="item in CaseStatusArr"
                  :key="item.ID+'@'"
                  :value="item.Title"
                >{{ item.Title }}</a-select-option>
              </a-select>
            </li>
            <li class="search-input-ul-li">
              <span>案件区域：</span>
              <a-select placeholder="请选择" v-model="s_case_CaseRegion">
                <a-select-option value>全部</a-select-option>
                <a-select-option
                  v-for="item in CaseRegion"
                  :key="item.ID+'@'"
                  :value="item.ID"
                >{{ item.Title }}</a-select-option>
              </a-select>
            </li>
            <li class="search-input-ul-li">
              <span>办案人：</span>
              <a-input v-model="s_case_LawName" placeholder="请输入办案人名称" />
            </li>
          </ul>
          <ul class="search-input-ul two">
            <li class="search-input-ul-li">
              <span>当事人：</span>
              <a-input v-model="s_case_BreakLow" placeholder="请输入当事人名称" />
            </li>
            <li class="search-input-ul-li">
              <span>案件号：</span>
              <a-input v-model="s_case_Number" placeholder="请输入案件号" />
            </li>
            <li class="search-input-ul-li">
              <span>处罚决定书编号：</span>
              <a-input v-model="s_case_JudgementNum" placeholder="请输入编号" />
            </li>
            <li class="search-input-ul-li special">
              <span style="width: 18%;">案发时间：</span>
              <a-range-picker style="width: 81%" @change="onTime" />
            </li>
          </ul>
        </div>
        <div class="case-btn">
          <a-button @click="onSearch" type="primary" class="mr10">搜索</a-button>
          <a-button @click="onReset" type="default">重置</a-button>
        </div>
      </div>
    </div>
    <div class="case-body">
      <s-table ref="MyTable" size="default" :columns="columns" :dataCallback="loadData">
        <template slot="CaseType" slot-scope="text, record">
          <span v-for="item in Case_Type" :key="item.ID">
            <span v-if="item.ItemCode===record.CaseType">{{ item.Title }}</span>
          </span>
        </template>
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
          align: 'center',
          scopedSlots: { customRender: 'CaseType' }
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
      CaseApplicableProcedureType: [], // 适用程序
      CaseStatusArr: [], // 案件状态
      CaseRegion: [], // 案件区域
      // 搜索规则组  按顺序展示
      s_case_type: '',
      s_case_ApplicableProcedureType: '',
      s_case_CaseStatus: '',
      s_case_CaseRegion: '',
      s_case_LawName: '', // 办案人名称
      s_case_BreakLow: '', // 当事人名称"
      s_case_Number: '', // 案件号
      s_case_JudgementNum: '', // 处罚决定书编号
      s_case_STime: '', // 案发开始时间
      s_case_ETime: '' // 案发结束时间
    }
  },
  methods: {
    // 案发时间  时间选择器
    onTime (date, dateString) {
      this.s_case_STime = dateString[0]
      this.s_case_ETime = dateString[1]
    },
    // 获取案件列表
    loadData (parameter) {
      // 这里拼搜索参数
      var allParameter = {
        rules: [
          {
            field: 'CaseType', // 案件类型  Case_Type
            op: 'equal',
            value: this.s_case_type,
            type: 'string'
          },
          {
            field: 'ApplicableProcedureID', // 适用程序
            value: this.s_case_ApplicableProcedureType,
            op: 'equal',
            type: 'select'
          },
          {
            field: 'CaseStatus', // 案件状态
            op: 'equal',
            value: this.s_case_CaseStatus,
            type: 'string'
          },
          {
            field: 'RegionID', // 案件区域
            op: 'equal',
            value: this.s_case_CaseRegion,
            type: 'select'
          },
          {
            field: 'Investigators',
            op: 'like',
            value: this.s_case_LawName, // 办案人名称
            type: 'string'
          },
          {
            field: 'PenaltyDecisionNo', // 当事人  这个不会查
            op: 'like',
            value: this.s_case_BreakLow,
            type: 'string'
          },
          {
            field: 'CaseNumber', // 案件编号
            op: 'equal',
            value: this.s_case_Number,
            type: 'string'
          },
          {
            field: 'PenaltyDecisionNo', // 处罚决定书编号
            op: 'equal',
            value: this.s_case_JudgementNum,
            type: 'string'
          },
          // 案发时间组
          {
            field: 'IncidentTime',
            op: 'less',
            value: this.s_case_STime,
            type: 'datepicker'
          }, {
            field: 'IncidentTime',
            op: 'less',
            value: this.s_case_ETime,
            type: 'datepicker'
          }
        ],
        op: 'or' // 搜索关系
      }
      var data = allParameter.rules.filter(item => {
        return isNotEmpty(item.value)
      })
      allParameter.rules = data
      console.log(allParameter, 123456)
      return getPageData('case_Info', allParameter, parameter.pageIndex, parameter.pageSize)
        .then(res => {
          return res
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 搜索菜单字典获取
    getsearchMenu () {
      // 获取案件类型
      getDictionary({ model: 'res_dictionary', context: 'CaseType' })
        .then(res => {
          res.map(item => {
            this.Case_Type.push({ ID: item.ID, Title: item.Title, ItemCode: item.ItemCode })
          })
        })
        .catch(err => {
          console.log(err)
        })
      // 适用程序
      getDictionary({ model: 'res_dictionary', context: 'ApplicableProcedureType' })
        .then(res => {
          res.map(item => {
            this.CaseApplicableProcedureType.push({ ID: item.ID, Title: item.Title, ItemCode: item.ItemCode })
          })
        })
        .catch(err => {
          console.log(err)
        })
      // 案件处状态
      getDictionary({ model: 'res_dictionary', context: 'CaseStatus' })
        .then(res => {
          res.map(item => {
            this.CaseStatusArr.push({ ID: item.ID, Title: item.Title, ItemCode: item.ItemCode })
          })
        })
        .catch(err => {
          console.log(err)
        })
      // 案件区域
      getDictionary({ model: 'res_dictionary', context: 'Lake' })
        .then(res => {
          res.map(item => {
            this.CaseRegion.push({ ID: item.ID, Title: item.Title, ItemCode: item.ItemCode })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 按条件搜索
    onSearch () {
      this.$refs.MyTable.refresh()
    },
    // 搜索条件重置
    onReset () {
      this.s_case_type = '请选择'
      this.s_case_ApplicableProcedureType = '请选择'
      this.s_case_CaseStatus = '请选择'
      this.s_case_CaseRegion = '请选择'
      this.s_case_LawName = ''
      this.s_case_BreakLow = ''
      this.s_case_Number = ''
      this.s_case_JudgementNum = ''
      this.s_case_Time = []
    },
    // 查看案件详情跳转
    gotoDetail (caseId, EventInfoId) {
      var IdInfo = [caseId, EventInfoId]
      this.$router.push({ name: 'caseDetails', params: { IdInfo: IdInfo } }) // 案件id
    }
  },
  mounted () {
    // 获取案件搜索下拉菜单
    this.getsearchMenu()
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
