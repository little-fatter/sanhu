import { Style, Fill, Stroke, Icon } from 'ol/style'
// import appConfig from '@/config/app.config'
import alertIcon1 from '../../assets/icons/yzt/shijian/dingwei(1).png'
import alertIcon2 from '../../assets/icons/yzt/shijian/dingwei(3).png'
import alertIcon3 from '../../assets/icons/yzt/shijian/dingwei.png'
import selectIcon from '../../assets/icons/yzt/shijian/select.png'
import locationIcon from '../../assets/icons/yzt/location.png';
export default {
  name: 'styleTable',
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
    alertIcon1, // 任务未接受
    alertIcon2, // 任务已接受
    alertIcon3 // 任务已完成
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
          src: selectIcon
          // scale: 1.5
        })
      }),
      this.alertEventStyle(feature)
    ]
  },
  locationLayerStyle: function (feature) {
    return new Style({
      image: new Icon({
        anchor: [0.5, 0.875],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: locationIcon,
        scale: 0.5
      })
    })
  }
}
