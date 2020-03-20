<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-11 13:45:41
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-13 10:41:15
 * @Description:  通用列表组件
 -->

<template>
  <div class="list">
    <div class="list-container" :class="{ 'scroll-small': this.optimizeScrollBar }">
      <a-spin :spinning="loading">
        <slot :list="list" />
      </a-spin>
    </div>
    <div class="list-pagination" v-if="list.length && list.length < total">
      <a-pagination
        v-model="pageIndex"
        :page-size="pageSize"
        :total="total"
        :size="pageType"
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
    // 分页类型
    pageType: {
      type: String,
      default: ''
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
        this.$emit('on-load-data', { list: this.list, total: this.total })
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
  }
  &-pagination {
    padding-top: 10px;
    text-align: center;
  }
}
</style>
