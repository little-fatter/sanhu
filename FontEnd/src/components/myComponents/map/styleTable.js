import { Style, Icon, Fill, Stroke, Circle, Text } from 'ol/style'
import appConfig from '@/config/app.config'
// 事件图标
import event0 from '@/assets/icons/map/event0.png'
import event1 from '@/assets/icons/map/event1.png'
import event2 from '@/assets/icons/map/event2.png'
import event3 from '@/assets/icons/map/event3.png'
// 人员
import personZhifa from '@/assets/icons/map/person_zhifa.png'
import personXunjian from '@/assets/icons/map/person_xunjian.png'
import personZhifaBack from '@/assets/icons/map/person_zhifa_back.png'
import personXunjianBack from '@/assets/icons/map/person_xunjian_back.png'
import personBusy from '@/assets/icons/map/person_busy.png'
// 设备图标
import daifei from '@/assets/icons/map/daifei.png'
import shexiangtou from '@/assets/icons/map/shexiangtou.png'
import wurenji from '@/assets/icons/map/wurenji.png'
// 船只
import youchuan from '@/assets/icons/map/youchuan.png'
import yuchuan from '@/assets/icons/map/yuchuan.png'
// 选中状态
import selectB from '@/assets/icons/map/select-b.png'
import selectG from '@/assets/icons/map/select-g.png'
import event0s from '@/assets/icons/map/event0s.png'
import event1s from '@/assets/icons/map/event1s.png'
import event2s from '@/assets/icons/map/event2s.png'
import event3s from '@/assets/icons/map/event3s.png'

export default {
  mapApp: {},
  selectIson: appConfig.StaticWebContext + '/img/yzt-shijian/select.png',
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
    // appConfig.StaticWebContext + '/img/yzt-renyuanceng/renyuan1.png', // 执法人员
    // appConfig.StaticWebContext + '/img/yzt-renyuanceng/renyuan2.png' // 巡检人员
    // personZhifa, personXunjian, selectG, selectG
    personZhifaBack, personXunjianBack, event2s, event3s
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
      '转为案件办理': 3
    }
  },
  alertEventIcons: [
    // appConfig.StaticWebContext + '/img/yzt-shijian/dingwei(1).png', // 任务未接受
    // appConfig.StaticWebContext + '/img/yzt-shijian/dingwei(3).png', // 任务已接受
    // appConfig.StaticWebContext + '/img/yzt-shijian/dingwei.png', // 任务已完成
    // appConfig.StaticWebContext + '/img/yzt-shijian/dingwei(2).png', // 任务失败
    // appConfig.StaticWebContext + '/img/yzt-shijian/dingwei_w.png' // 任务失败
    event0, event1, event2, event3, event0s, event1s, event2s, event3s
  ],
  equipmentIcons: [
    // appConfig.StaticWebContext + '/img/yzt-shebei/sxt.png', // 摄像头
    // appConfig.StaticWebContext + '/img/yzt-shebei/wrj1.png', // 起飞无人机
    // appConfig.StaticWebContext + '/img/yzt-shebei/wrj2.png', // 待飞无人机
    // appConfig.StaticWebContext + '/img/yzt-shebei/sxt_s.png', // 选中状态
    // appConfig.StaticWebContext + '/img/yzt-shebei/wrj1_s.png', //
    // appConfig.StaticWebContext + '/img/yzt-shebei/wrj2_s.png' //
    shexiangtou, wurenji, daifei
  ],
  equipmentTypes: [
    '摄像头', '无人机'
  ],
  shipIcons: [
    // appConfig.StaticWebContext + '/img/yzt-ship/fish-ship.png',
    // appConfig.StaticWebContext + '/img/yzt-ship/ship.png'
    yuchuan, youchuan
  ],
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
    var staffName = feature.getProperties()['name']
    var lastName = staffName ? staffName[0] : ''
    var isBusy = true
    var styles = [new Style({
      image: new Icon({
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: src,
        scale: 1
      }),
      text: new Text({
        text: lastName,
        font: '18px bolder',
        // offsetX: 0,
        offsetY: -22.5,
        fill: new Fill({
          color: '#fff'
        })
      })
    })]
    if (isBusy) {
      styles.push(new Style({
        image: new Icon({
          anchor: [-0.5, 1.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          src: personBusy,
          scale: 1
        })
      }))
    }
    return styles
  },
  peopleLayerSelectedStyle: function (feature) {
    var type = feature.getProperties()['teamType']
    var src = this.peopleIcons[type + 2]
    return [new Style({
      image: new Icon({
        anchor: [0.5, 0.63],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: src,
        scale: 1.2
      })
    }), ...this.peopleLayerStyle(feature)]
  },
  alertEventStyle: function (feature) {
    var size = feature.get('features').length
    if (size === 1) {
      feature = feature.get('features')[0]
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
          scale: 1.2
        })
      })
    } else {
      return new Style({
        image: new Circle({
          radius: 20,
          stroke: new Stroke({
            color: '#fff'
          }),
          fill: new Fill({
            color: '#3399CC'
          })
        }),
        text: new Text({
          text: size.toString(),
          fill: new Fill({
            color: '#fff'
          })
        })
      })
    }
  },
  alertEventSelectedStyle: function (feature) {
    console.log(feature.get('features'))
    if (feature.get('features').length > 1) { // 聚合
      return this.alertEventStyle(feature)
    }
    var feature1 = feature.get('features')[0]
    var status = feature1.getProperties()['status']
    var statusName = this.evtStateMap.list[status]
    var index = this.evtStateMap.level[statusName]
    var src = this.alertEventIcons[index + 4]
    return [
      new Style({
        image: new Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          src: src,
          scale: 1.2
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
        scale: 1.2
      })
    })
  },
  equipmentSelectedStyle: function (feature) {
    var type = feature.getProperties()['typeIndex']
    var src = selectG
    if (type === 0) {
      src = selectG
    } else {
      src = selectB
    }

    return [new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: src,
        scale: 1.2
      })
    }), this.equipmentStyle(feature)]
    // return new Style({
    //   image: new Icon({
    //     anchor: [0.5, 0.5],
    //     anchorXUnits: 'fraction',
    //     anchorYUnits: 'fraction',
    //     src: src,
    //     scale: 1
    //   })
    // })
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
        scale: 1.2
      })
    })
  },
  shipSelectedStyle: function (feature) {
    var type = feature.getProperties().type
    var src = type === 0 ? selectG : selectB
    return [
      new Style({
        image: new Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          src: src,
          scale: 1
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
        color: [31, 192, 142, 0.2]
      }),
      stroke: new Stroke({
        color: [31, 192, 142, 1],
        width: 3,
        lineDash: [4, 16]
      })
    })
  },
  redLineLayerStyle: function (feature) {
    return new Style({
      fill: new Fill({
        color: [255, 255, 255, 0.1]
      }),
      stroke: new Stroke({
        color: '#f65d4d',
        width: 1
      })
    })
  }
}
