<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-16 14:12:03
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-16 14:36:07
 * @Description:  案卷列表
 -->

<template>
  <s-table ref="table" :columns="columns" :data-callback="loadData">
    <template slot="action" slot-scope="text, record">
      <a @click="viewItem(record)">查看</a>
    </template>
  </s-table>
</template>

<script>
import STable from '@/components/table/'
import { getPageData } from '@/api/sampleApi'
import { FORMWITH_EVENTCASE } from '@/config/model.config'

// 生成查询规则
const genRule = context => ({
  rules: [
    {
      field: 'CaseId',
      op: 'equal',
      value: context.id,
      type: 'string'
    }
  ],
  op: 'and'
})

// 生成查询案卷列表规则
const genCaseFileRule = context => ({
  rules: [
    {
      field: 'CaseId',
      op: 'equal',
      value: context.caseId,
      type: 'string'
    }
  ],
  op: 'and'
})

// 生成案卷列表表头
const genColumns = context => [
  {
    title: '文件名称',
    dataIndex: 'FormName',
    customRender: text => text || '-'
  },
  {
    title: '创建时间',
    dataIndex: 'InitiationTime',
    width: 120,
    customRender: text => formatTime(text)
  },
  {
    title: '最后更新时间',
    width: 120,
    dataIndex: 'ModifyDate',
    customRender: text => formatTime(text)
  },
  {
    title: '创建人',
    width: 120,
    dataIndex: 'OriginatorID'
  },
  {
    title: '查看',
    width: 100,
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  components: {
    STable
  },
  props: {
    caseId: {
      type: String,
      required: true
    }
  },
  data () {
    this.columns = genColumns(this)
    return {

    }
  },
  methods: {
    // 获取案卷列表
    loadData ({ pageIndex, pageSize }) {
      return getPageData(FORMWITH_EVENTCASE, genCaseFileRule(this), pageIndex, pageSize)
    },
    // 查看
    viewItem (record) {

    }
  }
}
</script>

<style>

</style>
