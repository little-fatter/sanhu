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
      .maigin-top {
        margin-top: 20px;
      }
      .searchBar {
        color: #7F87AE;
      }
      .flex {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
      }

      /*.input-width {
          width: 160px !important;
        }*/
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
        <a-row>
          <a-col :span="22" class="searchBar">
            <a-row>
              <a-col :span="5">
                <span>案件类型：</span>
                <a-select style="width:70%" v-model="caseType">
                  <a-select-option value="全部">全部</a-select-option>
                  <a-select-option value="水政">水政</a-select-option>
                  <a-select-option value="渔政">渔政</a-select-option>
                  <a-select-option value="环保">环保</a-select-option>
                </a-select>
              </a-col>
              <a-col :span="5">
                <span>案件程序：</span>
                <a-select style="width:70%" v-model="caseCourse">
                  <a-select-option value="全部">全部</a-select-option>
                  <a-select-option value="一般程序">一般程序</a-select-option>
                  <a-select-option value="简易程序">简易程序</a-select-option>
                  <a-select-option value="移交程序">移交程序</a-select-option>
                  <a-select-option value="初查核实">初查核实</a-select-option>
                  <a-select-option value="受理程序">受理程序</a-select-option>
                </a-select>
              </a-col>
              <a-col :span="5">
                <span>案件状态：</span>
                <a-select style="width:70%" v-model="caseState">
                  <a-select-option value="全部">全部</a-select-option>
                  <a-select-option value="已完成">已完成</a-select-option>
                  <a-select-option value="办理中">办理中</a-select-option>
                </a-select>
              </a-col>
              <a-col :span="5">
                <span>案件区域：</span>
                <a-select style="width:70%" v-model="caseDistrict">
                  <a-select-option value="全部">全部</a-select-option>
                  <a-select-option value="抚仙湖">抚仙湖</a-select-option>
                  <a-select-option value="星云湖">星云湖</a-select-option>
                  <a-select-option value="杞麓湖">杞麓湖</a-select-option>
                </a-select>
              </a-col>
              <a-col :span="4" style="display:flex;">
                <span class="ant-col-5">办案人：</span>
                <a-input v-model="caseLaw" placeholder="请输入办案人名称" />
              </a-col>
            </a-row>
            <a-row class="mt10">
              <a-col :span="5" style="display:flex;">
                <span class="ant-col-5">&nbsp;&nbsp;&nbsp;&nbsp;当事人：</span>
                <a-input v-model="caseBreakLow" placeholder="请输入当事人名称" style="width:70%" />
              </a-col>
              <a-col :span="5" style="display:flex;">
                <span class="ant-col-5">&nbsp;&nbsp;&nbsp;&nbsp;案件号：</span>
                <a-input v-model="caseNumber" placeholder="请输入案件号" style="width:70%" />
              </a-col>
              <a-col :span="5" style="display:flex;">
                <span class="ant-col-5">处罚决定书编号：</span>
                <a-input v-model="caseJudgementNum" placeholder="请输入编号" style="width:70%" />
              </a-col>
              <a-col :span="9">
                <span class="ant-col-3">案发时间：</span>
                <a-range-picker @change="onChange" class="ant-col-21" />
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="2" style="display:flex;justify-content:flex-end;align-items: flex-end;">
            <a-button @click="searchBtn" type="primary" class="mr10">搜索</a-button>
            <a-button @click="resetBtn" type="default">重置</a-button>
          </a-col>
        </a-row>
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
      current: 2,
      caseType: '全部', // 案件类型
      caseCourse: '全部', // 案件程序
      caseState: '全部', // 案件状态
      caseDistrict: '全部', // 区域
      caseLaw: '', // 办案人员  执法人员
      caseBreakLow: '', // 当事人 , 违法人员
      caseTime: [], // 案发时间
      caseNumber: '', // 案件编号
      caseJudgementNum: '', // 处罚决定文书号
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

      data: []
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
    // 查看案件详情跳转
    gotoDetail (caseId, EventInfoId) {
      this.$router.push({ name: 'caseDetails', params: { caseId: caseId, EventInfoId: EventInfoId } }) // 案件id
    }
  },
  mounted () {}
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
