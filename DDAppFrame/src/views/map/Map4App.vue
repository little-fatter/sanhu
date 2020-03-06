<template>
  <div class="main-div" :style="mainStyle">
    <map-page class="map-div" ref="mapPage"></map-page>
    <div class="alert-events-count">
      <alert-events-count ref="alertEventsCount"/>
    </div>
    <div class="layerManager-div">
      <layer-manager/>
    </div>
  </div>
</template>
<script>
import MapPage from '../../components/yzt/MapPage'
import AlertEventsCount from '../../components/yzt/AlertEventsCount'
import LayerManager from '../../components/yzt/LayerManager'
import dataGet from './dataGet'

function after (exec, ms) {
  var ____id = setInterval(() => {
    clearInterval(____id)
    exec && exec()
  }, ms)
}

export default {
  name: 'Map4App',
  components: { MapPage, AlertEventsCount, LayerManager },
  data: function () {
    return {
      mainStyle: {
        width: '500px',
        height: '500px'
      }
    }
  },
  computed: {

  },
  methods: {
    getMapApp: function () {
      return this.$refs.mapPage.getMapApp()
    },
    initData: function (callback) {
      var mapApp = this.getMapApp()
      mapApp.updateAlertEventLayer(dataGet.getAlertEventList())
      this.$refs.alertEventsCount.updataCountList(dataGet.getCountList())
    }
  },
  created: function () {
  },
  mounted: function () {
    var html = document.querySelector('html')
    html.style.width = '100%'
    html.style.height = '100%'
    document.body.style.width = '100%'
    document.body.style.height = '100%'
    document.body.style.overflow = 'hidden'
    var that = this
    after(function () {
      that.mainStyle.width = document.body.offsetWidth + 'px'
      that.mainStyle.height = document.body.offsetHeight + 'px'
      after(function () {
        that.$refs.mapPage.init()
        dataGet.initData(function () {
          that.initData()
        })
      }, 200)
    }, 200)
  }
}
</script>
<style scoped>
.main-div{
    position: relative;
    /* width: 100%;
    height: 100%; */
    padding: 0;
    margin: 0;
    overflow: hidden;
}
.map-div{
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
}
.alert-events-count{
    position: absolute;
    width: 100%;
    height: 80px;
    padding: 0;
    margin: 0;
    top: 12px;
}
.layerManager-div{
    position: absolute;
    padding: 0;
    margin: 0;
    top: 0;
    right: 0.2rem;
    /* height: 100%; */
}
</style>
