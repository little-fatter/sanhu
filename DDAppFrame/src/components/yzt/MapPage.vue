<template>
  <div class="main">
    <div :id="mapId" class="map"></div>
    <div :id="mapZoomId" class="map-zoom"></div>
    <div class="alert-event-infobox">
      <alert-event-infobox
        ref="alertEventInfobox"
        :afterClose="afterAlertInfoboxClose"
      />
    </div>
    <div class="tool-div">
      <van-grid :border="true" column-num="1">
        <van-grid-item
          :icon="imgs.iconFanwei"
          text="范围"
          @click="onFanweiClick"
        />
        <van-grid-item
          :icon="imgs.iconGuiji"
          text="轨迹"
        />
        <van-grid-item
          :icon="imgs.iconDingwei"
          text="定位"
          @click="onDingweiClick"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import AlertEventInfobox from './AlertEventInfobox'
import mapApp from './mapApp'
import 'ol/ol.css'
import iconFanwei from '../../assets/icons/yzt/ditu@2x.png'
import iconGuiji from '../../assets/icons/yzt/guiji@2x.png'
import iconDingwei from '../../assets/icons/yzt/dingwei@2x.png'
var _mapId = 'map-' + new Date() * 1
var _mapZoomId = 'map-zoom' + new Date() * 1
const INIT_CENTER_POINT = [11453501.9292637, 2813740.344427822]
const INIT_ZOOM = 12
export default {
  name: 'MapPage',
  components: {
    AlertEventInfobox
  },
  props: {
  },
  data () {
    return {
      mapId: _mapId,
      mapZoomId: _mapZoomId,
      imgs: {
        iconFanwei: iconFanwei,
        iconGuiji: iconGuiji,
        iconDingwei: iconDingwei
      }
    }
  },
  created () {

  },
  methods: {
    getMapApp: function () {
      return mapApp
    },
    init: function () {
      mapApp.init({
        mapId: this.mapId,
        mapZoomId: this.mapZoomId,
        INIT_CENTER_POINT: INIT_CENTER_POINT,
        INIT_ZOOM: INIT_ZOOM,
        lakeIndex: 0, // 抚仙湖
        // afterPeopleFeatureClick: this.afterPeopleFeatureClick,
        afterAlertFeatureClick: this.afterAlertFeatureClick
      // afterEquipmentFeatureClick: this.afterEquipmentFeatureClick,
      // afterShipFeatureClick: this.afterShipFeatureClick
      })

      // 定位
      // mapApp.startLocationGetter()
      mapApp.updateLocationPoint()
    },
    afterAlertFeatureClick: function (feature) {
      if (feature) {
        var location = mapApp.getLocation()
        var properties = feature.getProperties()
        var aLcoation = properties['location']
        var distance = mapApp.computeDistance(location, aLcoation, true)
        this.$refs.alertEventInfobox.open({
          id: properties.id,
          name: properties.title,
          status: properties.status, // 处理状态
          des: properties.remark, // 事件描述
          uploadTime: properties.uploadTime, // 上报时间
          addr: properties.address, // 事发地点
          uploadSource: 'AI摄像头识别',
          distance: distance// 距离当前位置多少
        })
      } else {
        this.$refs.alertEventInfobox.close()
      }
    },
    /**
     * 清空地图中的选中要素
     */
    clearSelection: function () {
      var mapApp = this.getMapApp()
      mapApp.clearSelection()
    },
    afterAlertInfoboxClose: function () {
      this.clearSelection()
    },
    onDingweiClick: function () {
      var mapApp = this.getMapApp()
      mapApp.updateLocationPoint()
    },
    onFanweiClick: function () {
      var mapApp = this.getMapApp()
      mapApp.zoomToLake()
    }
  },
  mounted: function () {

  }
}
</script>

<style scoped>
.main{
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.map{
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.map-zoom{
  position: absolute;
  right: 84px;
  bottom: 100px;
  /* z-index: 999; */
}
.alert-event-infobox{
  position: absolute;
  width: 100%;
  bottom: 0%;
}
.tool-div{
  position: absolute;
  left: 0.2rem;
  bottom: 0.2rem;
  width: 1.2rem;
}
</style>
