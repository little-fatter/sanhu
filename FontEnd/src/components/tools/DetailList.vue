<template>
  <div :class="['detail-list', size, layout === 'vertical' ? 'vertical': 'horizontal']">
    <div v-if="title" class="title">{{ title }}</div>
    <a-row>
      <slot></slot>
    </a-row>
  </div>
</template>

<script>
import { Col } from 'ant-design-vue/es/grid/'
/**
 * 详情列展示组件
 */
const Item = {
  name: 'DetailListItem',
  props: {
    // 项名称
    term: {
      type: String,
      default: '',
      required: false
    }
  },
  inject: {
    col: {
      type: Number
    }
  },
  render () {
    return (
      <Col {...{ props: responsive[this.col] }}>
        <div class="term">{this.$props.term}</div>
        <div class="content">{this.$slots.default}</div>
      </Col>
    )
  }
}

/**
 * 响应式布局对象
 * 包含4种布局，使用col来设置
 */
const responsive = {
  1: { xs: 24 },
  2: { xs: 24, sm: 12 },
  3: { xs: 24, sm: 12, md: 8 },
  4: { xs: 24, sm: 12, md: 6 }
}

/**
 * 详情列表展示组件
 */
export default {
  name: 'DetailList',
  Item: Item,
  components: {
    Col
  },
  props: {
    // 标题
    title: {
      type: String,
      default: '',
      required: false
    },
    // 选择响应式布局，有1234种布局
    col: {
      type: Number,
      required: false,
      default: 3
    },
    // 字体大小，small和large
    size: {
      type: String,
      required: false,
      default: 'large'
    },
    // 布局类型，vertical和horizontal
    layout: {
      type: String,
      required: false,
      default: 'horizontal'
    }
  },
  provide () {
    return {
      col: this.col > 4 ? 4 : this.col
    }
  }
}
</script>

<style lang="less" scoped>

  .detail-list {

    .title {
      color: rgba(0,0,0,.85);
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    /deep/ .term {
      color: rgba(0,0,0,.85);
      display: table-cell;
      line-height: 20px;
      margin-right: 8px;
      padding-bottom: 16px;
      white-space: nowrap;

      &:not(:empty):after {
        content: ":";
        margin: 0 8px 0 2px;
        position: relative;
        top: -.5px;
      }
    }

    /deep/ .content {
      color: rgba(0,0,0,.65);
      display: table-cell;
      min-height: 22px;
      line-height: 22px;
      padding-bottom: 16px;
      width: 100%;
      &:empty {
        content: ' ';
        height: 38px;
        padding-bottom: 16px;
      }
    }

    &.small {

      .title {
        font-size: 14px;
        color: rgba(0, 0, 0, .65);
        font-weight: normal;
        margin-bottom: 12px;
      }
      /deep/ .term, .content {
        padding-bottom: 8px;
      }
    }

    &.large {
      /deep/ .term, .content {
        padding-bottom: 16px;
      }

      .title {
        font-size: 16px;
      }
    }

    &.vertical {
      .term {
        padding-bottom: 8px;
      }
      /deep/ .term, .content {
        display: block;
      }
    }
  }
</style>
