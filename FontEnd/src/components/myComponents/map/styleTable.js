import { Style, Icon, Fill, Stroke, Circle } from 'ol/style'

export default {
  selectIson: '/img/yzt-shijian/select.png',
  layerShow: {
    peopleLayer: {
      active: true,
      subs: [
        {
          index: 0,
          title: '执法人员',
          active: true
        },
        {
          index: 1,
          title: '巡检人员',
          active: true
        }
      ]
    },
    equipmentLayer: {
      active: true,
      subs: [
        {
          index: 0,
          title: 'AI摄像头',
          active: true
        },
        {
          index: 1,
          title: '无人机',
          active: true
        }
      ]
    },
    alertEventLayer: {
      active: true,
      subs: [
      ]
    },
    shipLayer: {
      active: true,
      subs: [
        {
          index: 0,
          title: '渔船',
          active: true
        },
        {
          index: 1,
          title: '游船',
          active: true
        }
      ]
    },
    heatLayer: {
      active: true,
      subs: []
    }
    // heatLayer: {
    //   active: true,
    //   subs: []
    // }
  },
  peopleIcons: [
    '/img/yzt-renyuanceng/renyuan1.png', // 执法人员
    '/img/yzt-renyuanceng/renyuan2.png', // 巡检人员
    '/img/yzt-renyuanceng/renyuan1s.png', // 选择状态执法人员
    '/img/yzt-renyuanceng/renyuan2s.png' // 选择状态巡检人员
  ],
  evtStateMap: {
    list: ['待处理', '事件核查中', '跟踪整改中', '现场勘察中', '处理完成', '转为案件办理'],
    map: {
      '待处理': 0,
      '事件核查中': 1,
      '跟踪整改中': 2,
      '现场勘察中': 3,
      '处理完成': 4,
      '转为案件办理': 5
    },
    level: {
      '待处理': 0,
      '事件核查中': 1,
      '跟踪整改中': 1,
      '现场勘察中': 1,
      '处理完成': 2,
      '转为案件办理': 2
    }
  },
  alertEventIcons: [
    '/img/yzt-shijian/dingwei(1).png', // 任务未接受
    '/img/yzt-shijian/dingwei(3).png', // 任务已接受
    '/img/yzt-shijian/dingwei.png', // 任务已完成
    '/img/yzt-shijian/dingwei(2).png', // 任务失败
    '/img/yzt-shijian/dingwei_w.png' // 任务失败
  ],
  equipmentIcons: [
    '/img/yzt-shebei/sxt.png', // 摄像头
    '/img/yzt-shebei/wrj1.png', // 起飞无人机
    '/img/yzt-shebei/wrj2.png', // 待飞无人机
    '/img/yzt-shebei/sxt_s.png', // 选中状态
    '/img/yzt-shebei/wrj1_s.png', //
    '/img/yzt-shebei/wrj2_s.png' //
  ],
  equipmentTypes: [
    '摄像头', '无人机'
  ],
  shipIcons: ['/img/yzt-ship/fish-ship.png', '/img/yzt-ship/ship.png'],
  lakeStyle: function () {
    return new Style({
      fill: new Fill({
        color: [0, 0, 0, 0]
      }),
      stroke: new Stroke({
        color: '#2196f3',
        width: 3
      })
    })
  },
  peopleLayerStyle: function (feature) {
    var type = feature.getProperties()['teamType']
    var src = this.peopleIcons[type]
    var show = this.layerShow.peopleLayer.subs[type].active
    if (!show) return undefined

    return new Style({
      image: new Icon({
        anchor: [0.5, 0.86],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: src
        // scale: 0.3
      })
    })
  },
  peopleLayerSelectedStyle: function (feature) {
    var type = feature.getProperties()['teamType']
    var src = this.peopleIcons[type + 2]
    return new Style({
      image: new Icon({
        anchor: [0.5, 0.63],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: src
        // scale: 0.3
      })
    })
  },
  alertEventStyle: function (feature) {
    var status = feature.getProperties()['status']
    var statusName = this.evtStateMap.list[status]
    var index = this.evtStateMap.level[statusName]
    var src = this.alertEventIcons[index]
    return new Style({
      image: new Icon({
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: src,
        scale: 1.5
      })
    })
  },
  alertEventSelectedStyle: function (feature) {
    return [
      new Style({
        image: new Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          src: this.selectIson
          // scale: 1.5
        })
      }),
      this.alertEventStyle(feature)
    ]
  },
  equipmentStyle: function (feature) {
    var type = feature.getProperties()['typeIndex']
    var show = this.layerShow.equipmentLayer.subs[type].active
    if (!show) return undefined
    var online = feature.getProperties()['online']
    var srcIndex = 0
    if (type === 0) {
      srcIndex = 0
    } else if (online) {
      srcIndex = 1
    } else {
      srcIndex = 2
    }
    var src = this.equipmentIcons[srcIndex]
    return new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: src,
        scale: 1
      })
    })
  },
  equipmentSelectedStyle: function (feature) {
    var type = feature.getProperties()['typeIndex']
    var online = feature.getProperties()['online']
    var srcIndex = 3
    if (type === 0) {
      srcIndex = 3
    } else if (online) {
      srcIndex = 4
    } else {
      srcIndex = 5
    }
    var src = this.equipmentIcons[srcIndex]
    return new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: src,
        scale: 1
      })
    })
  },
  shipStyle: function (feature) {
    var type = feature.getProperties().type
    var show = this.layerShow.shipLayer.subs[type].active
    if (!show) return undefined
    var src = this.shipIcons[type]
    return new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: src,
        scale: 0.5
      })
    })
  },
  shipSelectedStyle: function (feature) {
    return [
      new Style({
        image: new Circle({
          radius: 40,
          fill: new Fill({
            color: [49, 167, 235, 0.2]
          })
        })
      }),
      new Style({
        image: new Circle({
          radius: 20,
          fill: new Fill({
            color: [47, 167, 239, 0.2]
          })
        })
      }),
      this.shipStyle(feature)
    ]
  },
  pathLayerStyle: function (feature) {
    var name = feature.getProperties().name
    if (name === 'featureBefore') {
      var outlineStroke = new Style({
        stroke: new Stroke({
          color: [204, 204, 255, 1],
          width: 5
        })
      })
      var animationStrokeStyle = new Style({
        stroke: new Stroke({
          color: '#ffeb3b',
          width: 5,
          lineDash: [4, 16],
          // lineDash: [2, 4],
          lineDashOffset: feature.dashOffset
        })
      })
      return [outlineStroke, animationStrokeStyle]
    } else {
      return [
        new Style({
          stroke: new Stroke({
            color: [204, 204, 255, 1],
            width: 5
          })
        }), new Style({
          stroke: new Stroke({
            color: [25, 25, 255, 1],
            width: 5,
            lineDash: [4, 16],
            lineDashOffset: 0
          })
        })
      ]
    }
  },
  regionLayerStyle: function (feature) {
    return new Style({
      fill: new Fill({
        color: [0, 0, 255, 0.3]
      }),
      stroke: new Stroke({
        color: [0, 0, 255, 1],
        width: 3
      })
    })
  }
}
