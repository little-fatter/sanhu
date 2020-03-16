import { Style, Icon, Fill, Stroke, Circle, Text } from 'ol/style'
import eventUtils from '../eventUtils'
// 事件图标
import event0 from '@/assets/icons/map/event0.png'
import event1 from '@/assets/icons/map/event1.png'
import event2 from '@/assets/icons/map/event2.png'
import event3 from '@/assets/icons/map/event3.png'
// 选中状态
// import event0s from '@/assets/icons/map/event0s.png'
// import event1s from '@/assets/icons/map/event1s.png'
// import event2s from '@/assets/icons/map/event2s.png'
// import event3s from '@/assets/icons/map/event3s.png'
// 人员
// import personZhifa from '@/assets/icons/map/person_zhifa.png'
// import personXunjian from '@/assets/icons/map/person_xunjian.png'
import personZhifaBack from '@/assets/icons/map/person_zhifa_back.png'
import personXunjianBack from '@/assets/icons/map/person_xunjian_back.png'
import personBusy from '@/assets/icons/map/person_busy.png'
// 事件优先级对应图标
var eventLevelTable = [event0, event1, event2, event3]
export default {
  /**
   * 湖的样式函数
   */
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
  /**
   * 事件图层的样式函数
   * @param {*} feature
   */
  alertEventStyle: function (feature) {
    var size = feature.get('features').length
    if (size === 1) { // 非聚合
      feature = feature.get('features')[0]
      var level = this.getEventLevel(feature)
      var src = eventLevelTable[level]
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
  peopleStyle: function (feature) {
    var properties = feature.getProperties()
    var type = properties['Lawenforcer']// 1-执法者
    var src = type ? personZhifaBack : personXunjianBack
    var staffName = properties['StaffName']
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
  /**
   * 计算事件优先级
   * @param {*} feature
   */
  getEventLevel: function (feature) {
    var properties = feature.getProperties()
    var evtState = properties['evtState']
    var evtTypeName = properties['evtTypeName']
    return eventUtils.getEventLevel(evtState, evtTypeName)
  }
}
