<template>
  <div :style="!$route.meta.pageHeader ? 'margin: -24px -24px 0px;' : null">
    <page-header v-if="!$route.meta.pageHeader" :title="title" :logo="logo" :avatar="avatar">
      <slot slot="action" name="action"></slot>
      <slot slot="content" name="headerContent"></slot>
      <div slot="content" v-if="!this.$slots.headerContent && desc">
        <p style="font-size: 14px;color: rgba(0,0,0,.65)">{{ desc }}</p>
        <div class="link">
          <template v-for="(link, index) in linkList">
            <a :key="index" :href="link.href">
              <a-icon :type="link.icon"/>
              <span>{{ link.title }}</span>
            </a>
          </template>
        </div>
      </div>
      <slot slot="extra" name="extra"></slot>
      <div slot="pageMenu">
        <div class="page-menu-search" v-if="search">
          <a-input-search style="width: 80%; max-width: 522px;" placeholder="请输入..." size="large" enterButton="搜索" />
        </div>
        <div class="page-menu-tabs" v-if="tabs && tabs.items">
          <a-tabs :tabBarStyle="{margin: 0}" @change="tabs.callback" :activeKey="tabs.active()">
            <a-tab-pane v-for="item in tabs.items" :tab="item.title" :key="item.key"></a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </page-header>
    <div class="content">
      <div class="content-test" :class="['page-header-index-wide']">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from './PageHeader'

/**
 * 页面布局组件
 * 用于展示页面（80%页面以上的都需要）
 */
export default {
  name: 'LayoutContent',
  components: {
    PageHeader
  },
  props: {
    // 描述信息（可空）
    desc: {
      type: String,
      default: null
    },
    // 显示的图标（可空）
    logo: {
      type: String,
      default: null
    },
    // 标题（可空）
    title: {
      type: String,
      default: null
    },
    // 显示的头像（可空）
    avatar: {
      type: String,
      default: null
    },
    // 连接地址
    linkList: {
      type: Array,
      default: null
    },
    // 附件显示的图标（可空）
    extraImage: {
      type: String,
      default: null
    },
    // 是否需要搜索组件
    search: {
      type: Boolean,
      default: false
    },
    // 需要的tabs
    tabs: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  .content {
    margin: 24px 24px 0;

    .link {
      margin-top: 16px;

      &:not(:empty) {
        margin-bottom: 16px;
      }
      a {
        margin-right: 32px;
        height: 24px;
        line-height: 24px;
        display: inline-block;

        i {
          font-size: 24px;
          margin-right: 8px;
          vertical-align: middle;
        }
        span {
          height: 24px;
          line-height: 24px;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
  .page-menu-search {
    text-align: center;
    margin-bottom: 16px;
  }
  .page-menu-tabs {
    margin-top: 48px;
  }
</style>
