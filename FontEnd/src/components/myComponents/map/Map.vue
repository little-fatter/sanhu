<template>
  <div class="main">
    <div :id="[mapId]" class="map" :style="mapStyle"></div>
    <div class="dropdown-div" >
      <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link dropdown-title">{{ lakes[selectedLakeIndex].name }}<a-icon type="down"/></a>
        <a-menu slot="overlay">
          <a-menu-item :key="lake.index" v-for="lake in lakes" @click="onLakeSeleted(lake)">{{ lake.name }}</a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <div id="map-zoom"></div>
  </div>
</template>

<script>
import mapApp from './mapApp'
import 'ol/ol.css'

const defaultMapId = 'map' + Math.random()
const defaultMapW = '100%'
const defaultMapH = '100%'
const INIT_CENTER_POINT = [11453501.9292637, 2813740.344427822]
const INIT_ZOOM = 12

export default {
  name: 'Map',
  props: {
    mapId: {
      type: String,
      default: defaultMapId
    },
    mapWidth: {
      type: Number,
      default: defaultMapW
    },
    mapHeight: {
      type: Number,
      default: defaultMapH
    },
    afterPeopleFeatureClick: {
      type: Function,
      default: undefined
    },
    afterAlertFeatureClick: {
      type: Function,
      default: undefined
    },
    afterEquipmentFeatureClick: {
      type: Function,
      default: undefined
    },
    afterShipFeatureClick: {
      type: Function,
      default: undefined
    }
  },
  data: () => {
    return {
      size: {
        width: 500,
        height: 500
      },
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
      selectedLakeIndex: 0
    }
  },
  computed: {
    mapStyle: function () {
      return {
        // width: this.size.width + 'px',
        // height: this.size.height + 'px'
      }
      // return {
      //   width: '100%',
      //   height: '100%'
      // }
    },
    lakeSelectDivStyle: function () {
      return {
        width: '114px',
        height: '45px'
      }
    }
  },
  methods: {
    updateSize: function (size) {
      this.size.width = size.width
      this.size.height = size.height
    },
    changeLake: function () {
      mapApp.changeLake(this.selectedLakeIndex)
    },
    onLakeSeleted: function (lake) {
      var index = lake.index
      this.selectedLakeIndex = index
      this.changeLake()
    },
    getMapApp: function () {
      return mapApp
    }
  },
  created: function () {
    this.size.width = this.mapWidth
    this.size.height = this.mapHeight
  },
  mounted: function () {
    mapApp.init({
      mapId: this.mapId,
      mapZoomId: 'map-zoom',
      INIT_CENTER_POINT: INIT_CENTER_POINT,
      INIT_ZOOM: INIT_ZOOM,
      lakeIndex: 0, // 抚仙湖
      afterPeopleFeatureClick: this.afterPeopleFeatureClick,
      afterAlertFeatureClick: this.afterAlertFeatureClick,
      afterEquipmentFeatureClick: this.afterEquipmentFeatureClick,
      afterShipFeatureClick: this.afterShipFeatureClick
    })
    document['mapApp'] = mapApp
    document['map__'] = this

    const that = this
    var preSizeW = this.size.width
    var preSizeH = this.size.height
    setInterval(function () {
      var w = that.$el.clientWidth
      var h = that.$el.clientHeight
      if (w !== preSizeW || h !== preSizeH) {
        mapApp.updateSize()
        preSizeW = w
        preSizeH = h
      }
    }, 100)
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
</style>
