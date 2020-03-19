<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-10 17:12:25
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-18 10:43:01
 * @Description:  选择案件
 -->

<template>
  <select-modal ref="modal" title="选择案件" :width="920" :height="500">
    <div class="filter-wrap" slot="other">
      <a-input
        v-model="queryParam.Keyword"
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
        :title="item.CauseOfAction"
        :cover="getCover(item.evtFileUrl)"
      >
        <a-button slot="headerEnd" type="primary" @click="handleSelect(item)">选择</a-button>
        <div class="item-info">
          <span>
            <span class="item-info-label">案件编号：</span>
            <span class="item-info-value">{{ item.CaseNumber }}</span>
            <span class="item-info-label">案件类型：</span>
            <span class="item-info-value">{{ item.CaseType }}</span>
          </span>
        </div>
        <div class="item-info" v-if="item.CaseStatus">
          <span>
            <span class="item-info-label">案件状态：</span>
            <a-tag color="#87d068">{{ item.CaseStatus }}</a-tag>
          </span>
        </div>
        <div class="item-info">
          <span>
            <span class="item-info-label">上报时间：</span>
            <span class="item-info-value">{{ item.CreateDate }}</span>
          </span>
        </div>
        <div class="item-info">
          <span>
            <span class="item-info-label">办案人：</span>
            <span class="item-info-value">{{ item.Investigators || '无数据' }}</span>
          </span>
        </div>
      </item>
    </list>
  </select-modal>
</template>

<script>
import SelectModal from '@/components/modal/SelectModal'
import List from '@/components/list/List'
import Item from '@/components/item/Item'
import { getPageData } from '@/api/sampleApi'
import { CASE_INFO } from '@/config/model.config'

// 查询字段集合
const fields = ['CauseOfAction', 'CaseType', 'CaseTitle']
// 查询规则
const genSearchRules = key => {
  if (!key) return {}
  return {
    rules: fields.map(i => ({
      field: i,
      value: key,
      op: 'like',
      type: 'string'
    })),
    op: 'or'
  }
}

export default {
  components: {
    SelectModal,
    List,
    Item
  },
  data () {
    return {
      queryParam: {
        Keyword: ''
      }
    }
  },
  methods: {
    // 打开弹窗， query：列表查询条件
    open (query = {}) {
      Object.assign(this.queryParam, { Keyword: '' }, query)
      this.$refs.modal.open()
      this.$nextTick(() => this.$refs.list.loadData(true))
    },
    loadData ({ pageIndex, pageSize }) {
      return getPageData(CASE_INFO, genSearchRules(this.queryParam.Keyword), pageIndex, pageSize)
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
