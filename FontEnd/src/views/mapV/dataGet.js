import $ from 'jquery'
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
      var reportTime = element.reportTime
      var finishLimitTime = element.finishLimitTime
      list.push({
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
  initData: function (after) {
    var urlDep = 'http://8030.gr2abce8.fhmpsbz4.8e9bcb.grapps.cn/web/pageddata?model=organization'
    var urlPeople = 'http://8030.gr2abce8.fhmpsbz4.8e9bcb.grapps.cn/web/pageddata?model=loc_field_staff'
    var urlEvent = 'http://8030.gr2abce8.fhmpsbz4.8e9bcb.grapps.cn/web/pageddata?model=event_info'

    var bodyPeople = { 'Condition': { 'rules': [], 'groups': [], 'op': 'and' }, 'PageIndex': 1, 'PageSize': 30, 'SortName': 'ID', 'SortOrder': 'asc' }

    var that = this
    Promise.all([
      this.doPostDataAjax(urlDep, bodyPeople, 'depList'),
      this.doPostDataAjax(urlPeople, bodyPeople, 'peopleList'),
      this.doPostDataAjax(urlEvent, bodyPeople, 'alertEventList')
    ]).then(() => {
      console.log(that.data)
      if (after) {
        after()
      }
    })
  }
}
