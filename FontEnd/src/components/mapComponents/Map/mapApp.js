/**
 * openlayers
 */
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import TileWMS from 'ol/source/TileWMS'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Cluster from 'ol/source/Cluster'
import { buffer as extentBuffer, getHeight as getExtentHeight, getWidth as getExtentWidth } from 'ol/extent'
import { GeoJSON } from 'ol/format'
import { defaults as defaultControls, Zoom } from 'ol/control'
import { singleClick } from 'ol/events/condition'
import Select from 'ol/interaction/Select'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat, toLonLat } from 'ol/proj'
import Overlay from 'ol/Overlay'
/**
 * turf
 */
import { point, featureCollection, toMercator, bbox, toWgs84, buffer } from '@turf/turf'

/**
 * 项目中的js
 */
import { isEmpty } from '@/utils/util'
import layerStyle from './layerStyle'
import appConfig from '@/config/app.config'
/**
 *geojson
 */
import M_HM_FXH from '../../../assets/json/geojson/M_HM_FXH.json'
import M_HM_XYH from '../../../assets/json/geojson/M_HM_XYH.json'
import M_HM_QLH from '../../../assets/json/geojson/M_HM_QLH.json'
import dictionary from '@/utils/dictionary'
import gisUtils from '@/utils/gisUtils'
/**
 * 三个湖的geojson
 */
const lakeJsons = [M_HM_FXH, M_HM_XYH, M_HM_QLH]

const WMS_URL = appConfig.MapOption.WMS_URL
/**
 * 地图功能的主要逻辑封装
 */
var mapApp = {
  /**
   * openlayers 地图对象
   */
  map: undefined,
  /**
   * openlayers 地图视图对象
   */
  view: undefined,
  /**
   * 所有地图图层的map集
   */
  layers: {},
  /**
   * 所有的地图图层要素选择交互map集
   */
  selects: {},
  /**
   * 所有的infobox集
   */
  infoboxs: {},
  /**
   * 用户保存初始化参数
   */
  option: undefined,
  /**
   * 前端数据中心
   */
  dataGet: undefined,
  /**
   * Map.vue 对象
   */
  $map: undefined,
  /**
   * 地图功能初始化
   * @param {*} option 初始化参数
   */
  init: function (option) {
    this.option = option
    this.dataGet = option.dataGet
    this.$map = option.$map
    this.initLayers()
    this.initInfoboxs()
    this.initMap()
    this.initSelects()
    this.zoomToLake()
  },
  /**
   * 初始化地图
   */
  initMap: function () {
    this.view = new View({
      center: this.option.INIT_CENTER_POINT,
      zoom: this.option.INIT_ZOOM
    })
    const layers = [
      this.layers['baseLayer'],
      this.layers['lakeLayer'],
      this.layers['alertEventLayer'],
      this.layers['peopleLayerZhifa'],
      this.layers['peopleLayerXunjian']
    ]
    const overlays = [
      this.infoboxs['alertEventLayer']
    ]
    this.map = new Map({
      target: this.option.mapId,
      layers: layers,
      overlays: overlays,
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
  },
  /**
   * 初始化地图图层
   */
  initLayers: function () {
    // 底图
    var baseLayer = new TileLayer({
      source: new TileWMS({
        url: WMS_URL,
        params: {
          LAYERS: '0'
        }
      }),
      zIndex: 1,
      // visible: false,
      name: 'baseLayer'
    })
    this.layers['baseLayer'] = baseLayer
    // 湖
    var lakeJson = lakeJsons[this.option.lakeIndex]
    var lakeLayer = new VectorLayer({
      source: new VectorSource({
        features: new GeoJSON().readFeatures(lakeJson, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        })
      }),
      style: (f) => layerStyle.lakeStyle(f),
      zIndex: 2,
      name: 'lakeLayer'
    })
    this.layers['lakeLayer'] = lakeLayer
    // 事件
    var alertEventLayer = new VectorLayer({
      source: new Cluster({
        distance: 50,
        source: new VectorSource()
      }),
      style: (f) => layerStyle.alertEventStyle(f),
      zIndex: 8,
      name: 'alertEventLayer'
    })
    this.layers['alertEventLayer'] = alertEventLayer
    // 执法人员
    this.layers['peopleLayerZhifa'] = new VectorLayer({
      source: new Cluster({
        distance: 50,
        source: new VectorSource()
      }),
      style: (f) => layerStyle.clusterPeopleStyle(f),
      zIndex: 9,
      name: 'peopleLayerZhifa'
    })
    // 巡检人员
    this.layers['peopleLayerXunjian'] = new VectorLayer({
      source: new Cluster({
        distance: 50,
        source: new VectorSource()
      }),
      style: (f) => layerStyle.clusterPeopleStyle(f),
      zIndex: 10,
      name: 'peopleLayerXunjian'
    })
  },
  /**
   * 初始化地图图层要素选择交互对象
   */
  initSelects: function () {
    var that = this
    // 事件
    this.selects['alertEventLayer'] = new Select({
      condition: singleClick,
      layers: [this.layers['alertEventLayer']],
      style: (f) => layerStyle.alertEventStyle(f)
    })
    this.selects['alertEventLayer'].on('select', function (e) {
      that.onSelectedAlertEventLayer(e)
    })
    this.map.addInteraction(this.selects['alertEventLayer'])
    // 人员
    this.selects['peopleLayer'] = new Select({
      condition: singleClick,
      layers: [this.layers['peopleLayerZhifa'], this.layers['peopleLayerXunjian']],
      style: (f) => layerStyle.clusterPeopleStyle(f)
    })
    this.selects['peopleLayer'].on('select', function (e) {
      that.onSelectedpeopleLayer(e)
    })
    this.map.addInteraction(this.selects['peopleLayer'])
  },
  /**
   * 初始化各类infobox
   */
  initInfoboxs: function () {
    var alertEventLayer = document.getElementById('infobox-alertEventLayer')
    this.infoboxs['alertEventLayer'] = new Overlay({
      element: alertEventLayer,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    })
  },
  /**
   * 切换湖
   * @param {Int} lakeIndex 湖的索引 0,1,2 抚仙湖 星云湖 杞麓湖
   */
  changeLake: function (lakeIndex) {
    this.option.lakeIndex = lakeIndex
    this.changeLakeLaker()
    this.zoomToLake()
  },
  /**
   * 切换湖的图层数据
   */
  changeLakeLaker: function () {
    var lakeLayer = this.layers['lakeLayer']
    var lakeSource = lakeLayer.getSource()
    var lakeJson = lakeJsons[this.option.lakeIndex]
    lakeSource.clear()
    lakeSource.addFeatures(new GeoJSON().readFeatures(lakeJson, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    }))
  },
  /**
   * 地图缩放至当前的湖
   */
  zoomToLake: function () {
    var lakeLayer = this.layers['lakeLayer']
    var lakeSource = lakeLayer.getSource()
    var ex = lakeSource.getExtent()
    this.zoomToExtent(ex)
  },
  /**
   * 缩放至外接矩形
   * @param {*} extent
   */
  zoomToExtent: function (extent) {
    var w = getExtentWidth(extent)
    var h = getExtentHeight(extent)
    var d = Math.max(w, h)
    extent = extentBuffer(extent, d * 0.5)
    this.view.fit(extent, { duration: 1000 })
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
  /**
   * 缩放至点要素的半径范围
   * @param {*} feature 点要素
   * @param {*} r 半径范围
   */
  zoomToPointFeature: function (feature, r) {
    var p = feature.getGeometry().getCoordinates()
    this.zoomToPoint(p, r)
  },
  /**
   * 从前端数据中心获取事件列表,更新事件图层数据
   */
  updateAlertEventLayer: function () {
    var list = this.dataGet.getAlertEventList()
    var layer = this.layers['alertEventLayer']
    var source = layer.getSource()
    source.getSource().clear()
    for (let i = 0; i < list.length; i++) {
      const a = list[i]
      var xy = [a.lng, a.lat]
      var fea = new Feature({
        geometry: new Point(fromLonLat(xy))
      })
      fea.setProperties(a)
      source.getSource().addFeature(fea)
    }
  },
  /**
   * 从前端数据中心获取人员列表,更新人员图层数据
   */
  updatePeopleLayer: function () {
    var list = this.dataGet.getPeopleListForMap()
    var peopleLayerZhifa = this.layers['peopleLayerZhifa']
    var peopleLayerXunjian = this.layers['peopleLayerXunjian']
    var sourceZhifa = peopleLayerZhifa.getSource()
    var sourceXunjian = peopleLayerXunjian.getSource()
    sourceZhifa.getSource().clear()
    sourceXunjian.getSource().clear()
    for (let i = 0; i < list.length; i++) {
      const element = list[i]
      var type = element.Lawenforcer
      var xy = [element.Longitude, element.Latitude]
      var fea = new Feature({
        geometry: new Point(fromLonLat(xy))
      })
      fea.setProperties(element)
      if (type) {
        sourceZhifa.getSource().addFeature(fea)
      } else {
        sourceXunjian.getSource().addFeature(fea)
      }
    }
  },
  /**
   * 地图中的事件图标被点击
   * @param {*} e
   */
  onSelectedAlertEventLayer: function (e) {
    if (e.selected.length < 1) {
      this.closeAllInfobox()
    } else {
      var clusetrFeature = e.selected[0]
      var features = clusetrFeature.get('features')
      if (features) {
        // 通过地图点击触发
        if (features.length > 1) {
          // 点击的聚合要素
          var extent = this.getExtentOfClusterFeature(clusetrFeature)
          this.zoomToExtent(extent)
        } else {
          // 点击的单一要素
          this.openAlertEventInfobox(features[0])
        }
      } else {
        // 通过代码触发，不是地图点击触发
        this.zoomToPointFeature(clusetrFeature, 0.5)
        this.openAlertEventInfobox(clusetrFeature)
      }
    }
  },
  /**
   * 地图中的人员图标被点击
   * @param {*} e
   */
  onSelectedpeopleLayer: function (e) {
    if (e.selected.length < 1) {
      this.closeAllInfobox()
    } else {
      var clusetrFeature = e.selected[0]
      var features = clusetrFeature.get('features')
      if (features) {
        // 通过地图点击触发
        if (features.length > 1) {
          // 点击的聚合要素
          var extent = this.getExtentOfClusterFeature(clusetrFeature)
          this.zoomToExtent(extent)
        } else {
          // 点击的单一要素

        }
      } else {
        // 通过代码触发，不是地图点击触发
        this.zoomToPointFeature(clusetrFeature, 0.5)
        //
      }
    }
  },
  /**
   * 获取聚合点要素的extent
   * @param {*} clusetrFeature
   */
  getExtentOfClusterFeature: function (clusetrFeature) {
    var features = clusetrFeature.get('features')
    var ps = features.map(p => {
      return toLonLat(p.getGeometry().getCoordinates())
    })
    var tPs = ps.map(p => point(p))
    var points = featureCollection(tPs)
    // var hull = convex(points)
    points = toMercator(points)
    return bbox(points)
  },
  /**
   * 打开事件信息框
   * @param {*} feature
   */
  openAlertEventInfobox: function (feature) {
    var infobox = this.infoboxs['alertEventLayer']
    var coordinate = feature.getGeometry().getCoordinates()
    var properties = feature.getProperties()
    var level = layerStyle.getEventLevel(feature)
    var evtTypeName = properties['evtTypeName']
    var logs = properties['logs']
    var header = {
      src: dictionary.eventLevelTable[level].src,
      title: evtTypeName
    }
    var content = {
      id: properties['id'],
      evtFileUrl: gisUtils.trimToStr(properties['evtFileUrl']),
      remark: gisUtils.trimToStr(properties['remark']),
      evtState: gisUtils.trimToStr(properties['evtState']),
      reportTime: gisUtils.trimToStr(properties['reportTime']),
      address: gisUtils.trimToStr(properties['address']),
      reportType: gisUtils.trimToStr(properties['reportType']),
      logs: logs,
      evtStateColor: dictionary.eventLevelTable[level].color,
      dealerName: properties['dealerName']
    }

    this.$map.setInfoboxData('alertEventLayer', header, content)
    infobox.setPosition(coordinate)
  },
  /**
   * 关闭所有infobox
   */
  closeAllInfobox: function () {
    for (var name in this.infoboxs) {
      this.infoboxs[name].setPosition(undefined)
    }
  },
  /**
   * 根据图层名和id 查询
   * @param {*} layerName 图层名
   * @param {*} id
   */
  findFeatureByLayerNameAndFeatureId: function (layerName, id) {
    if (isEmpty(id)) return undefined

    var layer = this.layers[layerName]
    if (!layer) return undefined
    var features = []
    if (layer.getSource().getSource) {
      // 聚合图层
      features = layer.getSource().getSource().getFeatures()
    } else {
      features = layer.getSource().getFeatures()
    }
    var idField = layerAndfeatureId[layerName]
    for (let i = 0; i < features.length; i++) {
      const element = features[i]
      var properties = element.getProperties()
      if (properties[idField] === id) {
        return element
      }
    }
    return undefined
  },
  /**
   * 通过代码选中要素
   */
  selectFeature: function (layerName, id) {
    var selectName = layerAndSelects.layer2select[layerName]
    var select = this.selects[selectName]
    var feature = this.findFeatureByLayerNameAndFeatureId(layerName, id)
    select.getFeatures().push(feature)
    select && select.dispatchEvent({
      type: 'select',
      selected: [feature],
      deselected: []
    })
  }
}
var layerAndSelects = {
  layer2select: {
    alertEventLayer: 'alertEventLayer',
    peopleLayer: ['peopleLayerZhifa', 'peopleLayerXunjian']
  },
  select2layer: {
    alertEventLayer: 'alertEventLayer',
    peopleLayerZhifa: 'peopleLayer',
    peopleLayerXunjian: 'peopleLayer'
  }
}
var layerAndfeatureId = {
  alertEventLayer: 'id',
  peopleLayerZhifa: 'userId',
  peopleLayerXunjian: 'userId'
}
export default mapApp
