import TileLayer from 'ol/layer/Tile'
import WMTS from 'ol/source/WMTS'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import { get as getProjection } from 'ol/proj'
import { getWidth, getTopLeft } from 'ol/extent'

var pi = 3.14159265358979324 * 3000.0 / 180.0
/**
 * 百度坐标转火星坐标
 * @param {*} baiduPoint { lon, lat }
 */
function baiduTomars (baiduPoint) {
  var marsPoint = { lon: 0, lat: 0 }
  var x = baiduPoint.lon - 0.0065
  var y = baiduPoint.lat - 0.006
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * pi)
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * pi)
  marsPoint.lon = z * Math.cos(theta)
  marsPoint.lat = z * Math.sin(theta)
  return marsPoint
}
var PI = 3.14159265358979324
/**
 * 火星坐标系GCJ02转地球坐标系WGS84
 * @param {*} gcjLat 纬度
 * @param {*} gcjLon 经度
 */
function transformGCJ2WGS (gcjLat, gcjLon) {
  const d = delta(gcjLat, gcjLon)
  return {
    'lat': gcjLat - d.lat,
    'lon': gcjLon - d.lon
  }
}

function delta (lat, lon) {
  const a = 6378245.0 //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
  const ee = 0.00669342162296594323 //  ee: 椭球的偏心率。
  let dLat = transformLat(lon - 105.0, lat - 35.0)
  let dLon = transformLon(lon - 105.0, lat - 35.0)
  const radLat = lat / 180.0 * PI
  let magic = Math.sin(radLat)
  magic = 1 - ee * magic * magic
  const sqrtMagic = Math.sqrt(magic)
  dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI)
  dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * PI)
  return {
    'lat': dLat,
    'lon': dLon
  }
}
function transformLat (x, y) {
  let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
  ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0
  ret += (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0
  ret += (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) * 2.0 / 3.0
  return ret
}
function transformLon (x, y) {
  let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
  ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0
  ret += (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0
  ret += (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) * 2.0 / 3.0
  return ret
}

/**
 * 创建天地图图层
 */
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
    name: 'tdt'
  })
  return layer
}
/**
 * 异步延后执行
 * @param {Function} func 需要执行的内容
 * @param {Int} ms 毫秒
 */
var afterFunc = function (func, ms) {
  var _id_ = setInterval(() => {
    clearInterval(_id_)
    if (func) {
      func()
    }
  }, ms
  )
}
export default {
  baiduTomars, transformGCJ2WGS, createTdtLayer, afterFunc
}
