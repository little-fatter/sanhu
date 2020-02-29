import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
// import WMTS from 'ol/source/WMTS'
// import WMTSTileGrid from 'ol/tilegrid/WMTS'
import TileWMS from 'ol/source/TileWMS'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { GeoJSON } from 'ol/format'
import { buffer as extentBuffer, getHeight as getExtentHeight } from 'ol/extent'

import styleTable from './styleTable'

import M_HM_FXH from './data/M_HM_FXH.json'
import M_HM_XYH from './data/M_HM_XYH.json'
import M_HM_QLH from './data/M_HM_QLH.json'
const lakeJsons = [M_HM_FXH, M_HM_XYH, M_HM_QLH]
// const WMS_URL = 'http://14.205.92.142:8090/iserver/services/map-jichudili/wms130/%E5%9F%BA%E7%A1%80%E5%9C%B0%E7%90%86%E5%9B%BE%E5%B1%82_blue'
const WMS_URL = 'http://14.205.92.142:8090/iserver/services/map-jichudili/wms130/%E5%9F%BA%E7%A1%80%E5%9C%B0%E7%90%86%E5%9B%BE%E5%B1%82_white'
export default {
  map: {},
  view: {},
  layers: [],
  option: {},
  init: function (option) {
    this.option = option
    this.initLayers()
    this.initMap()
  },
  initMap: function () {
    this.view = new View({
      center: this.option.INIT_CENTER_POINT,
      zoom: this.option.INIT_ZOOM
    })
    this.map = new Map({
      target: this.option.mapId,
      layers: this.layers,
      view: this.view
    })

    this.zoomToLake()

    // this.map.on('singleclick', function (e) {
    //   console.log('singleclickMap', e.coordinate)
    // })

    // this.initSelect()
  },
  initLayers: function () {
    // 底图
    var baseLayer = new TileLayer({
      source: new TileWMS({
        url: WMS_URL,
        params: {
          LAYERS: '0'
        }
      }),
      name: 'baseLayer'
    })
    this.layers.push(baseLayer)

    // 湖
    var lakeJson = lakeJsons[this.option.lakeIndex]
    var lakeLayer = new VectorLayer({
      source: new VectorSource({
        features: new GeoJSON().readFeatures(lakeJson, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        })
      }),
      style: (f) => styleTable.lakeStyle(f),
      name: 'lakeLayer'
    })
    this.layers.push(lakeLayer)
  },
  zoomToLake: function () {
    var lakeLayer = this.findLayer('lakeLayer')
    var lakeSource = lakeLayer.getSource()
    var ex = lakeSource.getExtent()
    ex = extentBuffer(ex, getExtentHeight(ex) * 0.1)
    this.view.fit(ex, { duration: 1000 })
  },
  zoomToExtent: function (extent) {
    var ex = extentBuffer(extent, getExtentHeight(extent) * 0.1)
    this.view.fit(ex, { duration: 1000 })
  },
  findLayer: function (name) {
    for (let i = 0; i < this.layers.length; i++) {
      const lyr = this.layers[i]
      if (lyr.get('name') === name) {
        return lyr
      }
    }
    return undefined
  }
}
