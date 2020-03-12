<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-11 13:45:41
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-11 16:08:33
 * @Description:  通用列表组件
 -->

<template>
  <div class="list">
    <div class="list-container" :class="{ optimize: this.optimizeScrollBar }">
      <a-spin :spinning="loading">
        <slot :list="list" />
      </a-spin>
    </div>
    <div class="list-pagination" v-if="list.length && list.length < total">
      <a-pagination
        v-model="pageIndex"
        :page-size="pageSize"
        :total="total"
        @change="handlePageIndexChange"
      />
    </div>
  </div>
</template>

<script>

/**
 * 生成会被重置的数据
 */
const genRestData = (params = {}) => ({
  loading: false,
  // 当前页码
  pageIndex: 1,
  list: [],
  total: 0
})

export default {
  props: {
    // 每页数量
    pageSize: {
      type: Number,
      default: 10
    },
    // 数据请求方法
    dataCallback: {
      type: Function,
      required: true
    },
    // 是否默认加载
    isLoad: {
      type: Boolean,
      default: true
    },
    // 是否优化滚动条样式
    optimizeScrollBar: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      ...genRestData()
    }
  },
  mounted () {
    this.isLoad && this.loadData()
  },
  methods: {
    // 加载数据，isRefresh 是否刷新
    async loadData (isRefresh = false) {
      this.loading = true
      isRefresh && Object.assign(this, genRestData())
      try {
        const { pageIndex, pageSize } = this
        const { Rows = [], Total = 0 } = await this.dataCallback({ pageIndex, pageSize })
        Object.assign(this, { list: Rows, total: Total })
      } catch (error) {
        console.error(error)
      }
      this.loading = false
    },
    handlePageIndexChange (pageIndex) {
      this.pageIndex = pageIndex
      this.loadData()
    }
  }
}
</script>

<style scoped lang="less">
.list {
  display: flex;
  flex-direction: column;
  &-container {
    height: 0;
    flex: 1;
    overflow-y: auto;
    &.optimize {
      &::-webkit-scrollbar {
        width: 3px;
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        box-shadow: none;
        background: #dcdee2;
      }
      &::-webkit-scrollbar-track {
        box-shadow: none;
        border-radius: 5px;
        background: #f6f6f6;
      }
    }
  }
  &-pagination {
    padding-top: 10px;
    text-align: center;
  }
}
</style>
