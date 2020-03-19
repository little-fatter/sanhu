<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-09 16:30:57
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-09 17:19:06
 * @Description:  通用数据展示面板
 -->

<template>
  <div class="data-panel">
    <div class="data-panel-header" :class="{ expand }" v-if="!hideHeader">
      <div class="data-panel-filter">
        <slot name="filter" />
      </div>
      <div class="data-panel-search">
        <slot name="searchAction" />
        <a-button type="primary" @click="search">查询</a-button>
        <a-button @click="restFilter">重置</a-button>
        <span class="data-panel-expand" @click="switchExpand">
          <template v-if="expand">
            <span>收起</span>
            <a-icon class="data-panel-expand-icon" type="up" />
          </template>
          <template v-else>
            <span>展开</span>
            <a-icon class="data-panel-expand-icon" type="down" />
          </template>
        </span>
      </div>
    </div>
    <div class="data-panel-action">
      <slot name="action" />
    </div>
    <div class="data-panel-info" v-if="showInfo">
      <a-alert type="info" banner>
        <template slot="message">
          <slot name="info" />
        </template>
      </a-alert>
    </div>
    <div class="data-panel-body">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 默认展开
    defaultExpand: {
      type: Boolean,
      default: true
    },
    // 是否隐藏头部
    hideHeader: {
      type: Boolean,
      default: false
    },
    // 是否隐藏展开操作
    hideExpand: {
      type: Boolean,
      default: false
    },
    // 是否隐藏重置按钮
    hideExpand: {
      type: Boolean,
      default: false
    },
    // 是否显示信息栏
    showInfo: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 查询条件展开状态
      expand: true
    }
  },
  mounted () {
    this.expand = this.defaultExpand
  },
  methods: {
    // 查询
    search () {
      this.$emit('on-search')
    },
    // 切换展开状态
    switchExpand () {
      this.expand = !this.expand
      this.$emit('on-expand', this.expand)
    },
    // 重置查询条件
    restFilter () {
      this.$emit('on-rest-filter')
    }
  }
}
</script>

<style scoped lang="less">
.data-panel {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  & > div {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &-header {
    display: flex;
    max-height: 40px;
    margin-bottom: 15px;
    overflow: hidden;
    transition: all 0.5s;
    &.expand {
      max-height: none;
    }
  }
  &-filter {
    width: 0;
    flex: 1;
    margin-right: 10px;
  }
  &-search {
    & > * {
      margin-left: 10px;
    }
  }
  &-expand {
    cursor: pointer;
    color: #AEBBC3;
    span:first-child {
      margin-right:  5px;
    }
    &-icon {
      font-size: 12px;
    }
  }
  &-action {
    & > * {
      margin-right: 10px;
    }
  }
  &-info {
    .ant-alert {
      font-size: 12px;
      border-radius: 3px;
    }
  }
  &-body {
    
  }
}
</style>
