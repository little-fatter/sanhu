import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
// import OSM from 'ol/source/OSM'
import TileWMS from 'ol/source/TileWMS'
import WMTS from 'ol/source/WMTS'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { GeoJSON } from 'ol/format'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { click } from 'ol/events/condition'
import Select from 'ol/interaction/Select'
import { fromLonLat, toLonLat, get as getProjection } from 'ol/proj'
import { defaults as defaultControls, Zoom } from 'ol/control'
import { buffer as extentBuffer, getHeight as getExtentHeight, getWidth, getTopLeft } from 'ol/extent'
import { point, toWgs84, toMercator, buffer, bbox } from '@turf/turf'
import * as dd from 'dingtalk-jsapi'

import styleTable from './styleTable'

import M_HM_FXH from './data/M_HM_FXH.json'
import M_HM_XYH from './data/M_HM_XYH.json'
import M_HM_QLH from './data/M_HM_QLH.json'
const lakeJsons = [M_HM_FXH, M_HM_XYH, M_HM_QLH]
const WMS_URL = 'http://14.205.92.142:8090/iserver/services/map-jichudili/wms130/%E5%9F%BA%E7%A1%80%E5%9C%B0%E7%90%86%E5%9B%BE%E5%B1%82_white'

function createTdtLayer () {
  var projection = getProjection('EPSG:3857')
  var projectionExtent = projection.getExtent()
  var size = getWidth(projectionExtent) / 256
  var resolutions = new Array(18)
  var matrixIds = new Array(18)
  for (var z = 1; z < 19; ++z) {
    // generate resolutions and matrixIds arrays for this WMTS
    resolutions[z] = size / Math.pow(2, z)
    matrixIds[z] = z
  }

  var webKey = 'fca2dd0a5d97b284fe802d646ad6430c'

  var wmtsUrl1 = 'http://t{0-7}.tianditu.gov.cn/vec_w/wmts?tk=' // 矢量底图
  var wmtsUrl2 = 'http://t{0-7}.tianditu.gov.cn/cva_w/wmts?tk=' // 矢量注记

  var layer = new TileLayer({
    source: new WMTS({
      url: wmtsUrl1 + webKey,
      layer: 'vec',
      matrixSet: 'w',
      format: 'tiles',
      style: 'default',
      projection: projection,
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(projectionExtent),
        resolutions: resolutions,
        matrixIds: matrixIds
      }),
      wrapX: true
    }),
    name: 'tdt_vec_w'
  })
  var layer1 = new TileLayer({
    source: new WMTS({
      url: wmtsUrl2 + webKey,
      layer: 'vec',
      matrixSet: 'w',
      format: 'tiles',
      style: 'default',
      projection: projection,
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(projectionExtent),
        resolutions: resolutions,
        matrixIds: matrixIds
      }),
      wrapX: true
    }),
    name: 'tdt_cva_w'
  })
  return [layer, layer1]
}

export default {
  map: {},
  view: {},
  layers: [],
  selects: {},
  option: {},
  currentLocation: undefined,
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
      view: this.view,
      controls: defaultControls({
        zoom: false,
        rotate: false,
        attribution: false
      }).extend([
        new Zoom({
          target: this.option.mapZoomId
        })
      ])
    })

    this.zoomToLake()

    this.map.on('singleclick', function (e) {
      console.log('singleclickMap', toLonLat(e.coordinate))
    })

    this.initSelects()
  },
  initLayers: function () {
    // // osm
    // this.layers.push(new TileLayer({
    //   source: new OSM(),
    //   name: 'osm',
    //   zIndex: 0
    // }))
    var tdtVecLayers = createTdtLayer()
    this.layers.push(...tdtVecLayers)

    // 底图
    // var baseLayer = new TileLayer({
    //   source: new TileWMS({
    //     url: WMS_URL,
    //     params: {
    //       LAYERS: '0'
    //     }
    //   }),
    //   name: 'baseLayer',
    //   zIndex: 1
    // })
    // this.layers.push(baseLayer)

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
      name: 'lakeLayer',
      zIndex: 2
    })
    this.layers.push(lakeLayer)
    // 事件
    var alertEventLayer = new VectorLayer({
      source: new VectorSource(),
      style: (f) => styleTable.alertEventStyle(f),
      zIndex: 8,
      name: 'alertEventLayer'
    })
    this.layers.push(alertEventLayer)
    // 当前位置
    var locationSource = new VectorSource()
    var locationLayer = new VectorLayer({
      source: locationSource,
      style: (f) => styleTable.locationLayerStyle(f),
      zIndex: 9,
      name: 'locationLayer'
    })
    this.layers.push(locationLayer)
  },
  initSelects: function () {
    var that = this
    // 事件图层的select 事件
    var alertEventLayerSelectClick = new Select({
      condition: click,
      layers: [this.findLayer('alertEventLayer')],
      style: (f) => styleTable.alertEventSelectedStyle(f)
    })
    this.map.addInteraction(alertEventLayerSelectClick)
    alertEventLayerSelectClick.on('select', function (e) {
      if (e.selected.length < 1) {
        that.onAlertFeatureClick()
      } else {
        var featureSelected = e.selected[0]
        that.onAlertFeatureClick(featureSelected)
      }
    })
    this.selects['alertEventLayerSelectClick'] = alertEventLayerSelectClick
  },
  updateAlertEventLayer: function (alertList) {
    var layer = this.findLayer('alertEventLayer')
    var source = layer.getSource()
    source.clear()
    for (let i = 0; i < alertList.length; i++) {
      const a = alertList[i]
      var fea = new Feature({
        geometry: new Point(fromLonLat(a.location)),
        name: a.name
      })
      fea.setProperties(a)
      source.addFeature(fea)
    }
  },
  onAlertFeatureClick: function (f) {
    console.log('onAlertFeatureClick', f)
    if (this.option.afterAlertFeatureClick) {
      this.option.afterAlertFeatureClick(f)
    }
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
  },
  clearSelection: function () {
    for (var k in this.selects) {
      const element = this.selects[k]
      element.getFeatures && element.getFeatures().clear()
    }
    var pathLayer = this.findLayer('pathLayer')
    pathLayer && pathLayer.getSource && pathLayer.getSource().clear()
    var regionLayer = this.findLayer('regionLayer')
    regionLayer && regionLayer.getSource && regionLayer.getSource().clear()
  },
  getLocationPoint: function () {
    return this.currentLocation || [102.93463901545003, 24.516677469777704]
  },
  updateLocationPoint: function () {
    var that = this
    this.getLocationOnceFromDevice(function () {
      var locationLayer = that.findLayer('locationLayer')
      var locationSource = locationLayer.getSource()
      locationSource.clear()
      var feature = new GeoJSON()
        .readFeature(
          point([that.currentLocation.longitude, that.currentLocation.latitude]), {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
          })
      locationSource.addFeature(feature)
      that.zoomToPoint(feature.getGeometry().getCoordinates(), 5)
    }, function () {})
  },
  toLonLat: function (p) {
    return toLonLat(p)
  },
  fromLonLat: function (p) {
    return fromLonLat(p)
  },
  computeDistance: function (p1, p2, isLonLat) {
    var x1, x2, y1, y2
    if (isLonLat) {
      var _p1 = fromLonLat(p1)
      var _p2 = fromLonLat(p2)
      x1 = _p1[0]
      y1 = _p1[1]
      x2 = _p2[0]
      y2 = _p2[1]
    } else {
      x1 = p1[0]
      y1 = p1[1]
      x2 = p2[0]
      y2 = p2[1]
    }
    var dx = x2 - x1
    var dy = y2 - y1
    return Math.sqrt(dx * dx + dy * dy)
  },
  getLocationOnceFromDevice: function (a, b) {
    var that = this
    dd.device.geolocation.get({
      targetAccuracy: 200,
      coordinate: 1,
      withReGeocode: false,
      useCache: true, // 默认是true，如果需要频繁获取地理位置，请设置false
      onSuccess: function (result) {
        that.currentLocation = result
        console.log('定位成功', result)
        a && a()
        /* 高德坐标 result 结构
          {
              longitude : Number,
              latitude : Number,
              accuracy : Number,
              address : String,
              province : String,
              city : String,
              district : String,
              road : String,
              netType : String,
              operatorType : String,
              errorMessage : String,
              errorCode : Number,
              isWifiEnabled : Boolean,
              isGpsEnabled : Boolean,
              isFromMock : Boolean,
              provider : wifi|lbs|gps,
              isMobileEnabled : Boolean
          }
          */
      },
      onFail: function (err) {
        console.log('定位失败', err)
        alert('定位失败', JSON.stringify(err))
        b && b()
      }
    })
  },
  /**
   * 缩放至点的半径范围
   * @param {*} p EPSG:3857,点坐标
   * @param {*} r 半径，单位千米
   */
  zoomToPoint: function (p, r) {
    var tpoint = point(p)
    tpoint = toWgs84(tpoint)
    var tbuffered = buffer(tpoint, r, { units: 'kilometers' })
    tbuffered = toMercator(tbuffered)
    var extent = bbox(tbuffered)
    this.zoomToExtent(extent)
  }
}
