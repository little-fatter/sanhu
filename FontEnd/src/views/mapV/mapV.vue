<template>

  <div :style="divStyle">
    <Map
      mapId="map1"
      :mapWidth="size.width"
      :mapHeight="size.height"
      ref="map1"
      :afterPeopleFeatureClick="afterPeopleFeatureClick"
      :afterAlertFeatureClick="afterAlertFeatureClick"
      :afterEquipmentFeatureClick="afterEquipmentFeatureClick"
      :afterShipFeatureClick="afterShipFeatureClick"
    />
    <my-layer-manager
      class="layerManager border-radius box-shadow-style"
      :afterItemClick="afterLayerItemClick"
      :afterLayerItemSubChange="afterLayerItemSubChange"
      ref="myLayerManager"
    />
    <my-events-count
      class="my-events-count border-radius box-shadow-style"
      ref="myEventsCount"
    />
    <my-alert-event-list
      class="my-alert-event-list border-radius box-shadow-style"
      :aftetItemClick="afterAlertListItemClick"
      ref="myAlertEventList"
    />
    <my-person-list
      class="my-person-list border-radius box-shadow-style"
      ref="personList"
      :afterPeopleListItemClick="afterPeopleListItemClick"
      :afterEquipmentListItemClick="afterEquipmentListItemClick"
      :afterClickOpenVideo="openVideo"
      :afterClickOpenVoice="openVoice"
      :afterClickOpenPhone="openPhone"
    />
    <people-info-box
      class="my-people-info-box border-radius box-shadow-style"
      ref="peopleInfoBox"
      :afterClickOpenVideo="openVideo"
      :afterClickOpenVoice="openVoice"
      :afterClickOpenPhone="openPhone"
      :afterClose="clearSelection"
    />
    <my-alert-info-box
      class="my-alert-info-box border-radius box-shadow-style"
      :dataGet="getDataGetObject()"
      ref="myAlertInfoBox"
      :afterClose="clearSelection"
    />
    <my-equipment-info-box
      class="my-equipment-info-box border-radius box-shadow-style"
      ref="myEquipmentInfoBox"
      :afterClose="clearSelection"
    />
    <my-ship-info-box
      class="my-ship-info-box border-radius box-shadow-style"
      ref="myShipInfoBox"
      :afterClose="clearSelection"
    />
    <my-video-chat
      class=" border-radius box-shadow-style"
      ref="myVideoChat"
    />
    <my-voice-chat
      class=" border-radius box-shadow-style"
      ref="myVoiceChat"
    />
    <my-phone-chat
      class=" border-radius box-shadow-style"
      ref="myPhoneChat"
    />
  </div>
</template>

<script>
import Map from '@/components/myComponents/map/Map'
import MyPageHeader from '@/components/myComponents/MyPageHeader'
import myLayerManager from '@/components/myComponents/myLayerManager'
import myEventsCount from '@/components/myComponents/myEventsCount'
import myAlertEventList from '@/components/myComponents/myAlertEventList'
import myPersonList from '@/components/myComponents/myPersonList'
import PeopleInfoBox from '@/components/myComponents/myInfoBox/PeopleInfoBox.vue'
import MyAlertInfoBox from '@/components/myComponents/myInfoBox/MyAlertInfoBox.vue'
import MyEquipmentInfoBox from '@/components/myComponents/myInfoBox/MyEquipmentInfoBox.vue'
import MyShipInfoBox from '@/components/myComponents/myInfoBox/MyShipInfoBox.vue'
import MyVideoChat from '@/components/myComponents/myChat/MyVideoChat.vue'
import MyVoiceChat from '@/components/myComponents/myChat/MyVoiceChat.vue'
import MyPhoneChat from '@/components/myComponents/myChat/MyPhoneChat.vue'

import dataGet from './dataGet'
import appConfig from '../../config/app.config'
var ZOOM_TO_POINT_RADIUS = appConfig.MapOption.ZOOM_TO_POINT_RADIUS
export default {
  name: 'MapV',
  components: { Map, MyPageHeader, myLayerManager, myEventsCount, myAlertEventList, myPersonList, PeopleInfoBox, MyVideoChat, MyVoiceChat, MyPhoneChat, MyAlertInfoBox, MyEquipmentInfoBox, MyShipInfoBox },
  data: function () {
    return {
      mapId: 'map1',
      size: {
        width: 500,
        height: 500
      }
    }
  },
  computed: {
    divStyle: function () {
      return {
        // width: this.size.width + 'px',
        // height: this.size.height + 'px',
        width: '100%',
        height: '100%',
        position: 'relative'
      }
    }
  },
  methods: {
    getDataGetObject: function () {
      return dataGet
    },
    getFullSize: function () {
      var w = document.body.clientWidth < this.size.width ? document.body.clientWidth + 17 : document.body.clientWidth
      var h = document.body.clientHeight < this.size.height ? document.body.clientHeight + 17 : document.body.clientHeight
      return {
        width: w,
        height: h
      }
    },
    afterLakeSeleted: function (lake) {
      this.$refs.map1.changeLake(lake)
    },
    afterLayerItemClick: function (layerItem) {
      console.log('afterLayerItemClick', layerItem)
      var mapApp = this.$refs.map1.getMapApp()
      mapApp.changeLayerShow(layerItem)
    },
    afterLayerItemSubChange: function (layerItem) {
      console.log('afterItemSubChange', layerItem)
      var mapApp = this.$refs.map1.getMapApp()
      mapApp.changeLayerShow(layerItem)
    },
    afterPeopleFeatureClick: function (fea) {
      if (fea) {
        var properties = fea.getProperties()
        this.$refs.peopleInfoBox.open({
          id: properties.id,
          name: properties.name,
          dep: properties.dep,
          region: properties.region,
          phone: properties.phone,
          avatar: appConfig.StaticWebContext + '/img/yzt-renyuanceng/user.png',
          online: true
        })
      } else {
        this.$refs.peopleInfoBox.close()
      }
    },
    afterAlertFeatureClick: function (fea) {
      if (fea) {
        var properties = fea.getProperties()
        this.$refs.myAlertInfoBox.open({
          id: properties.id,
          name: properties.title,
          status: properties.status, // 处理状态
          des: properties.remark, // 事件描述
          uploadTime: properties.uploadTime, // 上报时间
          addr: properties.address, // 事发地点
          uploadSource: 'AI摄像头识别'
        })
      } else {
        this.$refs.myAlertInfoBox.close()
      }
    },
    afterEquipmentFeatureClick: function (fea) {
      var mapApp = this.$refs.map1.getMapApp()
      if (fea) {
        var properties = fea.getProperties()
        // {typeIndex: 0, name: "摄像头xxx", online: true, location: Array(2)}
        var type = properties.typeIndex// 0-摄像头，1-无人机
        var online = properties.online
        if (type === 0) {
          type = 2 // 2-摄像头
        } else if (online) {
          type = 0 // 0-在飞无人机
        } else {
          type = 1 // 1-待飞无人机
        }
        this.$refs.myEquipmentInfoBox.open({
          type: type,
          name: properties.name,
          height: 23,
          loc: mapApp.toLonlat(properties.location)
        })
      } else {
        this.$refs.myEquipmentInfoBox.close()
      }
    },
    afterShipFeatureClick: function (fea) {
      var mapApp = this.$refs.map1.getMapApp()
      if (fea) {
        var properties = fea.getProperties()
        var type = fea.getProperties().type
        type = type === 0 ? '渔船' : '游船'
        this.$refs.myShipInfoBox.open({
          name: properties.name,
          type: type,
          loc: mapApp.toLonlat(properties.location)
        })
      } else {
        this.$refs.myShipInfoBox.close()
      }
    },
    openVideo: function (info) {
      this.$refs.myVideoChat.open(info)
    },
    openVoice: function (info) {
      this.$refs.myVoiceChat.open(info)
    },
    openPhone: function (info) {
      this.$refs.myPhoneChat.open(info)
    },
    /**
     * 清空地图中的选中要素
     */
    clearSelection: function () {
      var mapApp = this.$refs.map1.getMapApp()
      mapApp.clearSelection()
    },
    afterAlertListItemClick: function (item) {
      var mapApp = this.$refs.map1.getMapApp()
      mapApp.clearSelection()
      var feature = mapApp.findFeatureByLayerNameAndFeatureId('alertEventLayer', item['id'])
      feature && mapApp.selectFeature('alertEventLayerSelectClick', feature)
      mapApp.zoomToPoint(feature.getGeometry().getCoordinates(), ZOOM_TO_POINT_RADIUS)
    },
    afterPeopleListItemClick: function (item) {
      var mapApp = this.$refs.map1.getMapApp()
      mapApp.clearSelection()
      var feature = mapApp.findFeatureByLayerNameAndFeatureId('peopleLayer', item['id'])
      feature && mapApp.selectFeature('peopleLayerSelectClick', feature)
    },
    afterEquipmentListItemClick: function (item) {
      var mapApp = this.$refs.map1.getMapApp()
      mapApp.clearSelection()
      var feature = mapApp.findFeatureByLayerNameAndFeatureId('equipmentLayer', item['id'])
      feature && mapApp.selectFeature('equipmentLayerSelectClick', feature)
    },
    afterShipListItemClick: function (item) {
      var mapApp = this.$refs.map1.getMapApp()
      var feature = mapApp.findFeatureByLayerNameAndFeatureId('shipLayer', item['id'])
      feature && mapApp.selectFeature('shipLayerSelectClick', feature)
    }
  },
  created: function () {
    this.size.width = document.body.clientWidth
    this.size.height = document.body.clientHeight
  },
  mounted: function () {
    document.body.style.overflowY = 'hidden'
    var that = this
    document['mapv'] = that
    window.addEventListener('resize', function () {
      that.size = that.getFullSize()
      // var mapSize = {
      //   width: that.size.width,
      //   height: that.size.height - 90
      // }
      that.$refs.map1.updateSize()
    })
    dataGet.initData(() => {
      var $personList = this.$refs.personList
      var mapApp = this.$refs.map1.getMapApp()
      $personList.updatePersonList(dataGet.getPeopleList())

      mapApp.updatePeopleLayer($personList.getPersonList())
      mapApp.updateEquipmentLayer($personList.getEquipmentList())

      this.$refs.myAlertEventList.updateAlertEventList(dataGet.getAlertEventList())
      mapApp.updateAlertEventLayer(this.$refs.myAlertEventList.getAlertEventList())
      this.$refs.myEventsCount.updataCountList(this.$refs.myAlertEventList.getCountList())
    })
  }
}
</script>

<style scoped>
.main{
  position: relative;
}
.layout1{
  width: 100%;
  height: 100%;
}
.header1{
  height: 90px;
  background-color: white;
}
.layerManager{
  position:absolute;
  z-index: 9999;
  left: 50%;
  margin-left: -345px;
  top: 17px;
  border: none;
}
.my-events-count{
  position: absolute;
  top: 17px;
  left: 32px;
  background-color: white;
  width: 360px;
  border-radius: 2px;
}
.my-alert-event-list{
  position: absolute;
  top: 158px;
  left: 32px;
  background-color: white;
  width: 360px;
  border-radius: 2px;
  bottom: 10px;
}
.my-person-list{
  position: absolute;
  top: 17px;
  bottom: 10px;
  right: 32px;
  background-color: white;
  width: 360px;
  /* height: 855px; */
  border-radius: 2px;
}
.my-people-info-box{
  position: absolute;
  bottom: 340px;
  right: 400px;
  background-color: white;
  width: 360px;
  border-radius: 2px;
}
.my-people-info-box{
  position: absolute;
  bottom: 340px;
  right: 400px;
  background-color: white;
  width: 360px;
  border-radius: 2px;
}
.my-alert-info-box{
  position: absolute;
  bottom: 340px;
  right: 400px;
  background-color: white;
  width: 360px;
  border-radius: 2px;
}
.my-equipment-info-box{
  position: absolute;
  bottom: 102px;
  right: 400px;
  background-color: white;
  width: 530px;
  border-radius: 2px;
}
.my-ship-info-box{
  position: absolute;
  bottom: 102px;
  right: 400px;
  background-color: white;
  width: 530px;
  border-radius: 2px;
}
.box-shadow-style{
  box-shadow: #00000021 0px 5px 30px;
}
.border-radius{
  border-radius: 5px;
}
</style>
