<style scoped lang='less'>
  * {
    box-sizing: border-box;
  }

  .case-box {
    background-color: #F4F3F3;

    .case-top, .case-body {
      padding: 26px 55px;
      background-color: #FFF;
    }

    .case-top {
      height: 166px;

      h5 {
        font-size: 18px;
        color: #101010;
      }

      .case-serch-bar {
        padding-left: 20px;

        .maigin-top {
          margin-top: 20px;
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
      margin-top: 15px;
    }
  }
</style>
<template>
  <div class="case-box">
    <div class="case-top">
      <h5>案件档案列表</h5>
      <div class="case-serch-bar">
        <a-row>
          <a-col :span="4">
            <span>案件类型：</span>
            <a-select style="width: 120px" v-model="caseType">
              <a-select-option value="全部">全部</a-select-option>
              <a-select-option value="水政">水政</a-select-option>
              <a-select-option value="渔政">渔政</a-select-option>
              <a-select-option value="环保">环保</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="4">
            <span>案件程序：</span>
            <a-select style="width: 120px" v-model="caseCourse">
              <a-select-option value="全部">全部</a-select-option>
              <a-select-option value="一般程序">一般程序</a-select-option>
              <a-select-option value="简易程序">简易程序</a-select-option>
              <a-select-option value="移交程序">移交程序</a-select-option>
              <a-select-option value="初查核实">初查核实</a-select-option>
              <a-select-option value="受理程序">受理程序</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="4">
            <span>案件状态：</span>
            <a-select style="width: 120px" v-model="caseState">
              <a-select-option value="全部">全部</a-select-option>
              <a-select-option value="已完成">已完成</a-select-option>
              <a-select-option value="办理中">办理中</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="4">
            <span>区域：</span>
            <a-select style="width: 120px" v-model="caseDistrict">
              <a-select-option value="全部">全部</a-select-option>
              <a-select-option value="抚仙湖">抚仙湖</a-select-option>
              <a-select-option value="星云湖">星云湖</a-select-option>
              <a-select-option value="杞麓湖">杞麓湖</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="4">
            <span class="ant-col-7">办案人：</span>
            <a-input v-model="caseLaw" placeholder="请输入办案人名称" class="ant-col-16"/>
          </a-col>
          <a-col :span="4">
            <span class="ant-col-7">当事人：</span>
            <a-input v-model="caseBreakLow" placeholder="请输入当事人名称" class="ant-col-16"/>
          </a-col>
        </a-row>
        <a-row class="maigin-top">
          <a-col :span="8">
            <span class="ant-col-5">案发时间：</span>
            <a-range-picker @change="onChange" class="ant-col-16"/>
          </a-col>
          <a-col :span="6">
            <span class="ant-col-5">&nbsp;&nbsp;&nbsp;&nbsp;案件号：</span>
            <a-input v-model="caseNumber" placeholder="请输入案件号" class=" ant-col-16"/>
          </a-col>
          <a-col :span="6">
            <span class="ant-col-10">处罚决定书编号：</span>
            <a-input v-model="caseJudgementNum" placeholder="请输入编号" class="ant-col-12"/>
          </a-col>
          <a-col :span="4">
            <a-button @click="serchBtn">搜索</a-button>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="case-body">
      <!--案件列表-->
      <a-table
        class="caseTable"
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        bordered>
        <!--  案件查看按钮-->
        <template slot="details" slot-scope="text,record">
          <a-button size="small" @click="caseDetails(record)">查看</a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CaseList',
  data: function () {
    return {
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
          dataIndex: 'caseNmu',
          align: 'center'
        },
        {
          title: '案由',
          dataIndex: 'caseText',
          align: 'center'
        },
        {
          title: '类别',
          dataIndex: 'type',
          align: 'center'
        },
        {
          title: '程序',
          dataIndex: 'course',
          align: 'center'
        },
        {
          title: '办案人',
          dataIndex: 'lowPeople',
          align: 'center'
        },
        {
          title: '当事人',
          dataIndex: 'breakLow',
          align: 'center'
        },
        {
          title: '状态',
          dataIndex: 'state',
          align: 'center'
        },
        {
          title: '区域',
          dataIndex: 'district',
          align: 'center'
        },
        {
          title: '处罚决定书文号',
          dataIndex: 'judgementNum',
          align: 'center'
        },
        {
          title: '最后更新时间',
          dataIndex: 'lastTime',
          align: 'center'
        },
        {
          title: '查看详情',
          dataIndex: 'details',
          align: 'center',
          scopedSlots: { customRender: 'details' }
        }
      ],

      data: [
        {
          key: '1',
          caseNmu: '案148 号',
          caseText: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX……',
          type: '违法捕捞',
          course: '一般程序',
          lowPeople: '王五',
          breakLow: '赵柳',
          state: '已结案',
          district: '抚仙湖',
          judgementNum: '玉抚管罚决字〔 2020〕4006号',
          lastTime: '2020-02-12 18:25:54'
        },
        {
          key: '2',
          caseNmu: '案555 号',
          caseText: '案由案由案由案由案由',
          type: '不知道',
          course: '检疫程序',
          lowPeople: '张三',
          breakLow: '李四',
          state: '处理中',
          district: '抚仙湖',
          judgementNum: '玉抚管罚决字〔 2020〕45587号',
          lastTime: '2020-03-01 10:25:65'
        }
      ],
      pagination: {
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20']
      }
    }
  },
  methods: {
    // 案发时间  时间选择器
    onChange: function (date, dateString) {
      this.caseTime = dateString
      console.log(this.caseTime) // data中 案发时间
    },
    // 搜索按钮
    serchBtn () {
      console.log(this.caseType, this.caseCourse,
        this.caseState, this.caseDistrict, this.caseLaw, this.caseBreakLow, this.caseTime,
        this.caseNumber, this.caseJudgementNum)
    },
    // 查看案件详情跳转
    caseDetails (record) {
      this.$router.push({ name: 'caseDetails', params: { caseNmu: record.caseNmu } })
    }
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
</style>
