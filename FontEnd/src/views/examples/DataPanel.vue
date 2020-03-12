<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-09 17:21:09
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-10 09:14:49
 * @Description:  通用列表数据面板组件
 -->

<template>
  <div class="list-page">
    <data-panel show-info>
      <a-form slot="filter" layout="inline">
        <a-form-item label="名称">
          <a-select
            :options="[{label: 'a', value: 1}, {label: 'b', value: 2}, {label: 'c', value: 3}]"
            placeholder="按名称模糊查询"
            style="width: 200px"></a-select>
        </a-form-item>
        <br>
        <a-form-item label="名称">
          <a-input placeholder="按名称模糊查询"></a-input>
        </a-form-item>
        <br>
        <a-form-item label="名称">
          <a-input placeholder="按名称模糊查询"></a-input>
        </a-form-item>
        <br>
        <a-form-item label="名称">
          <a-input placeholder="按名称模糊查询"></a-input>
        </a-form-item>
      </a-form>
      <template slot="action">
        <a-button type="primary" ghost>提交</a-button>
        <a-button type="primary" ghost>删除</a-button>
      </template>
      <template slot="body">
        <s-table
          ref="table"
          row-key="Id"
          size="small"
          bordered
          :columns="columns"
          :dataCallback="loadData"
        >
          <template slot="action">
            <a>查看</a>
          </template>
        </s-table>
      </template>
    </data-panel>
  </div>
</template>

<script>
import DataPanel from '@/components/business/DataPanel'
import STable from '@/components/table/'

const genColumns = context => [
  {
    title: '消息',
    dataIndex: 'a'
  },
  {
    title: '内容',
    dataIndex: 'b'
  },
  {
    title: '类型',
    dataIndex: 'c'
  },
  {
    title: '通知时间',
    dataIndex: 'd'
  },
  {
    title: '操作',
    align: 'center',
    width: 120,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  components: {
    DataPanel,
    STable
  },
  data () {
    this.columns = genColumns(this)
    return {

    }
  },
  mounted () {

  },
  methods: {
    async loadData () {
      return false
    }
  }
}
</script>

<style scoped lang="less">
.list-page {
  min-height: 100%;
  padding: 10px;
  background-color: #F6F7FB;
}
</style>