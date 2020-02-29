<template>
  <div class="main">
    <div id="map" class="map"></div>
    <div class="top-div">
      <a-list :bordered="true" :grid="{ gutter: 2, column: 4 }" :dataSource="topData">
        <a-list-item slot="renderItem" slot-scope="item" :extra="item.title">
          <a-list-item-meta >
            <a-avatar slot="avatar" shape="square" :size="40" :style="item.style">{{ item.count }}</a-avatar>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
    <div class="right-div">
      <a-list :bordered="true" :dataSource="rightData">
        <a-list-item slot="renderItem" slot-scope="item" :extra="item.title">
          <a-list-item-meta >
            <a-avatar slot="avatar" shape="square" :size="25" :style="item.style"></a-avatar>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>
<script>
import mapApp4Mobile from './mapApp4Mobile'
import 'ol/ol.css'

const INIT_CENTER_POINT = [11453501.9292637, 2813740.344427822]
const INIT_ZOOM = 12
export default {
  name: 'MapForMobile',
  data: function () {
    return {
      topData: [
        {
          count: 0,
          title: '告警',
          style: {
            'background-color': 'white',
            color: 'rgba(58, 157, 250, 1)',
            'font-size': '28px'
          }
        },
        {
          count: 3,
          title: '处理中',
          style: {
            'background-color': 'white',
            color: 'rgba(249, 223, 95, 1)',
            'font-size': '28px'
          }
        },
        {
          count: 4,
          title: '未完成',
          style: {
            'background-color': 'white',
            color: 'rgba(255, 132, 5, 1)',
            'font-size': '28px'
          }
        },
        {
          count: 1,
          title: '处理超时',
          style: {
            'background-color': 'white',
            color: 'rgba(246, 93, 77, 1)',
            'font-size': '28px'
          }
        }
      ],
      rightData: [
        {
          title: '水质',
          layerName: 'water',
          active: false
        },
        {
          title: '气象',
          layerName: 'meteorological',
          active: false
        },
        {
          title: '空气',
          layerName: 'air',
          active: false
        },
        {
          title: '污染',
          layerName: 'pollute',
          active: false
        },
        {
          title: '执法',
          layerName: 'law',
          active: true
        },
        {
          title: '土壤',
          layerName: 'soil',
          active: false
        }
      ]
    }
  },
  methods: {},
  mounted: function () {
    // this.$el.parentElement.style
    this.mapApp = mapApp4Mobile
    this.mapApp.init({
      mapId: 'map',
      INIT_CENTER_POINT: INIT_CENTER_POINT,
      INIT_ZOOM: INIT_ZOOM,
      lakeIndex: 0
    })
  },
  created: function () {}
}
</script>
<style scoped>

.main{
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
.map{
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
.top-div{
    position: absolute;
    top: 10px;
    background-color: white;
    left: 50%;
    margin-left: -207px;
    /* width: 100%;
    height: 100%;
    margin: 0;
    padding: 0; */
}
.right-div{
    position: absolute;
    top: 105px;
    right: 0;
    background-color: white;
    /* width: 100%;
    height: 100%;
    margin: 0;
    padding: 0; */
}
</style>
