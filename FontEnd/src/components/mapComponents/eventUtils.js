import dictionary from '@/utils/dictionary'
// 事件类型优先级对应
var eventTypeLevel = dictionary.eventTypeLevel
export default {
  /**
   * 计算事件的优先级
   * @param {*} evtState 事件状态
   * @param {*} evtTypeName 事件类型
   */
  getEventLevel: function (evtState, evtTypeName) {
    if (evtState === 'unAccept') {
      return 0
    }
    return eventTypeLevel[evtTypeName] ? eventTypeLevel[evtTypeName] : 3
  }
}
