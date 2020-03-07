import Map from 'ol/Map'
import View from 'ol/View'
// import MapBrowserEvent from 'ol/MapBrowserEvent'
import TileLayer from 'ol/layer/Tile'
// import OSM from 'ol/source/OSM'
import WMTS from 'ol/source/WMTS'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import TileWMS from 'ol/source/TileWMS'
import XYZ from 'ol/source/XYZ'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Heatmap from 'ol/layer/Heatmap'
import { defaults as defaultControls, Zoom } from 'ol/control'
import { GeoJSON } from 'ol/format'
import { register } from 'ol/proj/proj4'
import proj4 from 'proj4'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat, toLonLat, get as getProjection } from 'ol/proj'
import { click } from 'ol/events/condition'
import Select from 'ol/interaction/Select'
import { buffer as extentBuffer, getHeight as getExtentHeight, getWidth, getTopLeft } from 'ol/extent'
import { point, lineString, polygon, buffer, toWgs84, toMercator, randomPoint, bbox, booleanPointInPolygon } from '@turf/turf'
// import $ from 'jquery'
import appConfig from '@/config/app.config'

import styleTable from './styleTable'

import M_HM_FXH from './data/M_HM_FXH.json'
import M_HM_XYH from './data/M_HM_XYH.json'
import M_HM_QLH from './data/M_HM_QLH.json'
import { isEmpty } from '@/utils/util'

const lakeJsons = [M_HM_FXH, M_HM_XYH, M_HM_QLH]

// proj4.defs('EPSG:4490', '+proj=longlat +ellps=GRS80 +no_defs')
// proj4.defs('EPSG:32648', '+proj=utm +zone=48 +datum=WGS84 +units=m +no_defs')
proj4.defs('EPSG:900913', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs')

register(proj4)

const WMS_URL = appConfig.MapOption.WMS_URL
// function createTdtLayer1 () {
//   var projection = getProjection('EPSG:3857')
//   var projectionExtent = projection.getExtent()
//   var size = getWidth(projectionExtent) / 256
//   var resolutions = new Array(18)
//   var matrixIds = new Array(18)
//   for (var z = 1; z < 19; ++z) {
//     // generate resolutions and matrixIds arrays for this WMTS
//     resolutions[z] = size / Math.pow(2, z)
//     matrixIds[z] = z
//   }

//   var webKey = 'fca2dd0a5d97b284fe802d646ad6430c'

//   var wmtsUrl1 = 'http://t{0-7}.tianditu.gov.cn/vec_w/wmts?tk=' // 矢量底图

//   var layer = new TileLayer({
//     source: new WMTS({
//       url: wmtsUrl1 + webKey,
//       layer: 'vec',
//       matrixSet: 'w',
//       format: 'tiles',
//       style: 'default',
//       projection: projection,
//       tileGrid: new WMTSTileGrid({
//         origin: getTopLeft(projectionExtent),
//         resolutions: resolutions,
//         matrixIds: matrixIds
//       }),
//       wrapX: true
//     }),
//     name: 'tdt'
//   })
//   return layer
// }
var timer = {
  runId: 0,
  pathBeforeFeature: undefined,
  interval: 100,
  parent: undefined,
  needRefreshLayers: [],
  run: function () {
    var that = this
    this.runId = setInterval(function () {
      if (that.pathBeforeFeature) {
        that.pathBeforeFeature.dashOffset = that.pathBeforeFeature.dashOffset < 0 ? 20 : that.pathBeforeFeature.dashOffset - 1
        that.refreshlayers()
      }
    }, this.interval)
  },
  refreshlayers: function () {
    this.parent.refreshMap()
  }
}

var afterFunc = function (func, ms) {
  var _id_ = setInterval(() => {
    clearInterval(_id_)
    if (func) {
      func()
    }
  }, ms
  )
}

var paths = {
  equipmentLayer: { // 无人机轨迹模拟
    beforePathPoints: [
      [11459966.377536114, 2820093.7337855822],
      [11458992.076581407, 2820197.2532620197],
      [11457999.5074838, 2820550.437358101],
      [11457073.921576828, 2820696.582501307],
      [11456270.123289196, 2820818.3701206455],
      [11455594.202001868, 2820897.5320732156],
      [11454753.867428433, 2820867.0851683808],
      [11454297.163855914, 2820708.761263241],
      [11454090.124903038, 2820635.688691638]
    ],
    afterPathPoints: [
      [11454144.92933174, 2820319.0408813576],
      [11454583.364761358, 2820197.2532620193],
      [11455198.392239017, 2820002.3930710778],
      [11455752.525907006, 2819746.6390704676],
      [11456318.83833693, 2819326.4717837498],
      [11456909.508290721, 2818973.2876876686],
      [11457494.088863546, 2818577.477924819],
      [11457737.664102223, 2818303.4557813075],
      [11458364.870341815, 2817645.8026368804],
      [11458504.926104054, 2817152.56277856],
      [11458815.484533368, 2816811.5574444123],
      [11458967.71905754, 2816732.3954918426]
    ]
  },
  peopleLayer: { // 人员轨迹模拟
    beforePathPoints: [
      [11455224.926097965, 2831145.16725549],
      [11456296.657148141, 2831023.3796361517],
      [11457344.030674452, 2830804.1619213424],
      [11458293.974105291, 2830560.5866826656],
      [11458756.767058777, 2830170.866300783],
      [11460169.503443103, 2829756.7883950323],
      [11460583.581348853, 2828733.77239259],
      [11460559.223824985, 2827491.5386753385],
      [11460802.799063662, 2825859.5845762044],
      [11461338.664588751, 2824958.3561931],
      [11461070.731826207, 2824154.557905467]
    ],
    afterPathPoints: [
      [11461095.089350075, 2824057.1278099963],
      [11461338.664588751, 2823691.764951981],
      [11461314.307064883, 2823180.25695076],
      [11460948.944206867, 2822741.8215211416],
      [11460583.581348853, 2822668.748949539],
      [11460266.933538573, 2822449.5312347296],
      [11460145.145919235, 2821913.665709641],
      [11460242.576014705, 2821475.2302800226],
      [11459925.928204427, 2820452.2142775804]
    ]
  },
  shipLayer: { // 船只轨迹模拟
    beforePathPoints: [
      [11455973.229466965, 2830394.9170217765],
      [11455660.566331241, 2829714.414902849],
      [11455035.240059795, 2828537.3301565964],
      [11454299.562093386, 2827268.285664543],
      [11453619.05997446, 2825980.849223329],
      [11452754.63836393, 2824730.196680436],
      [11452000.568448363, 2823571.503883343],
      [11451669.513363479, 2823258.84074762]
    ],
    afterPathPoints: [
      [11450841.87565127, 2823277.2326967805],
      [11450676.348108828, 2823976.126764868],
      [11450768.307854628, 2824895.7242228775],
      [11450731.523956308, 2825741.7538842466],
      [11450621.172261348, 2826569.3915964556],
      [11450234.941328984, 2827084.366172941],
      [11450142.981583182, 2828151.0992242326],
      [11450363.684973104, 2829971.9021910923]
    ]
  }
}
var regions = {
  peopleLayer: [
    [11455793.965980126, 2832993.440173009],
    [11455252.653753974, 2829745.5668160943],
    [11458732.518064953, 2828624.2772047785],
    [11459467.156086162, 2825337.738688853],
    [11459505.821245171, 2822128.5304909493],
    [11459467.156086162, 2820040.611904361],
    [11461864.395944836, 2819305.9738831543],
    [11463681.658418348, 2828237.625614669],
    [11462135.052057913, 2830944.1867454313],
    [11458113.87552078, 2832606.7885828996],
    [11455793.965980126, 2832993.440173009]
  ],
  wurenji: [
    [11460616.318521703, 2819827.8100318993],
    [11456247.155553471, 2822592.368901178],
    [11453405.26636617, 2822573.0363216726],
    [11452071.318380294, 2820949.099643215],
    [11452941.28445804, 2818764.5181591],
    [11454275.232443916, 2817449.9027527296],
    [11456498.479087042, 2815574.6425407017],
    [11459147.042479288, 2815110.6606325707],
    [11460248.999511098, 2816289.947982403],
    [11460616.318521703, 2819827.8100318993]
  ]
}
var ships = [
  {
    name: '渔船1号',
    location: [11458776.689102283, 2828717.9661958385],
    type: 0
  },
  {
    name: '渔船2号',
    location: [11452520.140050491, 2829088.724658167],
    type: 0
  },
  {
    name: '游船1号',
    location: [11451268.830240132, 2823017.554837539],
    type: 1
  },
  {
    name: '游船2号',
    location: [11452149.381588163, 2808928.7332690572],
    type: 1
  }
]
var heatRegion = [[
  [11459267.728668552, 2837540.024012563],
  [11454355.1790427, 2838327.885745011],
  [11451342.766536282, 2837771.748051518],
  [11449859.732686969, 2831005.4061140236],
  [11449952.42230255, 2829707.751495874],
  [11452084.28346094, 2829754.096303665],
  [11454633.247889446, 2829846.785919247],
  [11456579.729816671, 2829707.751495874],
  [11457877.384434821, 2829568.717072501],
  [11460148.280016582, 2828085.683223187],
  [11460287.314439956, 2834944.7147762636],
  [11459267.728668552, 2837540.024012563]
]]
export default {
  map: {},
  view: {},
  layers: [],
  selects: {},
  option: {},
  init: function (option) {
    this.option = option
    this.initLayers()
    this.initMap()

    // 用于控制轨迹的流动效果
    timer.parent = this
    timer.needRefreshLayers.push(this.findLayer('pathLayer'))
    timer.run()

    this.updateShipLayer()
    this.updateHeatMap()
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
    var that = this

    this.map.on('singleclick', function (e) {
      console.log('singleclickMap', that.toLonlat(e.coordinate))
    })
    this.initSelect()
    // 1秒后 执行
    afterFunc(function () {
      that.zoomToLake()
    }, 1000)
  },
  initLayers: function () {
    // var baseLayer = new TileLayer({
    //   source: new WMTS({
    //     url: imageLayerUrl,
    //     layer: 'image',
    //     matrixSet: 'Custom_image',
    //     projection: EPSG_4490,
    //     tileGrid: new WMTSTileGrid({
    //       origin: [102.15495174700004, 24.85292923200018],
    //       resolutions: resolutions,
    //       matrixIds: matrixIds
    //     }),
    //     style: 'default',
    //     wrapX: true
    //   }),
    //   name: 'base'
    // })
    // 底图
    // var osm = new TileLayer({
    //   source: new OSM(),
    //   name: 'baseLayer',
    //   zIndex: 0
    // })
    // this.layers.push(osm)

    // var tdtCvaLayer = createTdtLayer1()
    // this.layers.push(tdtCvaLayer)
    var baseLayer = new TileLayer({
      source: new TileWMS({
        url: WMS_URL,
        params: {
          LAYERS: '0'
        }
      }),
      zIndex: 1,
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
      zIndex: 2,
      name: 'lakeLayer'
    })
    this.layers.push(lakeLayer)
    // 生态红线
    var redLineLayer = new VectorLayer({
      source: new VectorSource(),
      // style: (f) => styleTable.lakeStyle(f),
      zIndex: 3,
      name: 'redLineLayer'
    })
    this.layers.push(redLineLayer)
    // 热力图
    var heatLayer = new Heatmap({
      source: new VectorSource(),
      // style: (f) => styleTable.lakeStyle(f),
      zIndex: 4,
      name: 'heatLayer'
    })
    this.layers.push(heatLayer)
    // 管辖范围、飞行范围 图层
    var regionLayer = new VectorLayer({
      source: new VectorSource(),
      style: (f) => styleTable.regionLayerStyle(f),
      zIndex: 5,
      name: 'regionLayer'
    })
    this.layers.push(regionLayer)
    // 路径图层
    var pathLayer = new VectorLayer({
      source: new VectorSource(),
      style: (f) => styleTable.pathLayerStyle(f),
      zIndex: 6,
      name: 'pathLayer'
    })
    this.layers.push(pathLayer)
    // 人员
    var peopleLayer = new VectorLayer({
      source: new VectorSource(),
      name: 'peopleLayer',
      zIndex: 7,
      style: (f) => styleTable.peopleLayerStyle(f)
    })
    this.layers.push(peopleLayer)
    // 事件
    var alertEventLayer = new VectorLayer({
      source: new VectorSource(),
      style: (f) => styleTable.alertEventStyle(f),
      zIndex: 8,
      name: 'alertEventLayer'
    })
    this.layers.push(alertEventLayer)
    // 设备
    var equipmentLayer = new VectorLayer({
      source: new VectorSource(),
      style: (f) => styleTable.equipmentStyle(f),
      zIndex: 9,
      name: 'equipmentLayer'
    })
    this.layers.push(equipmentLayer)
    // 船只
    var shipLayer = new VectorLayer({
      source: new VectorSource(),
      style: (f) => styleTable.shipStyle(f),
      zIndex: 10,
      name: 'shipLayer'
    })
    this.layers.push(shipLayer)
  },
  initSelect: function () {
    var that = this
    // 人员图层的select 事件
    var peopleLayerSelectClick = new Select({
      condition: click,
      layers: [this.findLayer('peopleLayer')],
      style: (f) => styleTable.peopleLayerSelectedStyle(f)
    })
    this.map.addInteraction(peopleLayerSelectClick)
    peopleLayerSelectClick.on('select', function (e) {
      if (e.selected.length < 1) {
        that.clearRegionLayer()
        that.clearPathLayer()
        that.onPeopleFeatureClick()
      } else {
        var featureSelected = e.selected[0]
        that.openRegionlayer(featureSelected)
        that.openPathLayer(featureSelected)
        that.onPeopleFeatureClick(featureSelected)
      }
    })
    this.selects['peopleLayerSelectClick'] = peopleLayerSelectClick
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
    // 设备图层的select 事件
    var equipmentLayerSelectClick = new Select({
      condition: click,
      layers: [this.findLayer('equipmentLayer')],
      style: (f) => styleTable.equipmentSelectedStyle(f)
    })
    this.map.addInteraction(equipmentLayerSelectClick)
    equipmentLayerSelectClick.on('select', function (e) {
      if (e.selected.length < 1) {
        that.clearRegionLayer()
        that.clearPathLayer()
        that.onEquipmentFeatureClick()
      } else {
        var featureSelected = e.selected[0]
        var typeIndex = featureSelected.getProperties().typeIndex
        that.openRegionlayer(featureSelected)
        if (typeIndex === 1) {
          that.openPathLayer(featureSelected)
        }
        that.onEquipmentFeatureClick(featureSelected)
      }
    })
    this.selects['equipmentLayerSelectClick'] = equipmentLayerSelectClick
    // 船只图层的select 事件
    var shipLayerSelectClick = new Select({
      condition: click,
      layers: [this.findLayer('shipLayer')],
      style: (f) => styleTable.shipSelectedStyle(f)
    })
    this.map.addInteraction(shipLayerSelectClick)
    shipLayerSelectClick.on('select', function (e) {
      console.log('shipLayerSelectClick', e)
      if (e.selected.length < 1) {
        that.clearRegionLayer()
        that.clearPathLayer()
        that.onShipFeatureClick()
      } else {
        var featureSelected = e.selected[0]
        that.openPathLayer(featureSelected)
        that.onShipFeatureClick(featureSelected)
      }
    })
    this.selects['shipLayerSelectClick'] = shipLayerSelectClick
  },
  refreshMap: function () {
    this.map.redrawText()
  },
  changeLake: function (lakeIndex) {
    this.option.lakeIndex = lakeIndex

    this.changeLakeLaker()
    this.zoomToLake()
  },
  changeLakeLaker: function () {
    var lakeLayer = this.findLayer('lakeLayer')
    var lakeSource = lakeLayer.getSource()
    var lakeJson = lakeJsons[this.option.lakeIndex]
    lakeSource.clear()
    lakeSource.addFeatures(new GeoJSON().readFeatures(lakeJson, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    }))
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
  zoomToLake: function () {
    var lakeLayer = this.findLayer('lakeLayer')
    var lakeSource = lakeLayer.getSource()
    var ex = lakeSource.getExtent()
    ex = extentBuffer(ex, getExtentHeight(ex) * 0.3)
    this.view.fit(ex, { duration: 1000 })
  },
  zoomToExtent: function (extent) {
    var ex = extentBuffer(extent, getExtentHeight(extent) * 0.1)
    this.view.fit(ex, { duration: 1000 })
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
  },
  updatePeopleLayer: function (peopleList) {
    var layer = this.findLayer('peopleLayer')
    var source = layer.getSource()
    source.clear()
    for (let i = 0; i < peopleList.length; i++) {
      const p = peopleList[i]
      var fea = new Feature({
        geometry: new Point(fromLonLat(p.location)),
        name: p.name
      })
      fea.setProperties(p)
      source.addFeature(fea)
    }
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
  updateEquipmentLayer: function (equipmentList) {
    var layer = this.findLayer('equipmentLayer')
    var source = layer.getSource()
    source.clear()
    for (let i = 0; i < equipmentList.length; i++) {
      const a = equipmentList[i]
      var fea = new Feature({
        geometry: new Point(a.location),
        name: a.name
      })
      fea.setProperties(a)
      source.addFeature(fea)
    }
  },
  updateShipLayer: function (shipList) {
    var layer = this.findLayer('shipLayer')
    var source = layer.getSource()
    source.clear()
    for (let i = 0; i < ships.length; i++) {
      const s = ships[i]
      var fea = new Feature({
        geometry: new Point(s.location),
        name: s.name
      })
      fea.setProperties(s)
      source.addFeature(fea)
    }
  },
  updateHeatMap: function (dataList) {
    var layer = this.findLayer('heatLayer')
    var source = layer.getSource()
    source.clear()
    var polygon1 = polygon(heatRegion)
    var polygon2 = toWgs84(polygon1)
    var ex = bbox(polygon2)
    var randomPoints = randomPoint(100, { bbox: ex })
    var reader = new GeoJSON()
    for (var i = 0; i < randomPoints.features.length; i++) {
      var p = randomPoints.features[i]
      if (booleanPointInPolygon(p, polygon2)) {
        source.addFeature(reader.readFeature(p, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        }))
      }
    }
  },
  updateRedLineLayer: function () {
    var redLineLayer = this.findLayer('redLineLayer')
    var source = redLineLayer.getSource()
    var lakeJson = lakeJsons[this.option.lakeIndex]
    var tbuffered = buffer(lakeJson.features[0], 0.1, { units: 'kilometers' })
    source.clear()
    source.addFeatures(new GeoJSON().readFeatures(tbuffered, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    }))
  },
  updateSize: function () {
    this.map.updateSize()
  },
  onPeopleFeatureClick: function (f) {
    console.log('onPeopleFeatureClick', f)
    if (this.option.afterPeopleFeatureClick) {
      this.option.afterPeopleFeatureClick(f)
    }
  },
  onAlertFeatureClick: function (f) {
    console.log('onAlertFeatureClick', f)
    if (this.option.afterAlertFeatureClick) {
      this.option.afterAlertFeatureClick(f)
    }
  },
  onEquipmentFeatureClick: function (f) {
    console.log('onEquipmentFeatureClick', f)
    if (this.option.afterEquipmentFeatureClick) {
      this.option.afterEquipmentFeatureClick(f)
    }
  },
  onShipFeatureClick: function (f) {
    console.log('onShipFeatureClick', f)
    if (this.option.afterShipFeatureClick) {
      this.option.afterShipFeatureClick(f)
    }
  },
  findLayerByFeature: function (feature) {
    var lyrs = this.layers
    for (let i = 0; i < lyrs.length; i++) {
      var lyr = lyrs[i]
      // console.log('lyr', lyr, lyr.constructor.name)
      if (!lyr.getSource().getFeatures) {
        continue
      }
      var features = lyr.getSource().getFeatures()
      for (let j = 0; j < features.length; j++) {
        // console.log('feature', feature.ol_uid, features[j].ol_uid)
        if (feature.ol_uid === features[j].ol_uid) {
          return lyr
        }
      }
    }
    return undefined
  },
  findFeatureByLayerNameAndFeatureId: function (layerName, id) {
    if (isEmpty(id)) return undefined

    var layer = this.findLayer(layerName)
    if (!layer) return undefined
    var features = layer.getSource().getFeatures()
    for (let i = 0; i < features.length; i++) {
      const element = features[i]
      var properties = element.getProperties()
      if (properties['id'] === id) {
        return element
      }
    }
    return undefined
  },
  /**
   * 打开 无人机、人员等点目标的轨迹
   * @param {*} feature
   */
  openPathLayer: function (feature) {
    var pLayer = this.findLayerByFeature(feature)
    var pLayerName = pLayer.get('name')
    var pathLayer = this.findLayer('pathLayer')
    var source = pathLayer.getSource()
    source.clear()
    var location = feature.getProperties().location
    if (pLayerName === 'peopleLayer') {
      location = fromLonLat(location)
    }
    // 模拟轨迹路线

    var _beforePathPoints = paths[pLayerName].beforePathPoints
    var _afterPathPoints = paths[pLayerName].afterPathPoints
    var beforePathPoints = [..._beforePathPoints]
    beforePathPoints.push(location)
    var afterPathPoints = [location]
    afterPathPoints.push(..._afterPathPoints)
    var reader = new GeoJSON()
    var featureBefore = reader.readFeature(lineString(beforePathPoints))
    featureBefore.setProperties({ name: 'featureBefore' })
    featureBefore['dashOffset'] = 0 // 用于控制流动效果
    timer.pathBeforeFeature = featureBefore
    source.addFeature(featureBefore)
    var featureAfter = reader.readFeature(lineString(afterPathPoints))
    featureAfter.setProperties({ name: 'featureAfter' })
    source.addFeature(featureAfter)
  },
  /**
   * 打开 无人机的飞行范围、执法人员的管辖范围
   * @param {*} feature
   */
  openRegionlayer: function (feature) {
    console.log('openRegionlayer', feature)
    var pLayer = this.findLayerByFeature(feature)
    console.log('pLayer', pLayer)
    var pLayerName = pLayer.get('name')
    var regionLayer = this.findLayer('regionLayer')
    var source = regionLayer.getSource()
    source.clear()
    var location = feature.getProperties().location
    // 模拟飞行范围、管辖范围
    var region = []
    var regionFeature
    var reader = new GeoJSON()
    if (pLayerName === 'peopleLayer') {
      // 人员层
      region = [regions.peopleLayer]
      regionFeature = reader.readFeature(polygon(region))
      source.addFeature(regionFeature)
    } else if (pLayerName === 'equipmentLayer') {
      // 设备层

      var typeIndex = feature.getProperties().typeIndex
      if (typeIndex === 0) {
        // 摄像头
        var tpoint = point(location)
        tpoint = toWgs84(tpoint)
        var tbuffered = buffer(tpoint, 0.5, { units: 'kilometers' })
        tbuffered = toMercator(tbuffered)
        regionFeature = reader.readFeature(tbuffered)
        source.addFeature(regionFeature)
      } else {
        region = [regions.wurenji]
        regionFeature = reader.readFeature(polygon(region))
        source.addFeature(regionFeature)
      }
    }
    if (regionFeature) {
      this.zoomToExtent(regionFeature.getGeometry().getExtent())
    }
  },
  clearPathLayer: function () {
    var pathLayer = this.findLayer('pathLayer')
    var source = pathLayer.getSource()
    source.clear()
    timer.pathBeforeFeature = undefined
  },
  clearRegionLayer: function () {
    var regionLayer = this.findLayer('regionLayer')
    var source = regionLayer.getSource()
    source.clear()
    timer.pathBeforeFeature = undefined
  },
  toLonlat: function (p) {
    return toLonLat(p)
  },
  changeLayerShow: function (layerItem) {
    var layer = this.findLayer(layerItem.layerName)
    if (!layer) {
      return
    }
    var styleTableLayerShow = styleTable.layerShow[layerItem.layerName]
    if (layer.getVisible() === layerItem.active) {
      styleTableLayerShow.subs = layerItem.subs
      this.refreshMap()
    } else {
      layer.setVisible(layerItem.active)
    }
  },
  setCenter: function (lonlat) {
    this.view.setCenter(fromLonLat(lonlat))
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
  selectFeature: function (selectIntercationName, feature) {
    var select = this.selects[selectIntercationName]
    select.getFeatures().push(feature)
    select && select.dispatchEvent({
      type: 'select',
      selected: [feature],
      deselected: []
    })
  }
}
