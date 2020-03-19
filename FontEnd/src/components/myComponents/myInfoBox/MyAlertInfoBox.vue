<template>
  <a-layout v-show="show">
    <a-layout-header class="header">
      <div class="left title-icon"></div>
      <div class="left title-text">{{ info.name }}</div>
      <div class="right"><a-icon class="info-close" type="close" @click="close"/></div>
      <div class="clear"></div>
    </a-layout-header>
    <a-layout-content>
      <hr class="line"/>
      <div class="left left-div">
        <div class="font-14 info-row">
          <div class="info-row-title left">事件描述:</div>
          <div class="left info-row-right"> {{ info.des }}</div>
          <div class="clear"></div>
        </div>
        <div class="font-14 info-row">
          <div class="info-row-title left">处理状态:</div>
          <div class="left info-row-right" :style="{color: getColor(info.status)}"> {{ evtStateMap.list[info.status] }}</div>
          <div class="clear"></div>
        </div>
        <div class="font-14 info-row">
          <div class="info-row-title left">上报时间:</div>
          <div class="left info-row-right"> {{ info.uploadTime }}</div>
          <div class="clear"></div>
        </div>
        <div class="font-14 info-row">
          <div class="info-row-title left">事发地点:</div>
          <div class="left info-row-right"> {{ info.addr }}</div>
          <div class="clear"></div>
        </div>
        <div class="font-14 info-row">
          <div class="info-row-title left">上报来源:</div>
          <div class="left info-row-right"> {{ reportType[info.uploadSource] }}</div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="clear"></div>
      <div class="time-list">
        事件处理记录...
      </div>
      <div class="button-group-lyr">
        <a-button type="primary">查看详情</a-button>
        <template v-if="info.status == 0">
          <a-button type="primary" class="button-cuiban" @click="openTaskPanel">派发</a-button>
        </template>
        <template v-if="info.status == 1">
          <a-button type="primary" class="button-cuiban">催办</a-button>
        </template>
      </div>
      <a-modal
        title="任务派发"
        centered
        v-model="taskPanel.show"
        :footer="null"
        :width="360"
      >
        <div>
          <div class="font-14 task-panel-lyr">
            期望完成时间:
          </div>
          <div class="task-panel-lyr">
            <a-date-picker
              showTime
              placeholder="选择时间"
              v-model="taskPanel.time"
              format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            />
          </div>
          <div class="font-14 task-panel-lyr">
            主办人:
          </div>
          <div class="task-panel-lyr">
            <a-select
              defaultValue=""
              style="width: 100%"
              v-model="taskPanel.mainPerson"
            >
              <a-select-option v-for="p in taskPanel.list" :key="p.name">
                {{ p.name }}
              </a-select-option>
            </a-select>
          </div>
          <div class="font-14 task-panel-lyr">
            协办人(多选):
          </div>
          <div class="task-panel-lyr">
            <a-select
              mode="tags"
              style="width: 100%"
              placeholder="选择协办人"
              v-model="taskPanel.subPeople"
            >
              <a-select-option v-for="p in taskPanel.list" :key="p.name">
                {{ p.name }}
              </a-select-option>
            </a-select>
            <div class="task-panel-lyr" style="text-align: center;">
              <a-button type="primary" style="width: 220px" @click="onClickHandOut">任务派发</a-button>
            </div>
          </div>
        </div>
      </a-modal>
    </a-layout-content>
  </a-layout>
</template>
<script>
import moment from 'moment'
import appConfig from '@/config/app.config'
import dictionary from '@/utils/dictionary'

export default {
  name: 'MyAlertInfoBox',
  props: {
    dataGet: {
      type: Object,
      default: undefined
    },
    afterClose: {
      type: Function,
      default: undefined
    }
  },
  data: function () {
    return {
      show: false,
      info: {
        name: '-',
        status: 0, // 处理状态
        des: '-', // 事件描述
        uploadTime: '2019-12-26  15：33：47', // 上报时间
        addr: '-', // 事发地点
        uploadSource: '-'
      },
      statusTable: dictionary.eventLevelTable,
      evtStateMap: dictionary.evtStateMap,
      reportType: dictionary.reportType,
      taskPanel: {
        list: [],
        show: false,
        time: moment(),
        mainPerson: '',
        subPeople: []
      }
    }
  },
  methods: {
    getColor : function (status) {
      var name = this.evtStateMap.list[status]
      var level = this.evtStateMap.level[name]
      return this.statusTable[level].color
    },
    close: function () {
      this.show = false
      this.afterClose && this.afterClose()
    },
    open: function (info) {
      if (info) {
        this.info.id = info.id || '-'
        this.info.name = info.name || '-'
        this.info.status = info.status === undefined ? -1 : info.status
        this.info.des = info.des || '-'
        this.info.uploadTime = info.uploadTime || '-'
        this.info.addr = info.addr || '-'
        this.info.uploadSource = info.uploadSource || '-'
      }
      this.show = true
    },
    openTaskPanel: function () {
      this.taskPanel.show = true
      if (this.dataGet) {
        this.taskPanel.list.length = 0
        var list = this.dataGet.data.peopleList.Records.map(x => ({ id: x.ID, name: x.StaffName }))
        this.taskPanel.list.push(...list)
      }
    },
    onClickHandOut: function () {
      this.taskPanel.show = false
      // console.log(this.taskPanel)
      var EventInfoId = this.info.id
      var MainHandler = this.taskPanel.mainPerson
      // var selectIndex = this.taskPanel.list.findIndex(x => x.name === MainHandler)
      // var AssignUsersID = this.taskPanel.list[selectIndex].id
      var CoOrganizer = this.taskPanel.subPeople.toString()
      var ExpectedCompletionTime = this.taskPanel.time.format('YYYY-MM-DD HH:mm:ss')
      // var url = 'http://8030.gr2abce8.fhmpsbz4.8e9bcb.grapps.cn/webapi/api'
      // var url = 'http://192.168.0.165:8030/webapi/api'
      var url = appConfig.ApiWebContext + '/webapi/api'

      var RemoteLinks = appConfig.AppHost + 'eventCheckCreate'
      var data = {
        'TaskType': 'EventCheck', // 任务类型
        'AssignUsers': '165906044420484870', // 执行人
        'RemoteLinks': RemoteLinks, // 钉钉url连接
        'TaskContent': '任务描述' + Math.random(), // 任务描述
        'EventInfoId': EventInfoId, // 事件id
        // 'CaseID': '', // 案件id
        'ExpectedCompletionTime': ExpectedCompletionTime, // 期望完成时间
        'MainHandler': MainHandler, // 主办人
        'CoOrganizer': CoOrganizer // 协办人
      }

      // var body = {
      //   id: 'create',
      //   model: 'work_task',
      //   data: JSON.stringify(data)
      // }
      var body = '{"id": "create","model": "work_task","data":\'' + JSON.stringify(data) + '\'}'
      console.log('body', body)
      this.dataGet.doPostDataAjaxNotSetObject(url, body)
        .then(function (res) {
          console.log(res)
        })
      this.taskPanel.show = false
    }
  }
}
</script>
<style scoped>
.header{
  background-color: white;
  height: 44px;
  line-height: 44px;
  padding-left: 20px;
  border-radius: 5px;border-radius: 5px;
}
.left{
  float: left;
}
.right{
  float: left;
}
.clear{
  clear: both;
}
.title-icon{
  width:4px;
  height: 20px;
  background: rgba(58, 157, 250, 1);
  margin-top: 12px;
  margin-right: 14px;
}
.title-text{
  color: rgba(34, 35, 40, 1);
  font-size: 16px;
  min-width: 200px;
}
.line{
  height:1px;
  border:none;
  border-top:1px solid rgba(235, 235, 235, 1);
}
.font-16{
  font-size: 16px;
  color: rgba(127, 135, 174, 1);
}
.font-14{
  font-size: 14px;
  color: rgba(127, 135, 174, 1);
}
.info-row{
  margin: 10px 0;
}
.info-row-title{
  min-width: 60px;
  display: inline;
  text-align:justify;
  text-justify:distribute-all-lines;
  text-align-last:justify;
}
.left-div{
  margin-left: 20px;
  margin-right: 20px;
}
.info-row-right{
    width: 256px;
    margin-left: 4px;
}
.right-div{
  margin-left: 10px;
  width: 100px;
  text-align: center;
}
.info-avatar{
  margin-top: 30px;
}
.info-online{
  margin-top: 10px;
}
.info-close{
  margin-left: 26px;;
}
.time-list{
    margin: 10px 20px;
    width: 320px;
    height: 80px;
    border: 1px gray solid;
}
.button-group-lyr{
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 94px;
}
.button-cuiban{
    margin-left: 20px;
}

.task-panel-lyr{
  margin: 10px 0;
}
</style>
