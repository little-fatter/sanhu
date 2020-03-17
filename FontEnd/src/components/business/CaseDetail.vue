<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-11 09:52:57
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-17 14:43:52
 * @Description:  案件详情
 -->

<template>
  <div class="case-detail">
    <panel hide-header :body-style="{ padding: 0 }">
      <div class="case-detail-top">
        <span class="case-detail-title">案〔2020〕3206号</span>
        <span class="case-detail-status">已结案</span>
      </div>
      <div class="case-detail-tab">
        <div
          class="case-detail-tab-item"
          v-for="(item, index) in tabs"
          :key="item"
          :class="{ active: current === index }"
          @click="current = index"
        >{{ item }}</div>
      </div>
    </panel>
    <template v-if="current === 0">
      <panel title="基本信息">
        <info-panel :data="detail" :columns="baseColumns">
          <template slot="party">
            <people-popover v-for="(item, index) in detail.LawPartys" :key="index" :data="item">
              <span class="case-detail-people">{{ item.Name }}</span>
            </people-popover>
          </template>
        </info-panel>
      </panel>
      <panel title="事件信息" v-if="detail.EventId">
        <info-panel :data="eventInfo" :columns="eventColumns" />
      </panel>
      <panel title="证据附件" :body-style="{ padding: '0 20px' }" v-if="files[0]">
        <file-review :files="files" :showImgCount="3" />
      </panel>
      <panel title="案件流程" :body-style="{ maxWidth: '800px', padding: '30px 60px' }">
        <process />
      </panel>
    </template>
    <template v-else>
      <panel hide-header v-if="caseId">
        <dossier-list :case-id="caseId" />
      </panel>
    </template>
  </div>
</template>
 
<script>
import Panel from '@/components/panel/Panel'
import FileReview from '@/components/file/FileReview'
import Process from './Process'
import InfoPanel from '@/components/info/InfoPanel'
import DossierList from './DossierList'
import PeoplePopover from './PeoplePopover'
import { getFormDetail, getDetails } from '@/api/sampleApi'
import { formatTime, formatDay } from '@/utils/util'

/**
 * 本页面调用4个接口，获取表单详情、事件信息、案件流程、案卷列表
 */

// 案件mode
const CASE_MODEL = 'case_Info'
// 事件mode
const EVENT_MODEL = 'event_info'
// 案件流程

const TABS = ['案件详情', '案卷列表']

const genBaseColumns = context => [
  {
    label: '案由',
    key: 'CauseOfAction'
  },
  {
    label: '当事人',
    slot: 'party'
  },
  {
    label: '程序',
    key: 'ApplicableProcedure',
    span: 12,
    customContent: () => {
      const arr = context.detail.ApplicableProcedure || []
      return arr[1] || '-'
    }
  },
  {
    label: '处罚决定书文号',
    key: 'PenaltyDecisionNo',
    span: 12
  },
  {
    label: '处罚种类',
    slot: 'PenaltyType',
    span: 12,
    customContent: () => {
      const arr = context.detail.PenaltyType || []
      return arr[1] || '-'
    }
  },
  {
    label: '执行情况',
    key: 'CaseDescription',
    span: 12
  },
  {
    label: '立案日期',
    key: 'CaseRegisterDay',
    span: 12,
    customContent: text => text ? formatDay(text) : ''
  },
  {
    label: '结案日期',
    key: 'CaseCloseDay',
    span: 12,
    customContent: text => text ? formatDay(text) : ''
  },
  {
    label: '办案人员',
    key: 'Investigators',
    span: 12
  },
  {
    label: '归档日期',
    key: 'OnDocDay',
    span: 12,
    customContent: text => text ? formatDay(text) : ''
  },
  {
    label: '保存期限',
    key: 'DocRetentionTimes',
    span: 12
  },
  {
    label: '归档人',
    key: 'DocPeople',
    span: 12
  },
  {
    label: '归档号',
    key: 'DocNo',
    span: 12
  }
]

const genEventColumns = context => [
  {
    label: '事发地点',
    key: 'address',
    span: 12
  },
  {
    label: '上报时间',
    key: 'reportTime',
    span: 12,
    customContent: text => text ? formatTime(text) : ''
  },
  {
    label: '事发时间',
    key: 'createTime',
    span: 12,
    customContent: text => text ? formatTime(text) : ''
  },
  {
    label: '上报人',
    key: 'reporterName',
    span: 12
  },
  {
    label: '案件类型',
    key: 'evtTypeName',
    span: 12
  },
  {
    label: '上报来源',
    key: 'ReportSource',
    span: 12
  },
  {
    label: '事件描述',
    key: 'remark'
  }
]

export default {
  components: {
    Panel,
    FileReview,
    Process,
    InfoPanel,
    DossierList,
    PeoplePopover
  },
  data () {
    this.tabs = TABS
    this.baseColumns = genBaseColumns(this)
    this.eventColumns = genEventColumns(this)
    return {
      current: 0,
      // 表单id
      caseId: null,
      // 文件列表
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
      detail: {
        // 主要信息
        MainForm: {},
        // 当事人
        LawPartys: [],
        // 处罚种类
        PenaltyType: [],
        ApplicableProcedure: [],
        Region: []
      },
      // 事件信息
      eventInfo: {}
    }
  },
  mounted () {
    this.caseId = this.$route.query.id
    this.getDetail()
  },
  methods: {
    // 获取详情
    async getDetail () {
      const data = await getFormDetail(CASE_MODEL, null, this.caseId, null)
      if (data) {
        this.detail = data
        this.detail.EventId && this.getEventDetail()
      }
    },
    // 获取事件详情
    async getEventDetail () {
      this.eventInfo = await getDetailsO(EVENT_MODEL, this.detail.EventId)
    }
  }
}
</script>

<style scoped lang="less">
.case-detail {
  & > div {
    margin-bottom: 10px;
  }
  &-top, &-tab {
    color: #222328;
  }
  &-top {
    height: 70px;
    padding: 0 20px;
    line-height: 70px;
    vertical-align: middle;
    border-bottom: 1px solid #DCDEE2;
    & > * {
      display: inline-block;
      vertical-align: middle;
    }
  }
  &-title {
    font-size: 20px;
  }
  &-status {
    margin-left: 50px;
    font-size: 20px;
    font-weight: bold;
    color: #3A9DFA;
    // 已完成
    &.completed {
      color: #1FC08E;
    }
  }
  &-tab {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    &-item {
      position: relative;
      display: inline-block;
      height: 100%;
      box-sizing: border-box;
      padding: 0 20px;
      cursor: pointer;
      transition: all .3s;
      &:before {
        content: '';
        position: absolute;
        width: 4em;
        height: 4px;
        margin-left: 50px;
        bottom: 0;
        left: -2em;
        background-color: transparent;
        border-radius: 5px;
      }
      &.active {
        color: #3A9DFA;
        &::before {
          background-color: #3A9DFA;
        }
      }
    }
  }
  &-people {
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>