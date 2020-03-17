<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-13 15:42:42
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-17 14:17:54
 * @Description:  展示大量信息用
 -->

<template>
  <a-row :gutter="gutter">
    <a-col v-for="(item, index) in columns" :span="item.span || 24" :key="index">
      <div class="info">
        <span class="info-label">{{ item.label }}: </span>
        <span
          class="info-content"
          :style="item.customStyle ? item.customStyle(data[item.key], item) : {}"
        >
          <template v-if="item.slot">
            <slot :name="item.slot" />
          </template>
          <template v-else-if="item.customContent">
            {{ item.customContent(data[item.key], data) }}
          </template>
          <template v-else>
            {{ data[item.key] || '-' }}
          </template>
        </span>
      </div>
    </a-col>
  </a-row>
</template>

<script>
export default {
  props: {
    // 展示对象
    data: {
      type: Object,
      default: () => ({})
    },
    // 显示项
    columns: {
      type: Array,
      default: () => []
    },
    // 每项数据的间距
    gutter: {
      type: Number,
      default: 20
    }
  }
}
</script>

<style scoped lang="less">
.info {
  padding: 5px 0;
  display: flex;
  &-label {
    padding-right: 10px;
    color: #222328;
  }
  &-content {
    width: 0;
    flex: 1;
    color: #63687B;
  }
}
</style>
