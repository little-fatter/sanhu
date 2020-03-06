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
              <a-tag color="#2db7f5" class="tagFone">{{ caseFile.caseNumber }}</a-tag>
            </span>
          </a-col>
          <a-col :span="4">
            <span>案件状态：</span>
            <span> <a-tag color="#87d068" class="tagFone">{{ caseFile.caseState }}</a-tag></span>
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
                <span style="flex: 1">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
              </li>
              <li>
                <p>
                  <span>案件类别：</span>
                  <span>XXX</span>
                </p>
                <p>
                  <span>适用程序：</span>
                  <span>一般程序</span>
                </p>
              </li>
              <li>

                <span>当事人：</span>
                <span>张三</span>

              </li>
              <li>

                <span>处罚决定书文号：</span>
                <span>玉抚管罚决字〔2020〕4006号</span>

              </li>
              <li>
                <p>
                  <span>处罚种类：</span>
                  <span>罚款</span>
                </p>
                <p>
                  <span>执行情况：</span>
                  <span>已执行</span>
                </p>
              </li>
              <li>
                <p>
                  <span>立案日期：</span>
                  <span>2020/02/01</span>
                </p>
                <p>
                  <span>结案日期：</span>
                  <span>2020/1/1</span>
                </p>
              </li>
              <li>

                <span>办案人员：</span>
                <span>王五（18022330404）</span>

              </li>
              <li>
                <p>
                  <span>归档日期：</span>
                  <span>2020/02/01</span>
                </p>
                <p>
                  <span>保存期限：</span>
                  <span>10年</span>
                </p>
              </li>
              <li>
                <p>
                  <span>归档号：</span>
                  <span>2020/02/01</span>
                </p>
                <p>
                  <span>归档人：</span>
                  <span>张柳</span>
                </p>
              </li>
            </ul>
          </a-card>
          <!--          事件信息-->
          <a-card title="事件信息" :bordered="false" class="tabsCard" style="margin-top: 20px">
            <!-- <a href="#" slot="extra">事件详情&gt;</a> -->
            <ul>
              <li>
                <p>
                  <span>事发地点：</span>
                  <span>澄江县XX路10号
                    <!-- <img @click="viewMap" class="map-icon" src="../../assets/icons/wan_map.png"/> -->
                  </span>
                </p>
                <p>
                  <span>上报时间：</span>
                  <span>2020/02/01 12：00</span>
                </p>
              </li>
              <li>
                <p>
                  <span>事发时间：</span>
                  <span>2020-02-22 11:03  </span>
                </p>
                <p>
                  <span>上报人：</span>
                  <span>王五（18022330404）</span>
                </p>
              </li>
              <li>
                <p>
                  <span>事件类型：</span>
                  <span>2020-02-22 11:03  </span>
                </p>
                <p>
                  <span>上报来源：</span>
                  <span>王五（18022330404）</span>
                </p>
              </li>
              <li>
                <span>事件描述：</span>
                <span>这是事件具体描述文字可能过多做好换行兼容</span>
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
            <!--            文件列表-->
            <a-table :columns="columns" :dataSource="data" :rowSelection="rowSelection" :pagination="pagination"/>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </div>
    <!--    地图查看弹窗-->
    <a-modal
      title="事发地地图位置"
      :visible="visible"
      @cancel="handleCancel"
    >
      <template slot="footer">
        <a-button @click="handleCancel">取消</a-button>
      </template>
      <p>展示地图</p>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: 'CaseDetails',
  data () {
    return {
      caseId: '', // 案件ID
      EventInfoId: '', // 事件ID
      tabBarGutterNum: 0, // tabs 选项卡之间的间距
      pagination: false, // 不展示翻页
      visible: false, // 地图弹窗 默认不显示
      confirmLoading: false, // 不显示确认框
      centered: true, // 弹窗居中
      caseFile: {
        caseType: '全部', // 案件类型
        caseCourse: '全部', // 案件程序
        caseState: '已结案', // 案件状态
        caseDistrict: '全部', // 区域
        caseLaw: '', // 办案人员  执法人员
        caseBreakLow: '', // 当事人 , 违法人员
        caseTime: [], // 案发时间
        caseNumber: '案〔2020〕3206号', // 案件编号
        caseJudgementNum: '' // 处罚决定文书号
      },
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
      console.log(key)
    },
    // 地图查看
    viewMap () {
      this.visible = true
      // console.log(`这里需要 地图的 gps坐标`)
    },
    handleCancel (e) {
      this.visible = false
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
  }
}
</script>
<style scoped>
  /deep/ .case-body .ant-tabs-tab {
    border-radius: 0px !important;
  }
</style>
