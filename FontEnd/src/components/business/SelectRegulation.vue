<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-13 09:34:03
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-13 10:41:02
 * @Description:  选择法规
 -->

<template>
  <select-modal ref="modal" title="选择法律法规" :width="920" :height="500">
    <div class="filter-wrap" slot="other">
      <a-input
        v-model="queryParam.lawRuleName"
        placeholder="模糊查询(回车搜索)"
        style="width: 320px;"
        @pressEnter="$refs.list.loadData(true)" />
    </div>
    <list
      ref="list"
      :data-callback="loadData"
      :is-load="false"
      :optimize-scroll-bar="true"
      v-slot:default="{ list }"
      style="max-height: 100%"
    >
      <item
        v-for="item in list"
        :key="item.objId"
        :item="item"
        :title="item.evtTypeDisplayName"
        :cover="getCover(item.evtFileUrl)"
      >
        <a-button slot="headerEnd" type="primary" @click="handleSelect(item)">选择</a-button>
        <div class="item-info">
          <span>
            <span class="item-info-label">事发地点：</span>
            <span class="item-info-value">{{ item.address }}</span>
          </span>
        </div>
        <div class="item-info">
          <span>
            <span class="item-info-label">上报时间：</span>
            <span class="item-info-value">{{ item.reportTime }}</span>
          </span>
          <span>
            <span class="item-info-label">上报来源：</span>
            <span class="item-info-value">{{ item.reportType }}</span>
          </span>
        </div>
        <div class="item-info">
          <span class="item-info-label">事件描述：</span>
          <span class="item-info-content" :title="item.remark">{{ item.remark }}</span>
        </div>
      </item>
    </list>
  </select-modal>
</template>

<script>
import SelectModal from '@/components/modal/SelectModal'
import List from '@/components/list/List'
import Item from '@/components/item/Item'
import { getRegulations } from '@/api/otherApi'

export default {
  components: {
    SelectModal,
    List,
    Item
  },
  props: {

  },
  data () {
    return {
      queryParam: {
        lawRuleName: ''
      }
    }
  },
  methods: {
    // 打开弹窗， query：列表查询条件
    open (query = {}) {
      Object.assign(this.queryParam, { lawRuleName: '' }, query)
      this.$refs.modal.open()
      this.$nextTick(() => this.$refs.list.loadData(true))
    },
    loadData (params) {
      return getRegulations({ ...params, ...this.queryParam })
    },
    // 解析封面图
    getCover (urls) {
      if (!urls) return ''
      const arr = urls.split(',')
      return arr[0]
    },
    // 选择
    handleSelect (record) {
      this.$refs.modal.close()
      this.$emit('on-select', { ...record })
    }
  }
}
</script>

<style scoped lang="less">
@import '../item/item.less';
.filter-wrap {
  padding-bottom: 15px;
  // text-align: center;
}
</style>
