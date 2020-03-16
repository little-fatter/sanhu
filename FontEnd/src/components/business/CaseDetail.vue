<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-11 09:52:57
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-13 17:31:34
 * @Description:  案件详情
 -->

<template>
  <div class="case-detail">
    <panel hide-header>
      <div class="case-detail-top">
        <span class="case-detail-title">案〔2020〕3206号</span>
        <span class="case-detail-status">已结案</span>
      </div>
      <div class="case-detail-tab">
        <div>案件详情</div>
        <div>案卷列表</div>
      </div>
    </panel>
    <panel title="基本信息">
      <info-panel :data="baseinfo" :columns="baseColumns" />
    </panel>
    <panel title="事件信息">
      <info-panel :data="eventinfo" :columns="eventColumns" />
    </panel>
    <panel title="证据附件" :body-style="{ padding: 0 }">
      <file-review :files="files" :showImgCount="3" />
    </panel>
    <panel title="审批流程" :body-style="{ maxWidth: '800px', padding: '30px 60px' }">
      <approval-process />
    </panel>
  </div>
</template>

<script>
import Panel from '@/components/panel/Panel'
import FileReview from '@/components/file/FileReview'
import ApprovalProcess from './ApprovalProcess'
import InfoPanel from '@/components/info/InfoPanel'

const baseColumns = [
  {
    label: '案由',
    key: 'a'
  },
  {
    label: '程序',
    key: 'a',
    span: 12
  },
  {
    label: '当事人',
    key: 'a',
    span: 12
  },
  {
    label: '处罚决定书文号',
    span: 12
  },
  {
    label: '触发种类',
    key: 'a',
    span: 12
  },
  {
    label: '执行情况',
    key: 'a',
    span: 12
  },
  {
    label: '立案日期',
    key: 'a',
    span: 12
  },
  {
    label: '结案日期',
    key: 'a',
    span: 12
  },
  {
    label: '办案人员',
    key: 'a',
    span: 12
  },
  {
    label: '归档日期',
    key: 'a',
    span: 12
  },
  {
    label: '保存期限',
    key: 'a',
    span: 12
  },
  {
    label: '归档人',
    key: 'a',
    span: 12
  },
  {
    label: '归档好',
    key: 'a',
    span: 12
  }
]

const eventColumns = [
  {
    label: '事发地点',
    key: 'a',
    span: 12
  },
  {
    label: '上报时间',
    key: 'a',
    span: 12
  },
  {
    label: '事发时间',
    key: 'a',
    span: 12
  },
  {
    label: '上报人',
    key: 'a',
    span: 12
  },
  {
    label: '案件类型',
    key: 'a',
    span: 12
  },
  {
    label: '上报来源',
    key: 'a',
    span: 12
  },
  {
    label: '事件描述',
    key: 'a'
  }
]

export default {
  components: {
    Panel,
    FileReview,
    ApprovalProcess,
    InfoPanel
  },
  data () {
    this.baseColumns = baseColumns
    this.eventColumns = eventColumns
    return {
      files: [
        {
          title: '污染源.jpg',
          path: 'http://ci.biketo.com/d/file/news/bikenews/2020-03-04/6457641638b8ee17a95c930d624f63a3.png'
        },
        {
          title: '污染源.jpg',
          path: 'http://ci.biketo.com/d/file/news/bikenews/2020-03-05/a8801141956d617cda49c85c9c3f4627.jpg'
        },
        {
          title: '污染源.jpg',
          path: 'http://ci.biketo.com/d/file/news/girl/2020-03-07/7d2de48e737e6249a479e2b6f211050a.jpg'
        },
        {
          title: '污染源.jpg',
          path: 'http://ci.biketo.com/d/file/news/bikenews/2020-03-07/dd3f1d954fcafa8f93135b47f8b5fd75.jpg'
        },
        {
          title: '执法附件  抚仙湖政府管理决策法规第367条',
          path: 'http://ci.biketo.com/d/file/news/bikenews/2020-03-04/6457641638b8ee17a95c930d624f63a3.png'
        },
        {
          title: '执法附件  抚仙湖政府管理决策法规第367条',
          path: 'http://ci.biketo.com/d/file/news/bikenews/2020-03-07/dd3f1d954fcafa8f93135b47f8b5fd75.jpg'
        }
      ],
      baseinfo: {},
      eventinfo: {}
    }
  }
}
</script>

<style scoped lang="less">
.case-detail {
  & > div {
    margin-bottom: 10px;
  }
  &-header {

  }
}
</style>