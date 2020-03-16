<template>

  <div :style="divStyle">
    <Map
      ref="map1"
      :dataGet="dataGet"
    />
    <events-count
      class="my-events-count border-radius box-shadow-style"
      ref="myEventsCount"
      v-show="show1"
      :dataGet="dataGet"
    />
    <events-list
      class="my-alert-event-list border-radius box-shadow-style"
      ref="myAlertEventList"
      v-show="show1"
      :dataGet="dataGet"
    />
    <people-list
      class="my-person-list border-radius box-shadow-style"
      ref="myPeopleList"
      :dataGet="dataGet"
    ></people-list>
  </div>
</template>

<script>
import Map from '../../components/mapComponents/Map/Map.vue'
import EventsCount from '../../components/mapComponents/EventsCount/EventsCount.vue'
import EventsList from '../../components/mapComponents/EventsList/EventsList.vue'
import PeopleList from '../../components/mapComponents/PeopleList/PeopleList.vue'
import dataGet from './dataGet'

export default {
  name: 'MapV',
  components: { Map, EventsCount, EventsList, PeopleList },
  data: function () {
    return {
      mapId: 'map1',
      size: {
        width: 500,
        height: 500
      },
      show1: true, // 为了演示,去掉不展示的部分
      dataGet: dataGet
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
    getMapApp: function () {
      var mapApp = this.$refs.map1.getMapApp()
      return mapApp
    },
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
    /**
     * 清空地图中的选中要素
     */
    clearSelection: function () {
      var mapApp = this.$refs.map1.getMapApp()
      mapApp.clearSelection()
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
      that.$nextTick(() => {
        // const map1 = that.$refs.map1
        // map1.updateSize()
      })
    })
    dataGet.initData(() => {
      var mapApp = this.getMapApp()
      mapApp.updateAlertEventLayer()
      mapApp.updatePeopleLayer()

      var myEventsCount = this.$refs.myEventsCount
      myEventsCount.updataCountList()

      var myAlertEventList = this.$refs.myAlertEventList
      myAlertEventList.setMapApp(mapApp)
      myAlertEventList.updateAlertEventList()

      var myPeopleList = this.$refs.myPeopleList
      myPeopleList.updatePersonList()
    })
    document['dataGet'] = dataGet
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
