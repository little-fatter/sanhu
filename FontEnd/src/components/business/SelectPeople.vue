<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-10 17:12:25
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-12 17:40:52
 * @Description:  选择人员
 -->

<template>
  <select-modal ref="modal" title="人员选择" :width="700" :height="500">
    <div class="filter-wrap" slot="other">
      <a-input
        v-model="queryParam.name"
        placeholder="姓名(模糊查询)"
        maxlength="10"
        style="width: 200px; margin-right: 10px"
      />
      <a-input
        v-model="queryParam.mobile"
        placeholder="手机号(精确查询)"
        maxlength="11"
        style="width: 200px; margin-right: 10px"
      />
      <a-button type="primary" @click="getUsers">查询</a-button>
    </div>
    <div class="sp-container">
      <div class="sp-main">
        <div class="sp-panel">
          <div class="sp-panel-header">
            <span class="sp-panel-title">人员列表({{ list.length }})</span>
          </div>
          <div class="sp-panel-body scroll-small">
            <div class="sp-user" v-for="(item, index) in list" :key="index">
              <a-checkbox class="sp-user-check" :checked="item.checked" @change="e => handleSelect(e, item, index)" />
              <a-avatar :size="30" :style="{ backgroundColor: '#3A9DFA', verticalAlign: 'middle' }">
                {{ item.Name }}
              </a-avatar>
              <span class="sp-user-name">{{ item.Name }}</span>
            </div>
          </div>
        </div>
        
        <div class="sp-panel">
          <div class="sp-panel-header">
            <span class="sp-panel-title">已选择的人</span>
          </div>
          <div class="sp-panel-body scroll-small">
            <div class="sp-user" v-for="(item, index) in selects" :key="index">
              <a-avatar :size="30" :style="{ backgroundColor: '#3A9DFA', verticalAlign: 'middle' }">
                {{ item.Name }}
              </a-avatar>
              <span class="sp-user-name">{{ item.Name }}</span>
              <span class="sp-user-close" title="删除" @click="handleDelete(item, index)"><a-icon type="close" /></span>
            </div>
          </div>
        </div>
      </div>
      <div class="sp-action">
        <a-button type="primary" size="large" @click="ok">确定</a-button>
      </div>
    </div>
  </select-modal>
</template>

<script>
import SelectModal from '@/components/modal/SelectModal'
import { getUsers } from '@/api/frameworkApi'

const genRestData = (params = {}) => ({
  ...params,
  queryParam: {},
  // 用户列表
  list: [],
  // 已选中列表
  selects: []
})

export default {
  components: {
    SelectModal
  },
  data () {
    return {
      ...genRestData()
    }
  },
  methods: {
    open () {
      Object.assign(this, genRestData())
      this.getUsers()
      this.$refs.modal.open()
    },
    async getUsers () {
      const { Rows = [] } = await getUsers({ ...this.queryParam, pageIndex: 0, pageSize: 1 })
      this.list = Rows
    },
    // 选中人员
    handleSelect (e, record, index) {
      const { list, selects } = this
      const { checked } = e.target
      list[index].checked = checked
      if (checked) {
        selects.push({...record})
      } else {
        selects.splice(selects.findIndex(i => i.Id === record.Id), 1)
      }
      this.list = [...list]
      this.selects = [...selects]
    },
    // 删除已选中的人员
    handleDelete (record, index) {
      const { list, selects } = this
      const _index = list.findIndex(i => i.Id === record.Id)
      selects.splice(index, 1)
      if (_index !== -1) {
        list[_index].checked = false
      }
      this.list = [...list]
      this.selects = [...selects]
    },
    ok () {
      const { selects } = this
      this.$refs.modal.close()
      this.$emit('on-select', {
        selects: [...selects],
        values: selects.map(item => item.AccountId)
      })
    }
  }
}
</script>

<style scoped lang="less">
.filter-wrap {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  // text-align: center;
}
.sp {
  &-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  &-main {
    height: 0;
    flex: 1;
    display: flex;
    margin-bottom: 10px;
    & > div {
      height: 100%;
    }
  }
  &-panel {
    display: inline-flex;
    flex-direction: column;
    box-sizing: border-box;
    &:first-child {
      width: 0;
      flex: 1;
    }
    &:last-child {
      width: 260px;
      margin-left: 15px;
      padding-left: 15px;
      border-left: 1px solid #EBEBEB;
    }
    &-header {
      height: 30px;
      display: flex;
      align-items: center;
    }
    &-title {
      width: 0;
      flex: 1;
      font-size: 16px;
      color: #63687B;
    }
    &-body {
      height: 0;
      flex: 1;
      overflow-y: auto;
      padding-right: 15px;
      font-size: 14px;
      color: #7F87AE;
    }
  }
  &-user {
    display: flex;
    align-items: center;
    padding: 10px 0;
    &-name {
      width: 0;
      flex: 1;
      margin: 0 10px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    &-check {
      margin-right: 10px;
    }
    &-close {
      padding: 4px 0 4px 10px;
      cursor: pointer;
    }
  }
  &-action {
    text-align: center;
  }
}
</style>
