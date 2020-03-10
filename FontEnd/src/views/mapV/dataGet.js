import $ from 'jquery'
import gisUtils from '@/utils/gisUtils'
import dictionary from '@/utils/dictionary'
import appConfig from '@/config/app.config'
// 事件状态对应
var statuMap = dictionary.eventStateMap

export default {
  data: {
    peopleList: {},
    depList: {},
    alertEventList: {},
    wurenjiList: {},
    shexiangtouList: {}
  },
  doPostDataAjax: function (url, body, dataKey) {
    var that = this
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(body),
        dataType: 'json',
        success: (res) => {
          that.data[dataKey] = res
          resolve()
        },
        error: err => {
          reject(err)
        }
      })
    })
  },
  doPostDataAjaxNotSetObject: function (url, body) {
    // var that = this
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        type: 'post',
        contentType: 'application/json',
        data: body,
        dataType: 'json',
        success: (res) => {
          resolve(res)
        },
        error: err => {
          reject(err)
        }
      })
    })
  },
  doGetDataAjax: function (url, dataKey) {
    var that = this
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        type: 'get',
        contentType: 'application/json',
        dataType: 'json',
        success: (res) => {
          that.data[dataKey] = res
          resolve()
        },
        error: err => {
          reject(err)
        }
      })
    })
  },
  getAlertEventList: function () {
    var list = []
    var Records = this.data.alertEventList.Records
    for (let i = 0; i < Records.length; i++) {
      const element = Records[i]
      var status = statuMap[element.evtState]
      var lng = element.lng
      var lat = element.lat
      var _p = gisUtils.baiduTomars({
        lon: lng,
        lat: lat
      })
      var _p1 = gisUtils.transformGCJ2WGS(_p.lat, _p.lon)
      lng = _p1.lon
      lat = _p1.lat
      var reportTime = element.reportTime
      var finishLimitTime = element.finishLimitTime
      list.push({
        id: element.objId,
        title: element.evtTypeName, // 事件对象名称
        status: status, // 事件状态
        timeLimit: finishLimitTime, // 当前阶段处理时限
        uploadTime: reportTime, // 上报时间，
        countdown: '00:00:00',
        location: [lng, lat],
        address: element.address,
        remark: element.remark, // 事件描述
        personInfo: {
          dep: '执法一大队',
          members: ['黄庆令', '黄民全']
        },
        reportType: element.reportType, // 上报来源
        evtTypeName: element.evtTypeName // 事件类型
      })
    }
    return list
  },
  getPeopleList: function () {
    var list = []
    var Records = this.data.peopleList.Records
    var depMap = {}
    var depNames = []
    for (let i = 0; i < Records.length; i++) {
      const element = Records[i]
      var depIndex = i
      var depName = element.Department[1]
      depNames.push(depName)
      var depTamType = i % 2
      var open = true
      if (depMap[depName] === undefined) {
        depMap[depName] = {
          index: depIndex,
          name: depName,
          teamType: depTamType,
          open: open,
          list: []
        }
      }
      var pName = element.StaffName
      var Longitude = element.Longitude
      var Latitude = element.Latitude
      var ID = element.ID
      // 模拟 人员位置
      if (i === 0) {
        // [102.95488289188184, 24.58046294382578]
        Longitude = 102.95488289188184
        Latitude = 24.58046294382578
      } else {
        Longitude = 102.95488289188184 + (Math.random() - 0.5) * 0.2
        Latitude = 24.58046294382578 + (Math.random() - 0.5) * 0.2
      }
      depMap[depName].list.push({
        id: ID,
        name: pName,
        online: element.IsOnline * 1 === 1,
        location: [Longitude, Latitude]
      })
    }
    depNames = [...new Set(depNames)]
    list = depNames.map(x => depMap[x])
    return list
  },
  getEquipmentList: function () {
    return {
      wurenji: [...this.data.wurenjiList.Records],
      shexiangtou: [...this.data.shexiangtouList.Records]
    }
  },
  initData: function (after) {
    var urlDep = appConfig.ApiWebContext + '/web/pageddata?model=organization'
    var urlPeople = appConfig.ApiWebContext + '/web/pageddata?model=loc_field_staff'
    var urlEvent = appConfig.ApiWebContext + '/web/pageddata?model=event_info'
    var urlWurenji = appConfig.StaticWebContext + '/gis_data/wurenji.json'
    var urlShexiangtou = appConfig.StaticWebContext + '/gis_data/shexiangtou.json'
    var bodyPeople = { 'Condition': { 'rules': [], 'groups': [], 'op': 'and' }, 'PageIndex': 1, 'PageSize': 30, 'SortName': 'ID', 'SortOrder': 'asc' }

    var that = this
    Promise.all([
      this.doPostDataAjax(urlDep, bodyPeople, 'depList'),
      this.doPostDataAjax(urlPeople, bodyPeople, 'peopleList'),
      this.doPostDataAjax(urlEvent, bodyPeople, 'alertEventList'),
      this.doGetDataAjax(urlWurenji, 'wurenjiList'),
      this.doGetDataAjax(urlShexiangtou, 'shexiangtouList')
    ]).then(() => {
      console.log(that.data)
      if (after) {
        after()
      }
    })
  }
}
