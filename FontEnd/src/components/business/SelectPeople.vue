<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-10 17:12:25
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-12 13:22:08
 * @Description:  选择人员
 -->

<template>
  <select-modal ref="modal" title="人员选择" :width="600">
    <div class="filter-wrap" slot="other">
      <a-input
        v-model="queryParam.Keyword"
        placeholder="模糊查询(回车搜索)"
        style="width: 320px;"
        @pressEnter="search" />
    </div>
    <div>
      <a-button type="primary">确定</a-button>
    </div>
  </select-modal>
</template>

<script>
import SelectModal from '@/components/modal/SelectModal'

export default {
  components: {
    SelectModal
  },
  data () {
    return {
      queryParam: {
        Keyword: ''
      }
    }
  },
  methods: {
    open () {
      this.$refs.modal.open()
    },
    search (value) {

    }
  }
}
</script>

<style scoped lang="less">
.filter-wrap {
  padding-bottom: 15px;
  // text-align: center;
}
</style>
