<template>
  <div class="main">
    <!-- 地图控件 -->
    <div :id="[mapId]" class="map"></div>
    <!-- 切换湖 -->
    <div class="dropdown-div" >
      <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link dropdown-title">{{ lakes[selectedLakeIndex].name }}<a-icon type="down"/></a>
        <a-menu slot="overlay">
          <a-menu-item :key="lake.index" v-for="lake in lakes" @click="onLakeSeleted(lake)">{{ lake.name }}</a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <!-- 地图缩放控件 -->
    <div id="map-zoom"></div>
    <!-- 事件信息弹窗 -->
    <div id="infobox-alertEventLayer" :style="infobox.alertEventLayer.style" class="infobox">
      <div class="infobox-header">
        <div class="left infobox-header-img-left"><img :src="infobox.alertEventLayer.header.src"></div>
        <div class="left infobox-header-title">{{ infobox.alertEventLayer.header.title }}</div>
        <div class="right"><a-icon class="infobox-header-close" type="close" @click="closeInfo"/></div>
        <div class="clear"></div>
      </div>
      <div class="infobox-content" :style="infobox.alertEventLayer.contentStyle">
        <!-- 事件的信息面板 -->
        <div class="alertEventLayer-content-lyr1">
          <img class="alertEventLayer-content-event-img left" :src="infobox.alertEventLayer.content.evtFileUrl">
          <div class="alertEventLayer-content-event-infolist left">
            <div class="event-infolist-item">
              <img :src="icons.miaoshuPng">
              <p :style="noMarginStyle">: {{ infobox.alertEventLayer.content.remark }}</p>
              <div class="clear"></div>
            </div>
            <div class="event-infolist-item">
              <img :src="icons.zhuangtaiPng">
              <p :style="noMarginStyle">
                : <font :style="{color:infobox.alertEventLayer.content.evtStateColor}">{{ eventStateNameMap[infobox.alertEventLayer.content.evtState] }}</font>
              </p>
              <div class="clear"></div>
            </div>
            <div class="event-infolist-item">
              <img :src="icons.timePng">
              <p :style="noMarginStyle">: {{ infobox.alertEventLayer.content.reportTime }}</p>
              <div class="clear"></div>
            </div>
            <div class="event-infolist-item">
              <img :src="icons.addressPng">
              <p :style="noMarginStyle">: {{ infobox.alertEventLayer.content.address }}</p>
              <div class="clear"></div>
            </div>
            <div class="event-infolist-item">
              <img :src="icons.laiyuanPng">
              <p :style="noMarginStyle">: {{ reportType[infobox.alertEventLayer.content.reportType] }}</p>
              <p class="clear"></p>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <!-- 事件进度列表 -->
        <div class="alertEventLayer-content-lyr2">
          <a-steps direction="vertical" :current="1">
            <a-step
              v-for="(item, index) in infobox.alertEventLayer.content.logs"
              :key="index + Math.random()"
              :title="eventLogTimeFormat(item.createTime)"
            >
              <img slot="icon" width="15px" :src="index ? icons.shijianDonePng : icons.shijianWaitingPng" alt="">
              <div slot="description">
                <div>{{ item.deptName + ' ' + item.userName +' ' + item.logTypeName }}</div>
                <div>{{ item.remark }}</div>
                <div>
                  <img :src="item.filePhotoUrl" height="100" alt="">
                  <!-- <img :src="infobox.alertEventLayer.content.evtFileUrl" height="100" alt=""> -->
                </div>
              </div>
            </a-step>
          </a-steps>
        </div>
      </div>
      <div class="infobox-foot">
        <a-button type="primary">查看详情</a-button>
        <template v-if="infobox.alertEventLayer.content.evtState == 'unAccept'">
          <a-button type="primary" class="button-cuiban" @click="openTaskPanel">事件核查</a-button>
        </template>
        <template v-if="infobox.alertEventLayer.content.evtState != 'unAccept'">
          <a-button type="primary" class="button-cuiban">催办</a-button>
        </template>
      </div>
    </div>
    <!-- 事件巡查任务 -->
    <a-modal
      centered
      v-model="infobox.alertEventLayer.other.show"
      :footer="null"
      :width="483"
    >
      <div slot="title" style="height:23px">
        <div class="left title-icon"></div>
        <div class="left title-text">事件巡查任务</div>
      </div>
      <div>
        <div class="task-panel-lyr">
          <div class="font-14 task-panel-lyr-title">期望完成时间</div>
          <a-date-picker
            showTime
            placeholder="选择时间"
            v-model="infobox.alertEventLayer.other.time"
            format="YYYY-MM-DD HH:mm:ss"
            style="width:306px;float:right"
          />
        </div>
        <div class="task-panel-lyr">
          <div class="font-14 task-panel-lyr-title">主办人</div>
          <a-select
            defaultValue=""
            style="width:306px;float:right"
            v-model="infobox.alertEventLayer.other.mainPerson"
          >
            <a-select-option v-for="p in infobox.alertEventLayer.other.list" :key="p.userName">
              {{ p.userName }}
            </a-select-option>
          </a-select>
        </div>
        <div class="task-panel-lyr">
          <div class="font-14 task-panel-lyr-title">协办人(多选)</div>
          <a-select
            mode="tags"
            style="width:306px;float:right"
            placeholder="选择协办人"
            v-model="infobox.alertEventLayer.other.subPeople"
          >
            <a-select-option v-for="p in infobox.alertEventLayer.other.list" :key="p.userName">
              {{ p.userName }}
            </a-select-option>
          </a-select>
        </div>
        <div class="task-panel-lyr" style="height: 55px;">
          <div class="font-14 task-panel-lyr-title">任务说明</div>
          <a-textarea
            v-model="infobox.alertEventLayer.other.description"
            style="width:306px;float:right"
          />
        </div>
        <div class="task-panel-lyr" style="text-align: -webkit-center;">
          <a-button type="primary" class="button-cuiban" @click="onClick_handoutTask">派发</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>

import moment from 'moment'
import dictionary from '../../../utils/dictionary'
import mapApp from './mapApp'
import 'ol/ol.css'
/**
 * 事件信息框 图标
 */
import miaoshuPng from '../../../assets/icons/map/infobox/miaoshu.png'
import zhuangtaiPng from '../../../assets/icons/map/infobox/zhuangtai.png'
import timePng from '../../../assets/icons/map/infobox/time.png'
import addressPng from '../../../assets/icons/map/infobox/address.png'
import laiyuanPng from '../../../assets/icons/map/infobox/laiyuan.png'
import shijianWaitingPng from '../../../assets/icons/map/infobox/shijian@3x.png'
import shijianDonePng from '../../../assets/icons/map/infobox/wancheng@3x.png'
import gisUtils from '../../../utils/gisUtils'
import { isEmpty } from '../../../utils/util'

const INIT_CENTER_POINT = [11453501.9292637, 2813740.344427822]
const INIT_ZOOM = 12
const defaultMapId = 'map' + Math.random()
export default {
  name: 'Map',
  props: {
    mapId: {
      type: String,
      default: defaultMapId
    },
    /**
     * 前端数据中心
     */
    dataGet: {
      type: Object,
      default: undefined
    }
  },
  data: function () {
    return {
      lakes: [
        {
          index: 0,
          name: '抚仙湖'
        },
        {
          index: 1,
          name: '星云湖'
        },
        {
          index: 2,
          name: '杞麓湖'
        }
      ],
      selectedLakeIndex: 0,
      infobox: {
        alertEventLayer: {
          style: {
            width: '600px'
          },
          contentStyle: {
            height: '423px'
          },
          show: false,
          header: {
            src: '',
            title: '-'
          },
          content: {
            evtFileUrl: ''
          },
          other: {
            list: [],
            show: false,
            time: moment(),
            mainPerson: '',
            subPeople: [],
            description: ''
          }
        }
      },
      noMarginStyle: {
        padding: 0,
        margin: 0,
        'margin-bottom': 0
      },
      icons: {
        miaoshuPng, zhuangtaiPng, timePng, addressPng, laiyuanPng, shijianWaitingPng, shijianDonePng
      },
      eventStateNameMap: dictionary.eventStateNameMap,
      eventLevelTable: dictionary.eventLevelTable,
      reportType: dictionary.reportType
    }
  },
  methods: {
    getMapApp: function () {
      return mapApp
    },
    /**
     * 切换湖的事件逻辑
     */
    onLakeSeleted: function (lake) {
      var index = lake.index
      this.selectedLakeIndex = index
      mapApp.changeLake(this.selectedLakeIndex)
    },
    /**
     * 设置infobox的数据
     */
    setInfoboxData: function (infoboxName, header, content, other) {
      this.infobox[infoboxName].header = header
      for (var key in content) {
        this.infobox[infoboxName].content[key] = content[key]
      }
      if (other) {
        this.infobox[infoboxName].other = other
      }
    },
    /**
     * 关闭infobox
     */
    closeInfo: function () {
      mapApp.closeAllInfobox()
    },
    /**
     * 事件进度中的时间格式处理
     */
    eventLogTimeFormat: function (time) {
      return moment(time, dictionary.timeFormat1).format(dictionary.timeFormat)
    },
    /**
     * 打开 事件巡查任务 面板
     */
    openTaskPanel: function () {
      this.infobox.alertEventLayer.other.show = true
      this.infobox.alertEventLayer.other.list = this.dataGet.getPeopleListForMap()
      var dealerName = this.infobox.alertEventLayer.content.dealerName
      var dd = dealerName.split(' ')
      dealerName = isEmpty(dealerName) ? '' : dd[dd.length - 1]
      this.infobox.alertEventLayer.other.mainPerson = dealerName
      this.infobox.alertEventLayer.other.description = this.createTaskDescription()
      this.infobox.alertEventLayer.other.time = moment().add(10, 'minutes')
    },
    /**
     * 创建事件任务描述
     */
    createTaskDescription: function () {
      var reportTime = this.infobox.alertEventLayer.content.reportTime
      reportTime = moment(reportTime, dictionary.timeFormat).format(dictionary.timeFormat2)
      var address = this.infobox.alertEventLayer.content.address
      var evtTypeName = this.infobox.alertEventLayer.header.title
      // 06日17:52上报在江川县XF24(环湖西路)发现执法事件事件
      var txt = reportTime + '上报在' + address + '发现' + evtTypeName + '事件'
      return txt
    },
    /**
     * 点击派发
     */
    onClick_handoutTask: function () {
      var taskPanel = this.infobox.alertEventLayer.other
      taskPanel.show = false
      console.log('onClick_handoutTask', taskPanel)
      var person = this.dataGet.findPersonByName(taskPanel.mainPerson)
      if (!person) {
        return
      }
      var AssignUsers = person.userId
      var TaskContent = taskPanel.description
      var EventInfoId = this.infobox.alertEventLayer.content.id
      var ExpectedCompletionTime = taskPanel.time.format(dictionary.timeFormat)
      var workaddress = person.Organization
      var MainHandler = taskPanel.mainPerson
      var CoOrganizer = taskPanel.subPeople.length ? taskPanel.subPeople.toLocaleString() : ''
      this.dataGet.doPostTastHandout(
        AssignUsers, TaskContent, EventInfoId, ExpectedCompletionTime, workaddress, MainHandler, CoOrganizer
      )
        .then(function (res) {
          console.log('onClick_handoutTask', res)
        }, function (err) {
          console.log('onClick_handoutTask', err)
        })
    }
  },
  mounted: function () {
    mapApp.init({
      mapId: this.mapId,
      mapZoomId: 'map-zoom',
      INIT_CENTER_POINT: INIT_CENTER_POINT,
      INIT_ZOOM: INIT_ZOOM,
      lakeIndex: 0, // 抚仙湖
      dataGet: this.dataGet,
      $map: this
    })
  }
}
</script>
<style scoped>
.main{
  position: relative;
  width: 100%;
  height: 100%;
}
.map{
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
#map-zoom{
  position: absolute;
  right: 84px;
  bottom: 100px;
}
.dropdown-div{
  position: absolute;
  width: 114px;
  height: 45px;
  left: 422px;
  top: 17px;
  background: white;
  line-height: 45px;
  text-align: center;
  border-radius: 2px;
}
.dropdown-title{
  color:rgba(99, 104, 123, 1);
  font-size: 16px;
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
.infobox{
  border-radius: 10px;
  background: white;
  box-shadow: #00000021 0px 5px 30px;
}
.infobox-header{
  width: 100%;
  height: 60px;
  padding: 0 25px;
  line-height: 60px;
  border-bottom: 1px #EBEBEB solid;
}
.infobox-header-img-left{
  width: 24px;
  height: 24px;
}
.infobox-header-title{
  color: #222328;
  font-size: 18px;
  font-weight: bold;
}
.infobox-header-close{
  width: 24px;
  height: 24px;
}
.infobox-content {
  width: 100%;
  padding: 0 25px;
}
.infobox-foot{
  text-align: center;
  width: 100%;
  height: 59px;
  padding: 0 25px;
}
.infobox-foot button{
  box-shadow:0px 5px 15px rgba(58,157,250,0.5);
}

.alertEventLayer-content-lyr1{
  height: 205px;
  border-bottom: 1px #EBEBEB solid;
  padding-top: 13px;
}
.alertEventLayer-content-event-img{
  width: 248px;
  height: 179px;
}
.alertEventLayer-content-event-infolist{
  margin-left: 18px;
  width: 284px;
  height: 179px;
}
.event-infolist-item{
  width: 100%;
  min-height: 20px;
  padding: 4px 0px;
}
.event-infolist-item img{
  width: 20px;
  height: 20px;
  float: left;
}
.event-infolist-item p{
  width: 262px;
  min-height: 20px;
  max-height: 262px;
  float: left;
}
.alertEventLayer-content-lyr2{
  height: 205px;
  border-bottom: 1px #EBEBEB solid;
  position: relative;
  overflow-y: auto;
}
.title-icon{
  width:4px;
  height: 20px;
  background: rgba(58, 157, 250, 1);
  margin-right: 14px;
}
.title-text{
  color: rgba(34, 35, 40, 1);
  font-size: 16px;
}
.font-16{
  font-size: 16px;
  color: rgba(127, 135, 174, 1);
}
.font-14{
  font-size: 14px;
  color: rgba(127, 135, 174, 1);
}
.task-panel-lyr{
  min-height: 32px;
  line-height: 32px;
  margin: 12px 0;
}
.task-panel-lyr-title{
  float: left;
  width: 100px;
}
.task-panel-lyr-content{
  width: 306px;
  float:right;
}
.button-cuiban{
  width: 88px;
  margin: 0 21px;
}
.task-panel-lyr button{
  box-shadow:0px 5px 15px rgba(58,157,250,0.5);
}
</style>
