import eventListLevel0 from '@/assets/icons/eventList/zhuyi.png'
import eventListLevel1 from '@/assets/icons/eventList/zhuyi(1).png'
import eventListLevel2 from '@/assets/icons/eventList/zhuyi(2).png'
import eventListLevel3 from '@/assets/icons/eventList/zhuyi(3).png'

export default {
  // 事件上报来源
  'reportType': {
    'DD_REPORT': '钉钉',
    'APP_REPORT': 'APP上报',
    'WX_REPORT': '微信',
    'OTHER': '其他',
    'AI_REPORT': 'AI告警'
  },
  // 事件状态信息(接口)
  eventStateMap: {
    unAccept: 0,
    doing: 1,
    done: 4
  },
  eventStateNameMap: {
    unAccept: '待受理',
    doing: '处理中',
    done: '已处理'
  },
  // 事件状态信息(旧)
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
  // 事件等级划分,列表中的标题图标，状态颜色
  eventLevelTable: [
    {
      src: eventListLevel0,
      title: '紧急',
      color: '#F65D4D'
    },
    {
      src: eventListLevel1,
      title: '一级',
      color: '#FF8405'
    },
    {
      src: eventListLevel2,
      title: '二级',
      color: '#1FC08E'
    },
    {
      src: eventListLevel3,
      title: '三级',
      color: '#3A9DFA'
    }
  ],
  // 事件类型和优先级对应
  eventTypeLevel: {
    '综合执法': 1,
    '环境污染': 1,
    '污水处理厂': 2,
    '生活垃圾': 2,
    '园林绿化': 3,
    '河道湖道': 3,
    '河面保洁': 3
  },
  timeFormat: 'YYYY-MM-DD HH:mm:ss',
  timeFormat1: 'YYYYMMDDHHmmss'
}
