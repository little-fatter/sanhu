<style scoped lang='less'>
  * {
    box-sizing: border-box;
  }

  .case-box {
    background-color: #F4F3F3;
    height: 100vh;
    overflow: auto;

    .case-top {
      padding: 26px 55px;
      background-color: #FFF;
    }

    .case-top {
      height: 136px;

      h5 {
        font-size: 18px;
        color: #222;
        font-weight: bold;
      }

      .case-serch-bar {

        .maigin-top {
          margin-top: 15px;
        }
      }
      .tagFone{
        // font-size: 16px;
      }
    }

    .case-body {
      margin: 15px 55px;
      background-color: #F4F3F3;
      padding: 0px;

      .tabs {
        .tabsBody {
          .tabsCard {
            width: 100%;

            &:nth-child(1) {
              margin-top: -17px;
            }

            &:nth-child(2) {
              margin-top: 20px;
            }

            ul {
              margin: 0px;
              padding: 0px;
              list-style: none;

              li {
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                height: 35px;
                line-height: 35px;
                font-size: 16px;
                color: #7F87AE;

                p {
                  width: 400px;
                  display: inline-block;
                  margin-bottom: 0px;

                  span {
                    .map-icon {
                      width: 20px;
                      height: 20px;
                      cursor: pointer;
                    }
                  }
                }
              }
            }

            //第二个tabs 第一排按钮
            .btn-group {
             // border-bottom: solid 1px rgba(187, 187, 187, 0.64);

              .ant-btn {
                margin-right:20px;
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
    border-bottom: solid 1px rgba(187, 187, 187, 0.64);
    padding-bottom: 15px;

    .ant-btn {
      margin-right: 15px;
    }
  }
</style>
<template>
  <div class="case-box">
    <div class="case-top">
      <h5>案件详情</h5>
      <div class="case-serch-bar">
        <a-row>
          <a-col :span="3">
            <span>
              <a-tag color="#2db7f5" class="tagFone">{{ caseInfo.CaseNumber }}</a-tag>
            </span>
          </a-col>
          <a-col :span="4">
            <span>案件状态：</span>
            <span> <a-tag color="#87d068" class="tagFone">{{ caseInfo.CaseStatus }}</a-tag></span>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="case-body">
      <a-tabs class="tabs" @change="callback" type="card" :tabBarGutter="tabBarGutterNum">
        <a-tab-pane class="tabsBody" tab="基本信息" key="1">
          <a-card class="tabsCard" style="margin-top: -17px">
            <ul>
              <li>
                <span>案由：</span>
                <span style="flex: 1">{{ caseInfo.CauseOfAction }}</span>
              </li>
              <li>
                <p>
                  <span>案件类别：</span>
                  <span>{{ caseInfo.CaseType }}</span>
                </p>
                <p>
                  <span>适用程序：</span>
                  <span v-if="caseInfo.ApplicableProcedure">{{ caseInfo.ApplicableProcedure[1] }}</span>
                </p>
              </li>
              <li>
                <span>当事人：</span>
                <span v-for="item in lawPartysInfo" :key="item.ID">{{ item.Name+`      电话：`+ item.Contactnumber }} </span>
              </li>
              <li>

                <span>处罚决定书文号：</span>
                <span>{{ caseInfo.PenaltyDecisionNo }}</span>

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

                <span>办案人员：</span>
                <span>{{ caseInfo.Investigators }}</span>

              </li>
              <li>
                <p>
                  <span>归档日期：</span>
                  <span>{{ caseInfo.OnDocDay }}</span>
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
                <p>
                  <span>归档人：</span>
                  <span>{{ caseInfo.DocPeople }}</span>
                </p>
              </li>
            </ul>
          </a-card>
          <!--  事件信息-->
          <a-card title="事件信息" :bordered="false" class="tabsCard" style="margin-top: 20px">
            <!-- <a href="#" slot="extra">事件详情&gt;</a> -->
            <ul>
              <li>
                <p>
                  <span>事发地点：</span>
                  <span>{{ EvenInfo.address }}
                    <!-- <img @click="viewMap" class="map-icon" src="../../assets/icons/wan_map.png"/> -->
                  </span>
                </p>
                <p>
                  <span>上报时间：</span>
                  <span>{{ EvenInfo.address }}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>事发时间：</span>
                  <span>{{ EvenInfo.reportTime }}  </span>
                </p>
                <p>
                  <span>上报人：</span>
                  <span>{{ EvenInfo.reporterName }}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>事件类型：</span>
                  <span>{{ EvenInfo.evtTypeDisplayName }}  </span>
                </p>
                <p>
                  <span>上报来源：</span>
                  <span>{{ EvenInfo.ReportSource }}</span>
                </p>
              </li>
              <li>
                <span>事件描述：</span>
                <span>{{ EvenInfo.remark }}</span>
              </li>
            </ul>
          </a-card>
        </a-tab-pane>
        <a-tab-pane tab="案卷文件" key="2">
          <a-card class="tabsCard" style="margin-top: -17px">
            <div class="btn-group">
              <a-button @click="exportFile">导出</a-button>
              <a-button @click="printFile">打印</a-button>
              <a-button @click="sendFile">网上送达</a-button>
            </div>
            <!-- 文件列表-->
            <s-table ref="table" size="default" :columns="columns" :dataCallback="loadData">

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
    </a-modal> -->
  </div>
</template>
<script>
import { getDetails, getPageDataDetails, getPageData } from '@/api/sampleApi'
import STable from '@/components/table/'
import { isNotEmpty } from '@/utils/util'
export default {
  name: 'CaseDetails',
  components: { STable },
  data () {
    return {
      caseId: '', // 案件ID
      caseInfo: {}, // 案件信息
      EventInfoId: '', // 事件ID
      EvenInfo: {}, // 事件信息
      lawPartysInfo: [], // 当事人信息
      tabBarGutterNum: 0, // tab间隔
      // 文件表格 测试数据
      columns: [
        {
          title: '文件名称',
          dataIndex: 'fileNmae',
          key: 'fileNmae'
        },
        {
          title: '创建时间',
          dataIndex: 'creationTime',
          key: 'creationTime'
        },
        {
          title: '最后更新时间',
          dataIndex: 'lastUpdaeTime',
          key: 'lastUpdaeTime'
        },
        {
          title: '创建人',
          dataIndex: 'founder',
          key: 'founder'
        }
      ],

      data: [
        {
          key: 1,
          fileNmae: '巡查记录表',
          creationTime: '2020-2-28 18:25:23',
          lastUpdaeTime: '2020-3-1 12:12:02',
          founder: '王五'
        }
      ],
      rowSelection: {
        /*      onChange: (selectedRowKeys, selectedRows) => {
                  console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
                }, */
        onSelect: (record, selected, selectedRows) => {
          console.log(record, selected, selectedRows)
        }
        /* onSelectAll: (selected, selectedRows, changeRows) => {
             console.log(selected, selectedRows, changeRows)
           } */
      }
    }
  },
  methods: {
    // tab切换
    callback (key) {
      if (key === 2) {
        // 获取事件信息
        this.getEvenInfo()
      }
    },
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
        { // 关联查询
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
          console.log(res, 123456)
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadData (parameter) {
      // 这里拼搜索参数
      const rules = { rules: [
        {
          field: 'form_all',
          op: 'equal',
          value: this.caseId,
          type: 'string'
        }
      ],
      op: 'and' }
      // var allParameter = {}
      return getPageData('form_all', rules, parameter.pageIndex, parameter.pageSize)
        .then(res => {
          console.log(res)
          return res
        })
        .catch(err => {
          console.log(err)
        })
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
    this.caseId = this.$route.params.caseId
    this.EventInfoId = this.$route.params.EventInfoId
    // 获取案件信息
    this.getCaseInfo()
    // 获取当事人信息
    this.getLawPartysInfo()
  }
}
</script>
<style scoped>
  /deep/ .case-body .ant-tabs-tab {
    border-radius: 0px !important;
  }
</style>
