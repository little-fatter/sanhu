import T from 'ant-design-vue/es/table/Table'
import get from 'lodash.get'

/**
 * 标准列表组件
 */
export default {
  data () {
    return {
      // 需要统计值的列数组
      needTotalList: [],
      // 选择的行数组
      selectedRows: [],
      // 选择的Key数组
      selectedRowKeys: [],
      // 本地是否加载中
      localLoading: false,
      // 本地数据源
      localDataSource: [],
      // 本地分页对象
      localPagination: Object.assign({}, T.props.pagination)
    }
  },
  props: Object.assign({}, T.props, {
    // 表格行 key 的取值
    rowKey: {
      type: [String, Function],
      default: 'id'
    },
    /**
     * 查询数据回调函数
     * 参数参数:{pageIndex,pageSize,sortField,sortOrder,filters} 其中filters表示筛选对象
     * 查询参数可能需要根据服务端的接口二次处理一次
     * 返回值为Promise<T> 其中T对象：{pageIndex,total,rows}
     **/
    dataCallback: {
      type: Function,
      required: true
    },
    // 当前分页数
    pageNum: {
      type: Number,
      default: 1
    },
    // 分页大小
    pageSize: {
      type: Number,
      default: 10
    },
    // 是否可选择分页大小
    showSizeChanger: {
      type: Boolean,
      default: true
    },
    // 设置表格大小，default or small
    size: {
      type: String,
      default: 'default'
    },

    /**
     * 控制显示统计信息
     * 对象：{show:true,clear}其中clear可以设置为true或者是回调函数
     */
    alert: {
      type: [Object, Boolean],
      default: null
    },
    // 如果列表可选择，配置该对象
    rowSelection: {
      type: Object,
      default: null
    },
    // 是否需要分页
    showPagination: {
      type: Boolean,
      default: true
    }
  }),
  watch: {
    // 'localPagination.current' (val) {
    //   console.log('params', this.$route.params)
    //   console.log('val', val)
    //   this.$router.push({
    //     name: this.$route.name,
    //     params: Object.assign({}, this.$route.params, {
    //       pageNo: val
    //     })
    //   })
    // },
    pageNum (val) {
      Object.assign(this.localPagination, {
        current: val
      })
    },
    pageSize (val) {
      Object.assign(this.localPagination, {
        pageSize: val
      })
    },
    showSizeChanger (val) {
      Object.assign(this.localPagination, {
        showSizeChanger: val
      })
    }
  },
  created () {
    this.localPagination = this.showPagination && Object.assign({}, this.localPagination, {
      current: this.pageNum,
      pageSize: this.pageSize,
      showSizeChanger: this.showSizeChanger
    })
    this.needTotalList = this.initTotalList(this.columns)
    this.loadData()
  },
  methods: {
    /**
     * 表格重新加载方法
     * 如果参数为 true, 则强制刷新到第一页
     * @param Boolean bool
     */
    refresh (bool = false) {
      bool && (this.localPagination = Object.assign({}, {
        current: 1, pageSize: this.pageSize
      }))
      this.loadData()
    },
    /**
     * 加载数据方法
     * @param {Object} pagination 分页选项器
     * @param {Object} filters 过滤条件
     * @param {Object} sorter 排序条件
     */
    loadData (pagination, filters, sorter) {
      this.localLoading = true
      const parameter = Object.assign({
        pageIndex: (pagination && pagination.current) ||
            this.localPagination.current,
        pageSize: (pagination && pagination.pageSize) ||
            this.localPagination.pageSize
      },
      (sorter && sorter.field && {
        sortField: sorter.field
      }) || {},
      (sorter && sorter.order && {
        sortOrder: sorter.order
      }) || {}, {
        ...filters
      }
      )
      const result = this.dataCallback(parameter)
      // 需要通用数据接口返回数据： r.PageIndex, r.Total, R.rows
      // eslint-disable-next-line
      if (result instanceof Promise || '[object Promise]' === result.toString()) {
        result.then(r => {
          this.localPagination = Object.assign({}, this.localPagination, {
            current: parameter.pageIndex, // 返回结果中的当前分页数
            total: r.Total, // 返回结果中的总记录数
            showTotal: function (total, range) {
              return `总共${total}条`
            },
            showSizeChanger: this.showSizeChanger,
            pageSize: (pagination && pagination.pageSize) ||
              this.localPagination.pageSize
          })
          // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
          if (r.Rows.length === 0 && this.localPagination.current !== 1) {
            this.localPagination.current--
            this.loadData()
            return
          }

          // 这里用于判断接口是否有返回 r.Total 或 this.showPagination = false
          // 当情况满足时，表示数据不满足分页大小，关闭 table 分页功能
          (!r.Total || r.Total === 0) && !this.showPagination && (this.localPagination = false)
          this.localDataSource = r.Rows // 返回结果中的数组数据
          this.localLoading = false
        }).catch(() => {
          this.localLoading = false
        })
      }
    },
    /**
     * 返回需要统计的列数组
     * 为每个需要统计的列加一个属性total，初始值为0
     * @param {*} columns
     */
    initTotalList (columns) {
      const totalList = []
      columns && columns instanceof Array && columns.forEach(column => {
        if (column.needTotal) {
          totalList.push({
            ...column,
            total: 0
          })
        }
      })
      return totalList
    },
    /**
     * 用于更新已选中的列表数据 total 统计
     * @param selectedRowKeys
     * @param selectedRows
     */
    updateSelect (selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows
      this.selectedRowKeys = selectedRowKeys
      const list = this.needTotalList
      this.needTotalList = list.map(item => {
        return {
          ...item,
          total: selectedRows.reduce((sum, val) => {
            const total = sum + parseInt(get(val, item.dataIndex))
            return isNaN(total) ? 0 : total
          }, 0)
        }
      })
    },
    /**
     * 清空 table 已选中项
     */
    clearSelected () {
      if (this.rowSelection) {
        this.rowSelection.onChange([], [])
        this.updateSelect([], [])
      }
    },
    /**
     * 处理交给 table 使用者去处理 clear 事件时，内部选中统计同时调用
     * @param callback
     * @returns {*}
     */
    renderClear (callback) {
      if (this.selectedRowKeys.length <= 0) return null
      return (
        <a style="margin-left: 24px" onClick={() => {
          if (callback) {
            callback()
          }
          this.clearSelected()
        }}>清空</a>
      )
    },
    renderAlert () {
      // 绘制统计列数据
      const needTotalItems = this.needTotalList.map((item) => {
        return (<span style="margin-right: 12px">
          {item.title}总计 <a style="font-weight: 600">{!item.customRender ? item.total : item.customRender(item.total)}</a>
        </span>)
      })

      // 绘制 清空 按钮
      const clearItem = (typeof this.alert.clear === 'boolean' && this.alert.clear) ? (
        this.renderClear(null)
      ) : (this.alert !== null && typeof this.alert.clear === 'function') ? (
        this.renderClear(this.alert.clear)
      ) : null

      // 绘制 alert 组件
      return (
        <a-alert showIcon={true} style="margin-bottom: 16px">
          <template slot="message">
            <span style="margin-right: 12px">已选择: <a style="font-weight: 600">{this.selectedRows.length}</a></span>
            {needTotalItems}
            {clearItem}
          </template>
        </a-alert>
      )
    }
  },

  render () {
    const props = {}
    const localKeys = Object.keys(this.$data)
    const showAlert = (typeof this.alert === 'object' && this.alert !== null && this.alert.show) && typeof this.rowSelection.selectedRowKeys !== 'undefined' || this.alert

    Object.keys(T.props).forEach(k => {
      const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(1)}`
      if (localKeys.includes(localKey)) {
        props[k] = this[localKey]
        return props[k]
      }
      if (k === 'rowSelection') {
        if (showAlert && this.rowSelection) {
          // 如果需要使用alert，则重新绑定 rowSelection 事件
          props[k] = {
            selectedRows: this.selectedRows,
            selectedRowKeys: this.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              this.updateSelect(selectedRowKeys, selectedRows)
              typeof this[k].onChange !== 'undefined' && this[k].onChange(selectedRowKeys, selectedRows)
            }
          }
          return props[k]
        } else if (!this.rowSelection) {
          // 如果没打算开启 rowSelection 则清空默认的选择项
          props[k] = null
          return props[k]
        }
      }
      props[k] = this[k]
      return props[k]
    })
    const table = (
      <a-table {...{ props, scopedSlots: { ...this.$scopedSlots } }} onChange={this.loadData}>
        { Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>)) }
      </a-table>
    )

    return (
      <div class="table-wrapper">
        { showAlert ? this.renderAlert() : null }
        { table }
      </div>
    )
  }
}
