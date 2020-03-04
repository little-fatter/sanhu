<style lang="less" scoped>

@import '~@assets/css/mixins.less';

@wholeMargin: 10px;
@fontColor: #1989FA;

.center-wrapper {
  .wh(100%, 100%);
  padding: 20px;

  .center-header {
    padding-left: 13px;

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
    margin: @wholeMargin;

    .handle-before {
      display: flex;
      align-items: center;

      button {
        margin-left: @wholeMargin;
      }
    }

    .handle-input {
      width: 200px;
    }
  }

  .center-body {

    /deep/ tr:nth-child(1) th:nth-child(1) div  {
      position: relative;
      .ant-table-selection {
        top: -52px;
        z-index: 100;
      }
    }
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
  }

}
</style>

<style lang="less">

</style>

<template>
  <div class="center-wrapper">
    <div class="center-header">
      <a-radio-group v-model="tabValue">
        <a-radio-button style="margin-left:10px" value="msg">
          <a-badge :count="msgCount">
            消息
          </a-badge>
        </a-radio-button>
      </a-radio-group>
      <div class="handle-wrapper">
        <div class="handle-before">
          <a-checkbox>
            <span style="margin: 30px">
              全选
            </span>
          </a-checkbox>
          <div class="btns-group">
            <a-button @click="handleAllReaded">标为已读</a-button>
            <a-button style="width: 88px" @click="handleAllDelete">删除</a-button>
          </div>
        </div>
        <div class="handle-after">
          <a-input class="handle-input" placeholder="消息搜索" v-model="searchValue">
          </a-input>
        </div>
      </div>
    </div>
    <div class="center-body">
      <a-table
        :rowClassName="handleRowClass"
        :pagination="{pageSize: this.maxShowMsg}"
        v-if="tabValue === 'msg'"
        :rowSelection="{selectedRowKeys: msgSelectedRowKeys, onChange: onSelectChange}"
        :columns="msgColumns"
        :hideDefaultSelections="true"
        :dataSource="msgData">
        <span slot="action" slot-scope="record">
          <span style="width: 28px;display:inline-block">
            <a href="javascript:;" v-if="!record.readed" @click="handleReaded(record)">已读</a>
          </span>
          <a-divider type="vertical" />
          <a-popconfirm
            title="Sure to delete?"
            @confirm="onDelete(record.key)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
          <a-divider type="vertical" />
          <a href="javascript:;">查看</a>
          </a>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      tabValue: 'msg',
      maxShowMsg: 5,
      searchValue: '',
      msgColumns: [
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title'
        }, {
          title: '消息内容',
          dataIndex: 'content',
          key: 'content',
          width: '400px'
        }, {
          title: '类型',
          dataIndex: 'type',
          key: 'type'
        }, {
          title: '通知时间',
          dataIndex: 'date',
          key: 'date'
        }, {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
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
    handleRowClass (record) {
      return !record.readed ? 'record-not-read' : 'record-readed'
    },
    handleReaded (record) {
      record.readed = true
    },
    handleAllReaded () {
      this[`${this.selectRows}`].forEach(key => {
        for (const item of this[`${this.dataSource}`]) {
          if (key === item.key) {
            item.readed = true
            return
          }
        }
      })
    },

    onDelete (key) {
      const data = [...this[`${this.dataSource}`]]
      this[`${this.dataSource}`] = data.filter(item => item.key !== key)
    },
    handleAllDelete () {
      this[`${this.selectRows}`].forEach(key => {
        for (const index in this[`${this.dataSource}`]) {
          if (key === this[`${this.dataSource}`][index].key) {
            this[`${this.dataSource}`].splice(index, 1)
            return
          }
        }
      })
    },
    onSelectChange (selectedRowKeys) {
      this[`${this.selectRows}`] = selectedRowKeys
    }
  }
}
</script>
