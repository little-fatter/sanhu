<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="left title-icon"></div>
      <div class="left title-text">{{ title }}</div>
      <div class="clear"></div>
    </a-layout-header>
    <a-layout-content id="a-layout-content">
      <hr class="line"/>
      <div
        :style="getListStyle"
      >
        <a-list :dataSource="list" style="padding:0">
          <a-list-item slot="renderItem" slot-scope="item" class="item" @click="onItemClick(item)">
            <hr class="line"/>
            <a-list :bordered="false" style="padding:0">
              <a-list-item class="item-lyr">
                <a-avatar class="left item-avatar" shape="square" :size="20" :src="getSrc(item.status)"></a-avatar>
                <div class="left item-title">{{ item.title }}</div>
                <div class="left item-countdown" v-show="countdownShow">{{ item.countdown }}</div>
                <div class="clear"></div>
              </a-list-item>
              <a-list-item class="item-lyr">
                <div class="item-person-info">当前处理人: {{ item.personInfo.dep + ' ' + item.personInfo.members[0] + ' ' + item.personInfo.members[1] }} </div>
              </a-list-item>
              <a-list-item class="item-lyr">
                <div class="item-status-info">处理状态: <font>{{ evtStateMap.list[item.status] }}</font> </div>
              </a-list-item>
              <a-list-item class="item-lyr">
                <div class="item-time-limit-info">流转时限: {{ item.timeLimit }} </div>
              </a-list-item>
              <a-list-item class="item-lyr">
                <div class="item-time-info left"> {{ item.uploadTime }} </div>
                <div class="left ai-link" v-show="countdownShow"><a >AI摄像头识别</a></div>
                <div class="clear"></div>
              </a-list-item>
            </a-list>
          </a-list-item>
        </a-list>
      </div>

    </a-layout-content>
  </a-layout>
</template>

<script>
import moment from 'moment'
import appConfig from '@/config/app.config'

const timeFormat = 'YYYY-MM-DD HH:mm:ss'
var evtStateMap = {
  list: ['待处理', '事件核查中', '跟踪整改中', '现场勘察中', '处理完成', '转为案件办理'],
  map: {
    '待处理': 0,
    '事件核查中': 1,
    '跟踪整改中': 2,
    '现场勘察中': 3,
    '处理完成': 4,
    '转为案件办理': 5
  },
  level: {
    '待处理': 0,
    '事件核查中': 1,
    '跟踪整改中': 1,
    '现场勘察中': 1,
    '处理完成': 2,
    '转为案件办理': 2
  }
}
export default {
  name: 'MyAlertEventList',
  components: { },
  props: {
    aftetItemClick: {
      type: Function,
      default: undefined
    }
  },
  computed: {
    getListStyle: function () {
      return {
        'overflow-y': 'auto',
        'overflow-x': 'hidden',
        height: this.listHeight + 'px'
      }
    }
  },
  data: function () {
    return {
      countdownShow: false,
      title: '告警事件',
      list: [
        // {
        //   title: '禁渔区捕捞',
        //   status: 0,
        //   timeLimit: '2020-02-14 00:00:00', // 当前阶段处理时限
        //   uploadTime: '2020-02-14 00:00:00', // 上报时间，
        //   countdown: '00:00:00',
        //   location: [11457309.056593215, 2818918.856333022],
        //   address: '地址',
        //   personInfo: {
        //     dep: '执法一大队',
        //     members: ['黄庆令', '黄民全']
        //   }
        // }
      ],
      statusTable: [
        {
          src: appConfig.StaticWebContext + '/img/yzt-renyuanceng/zhuyi.png',
          title: '一级'
        },
        {
          src: appConfig.StaticWebContext + '/img/yzt-renyuanceng/zhuyi(1).png',
          title: '二级'
        },
        {
          src: appConfig.StaticWebContext + '/img/yzt-renyuanceng/zhuyi(2).png',
          title: '三级'
        },
        {
          src: appConfig.StaticWebContext + '/img/yzt-renyuanceng/zhuyi(3).png',
          title: '任务失败'
        }
      ],
      evtStateMap: evtStateMap,
      listHeight: 761
    }
  },
  methods: {
    getSrc: function (type) {
      var statusName = evtStateMap.list[type]
      var level = evtStateMap.level[statusName]
      return this.statusTable[level].src
    },
    getAlertEventList: function () {
      return [...this.list]
    },
    updateAlertEventList: function (list) {
      this.list.length = 0
      this.list.push(...this.sortList(list))
    },
    sortList: function (list) {
      return list.sort(function (a, b) {
        return a.status - b.status
      })
    },
    checkTimeOut: function (item, _moment) {
      var timeLimit = moment(item.timeLimit, timeFormat).toDate()
      var now = _moment.toDate()
      return (timeLimit * 1 - now * 1) / 1000 < 1
    },
    computeCountdown: function (item) {
      var timeLimit = moment(item.timeLimit, timeFormat).toDate()
      var now = moment().toDate()
      var s = (timeLimit * 1 - now * 1) / 1000
      s = Math.floor(s)
      if (s < 1) {
        return '00:00:00'
      } else {
        var _s = s % 60
        var m = Math.floor(s / 60)
        var _m = m % 60
        var _h = Math.floor(m / 60)
        return _h + ':' + _m + ':' + _s
      }
    },
    getCountList: function () {
      var countList = [ 0, 0, 0, 0 ]
      var now = moment()
      for (var i = 0; i < this.list.length; i++) {
        var element = this.list[i]
        var status = element.status
        if (status === 0) {
          countList[0]++ // 告警
        }
        if (status === 1 || status === 2 || status === 3) {
          countList[1]++ // 处理中
        }
        if (status !== 4 && status !== 5) {
          countList[2]++ // 未完成
        }
        if (this.checkTimeOut(element, now)) {
          countList[3]++
        }
      }
      return countList
    },
    onItemClick: function (item) {
      this.aftetItemClick && this.aftetItemClick(item)
    }
  },
  mounted: function () {
    var that = this
    setInterval(function () {
      var height = that.$el.querySelector('#a-layout-content').offsetHeight
      that.listHeight = height
      for (let i = 0; i < that.list.length; i++) {
        var element = that.list[i]
        element.countdown = that.computeCountdown(element)
      }
    }, 1000)
  }
}
</script>
<style scoped>
.header{
  background-color: white;
  height: 44px;
  line-height: 44px;
  padding-left: 32px;
  border-radius: 5px;
}
.left{
    float: left;
}
.right{
    float: right;
}
.clear{
    clear: both;
}
.line{
    height:1px;
    border:none;
    border-top:1px solid rgba(235, 235, 235, 1);
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
}
.item-lyr{
    width:360px;
    border: none;
    padding: 4px;
}
.item-avatar{
    margin-left: 20px;
}
.item-title{
    margin-left: 12px;
    color: rgba(127, 135, 174, 1);
    font-size: 14px;
    min-width: 200px;
}
.item-countdown{
    margin-left: 20px;
    color: rgba(127, 135, 174, 1);
    font-size: 14px;
}
.item-person-info{
    margin-left: 20px;
    color: rgba(127, 135, 174, 1);
    font-size: 14px;
}
.item-status-info{
    margin-left: 20px;
    color: rgba(127, 135, 174, 1);
    font-size: 14px;
}
.item-status-info font{
    color: rgba(44, 140, 240, 1);
}
.item-time-limit-info{
    margin-left: 20px;
    color: rgba(127, 135, 174, 1);
    font-size: 14px;
}
.item-time-info{
    margin-left: 20px;
    color: rgba(44, 140, 240, 1);
    font-size: 14px;
}
.ai-link{
    margin-left: 80px;
    color: rgba(44, 140, 240, 1);
    font-size: 14px;
}
</style>
