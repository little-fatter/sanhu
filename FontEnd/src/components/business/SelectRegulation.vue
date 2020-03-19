<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-13 09:34:03
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-18 18:01:21
 * @Description:  选择法规
 -->

<template>
  <select-modal ref="modal" title="选择法律法规" :width="920" :height="500">
    <div class="filter-wrap" slot="other">
      <a-input
        v-model="queryParam.Keyword"
        placeholder="请输入搜索关键词后查询"
        style="width: 200px; margin-right: 10px;" />
      <a-select
        v-model="queryParam.plawRuleFileId"
        :options="files"
        placeholder="选择文件"
        style="width: 200px; margin-right: 10px;" />
      <a-button type="primary" @click="getList">查询</a-button>
    </div>
    <div class="hot-keyword" slot="other">
      常用关键字：
      <span v-for="item in hotKeyWords" :key="item" @click="queryParam.Keyword = item">{{ item }}</span>
    </div>
    <a-spin :spinning="loading">
      <template v-if="list[0]">
        <item v-for="(item, index) in list" :key="index" :title="item.title" hide-cover :ellipsis="false">
          <a-button slot="headerEnd" type="primary" @click="handleSelect(item)" style="margin-left: 10px;">选择</a-button>
          <div class="regulation-content">{{ item.content }}</div>
        </item>
      </template>
      <template v-else>
        <div></div>
      </template>
    </a-spin>
  </select-modal>
</template>

<script>
import SelectModal from '@/components/modal/SelectModal'
import Item from '@/components/item/Item'
import { getLawFileList, getLawRuleItemList } from '@/api/sfdxApi'
import { isEmpty, isNotEmpty } from '@/utils/util'

// 生成查询条件
const genQuery = (params = {}) => {
  return {
    Keyword: '',
    plawRuleFileId: null,
    ...params
  }
}

// 常用关键字
const hotKeyWords = ['禁止', '行为', '处罚']

export default {
  components: {
    SelectModal,
    Item
  },
  props: {
    // 热门关键字集合
    hotKeyWords: {
      type: Array,
      default: () => hotKeyWords
    }
  },
  data () {
    return {
      queryParam: genQuery(),
      loading: false,
      // 法律法规文件列表
      files: [],
      // 法律法规列表
      list: []
    }
  },
  methods: {
    // 打开弹窗， query：列表查询条件
    open (query = {}) {
      Object.assign(this.queryParam, genQuery({ Keyword: this.hotKeyWords[0] }), query)
      this.$refs.modal.open()
      this.getFiles()
    },
    // 获取法律法规文件列表
    async getFiles () {
      this.loading = true
      try {
        const data = JSON.parse(await getLawFileList())
        this.files = data.map(i => ({ label: i.fileName, value: i.objId }))
        // 文件列表有数据，并且当前查询条件中的文件未选择
        if (this.files[0] && !this.queryParam.plawRuleFileId) {
          this.queryParam.plawRuleFileId = this.files[0].value
        }
        if (this.files[0]) {
          this.getList()
        } else {
          this.loading = false
        }
      } catch (error) {
        this.loading = false
        console.error(error)
      }
    },
    // 获取法律法规列表
    async getList () {
      const { Keyword, plawRuleFileId } = this.queryParam
      if (!Keyword) {
        this.loading = false
        return this.$message.warning('请输入关键字')
      }
      this.loading = true
      try {
        const data = JSON.parse(await getLawRuleItemList(Keyword, plawRuleFileId))
        this.list = data.map(i => {
          if (isNotEmpty(i.itemParentContent)) {
            return { title: i.itemParentContent, content: i.itemContent }
          }
          return { title: i.itemContent, content: isEmpty(i.itemSubContent) ? '' : i.itemSubContent }
        })
      } catch (error) {
        console.error(error)
      }
      this.loading = false
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
  display: flex;
  align-items: center;
  // text-align: center;
}
// 法律法规内容
.regulation-content {
  padding-right: 74px;
}
// 热门关键字
.hot-keyword {
  & > span {
    display: inline-block;
    padding: 6px;
    color: #999;
    cursor: pointer;
  }
}
</style>
