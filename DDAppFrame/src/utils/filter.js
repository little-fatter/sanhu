/**
 * 定义自定义管道
 */
import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { isNotEmpty } from './util'
moment.locale('zh-cn')

/**
 * 金额数字管道
 */
Vue.filter('NumberFormat', function (value) {
  if (!value) {
    return '0'
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})

/**
 * 日期管道
 */
Vue.filter('dayjs', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  if (isNotEmpty(dataStr)) {
    return moment(dataStr).format(pattern)
  } else {
    return ''
  }
})

/**
 * 数字管道
 */
Vue.filter('DecimalFormat', function (value) {
  if (value !== 0 && !value) {
    return '--'
  }
  const intPartFormat = value.toFixed(2).toString()
  return intPartFormat
})
