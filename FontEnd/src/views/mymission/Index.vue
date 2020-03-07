<style lang="less" scoped>
.wrapper {
    background: #eeeeee;padding:30px;color:#101010;
    .head {
        margin-right: 1%;
        background: #ffffff;padding:20px;margin-bottom:30px;
        box-shadow:0px 1px 6px rgba(0,0,0,0.1);border-radius:8px;
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
                .input {
                  min-width: 240px;
                }
            }
            .search-button {
              position: absolute;
              right:40px;
            }

        }
    }
    .body {
      display: flex;flex-wrap: wrap;
        .body-item{
            border-radius: 8px;
            width: 24%;
            margin-right: 1%;
            background: rgba(255,255,255,1);
            box-shadow: 0px 1px 6px rgba(0,0,0,0.1);
            margin-bottom: 24px;
            .item-type {
              display: flex;justify-content: space-between;
            }
            .item-box {
              margin-top:14px;font-size:14px;color:#7F87AE;
              .title {
                font-size: 16px;color:#64697C;font-weight: 400;
              }
              .color {
                color:#FF8405
              }
              .left-span {
                margin-right: 14px;
              }
            }
            .item-bottom {
              color:#AEBBC3;
              margin-top:24px;
            }
        }
    }
    .footer {
      text-align: center
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
            <a-select class="input" v-model="taskStyle" >
              <a-select-option v-for="item in taskOptions" :key="item.ID" :value="item.ItemCode">{{ item.Title }}</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="box">
          <div class="box-left">
            任务编号:
          </div>
          <div>
            <a-input class="input" placeholder="编号" v-model="taskNum"></a-input>
          </div>
        </div>
        <div class="box search-button" >
          <a-button class="box-left" type="primary" @click="searchList"> 搜索 </a-button>
          <a-button @click="reset"> 重置 </a-button>
        </div>
      </div>
    </div>

    <div class="body">
      <a-card :loading="loading" class="body-item" v-for="item in dataList" @click="intoDetails(item.EventInfoId,item.ID, item.Tasktype)" :key="item.ID">
        <div>
          <img style="width:100%;height:200px" src="../../assets/icons/defPicture.svg" alt="加载失败">
        </div>
        <div class="item-type item-box" v-if="item.TaskContent || item.Tasknumber">
          <span class="title">{{ item.TaskContent }}</span>
          <span>{{ item.Tasknumber }}</span>
        </div>
        <div class="item-box">
          <span class="left-span">事件类型：</span>
          <span class="color">{{ item.EventTypeName }}</span>
        </div>
        <div class="item-box">
          <span class="left-span">协办人：</span>
          <span v-if="item.CoOrganizer" >{{ item.CoOrganizer }}</span>
          <span v-else >无协办人</span>
        </div>
        <div class="item-box">
          <span class="left-span">上传时间：</span>
          <span>{{ item.InitiationTime }}</span>
        </div>
        <div class="item-box">
          <span class="left-span">期望完成时间：</span>
          <span>{{ item.ExpectedCompletionTime }}</span>
        </div>
        <div class="item-box item-bottom">
          <span class="left-span">{{ item.CompleteTime }}</span>
          <span>来自 指挥中心</span>
        </div>
      </a-card>
      <!-- <div class="body-item" v-for="item in dataList" @click="intoDetails(item.EventInfoId,item.ID, item.Tasktype)" :key="item.ID">
        <div class="item-head" v-if="item.Tasktype || item.Tasknumber">
          <span class="left">{{ item.Tasktype }}</span>
          <span>{{ item.Tasknumber }}</span>
        </div>
        <div class="item-body">
          <div class="left">
            <img style="width:100%;height:100%" src="../../assets/icons/defPicture.svg" alt="加载失败">
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
              <span v-if="item.MainHandler" class="left">主办人：</span>
              <span >{{ item.MainHandler }}</span>
            </div>
            <div class="second">
              <span v-if="item.CoOrganizer" class="left">协办人：</span>
              <span >{{ item.CoOrganizer }}</span>
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
      </div> -->
    </div>
    <div style="text-align:center;" v-show="totalCount == 0">暂无数据</div>
    <div class="footer" v-show="totalCount > 0">
      <a-pagination
        :pageSize.sync="PageSize"
        @change="onChange"
        :total="totalCount"
        v-model="PageIndex"
      />
    </div>
  </div>
</template>

<script>
import { getPageData, getUser, getDictionary } from '@/api/sampleApi'
import { isNotEmpty } from '@/utils/util'
export default {
  data () {
    return {
      loading: false,
      totalCount: 0,
      PageIndex: 1,
      PageSize: 8,
      dataList: [
      ], // 任务列表
      taskStyle: 'quanbu', // 任务类型
      taskNum: '', // 任务编号
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
        op: 'like',
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
        ItemCode: 'quanbu',
        Title: '全部类型' }
      this.taskOptions.splice(0, 0, option)
    }).catch((err) => {
      console.log(err)
    })
    // 获取用户Id
    // getUser().then(res => {
    //   if (res.UserId) {
    //     this.rules[2].value = res.UserId
    //   }
    // }).catch((err) => {
    //   console.log(err)
    // })
  },
  mounted () {
    this.getTaskList()
  },
  methods: {
    // 重置选项
    reset () {
      this.taskStyle = 'quanbu'
      this.taskNum = ''
    },
    // 进入详情页面
    intoDetails (eventId, id, Tasktype) {
      if (Tasktype) {
        if (Tasktype === '事件巡查') { this.$router.push({ name: 'EventInspeion', params: { eventId: eventId, id: id } }) } else { this.$router.push({ name: 'SceneInvestigation', params: { eventId: eventId, id: id } }) }
        return
      }
      // this.$router.push({ name: 'EventInspeion', params: { eventId: eventId, id: id } })
      this.$router.push({ name: 'SceneInvestigation', params: { eventId: eventId, id: id } })
    },
    // 处理参数
    dealParamters () {
      if (this.taskStyle !== 'quanbu') {
        this.rules[1].value = this.taskStyle
      } else {
        this.rules[1].value = ''
      }
      this.rules[3].value = this.taskNum
      const rule = []
      this.rules.map(item => {
        if (isNotEmpty(item.value) && item.value !== ' ') {
          rule.push(item)
        }
      })
      this.paramters.rules = rule
    },
    // 获取任务列表
    getTaskList () {
      this.loading = true
      this.dealParamters()
      if (this.paramters.rules.length > 0) {
        getPageData(this.paramters, this.PageIndex, this.PageSize, 'work_task').then(res => {
          this.dataList = res.Rows
          this.totalCount = res.Total
          this.loading = false
        }).catch((err) => {
          this.loading = false
          console.log(err)
        })
      } else {
        getPageData([], this.PageIndex, this.PageSize, 'work_task').then(res => {
          this.dataList = res.Rows
          this.loading = false
          this.totalCount = res.Total
        }).catch((err) => {
          this.loading = false
          console.log(err)
        })
      }
    },
    searchList () {
      this.PageIndex = 1
      this.getTaskList()
    },
    onChange (current) {
      this.PageIndex = current
      this.getTaskList()
    }
  }
}
</script>
