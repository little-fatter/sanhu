<template>
  <div style="width: 80%;margin: 10px auto" v-cloak>
    <s-table
      ref="table"
      size="default"
      rowKey="ID"
      :rowClassName="getRowName"
      :columns="columns"
      :dataCallback="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
    ></s-table>
  </div>
</template>

<script>
import STable from '@/components/table/'
import { getFormList } from '@/api/sampleApi'
export default {
  components: {
    STable
  },
  data () {
    return {
      selectedRowKeys: [],
      selectedRows: [],
      // 定义选择项
      rowSelection: {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      },
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      columns: [
        {
          title: '',
          dataIndex: '',
          className: 'backColorType',
          align: 'center'
        }, {
          title: '表单编号',
          dataIndex: 'FormID',
          className: 'backColorType',
          align: 'center'
        }, {
          title: '表单标题',
          dataIndex: 'FormName',
          className: 'backColorType',
          align: 'center'
        }, {
          title: '表单摘要',
          dataIndex: 'ContentValidity',
          className: 'backColorType',
          align: 'center'
        }, {
          title: '发起时间',
          dataIndex: 'InitiationTime',
          className: 'backColorType',
          align: 'center'
        }, {
          title: '完成时间',
          dataIndex: 'CompletionTime',
          className: 'backColorType',
          align: 'center'
        }, {
          title: '状态',
          dataIndex: 'FormState',
          className: 'backColorType',
          align: 'center'
        }],
      loadData: () => {
        return getFormList().then(res => {
          // this.data = res.Rows
          console.log('data -> res.Rows', res)
          res.Rows.pop()
          return res
        }).catch(err => {
          console.log(err)
        })
      }
      // 选择项回调函数

    }
  },
  mounted () {
    this.options = {
      alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
      rowSelection: {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    getRowName (record, index) {
      return index % 2 === 0 ? 'row-readed' : ''
    }
  }
}
</script>

<style>

</style>
