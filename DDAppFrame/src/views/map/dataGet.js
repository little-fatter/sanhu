import $ from 'jquery'
import moment from 'moment'
import appConfig from '@/config/app.config'
const timeFormat = 'YYYY-MM-DD HH:mm:ss'
export default {
  data: {
    peopleList: {},
    depList: {},
    alertEventList: {}
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
  getAlertEventList: function () {
    // var evtStateMap = {
    //   list: ['待处理', '事件核查中', '跟踪整改中', '现场勘察中', '处理完成', '转为案件办理'],
    //   map: {
    //     '待处理': 0,
    //     '事件核查中': 1,
    //     '跟踪整改中': 2,
    //     '现场勘察中': 3,
    //     '处理完成': 4,
    //     '转为案件办理': 5
    //   }
    // }
    var list = []
    var Records = this.data.alertEventList.Records
    for (let i = 0; i < Records.length; i++) {
      const element = Records[i]
      // var evtStateName = element.evtStateName
      // var status = evtStateMap.map[evtStateName]
      var status = i % 6 // 模拟事件处理状态
      if (status === undefined) continue
      var lng = element.lng
      var lat = element.lat
      lng = 102.93925422177621 + (Math.random() * 0.1 - 0.05)
      lat = 24.521317530894365 + (Math.random() * 0.1 - 0.05)
      var reportTime = element.reportTime
      var finishLimitTime = element.finishLimitTime
      list.push({
        id: element.objId,
        title: element.targetName, // 事件对象名称
        status: status,
        timeLimit: finishLimitTime, // 当前阶段处理时限
        uploadTime: reportTime, // 上报时间，
        countdown: '00:00:00',
        location: [lng, lat],
        address: element.address,
        remark: element.remark, // 事件描述
        personInfo: {
          dep: '执法一大队',
          members: ['黄庆令', '黄民全']
        }
      })
    }
    // list.push(...list)
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
  initData: function (after) {
    // var urlDep = appConfig.ApiWebContext + '/web/pageddata?model=organization'
    // var urlPeople = appConfig.ApiWebContext + '/web/pageddata?model=loc_field_staff'
    var urlEvent = appConfig.hostConfig.mapConfig.regulatory + '/web/pageddata?model=event_info'

    var bodyPeople = { 'Condition': { 'rules': [], 'groups': [], 'op': 'and' }, 'PageIndex': 1, 'PageSize': 30, 'SortName': 'ID', 'SortOrder': 'asc' }

    var that = this
    Promise.all([
    //   this.doPostDataAjax(urlDep, bodyPeople, 'depList'),
    //   this.doPostDataAjax(urlPeople, bodyPeople, 'peopleList'),
      this.doPostDataAjax(urlEvent, bodyPeople, 'alertEventList')
    ]).then(() => {
      console.log(that.data)
      if (after) {
        after()
      }
    })
  },
  checkTimeOut: function (item, _moment) {
    var timeLimit = moment(item.timeLimit, timeFormat).toDate()
    var now = _moment.toDate()
    return (timeLimit * 1 - now * 1) / 1000 < 1
  },
  getCountList: function () {
    var countList = [ 0, 0, 0, 0 ]
    var now = moment()
    var list = this.getAlertEventList()
    for (var i = 0; i < list.length; i++) {
      var element = list[i]
      var status = element.status
      if (status === 0) {
        countList[0]++ // 告警
      }
      if (status === 1 || status === 2 || status === 3) {
        countList[1]++ // 处理中
      }
      if (status !== 4 && status !== 5) {
        countList[2]++ // 未完成
      }
      if (this.checkTimeOut(element, now)) {
        countList[3]++
      }
    }
    return countList
  }
}
