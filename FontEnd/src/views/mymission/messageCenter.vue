<style lang="less" scoped>

@import '~@assets/css/mixins.less';

@wholeMargin: 10px;
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

}
</style>

<template>
  <div class="center-wrapper">
    <div class="center-header">
      <a-radio-group @change="onChange" v-model="tabValue">
        <a-radio-button value="msg">
          <a-badge :count="msgCount">
            对话消息
          </a-badge>
        </a-radio-button>
        <a-radio-button value="task">
          <a-badge :count="taskCount">
            任务通知
          </a-badge>
        </a-radio-button>
        <a-radio-button value="warn">
          <a-badge :count="warnCount">
            告警消息
          </a-badge>
        </a-radio-button>
      </a-radio-group>
      <div class="handle-wrapper">
        <div class="handle-before">
          <a-checkbox @change="allSelectHandle">
            全选
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
      <a-table :pagination="{pageSize: 5}" v-if="tabValue === 'msg'" :rowSelection="{selectedRowKeys: msgSelectedRowKeys, onChange: onSelectChange}" :columns="msgColumns" :dataSource="msgData">
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
      <a-table
        :pagination="{pageSize: 5}"
        v-if="tabValue === 'task'"
        :rowSelection="{selectedRowKeys: taskSelectedRowKeys, onChange: onSelectChange}"
        :columns="taskColumns"
        :dataSource="taskData">
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
      <a-table :pagination="{pageSize: 5}" v-if="tabValue === 'warn'" :rowSelection="{selectedRowKeys: warnSelectedRowKeys, onChange: onSelectChange}" :columns="warnColumns" :dataSource="warnData">
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
      // msgCount: '5',
      // taskCount: '10',
      // warnCount: '2',
      searchValue: '',
      msgColumns: [
        {
          title: '发送人',
          dataIndex: 'name',
          key: 'name'
        }, {
          title: '消息内容',
          dataIndex: 'message',
          key: 'message'
        }, {
          title: '日期',
          dataIndex: 'date',
          key: 'date',
          sorter: (a, b) => {
            const timeA = new Date(a.date.replace(/-/g, '/'))
            const timeB = new Date(b.date.replace(/-/g, '/'))
            return (timeA - timeB)
          }
        }, {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      msgData: [
        {
          name: '张三',
          key: '张三',
          message: '张三内容',
          date: '2020-05-21 23:12:22',
          readed: false
        },
        {
          name: '李四',
          key: '李四',
          message: '李四内容',
          date: '2020-02-22 23:12:22',
          readed: false
        },
        {
          name: '王五',
          key: '王五',
          message: '王五内容',
          date: '2020-02-23 23:12:22',
          readed: true
        },
        {
          name: '赵六',
          key: '赵六',
          message: '赵六内容',
          date: '2020-02-24 23:12:22',
          readed: true
        },
        {
          name: 'coldplay',
          key: 'coldplay',
          message: '赵六内容',
          date: '2020-02-25 23:12:22',
          readed: true
        },
        {
          name: 'maroon 5',
          key: 'maroon 5',
          message: '赵六内容',
          date: '2020-02-26 23:12:22',
          readed: true
        },
        {
          name: 'rihanna',
          key: 'rihanna',
          message: '赵六内容',
          date: '2020-02-26 23:12:22',
          readed: true
        },
        {
          name: 'mars',
          key: '赵六',
          message: '赵六内容',
          date: '2020-02-26 23:12:22',
          readed: true
        },
        {
          name: 'ed',
          key: 'ed',
          message: '赵六内容',
          date: '2020-02-26 23:12:22',
          readed: true
        },
        {
          name: 'oasis',
          key: 'oasis',
          message: '赵六内容',
          date: '2020-02-26 23:12:22',
          readed: true
        },
        {
          name: 'nirvana',
          key: 'nirvana',
          message: '赵六内容',
          date: '2020-02-26 23:12:22',
          readed: true
        },
        {
          name: 'grunge',
          key: 'grunge',
          message: '赵六内容',
          date: '2020-02-26 23:12:22',
          readed: true
        },
        {
          name: 'bealtes',
          key: 'bealtes',
          message: '赵六内容',
          date: '2020-02-26 23:12:22',
          readed: true
        },
        {
          name: 'bowie',
          key: 'bowie',
          message: '赵六内容',
          date: '2020-02-26 23:12:22',
          readed: true
        },
        {
          name: 'queen',
          key: 'queen',
          message: '赵六内容',
          date: '2020-02-26 23:12:22',
          readed: true
        },
        {
          name: 'red cape',
          key: 'red cape',
          message: '赵六内容',
          date: '2020-02-26 23:12:24',
          readed: true
        }
      ],
      taskColumns: [
        {
          title: '任务标题',
          dataIndex: 'title',
          key: 'title'
        }, {
          title: '任务内容',
          dataIndex: 'message',
          key: 'message'
        }, {
          title: '交办时间',
          dataIndex: 'date',
          key: 'date'
        }, {
          title: '交办时限',
          dataIndex: 'deadline',
          key: 'deadline'
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      taskData: [
        {
          title: '任务标题1',
          key: '任务标题1',
          message: '任务标题1内容',
          date: '2020-02-26 23:12:22',
          deadline: '2020-02-26 23:12:22',
          readed: false
        },
        {
          title: '任务标题2',
          key: '任务标题2',
          message: '任务标题2内容',
          date: '2020-02-26 23:12:22',
          deadline: '2020-02-26 23:12:22',
          readed: false
        },
        {
          title: '任务标题3',
          key: '任务标题3',
          message: '任务标题2内容',
          date: '2020-02-26 23:12:22',
          deadline: '2020-02-26 23:12:22',
          readed: true
        },
        {
          title: '任务标题4',
          key: '任务标题4',
          message: '任务标题4内容',
          date: '2020-02-26 23:12:22',
          deadline: '2020-02-26 23:12:22',
          readed: true
        }
      ],
      warnColumns: [
        {
          title: '告警标题',
          dataIndex: 'title',
          key: 'title'
        }, {
          title: '告警来源',
          dataIndex: 'source',
          key: 'source'
        },
        {
          title: '告警内容',
          dataIndex: 'message',
          key: 'message'
        },
        {
          title: '告警时间',
          dataIndex: 'date',
          key: 'date'
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      warnData: [
        {
          title: '告警标题一',
          key: '告警标题一',
          source: '来源1',
          message: '内容1',
          date: '2020-02-26 23:12:22',
          readed: false
        },
        {
          title: '告警标题2',
          key: '告警标题2',
          source: '来源2',
          message: '内容2',
          date: '2020-02-26 23:12:22',
          readed: false
        },
        {
          title: '告警标题3',
          key: '告警标题3',
          source: '来源3',
          message: '内容3',
          date: '2020-02-26 23:12:22',
          readed: true
        },
        {
          title: '告警标题4',
          key: '告警标题4',
          source: '来源4',
          message: '内容4',
          date: '2020-02-26 23:12:22',
          readed: true
        }
      ],
      msgSelectedRowKeys: [],
      taskSelectedRowKeys: [],
      warnSelectedRowKeys: []
    }
  },
  computed: {
    msgCount () {
      let count = 0
      this.msgData.forEach((item) => {
        if (!item.readed) {
          count++
        }
      })
      return count
    },
    taskCount () {
      let count = 0
      this.taskData.forEach((item) => {
        if (!item.readed) {
          count++
        }
      })
      return count
    },
    warnCount () {
      let count = 0
      this.warnData.forEach((item) => {
        if (!item.readed) {
          count++
        }
      })
      return count
    }
  },
  methods: {
    onChange (e) {
      console.log(`checked = ${e.target.value}`)
    },
    allSelectHandle (e) {
      console.log('check', e.target.checked)
    },
    handleReaded (record) {
      record.readed = true
    },
    handleAllReaded () {
      this[`${this.tabValue}SelectedRowKeys`].forEach(key => {
        this[`${this.tabValue}Data`].forEach(item => {
          if (key === item.key) {
            item.readed = true
          }
        })
      })
    },
    onDelete (key) {
      const data = [...this[`${this.tabValue}Data`]]
      this[`${this.tabValue}Data`] = data.filter(item => item.key !== key)
    },
    handleAllDelete () {},
    onSelectChange (selectedRowKeys) {
      this[`${this.tabValue}SelectedRowKeys`] = selectedRowKeys
    }

  }
}
</script>
