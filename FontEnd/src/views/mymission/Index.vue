<style lang="less" scoped>
.wrapper {
    background: #eeeeee;padding:30px;color:#101010;
    .head {
        background: #ffffff;padding:20px;margin-bottom:30px;
        .missionStyle {
            display: flex;
            .currentName {
            font-size: 18px;color:#101010;font-weight: bold;
            font-family: SourceHanSansSC-regular;margin:0 30px 30px 0;
        }
        .names {
            font-size: 14px;color:#101010;display:flex;align-items:center;
            span {
                margin-right: 10px;
                padding: 6px 10px;
                border: 1px solid #eeeeee;
                border-radius: 8px;
            }
            span:hover{
                cursor: pointer;
                border-color: #1990FF;
                color:#1990FF;
            }
        }
        }
        .search-line {
            display: flex;
            .box {
                display: flex;margin-right:30px;align-items:center;
                .box-left {
                    margin-right: 10px;
                }
            }

        }
    }
    .body {
        .body-item{
            margin-bottom:20px;background:#ffffff;padding:20px;
            .item-head {
                .left {
                    margin-right:90px;
                }
            }
            .item-body {
                display:flex;margin: 20px 0;
                .left {
                    margin-right:50px;width:70px;height:70px;
                }
                .middle{
                    margin-right:200px;
                    .middle-head {
                        margin-bottom:10px;
                        .left {
                            margin-right:20px;
                        }
                    }
                    .middle-body {
                        .left {
                            margin-right:20px;
                        }
                    }
                }
                .right {
                    flex:3;
                    .first {
                        margin-bottom:10px;
                        .left {
                        margin-right:20px;
                    }
                    }
                    .second {
                        .left {
                        margin-right:20px;
                    }
                    }

                }
            }
            .item-footer {
                display:flex;justify-content:space-between;
                .space {
                    margin-right:20px;
                }
            }
        }
    }
}
</style>

<template>
  <div class="wrapper">
    <div class="head">
      <div class="missionStyle">
        <div class="currentName">待办任务</div>
      </div>
      <div class="search-line">
        <div class="box">
          <div class="box-left">
            任务类型:
          </div>
          <div>
            <a-select v-model="taskStyle" >
              <a-select-option v-for="item in taskOptions" :key="item.ID" :value="item.Title">{{ item.Title }}</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="box">
          <div class="box-left">
            任务编号:
          </div>
          <div>
            <a-input placeholder="编号" v-model="taskNum"></a-input>
          </div>
        </div>
        <div class="box" @click="searchList">
          <a-button > 搜索 </a-button>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="body-item" v-for="item in dataList" @click="intoDetails(item.EventInfoId,item.ID)" :key="item.ID">
        <div class="item-head">
          <span class="left">{{ item.Tasktype }}</span>
          <span>{{ item.Tasknumber }}</span>
        </div>
        <div class="item-body">
          <div class="left">
            任务图片
          </div>
          <div class="middle">
            <div class="middle-head">
              <span class="left">事件类型：</span>
              <span>{{ item.EventTypeName }}</span>
            </div>
            <div class="middle-body">
              <span class="left">上传时间：</span>
              <span>{{ item.InitiationTime }}</span>
            </div>
          </div>
          <div class="right">
            <div class="first">
              <span class="left">主办人：</span>
              <span>{{ item.MainHandler }}</span>
            </div>
            <div class="second">
              <span class="left">协办人：</span>
              <span>{{ item.CoOrganizer }}</span>
            </div>
          </div>
        </div>
        <div class="item-footer">
          <div>
            <span class="space">期望完成时间：</span>
            <span>{{ item.ExpectedCompletionTime }}</span>
          </div>
          <div>
            <span class="space">{{ item.CompleteTime }}</span>
            <span>来自 指挥中心</span>
          </div>
        </div>
      </div>
      <div>
        <a-pagination
          showSizeChanger
          :pageSize.sync="PageSize"
          :pageSizeOptions="pageSizeOptions"
          @showSizeChange="onShowSizeChange"
          @change="onChange"
          :total="totalCount"
          v-model="PageIndex"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getWorkTaskList, getUser, getDictionary } from '@/api/sampleApi'

export default {
  data () {
    return {
      totalCount: null,
      PageIndex: 1,
      PageSize: 5,
      pageSizeOptions: ['5', '10', '15', '20'],
      dataList: [
      ], // 任务列表
      taskStyle: '全部类型', // 任务类型
      taskNum: ' ', // 任务编号
      taskOptions: [], // 任务类型选项
      paramters: { rules: [
      ],
      op: 'and' },
      rules: [{
        field: 'TaskStatus',
        op: 'equal',
        value: 1,
        type: 'int'
      }, {
        field: 'Tasktype',
        op: 'equal',
        value: '',
        type: 'string'
      }, {
        field: 'AssignUsersID',
        op: 'equal',
        value: '',
        type: 'text'
      }, {
        field: 'Tasknumber',
        op: 'equal',
        value: '',
        type: 'string'
      }
      ]
    }
  },
  created () {
    // 获取任务类型
    getDictionary({ model: 'res_dictionary', context: 'TaskType' }).then(res => {
      this.taskOptions = res
      const option = { ID: 'quanbu',
        Title: '全部类型' }
      this.taskOptions.splice(0, 0, option)
    }).catch((err) => {
      console.log(err)
    })
    // 获取用户Id
    getUser().then(res => {
      console.log(res)
      if (res.UserId) {
        this.rules[2].value = res.UserId
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  mounted () {
    this.getTaskList()
  },
  methods: {
    // 进入详情页面
    intoDetails (eventId, id) {
      // this.$router.push({ name: 'EventInspeion', params: { eventId: eventId, id: id } })
      this.$router.push({ name: 'SceneInvestigation', params: { eventId: eventId, id: id } })
    },
    // 处理参数
    dealParamters () {
      if (this.taskStyle !== '全部类型') {
        this.rules[1].value = this.taskStyle
      } else {
        this.rules[1].value = ''
      }
      this.rules[3].value = this.taskNum
      const rule = []
      this.rules.map(item => {
        if (item.value !== '' & item.value !== ' ') {
          rule.push(item)
        }
      })
      this.paramters.rules = rule
    },
    // 获取任务列表
    getTaskList () {
      this.dealParamters()
      // if (this.paramters.rules.length > 0) {
      //   console.log(this.paramters.rules)
      //   getWorkTaskList(this.paramters, this.PageIndex, this.PageSize).then(res => {
      //     this.dataList = res.Rows
      //     this.totalCount = res.Total
      //   }).catch((err) => {
      //     console.log(err)
      //   })
      // } else {
      //   getWorkTaskList([], this.PageIndex, this.PageSize).then(res => {
      //     this.dataList = res.Rows
      //     this.totalCount = res.Total
      //   }).catch((err) => {
      //     console.log(err)
      //   })
      // }
      getWorkTaskList([], this.PageIndex, this.PageSize).then(res => {
        this.dataList = res.Rows
        this.totalCount = res.Total
      }).catch((err) => {
        console.log(err)
      })
    },
    searchList () {
      this.getTaskList()
    },
    onShowSizeChange (current, pageSize) {
      this.PageIndex = current
      this.PageSize = pageSize
      this.getTaskList()
    },
    onChange (current) {
      this.PageIndex = current
      console.log(current)
      this.getTaskList()
    }
  }
}
</script>
