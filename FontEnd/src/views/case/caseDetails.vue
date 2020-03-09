<style scoped lang='less'>
@bgColor: #fff;
@borderRadius: 8px;
@margin: 0px;
@padding: 0px;
* {
  box-sizing: border-box;
}
.case-box {
  background-color: #f4f3f3;
  min-height: 90vh;
  height: auto;
  overflow: auto;

  .case-body {
    // margin: 15px 55px;
    // background-color: #f4f3f3;
    padding: 0px;

    .tabs {
      .tabsBody {
        .tabsCard {
          width: 100%;
          border-radius: @borderRadius;
          padding: 0px !important;
          ul {
            margin: 0px;
            padding: 0px;
            list-style: none;
            padding: 15px 31px 25px;

            li {
              display: flex;
              flex-flow: row nowrap;
              justify-content: flex-start;
              height: 45px;
              line-height: 45px;
              font-size: 14px;
              color: #63687B;

              p {
                width: 600px;
                display: inline-block;
                margin-bottom: 0px;
                span {
                  .map-icon {
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                  }
                }
                span:first-child {
                  // width: 126px;
                  display: inline-block;
                  // text-align: right;
                  color: #222328 !important;
                  // font-weight: bold;
                }
              }
            }
          }

          //第二个tabs 第一排按钮
          .btn-group {
            // border-bottom: solid 1px rgba(187, 187, 187, 0.64);

            .ant-btn {
              margin-right: 20px;
            }
          }
        }
      }
    }

    .ant-tabs-bar {
      margin-bottom: 0px !important;
    }
  }
}

.btn-group {
  // border-bottom: solid 1px rgba(187, 187, 187, 0.64);
  padding-bottom: 15px;

  .ant-btn {
    margin-right: 15px;
  }
}
.case-Head {
  background-color: @bgColor;
  border-top-right-radius: @borderRadius;
  border-top-left-radius: @borderRadius;
}
.case-Head p {
  margin: @margin;
  padding: @padding;
  height: 75px;
  border-bottom: solid 1px #dcdee2;
  padding: 0 25px;
  line-height: 75px;
}
.case-Head p span {
  font-size: 20px;
}
.case-Head p span:first-child {
  color: #222328;
}
.case-Head p span:last-child {
  font-weight: bold;
  display: inline-block;
  margin-left: 80px;
}
/deep/ .ant-tabs-nav-scroll {
  height: 56px;
  background-color: @bgColor;
  border-bottom-right-radius: @borderRadius;
  border-bottom-left-radius: @borderRadius;
  padding: 0 25px;
}
.info-title,.info-title-card {
  height: 65px;
  border-bottom: solid 1px #dcdee2;
  padding: 0 25px;
  line-height: 65px;
  font-size: 16px;
  color: #222328;
  display: flex;
  align-items: center;
}
.info-title span,.info-title-card span{
  width: 5px;
  height: 15px;
  background-color: #3a9dfa;
  border-radius: 5px;
  height: 20px;
  display: inline-block;
  margin-right: 6px;
}
/deep/ .ant-card-wider-padding .ant-card-body {
  padding: 0px !important;
}
</style>
<template>
  <div class="case-box">
    <div class="case-body">
      <div class="case-Head">
        <p class="case-info-base">
          <span>{{ caseInfo.CaseNumber }}</span>
          <template>
            <span
              v-if="caseInfo.CaseStatus==='已结案'"
              style="color: #1FC08E;"
            >{{ caseInfo.CaseStatus }}</span>
            <span
              v-else-if="caseInfo.CaseStatus==='移交他部门处理'"
              style="color: #A1A6BA;"
            >{{ caseInfo.CaseStatus }}</span>
            <span
              v-else-if="caseInfo.CaseStatus==='已做出处罚决定'||caseInfo.CaseStatus==='已执行处罚'"
              style="color: #FFA73D;"
            >{{ caseInfo.CaseStatus }}</span>
            <span
              v-else-if="caseInfo.CaseStatus==='已归档'||caseInfo.CaseStatus==='已建档'"
              style="color: #3A9DFA;"
            >{{ caseInfo.CaseStatus }}</span>
            <span v-else style="color: #FF7373;">{{ caseInfo.CaseStatus }}</span>
          </template>
        </p>
        <div></div>
      </div>
      <a-tabs class="tabs" :tabBarGutter="tabBarGutterNum">
        <a-tab-pane class="tabsBody" key="1">
          <span slot="tab">案件详情</span>
          <a-card class="tabsCard" style="margin-top: -7px">
            <div class="info-title">
              <span></span>
              基本信息
            </div>
            <ul>
              <li>
                <p>
                  <span>案由：</span>
                  <span style="flex: 1">{{ caseInfo.CauseOfAction }}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>案件类别：</span>
                  <template>
                    <span v-for="item in Case_Type" :key="item.ID">
                      <abbr v-if="item.ItemCode===caseInfo.CaseType">{{ item.Title }}</abbr>
                    </span>
                  </template>
                </p>
                <p>
                  <span>适用程序：</span>
                  <span v-if="caseInfo.ApplicableProcedure">{{ caseInfo.ApplicableProcedure[1] }}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>当事人：</span>
                  <span
                    v-for="item in lawPartysInfo"
                    :key="item.ID"
                  >{{ item.Name+` 电话：`+ item.Contactnumber }}</span>
                </p>
                <p>
                  <span>处罚决定书文号：</span>
                  <span>{{ caseInfo.PenaltyDecisionNo }}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>处罚种类：</span>
                  <span v-if="caseInfo.PenaltyType">{{ caseInfo.PenaltyType[1] }}</span>
                </p>
                <p>
                  <span>执行情况：</span>
                  <span>{{ caseInfo.CaseDescription }}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>立案日期：</span>
                  <span>{{ caseInfo.CaseRegisterDay }}</span>
                </p>
                <p>
                  <span>结案日期：</span>
                  <span>{{ caseInfo.CaseCloseDay }}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>办案人员：</span>
                  <span>{{ caseInfo.Investigators }}</span>
                </p>
                <p>
                  <span>归档日期：</span>
                  <span>{{ caseInfo.OnDocDay }}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>归档人：</span>
                  <span>{{ caseInfo.DocPeople }}</span>
                </p>
                <p>
                  <span>保存期限：</span>
                  <span>{{ caseInfo.DocRetentionTimes }}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>归档号：</span>
                  <span>{{ caseInfo.DocNo }}</span>
                </p>
              </li>
            </ul>
          </a-card>
          <!--  事件信息-->
          <a-card :bordered="false" class="tabsCard" style="margin-top: 10px">
            <div class="info-title-card">
              <span></span>
              事件信息
            </div>
            <ul>
              <li>
                <p>
                  <span>事发地点：</span>
                  <span>
                    {{ EvenInfo.address }}
                    <!-- <img @click="viewMap" class="map-icon" src="../../assets/icons/wan_map.png"/> -->
                  </span>
                </p>
                <p>
                  <span>上报时间：</span>
                  <span>{{ EvenInfo.reportTime }}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>事发时间：</span>
                  <span>{{ EvenInfo.createTime }}</span>
                </p>
                <p>
                  <span>上报人：</span>
                  <span>{{ EvenInfo.reporterName }}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>事件类型：</span>
                  <span>{{ EvenInfo.evtTypeName }}</span>
                </p>
                <p>
                  <span>上报来源：</span>
                  <span>{{ EvenInfo.ReportSource }}</span>
                </p>
              </li>
              <li>
                <p style="width:100%">
                  <span>事件描述：</span>
                  <span>{{ EvenInfo.remark }}</span>
                </p>
              </li>
            </ul>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">案卷文件</span>
          <a-card class="tabsCard" style="margin-top: -7px;padding:25px;border-radius: 8px;border:none;">
            <!-- <div class="btn-group">
              <a-button type="primary" icon="file-pdf" @click="exportFile">导出</a-button>
              <a-button type="primary" icon="audit" @click="printFile">打印</a-button>
              <a-button type="primary" icon="mail" @click="sendFile">网上送达</a-button>
            </div> -->
            <!-- 文件列表-->
            <s-table ref="table" size="default" :columns="columns" :dataCallback="loadData">
              <template slot="FormName" slot-scope="text,data">
                <span v-if=" data.FormName!==''">
                  <span>{{ data.FormName }}</span>
                </span>
                <span v-else>空表单名称替换字符</span>
              </template>
              <template slot="option" slot-scope="text,data">
                <a-button type="default" @click="goFormDetils(data.FormID,data.FormType)">查看</a-button>
              </template>
            </s-table>
            <!-- <a-table :columns="columns" :dataSource="data" :rowSelection="rowSelection" :pagination="pagination"/> -->
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </div>
    <!--    地图查看弹窗-->
    <!-- <a-modal
      title="事发地地图位置"
      :visible="visible"
      @cancel="handleCancel"
    >
      <template slot="footer">
        <a-button @click="handleCancel">取消</a-button>
      </template>
      <p>展示地图</p>
    </a-modal>-->
  </div>
</template>
<script>
import { getDetails, getPageDataDetails, getPageData, getDictionary } from '@/api/sampleApi'
import STable from '@/components/table/'
// import { isNotEmpty } from '@/utils/util'
export default {
  name: 'CaseDetails',
  components: { STable },
  data () {
    return {
      IdInfo: [], // 接收路由过来的ID信息
      caseId: '', // 案件ID
      caseInfo: {}, // 案件信息
      EventInfoId: '', // 事件ID
      EvenInfo: {}, // 事件信息
      lawPartysInfo: [], // 当事人信息
      Case_Type: [], // 案件类别
      tabBarGutterNum: 0, // tab间隔
      // 文件表格 测试数据
      columns: [
        {
          title: '文件名称',
          dataIndex: 'FormName',
          key: 'FormName',
          scopedSlots: { customRender: 'FormName' }
        },
        {
          title: '创建时间',
          dataIndex: 'InitiationTime',
          key: 'InitiationTime'
        },
        {
          title: '最后更新时间',
          dataIndex: 'ModifyDate',
          key: 'ModifyDate'
        },
        {
          title: '创建人',
          dataIndex: 'OriginatorID',
          key: 'OriginatorID'
        },
        {
          title: '查看',
          dataIndex: 'option',
          key: 'option',
          scopedSlots: { customRender: 'option' }
        }
      ],

      data: [],
      rowSelection: {
        /*      onChange: (selectedRowKeys, selectedRows) => {
                  console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
                }, */
        // onSelect: (record, selected, selectedRows) => {
        //   console.log(record, selected, selectedRows)
        // }
        /* onSelectAll: (selected, selectedRows, changeRows) => {
             console.log(selected, selectedRows, changeRows)
           } */
      }
    }
  },
  methods: {
    // tab切换
    // callback (key) {
    //   if (key === 2) {
    //     // 获取事件信息
    //     this.getEvenInfo()
    //   }
    // },
    // 地图查看
    viewMap () {
      this.visible = true
      // console.log(`这里需要 地图的 gps坐标`)
    },
    // 关闭地图显示
    handleCancel (e) {
      this.visible = false
    },
    // 获取案件详情
    getCaseInfo () {
      getDetails('case_Info', this.caseId)
        .then(res => {
          this.caseInfo = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取当事人
    getLawPartysInfo () {
      const rules = [
        {
          field: 'CaseID',
          op: 'equal',
          value: this.caseId,
          type: 'string'
        },
        {
          // 关联查询
          field: 'Associatedobjecttype',
          op: 'equal',
          value: 'case_Info', // 模块名
          type: 'string'
        }
      ]
      getPageDataDetails('law_party', rules, 1, 10)
        .then(res => {
          this.lawPartysInfo = res.Rows
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取事件信息
    getEvenInfo () {
      getDetails('event_info', this.EventInfoId)
        .then(res => {
          this.EvenInfo = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取案件文件
    loadData (parameter) {
      // 这里拼搜索参数
      var allParameter = {
        rules: [
          {
            field: 'CaseId',
            op: 'equal',
            value: this.caseId, // 案件ID
            type: 'string'
          }
        ],
        op: 'and'
      }
      return getPageData('formwith_eventcase', allParameter, parameter.pageIndex, parameter.pageSize)
        .then(res => {
          // console.log(res, 123456789)
          return res
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取案件类型
    getCaseType () {
      getDictionary({ model: 'res_dictionary', context: 'CaseType' })
        .then(res => {
          res.map(item => {
            this.Case_Type.push({ ID: item.ID, Title: item.Title, ItemCode: item.ItemCode })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 到表单详情
    goFormDetils (formID, formType) {
      console.log(formID, formType)
    },
    // 导出文件
    exportFile () {
      console.log('文件导出')
    },
    // 打印文件
    printFile () {
      console.log('文件打印')
    },
    // 发送文件
    sendFile () {
      console.log('发送文件')
    }
  },
  mounted () {
    // 接收路由传参
    this.IdInfo = this.$route.params.IdInfo
    this.caseId = this.IdInfo[0]
    this.EventInfoId = this.IdInfo[1]
    // 获取案件信息
    this.getCaseInfo()
    // 获取当事人信息
    this.getLawPartysInfo()
    // 获取事件信息
    this.getEvenInfo()
    // 获取案件类别
    this.getCaseType()
  }
}
</script>
<style scoped>
/deep/ .case-body .ant-tabs-tab {
  border-radius: 0px !important;
}
/deep/ .ant-tabs-tab {
  font-size: 16px !important;
  height: 56px;
  line-height: 56px;
  margin-right: 60px !important;
  padding: 0 6px;
  border-bottom: solid 4px #fff !important;
}
.case-Title {
  font-size: 18px !important;
  font-weight: bold;
  color: #111f2c !important;
  margin-bottom: 15px;
}
.case-Title span:first-child {
  /* width: 126px;
  text-align: right; */
}
/deep/ .ant-card-head-title {
  font-size: 16px;
  font-weight: bold;
}
</style>
