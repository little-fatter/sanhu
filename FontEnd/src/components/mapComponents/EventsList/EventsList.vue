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
          <a-list-item slot="renderItem" slot-scope="item" class="item" @click="onItemClick(item) ">
            <hr class="line"/>
            <a-list :bordered="false" style="padding:0">
              <a-list-item class="item-lyr">
                <a-avatar class="left item-avatar" shape="square" :size="20" :src="getSrc(item)"></a-avatar>
                <div class="left item-title">{{ item.evtTypeName }}</div>
                <div class="left item-countdown" v-show="countdownShow">{{ item.countdown }}</div>
                <div class="clear"></div>
              </a-list-item>
              <a-list-item class="item-lyr">
                <div class="item-person-info">当前处理人: {{ item.dealerName }} </div>
              </a-list-item>
              <a-list-item class="item-lyr">
                <div class="item-status-info">
                  处理状态:
                  <font :style="{color: getColor(item)}">
                    {{ eventStateNameMap[item.evtState] }}
                  </font>
                </div>
              </a-list-item>
              <a-list-item class="item-lyr">
                <div class="item-time-limit-info">流转时限: {{ item.finishLimitTime }} </div>
              </a-list-item>
              <a-list-item class="item-lyr">
                <div class="item-time-info left"> {{ getReportTimeStr(item) }} </div>
                <div class="left ai-link" v-show="countdownShow"><a >{{ reportType[item.reportType] }}</a></div>
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
import dictionary from '@/utils/dictionary'
import eventUtils from '../eventUtils'
import moment from 'moment'
/**
 * 使用EventsList.setMapApp方法赋值
 */
var mapApp = {}
var timeFormat = dictionary.timeFormat
export default {
  name: 'EventsList',
  components: { },
  props: {
    aftetItemClick: {
      type: Function,
      default: undefined
    },
    /**
     * 前端数据中心
     */
    dataGet: {
      type: Object,
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
      countdownShow: true,
      title: '告警事件',
      list: [

      ],
      eventLevelTable: dictionary.eventLevelTable,
      eventStateMap: dictionary.eventStateMap,
      listHeight: 761,
      reportType: dictionary.reportType,
      eventStateNameMap: dictionary.eventStateNameMap
    }
  },
  methods: {
    getSrc: function (item) {
      var level = eventUtils.getEventLevel(item.evtState, item.evtTypeName)
      return this.eventLevelTable[level].src
    },
    getColor: function (item) {
      var level = eventUtils.getEventLevel(item.evtState, item.evtTypeName)
      return this.eventLevelTable[level].color
    },
    getReportTimeStr: function (item) {
      var reportTime = item.reportTime
      return moment(reportTime, timeFormat).fromNow()
    },
    setMapApp: function (_mapApp) {
      mapApp = _mapApp
    },
    /**
     * 刷新数据
     */
    updateAlertEventList: function () {
      var list = this.dataGet.getAlertEventList()
      this.list.length = 0
      this.list.push(...this.sortList(list))
    },
    /**
     * 按优先级排序
     */
    sortList: function (list) {
      return list.sort(function (a, b) {
        var levelA = eventUtils.getEventLevel(a.evtState, a.evtTypeName)
        var levelB = eventUtils.getEventLevel(b.evtState, b.evtTypeName)
        return levelA - levelB
      })
    },
    /**
     * 计算倒计时
     */
    computeCountdown: function (item) {
      var timeLimit = moment(item.finishLimitTime, timeFormat).toDate()
      var now = moment().toDate()
      var s = (timeLimit * 1 - now * 1) / 1000
      s = Math.floor(s)
      if (s < 1) {
        return '00:00:00'
      } else {
        var _s = s % 60
        _s = _s < 10 ? 0 + '' + _s : _s
        var m = Math.floor(s / 60)
        var _m = m % 60
        _m = _m < 10 ? 0 + '' + _m : _m
        var _h = Math.floor(m / 60)
        _h = _h < 0 ? 0 + '' + _h : _h
        return _h + ':' + _m + ':' + _s
      }
    },
    /**
     * 点击事件
     */
    onItemClick: function (item) {
      var layerName = 'alertEventLayer'
      var id = item.id
      mapApp.selectFeature(layerName, id)
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
/* .item-status-info font{
    color: rgba(44, 140, 240, 1);
} */
.item-time-limit-info{
    margin-left: 20px;
    color: rgba(127, 135, 174, 1);
    font-size: 14px;
}
.item-time-info{
    margin-left: 20px;
    color: rgba(44, 140, 240, 1);
    font-size: 14px;
    min-width: 200px;
}
.ai-link{
    margin-left: 80px;
    color: rgba(44, 140, 240, 1);
    font-size: 14px;
}
</style>
