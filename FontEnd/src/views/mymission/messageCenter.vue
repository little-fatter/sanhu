<style lang="less" scoped>

@import '~@assets/css/mixins.less';

@wholeMargin: 16px;
@fontColor: #1989FA;

.center-wrapper {
  .wh(100%, 100%);
  padding: 20px;

  .center-header {

    /deep/ .ant-radio-button-wrapper {
      background: #f0f2f5;
      .ant-badge-count {
        top: -20px;
      }
    }

    /deep/ .ant-radio-button-wrapper-checked {
      background: #fff;
      .ant-badge {
        color: @fontColor;
      }
    }

  }

  .handle-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: @wholeMargin 0;

    .handle-before {
      display: flex;
      align-items: center;

      .btns {
        margin-left: @wholeMargin;
        width: 88px;
      }
    }

    .handle-input {
      width: 200px;
    }
  }

  .center-body {

    /deep/ .record-not-read {
      td:nth-child(2) {
        color: #000;
        font-size: 14px;
        font-weight: bold;
      }
    }

    /deep/ .record-readed {
      color: #aaa;
    }

    .table-action {
      display: flex;
      justify-content: space-between
    }
  }

}
</style>

<style lang="less">

</style>

<template>
  <div class="center-wrapper">
    <div class="center-header">
      <div class="handle-wrapper">
        <div class="handle-before">
          <a-button @click="handleAllRead">标为已读</a-button>
          <a-popconfirm
            title="删除该条消息？"
            @confirm="handleAllDelete">
            <a-button class="btns" style="width: 88px">删除</a-button>
          </a-popconfirm>
        </div>
        <div class="handle-after">
          <a-input class="handle-input" placeholder="消息搜索" v-model="searchValue">
          </a-input>
          <a-button type="primary" style="width: 88px;margin-left:10px">搜索</a-button>
        </div>
      </div>
    </div>
    <div class="center-body">
      <s-table
        ref="table"
        size="default"
        rowKey="Id"
        :rowClassName="getRowCls"
        :columns="msgColumns"
        :dataCallback="loadData"
        :alert="options.alert"
        :rowSelection="options.rowSelection"
      >
        <span slot="msgType" slot-scope="record">
          {{ handleMsgType(record) }}
        </span>
        <span slot="time" slot-scope="record">
          {{ record.Time | dayjs }}
        </span>
        <span slot="action" slot-scope="record" class="table-action">
          <span style="width: 28px;display:inline-block">
            <a href="javascript:;" :class="!record.Read ? '': 'record-readed'" @click="handleReaded(record)">已读</a>
          </span>

          <a href="javascript:;" @click="handleDelete(record)">删除</a>
          <a href="javascript:;">查看</a>
          </a>
        </span>
      </s-table>
    </div>
  </div>
</template>

<script>
import STable from '@/components/table/'
import { msgCenterGet, msgCenterPut, msgCenterDel } from '@/api/backlogApi'

// 获取消息中心数据将Message内容反序列化到上层数据中
function handleRowsMsg (obj) {
  const rows = obj.Rows
  for (const index in rows) {
    // rows[index] = JSON.stringify(JSON.parse(rows[index]))
    const item = rows[index]
    if (item.Message) {
      const msg = JSON.parse(item.Message)
      rows[index] = Object.assign(msg, item)
    }
  }
}
export default {
  components: {
    STable
  },
  data () {
    return {
      tabValue: 'msg',
      maxShowMsg: 5,
      searchValue: '',
      msgColumns: [
        {
          title: '标题',
          dataIndex: 'Title',
          key: 'Title'
        }, {
          title: '消息内容',
          dataIndex: 'Content',
          key: 'Content',
          width: '400px'
        }, {
          title: '类型',
          dataIndex: 'MessageType',
          key: 'MessageType',
          scopedSlots: { customRender: 'msgType' }
        }, {
          title: '通知时间',
          dataIndex: 'Time',
          key: 'Time',
          scopedSlots: { customRender: 'time' }
        }, {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      selectedRowKeys: [],
      selectedRows: [],
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      loadData: (parameter) => {
        return msgCenterGet(parameter).then(res => {
          handleRowsMsg(res)
          return res
        }).catch(err => {
          console.log(err)
        })
      },
      msgData: [
        {
          title: '张三',
          key: '张三',
          content: '我是一段很长的很长的的很长的很长的很长的很长的很长的很长的很长的很长的很长的很长的很长的很长的很长内容。',
          type: '待办任务',
          date: '2020-05-21 23:12:22',
          readed: false
        },
        {
          title: '李四',
          key: '李四',
          content: '李四内容',
          type: '事件告警',
          date: '2020-02-22 23:12:22',
          readed: false
        },
        {
          title: '王五',
          key: '王五',
          content: '王五内容',
          type: '待办任务',
          date: '2020-02-23 23:12:22',
          readed: true
        },
        {
          title: '赵六',
          key: '赵六',
          content: '赵六内容',
          type: '事件告警',
          date: '2020-02-24 23:12:22',
          readed: true
        },
        {
          title: 'coldplay',
          key: 'coldplay',
          content: '赵六内容',
          type: '待办任务',
          date: '2020-02-25 23:12:22',
          readed: true
        },
        {
          title: 'maroon 5',
          key: 'maroon 5',
          content: '赵六内容',
          type: '事件告警',
          date: '2020-02-26 23:12:22',
          readed: true
        },
        {
          title: 'rihanna',
          key: 'rihanna',
          content: '赵六内容',
          type: '待办任务',
          date: '2020-02-26 23:12:22',
          readed: true
        },
        {
          title: 'mars',
          key: '赵六1',
          content: '赵六内容',
          type: '事件告警',
          date: '2020-02-26 23:12:22',
          readed: true
        },
        {
          title: 'ed',
          key: 'ed',
          content: '赵六内容',
          type: '事件告警',
          date: '2020-02-26 23:12:22',
          readed: true
        },
        {
          title: 'oasis',
          key: 'oasis',
          content: '赵六内容',
          type: '事件告警',
          date: '2020-02-26 23:12:22',
          readed: true
        },
        {
          title: 'nirvana',
          key: 'nirvana',
          content: '赵六内容',
          type: '待办任务',
          date: '2020-02-26 23:12:22',
          readed: true
        },
        {
          title: 'grunge',
          key: 'grunge',
          content: '赵六内容',
          type: '事件告警',
          date: '2020-02-26 23:12:22',
          readed: true
        },
        {
          title: 'bealtes',
          key: 'bealtes',
          content: '赵六内容',
          type: '待办任务',
          date: '2020-02-26 23:12:22',
          readed: true
        },
        {
          title: 'bowie',
          key: 'bowie',
          content: '赵六内容',
          type: '事件告警',
          date: '2020-02-26 23:12:22',
          readed: true
        },
        {
          title: 'queen',
          key: 'queen',
          content: '赵六内容',
          type: '事件告警',
          date: '2020-02-26 23:12:22',
          readed: true
        },
        {
          title: 'red cape',
          key: 'red cape',
          content: '赵六内容',
          type: '事件告警',
          date: '2020-02-26 23:12:24',
          readed: true
        }
      ],
      msgSelectedRowKeys: []
    }
  },
  computed: {
    dataSource () {
      return `${this.tabValue}Data`
    },
    selectRows () {
      return `${this.tabValue}SelectedRowKeys`
    },
    msgCount () {
      let count = 0
      this.msgData.forEach((item) => {
        if (!item.readed) {
          count++
        }
      })
      return count
    }
  },
  methods: {
    handleMsgType (type) {
      // console.log('handleMsgType -> record', record)
      return type === 1 ? '待办任务' : type === 2 ? '事件告警' : ''
    },
    getRowCls (record, index) {
      return !record.Read ? 'row-readed' : ''
    },
    handleReaded (record) {
      msgCenterPut([record.Id]).catch(e => { console.log(e) })
    },
    handleAllRead () {
      msgCenterPut(this.selectedRowKeys).catch(e => { console.log(e) })
    },

    handleDelete (record) {
      msgCenterDel([record.Id])
    },
    handleAllDelete () {
      msgCenterDel(this.selectedRowKeys)
    },
    // 选择项回调函数
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>
