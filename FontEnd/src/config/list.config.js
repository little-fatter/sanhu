/*
 * @Author: 616749285@qq.com
 * @Date: 2020-03-18 17:14:08
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-18 17:26:06
 * @Description:  所有列表形式的配置项目
 */

import {
  FORM_CONFISCATED_ITEM,
  CASE_INFO,
  LAW_PUNISHMENT_INFO,
  FORM_INQUEST_RECORD,
  CASE_REPORT,
  CASE_COVER,
  FORM_INQUIRY_RECORD_LITIGANT,
  FORM_INQUIRY_RECORD_WITNESS,
  FORM_INQUIRY_RECORD_THIRD,
  TASK_SURVEY,
  TASK_PATROL
} from './model.config'

// 表单类型
export const formTypes = [
  {
    title: '物品清单',
    model: FORM_CONFISCATED_ITEM,
    path: '',
    name: ''
  },
  {
    title: '案件详情',
    model: CASE_INFO,
    path: '',
    name: ''
  },
  {
    title: '当场处罚决定书',
    model: LAW_PUNISHMENT_INFO,
    path: '',
    name: ''
  },
  {
    title: '勘验记录',
    model: FORM_INQUEST_RECORD,
    path: '',
    name: ''
  },
  {
    title: '结案报告',
    model: CASE_REPORT,
    path: '/data-manage/form/close-person-report',
    name: ''
  },
  {
    title: '卷宗封面',
    model: CASE_COVER,
    path: '',
    name: ''
  },
  {
    title: '询问当事笔录',
    model: FORM_INQUIRY_RECORD_LITIGANT,
    path: '',
    name: ''
  },
  {
    title: '询问证人人笔录',
    model: FORM_INQUIRY_RECORD_WITNESS,
    path: '',
    name: ''
  },
  {
    title: '询问第三人笔录',
    model: FORM_INQUIRY_RECORD_THIRD,
    path: '',
    name: ''
  },
  {
    title: '现场勘查',
    model: TASK_SURVEY,
    path: '',
    name: ''
  },
  {
    title: '事件核查',
    model: TASK_PATROL,
    path: '',
    name: ''
  },
  
]