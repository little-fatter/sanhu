import moment from 'moment'

import gisUtils from '@/utils/gisUtils'
import dictionary from '@/utils/dictionary'
import { postHttp, getHttp } from '@/utils/apiRequest'
import appConfig from '@/config/app.config'
import { isEmpty } from '@/utils/util'
// 事件状态对应
var timeFormat = dictionary.timeFormat
/**
 * 前端数据中心，临时保存数据
 */
export default {
  /**
   * 存储各类数据
   */
  data: {
    /**
     * 执法/巡检人员
     */
    peopleList: {
      Records: [],
      Total: []
    },
    /**
     * 部门
     */
    depList: {},
    /**
     * 事件
     */
    alertEventList: {},
    wurenjiList: {},
    shexiangtouList: {},
    /**
     * 记录所有人员的位置(临时使用)
     */
    peopleLocation: {}
  },
  /**
   * 发起 post请求，返回Promise对象
   * @param {*} url api的url
   * @param {*} params query参数部分
   * @param {*} body body
   * @param {*} dataKey 数据存储data对象中的对象名
   */
  doPostDataAjax: function (url, params, body, dataKey) {
    var that = this
    return new Promise((resolve, reject) => {
      postHttp(
        {
          url: url,
          params: params,
          data: body
        }
      ).then(function (res) {
        that.data[dataKey] = res
        resolve()
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },
  /**
   * 从接口获取人员列表
   */
  doPostPeopleListAjax: function () {
    var that = this
    var url = appConfig.ApiWebContext + '/web/api'
    var body = {
      'id': 'CHECKSTAFFLIST',
      'model': 'user_info',
      'data': '',
      'context': ''
    }
    return new Promise((resolve, reject) => {
      postHttp(
        {
          url: url,
          params: {},
          data: body
        }
      ).then(function (res) {
        if (!res.Success) {
          resolve()
          return
        }
        that.data.peopleList.Records.length = 0
        that.data.peopleList.Records.push(...res.data)
        that.data.peopleList.Total = res.data.length
        resolve()
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },
  /**
   * 读取peopleLocation.location中的人员位置
   */
  doGetPeopleLocationAjax: function () {
    var that = this
    var url = appConfig.StaticWebContext + '/json/peopleLocation.json'
    return new Promise((resolve, reject) => {
      getHttp(
        {
          url: url,
          params: {}
        }
      ).then(function (res) {
        that.data.peopleLocation = res
        resolve()
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },
  /**
   * 从接口获取事件的默认处理人
   * @param {*} indexInAlertList data.alertEventList.Records 中的索引
   */
  doPostAlertEventAjaxGetDealerName: function (indexInAlertList) {
    // var that = this
    var alertEventListItem = this.data.alertEventList.Records[indexInAlertList]
    var url = appConfig.ApiWebContext + '/web/api'
    var eventId = alertEventListItem.OriginalID
    var body = {
      'id': 'SFAPI',
      'model': 'cross_domain',
      'data': { 'ObjId': eventId, 'ApiType': 'ess_evt_resp_user' }
    }
    return new Promise((resolve, reject) => {
      postHttp(
        {
          url: url,
          params: {},
          data: body
        }
      ).then(function (res) {
        if (!res.data) {
          resolve()
          return
        }
        var data = JSON.parse(res.data)
        if (gisUtils.hasKey(data, 'successful')) {
          // successful 是四方德信接口返回的结果字段，接口出错才有
          resolve()
          return
        }
        alertEventListItem['Dealers'] = data
        resolve()
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },
  /**
   * 从接口获取事件的进度列表
   * @param {*} indexInAlertList data.alertEventList.Records 中的索引
   */
  doPostAlertEventAjaxGetEventLog: function (indexInAlertList) {
    var alertEventListItem = this.data.alertEventList.Records[indexInAlertList]
    var url = appConfig.ApiWebContext + '/web/api'
    var eventId = alertEventListItem.OriginalID
    var body = {
      'id': 'SFAPI',
      'model': 'cross_domain',
      'data': { 'ObjId': eventId, 'ApiType': 'ess_evt_logs' }
    }
    return new Promise((resolve, reject) => {
      postHttp(
        {
          url: url,
          params: {},
          data: body
        }
      ).then(function (res) {
        if (!res.data) {
          resolve()
          return
        }
        var data = JSON.parse(res.data)
        if (gisUtils.hasKey(data, 'successful')) {
          // successful 是四方德信接口返回的结果字段，接口出错才有
          resolve()
          return
        }
        var logs = data
        logs.sort(function (a, b) {
          return b.createTime - a.createTime
        })
        alertEventListItem['logs'] = logs
        resolve()
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },
  /**
   * 任务派发
   * @param {*} AssignUsers 执行人id
   * @param {*} TaskContent 任务描述
   * @param {*} EventInfoId 事件id
   * @param {*} ExpectedCompletionTime 期望完成时间
   * @param {*} workaddress 主办人部门
   * @param {*} MainHandler 主办人姓名
   * @param {*} CoOrganizer 协办人姓名
   */
  doPostTastHandout: function (AssignUsers, TaskContent, EventInfoId, ExpectedCompletionTime, workaddress, MainHandler, CoOrganizer) {
    var url = appConfig.ApiWebContext + '/web/api'
    var RemoteLinks = appConfig.AppHost + 'eventCheckCreate'
    var data = {
      'TaskType': 'EventCheck', // 任务类型
      'AssignUsers': AssignUsers, // 执行人
      'RemoteLinks': RemoteLinks, // 钉钉url连接
      'TaskContent': TaskContent, // 任务描述
      'EventInfoId': EventInfoId, // 事件id
      // 'CaseID': '', // 案件id
      'ExpectedCompletionTime': ExpectedCompletionTime, // 期望完成时间
      'workaddress': workaddress, // 主办人部门
      'MainHandler': MainHandler, // 主办人
      'CoOrganizer': CoOrganizer // 协办人
    }

    var body = '{"id": "create","model": "work_task","data":\'' + JSON.stringify(data) + '\'}'
    console.log('body', body)
    return new Promise((resolve, reject) => {
      postHttp(
        {
          url: url,
          params: {},
          data: body
        }
      ).then(function (res) {
        console.log('doPostTastHandout', res)
        resolve()
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },
  /**
   * 构建前端需要的事件列表
   */
  getAlertEventList: function () {
    var list = []
    var Records = this.data.alertEventList.Records
    for (let i = 0; i < Records.length; i++) {
      const element = Records[i]
      var lng = element.lng
      var lat = element.lat
      var _p = gisUtils.baiduToWGS84(lng, lat)
      var finishLimitTime = element.finishLimitTime ? element.finishLimitTime : moment().add(10, 'minutes').format(timeFormat)
      // var dealerName = isEmpty(element.dealerName) ? '' : element.dealerName
      // var dealerName = isEmpty(element.Dealers) || isEmpty(element.Dealers[0].realName) ? '' : element.Dealers[0].realName
      var dep = isEmpty(element.Dealers) ? undefined : this.findDepById(element.Dealers[0].deptId)
      var depName = dep ? dep['Name'] : ''
      var evtFileUrl = isEmpty(element.evtFileUrl) ? '' : element.evtFileUrl.split(',')[0]
      var logs = element.logs
      list.push({
        id: element.OriginalID,
        evtState: element.evtState, // 事件状态
        evtTypeName: element.evtTypeDisplayName, // 事件类型
        reportType: element.reportType, // 上报类型
        lng: _p.lon,
        lat: _p.lat,
        reportTime: element.reportTime, // 上报时间
        finishLimitTime: finishLimitTime, // 流转时限
        countdown: '00:00:00', // 倒计时,
        dep: depName, // 处理人部门
        dealerName: element.dealerName, // 处理人姓名
        evtFileUrl: evtFileUrl, // 上报图片
        remark: element.remark, // 描述
        address: element.address, // 地点
        logs: logs // 事件进度列表
      })
    }
    return list
  },
  /**
   * 根据id查找部门
   * @param {*} id
   */
  findDepById: function (id) {
    for (let i = 0; i < this.data.depList.Records.length; i++) {
      const row = this.data.depList.Records[i]
      if (row.Id === id) {
        return row
      }
    }
  },
  /**
   * 构建前端需要的人员列表
   */
  getPeopleList: function () {
    var list = []
    var Records = this.data.peopleList.Records
    var depMap = {}
    var depNames = []
    for (let i = 0; i < Records.length; i++) {
      const element = Records[i]
      var depIndex = i
      var depName = element.Organization
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
      var StaffName = element.userName
      // var Longitude = element.Longitude
      // var Latitude = element.Latitude
      var ID = element.userId

      depMap[depName].list.push({
        id: ID,
        type: 1, // 1-执法，0-巡检
        StaffName: StaffName, // 姓名
        depName: depName, // 部门名称
        online: i % 2 === 0 // 模拟在线状态
        // location: [Longitude, Latitude],
        // isBusy: i % 2 === 0 // 模拟忙碌状态
      })
    }
    depNames = [...new Set(depNames)]
    list = depNames.map(x => depMap[x])
    return list
  },
  /**
   * 构建地图图层需要的人员列表
   */
  getPeopleListForMap: function () {
    var Records = this.data.peopleList.Records
    for (let i = 0; i < Records.length; i++) {
      const element = Records[i]
      element['isBusy'] = i % 2 === 0
      // 模拟 人员位置
      var location = this.getLocationByPersonName(element.userName)
      if (!location) {
        location = [0, 0]
      }
      var Longitude = location[0]
      var Latitude = location[1]
      element.Longitude = Longitude
      element.Latitude = Latitude
    }
    return Records
  },
  /**
   * 根据人员名称获取位置
   * @param {*} name 人员名称
   */
  getLocationByPersonName: function (name) {
    return this.data.peopleLocation[name]
  },
  /**
   * 根据人员姓名查询人员信息
   * @param {*} name 人员姓名
   */
  findPersonByName: function (name) {
    for (var i = 0; i < this.data.peopleList.Records.length; i++) {
      var element = this.data.peopleList.Records[i]
      if (element.userName === name) {
        return element
      }
    }
  },
  /**
   * 事件统计
   */
  getCountList: function () {
    var countList = [0, 0, 0, 0]
    var now = moment()
    var Records = this.data.alertEventList.Records
    for (var i = 0; i < Records.length; i++) {
      var element = Records[i]
      var evtState = element.evtState
      if (evtState === 'unAccept') {
        countList[0]++ // 告警
      }
      if (evtState === 'doing') {
        countList[1]++ // 处理中
      }
      countList[2]++ // 未完成
      if (this.checkTimeOut(element.finishLimitTime, now)) {
        countList[3]++
      }
    }
    return countList
  },
  /**
   * 判断是否超时
   * @param {*} _timeLimit
   * @param {*} _moment
   */
  checkTimeOut: function (_timeLimit, _moment) {
    var timeLimit = moment(_timeLimit, timeFormat).toDate()
    var now = _moment.toDate()
    return (timeLimit * 1 - now * 1) / 1000 < 1
  },
  /**
   * 初始化数据
   * @param {*} after 后续执行函数
   */
  initData: function (after) {
    var urlApi = appConfig.ApiWebContext + '/web/pageddata'
    var bodyNotDoneAlert = { 'Condition': { 'rules': [], 'groups': [{ 'rules': [{ 'field': 'evtState', 'op': 'notequal', 'value': 'done', 'type': 'string' }], 'op': 'and' }], 'op': 'and' }, 'PageIndex': 1, 'PageSize': '50', 'SortName': 'objId', 'SortOrder': 'asc' }
    var bodyAllDep = { 'Condition': { 'rules': [], 'groups': [], 'op': 'and' }, 'PageIndex': 1, 'PageSize': '50' }
    var that = this
    Promise.all([
      this.doPostDataAjax(urlApi, { model: 'event_info' }, bodyNotDoneAlert, 'alertEventList'),
      this.doPostPeopleListAjax(),
      this.doGetPeopleLocationAjax(),
      this.doPostDataAjax(urlApi, { model: 'organization' }, bodyAllDep, 'depList')
    ]).then(() => {
      // 获取默认处理人
      // var promiseListGetDealer = that.data.alertEventList.Records.map(function (row, index) {
      //   return that.doPostAlertEventAjaxGetDealerName(index)
      // })
      // 获取事件进度列表
      var promiseListGetEventLog = that.data.alertEventList.Records.map(function (row, index) {
        return that.doPostAlertEventAjaxGetEventLog(index)
      })
      var promiseList = []
      // promiseList.push(...promiseListGetDealer)
      promiseList.push(...promiseListGetEventLog)
      Promise.all(promiseList).then(() => {
        console.log('dataGet', that.data)
        if (after) {
          after()
        }
      }, () => {
        if (after) {
          after()
        }
      })
    })
  }
}
