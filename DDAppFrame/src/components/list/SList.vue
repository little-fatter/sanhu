<template>
  <van-list
    v-model="loading"
    :finished="finished"
    :offset="offset"
    :loading-text="loadingText"
    :finished-text="finishedText"
    :error.sync="error"
    :error-text="errorText"
    :immediate-check="immediateCheck"
    :direction="direction"
    @load="loadData"
  >
    <slot></slot>
  </van-list>
</template>

<script>
export default {
  name: 'SList',
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    pageIndex: {
      type: Number,
      default: 1
    },
    /** 滚动条与底部距离小于 offset 时触发load事件 */
    offset: {
      type: Number,
      default: 100
    },
    /** 加载过程中的提示 */
    loadingText: {
      type: String,
      default: '加载中...'
    },
    /** 加载完成后的提示 */
    finishedText: {
      type: String,
      default: '没有更多了'
    },
    /** 加载失败后的提示 */
    errorText: {
      type: String,
      default: '请求失败，请稍后再试'
    },
    /** 是否在初始化时立即执行滚动位置检查 */
    immediateCheck: {
      type: Boolean,
      default: true
    },
    /** 滚动触发加载的方向 可设置为：up or down */
    direction: {
      type: String,
      default: 'down'
    },
    /**
     * 查询数据回调函数
     * 参数参数:{pageIndex,pageSize} 其中filters表示筛选对象
     * 查询参数可能需要根据服务端的接口二次处理一次
     * 返回值为Promise<T> 其中T对象必须包含：{pageIndex,totalCount}
     **/
    dataCallback:
    {
      type: Function,
      required: true
    },
    /**
     * 根据接口设置数据总数的字段Key
     */
    totalKey: {
      type: String,
      default: 'Total'
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      isEmpty: false,
      localPageIndex: this.pageIndex,
      pageCount: 0,
      error: false
    }
  },
  created () {
    // this.loadData()
  },
  methods: {
    refresh () {
      this.resetData()
      this.loadData()
    },
    loadData () {
      if (this.pageCount !== 0 && this.pageCount < this.localPageIndex) {
        this.setFinished()
      } else {
        this.loading = true
        const parameter = {
          pageIndex: this.localPageIndex,
          pageSize: this.pageSize
        }
        const result = this.dataCallback(parameter)
        if (result instanceof Promise || result.toString() === '[object Promise]') {
          result.then(r => {
            this.loading = false
            if (!r[this.totalKey] || r[this.totalKey] <= 0) {
              this.isEmpty = true
              this.setFinished()
            } else {
              this.pageCount = r[this.totalKey] % this.pageSize === 0 ? r[this.totalKey] / this.pageSize : Math.ceil(r[this.totalKey] / this.pageSize)
              if (this.pageCount < this.localPageIndex) {
                this.setFinished()
              } else {
                this.localPageIndex++
              }
            }
          }).catch((error) => {
            console.error('error', error)
            this.$toast.fail(this.errorText)
            this.error = true
            this.loading = false
          })
        }
      }
    },
    setFinished () {
      this.finished = true
      this.loading = false
      // this.$toast(this.finishedText)
    },
    resetData () {
      this.loading = false
      this.finished = false
      this.isEmpty = false
      this.localPageIndex = this.pageIndex
      this.pageCount = 0
      this.error = false
    }
  }
}
</script>

<style lang='less' scoped>

</style>
