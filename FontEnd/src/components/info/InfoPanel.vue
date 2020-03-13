<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-13 15:42:42
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-13 15:42:51
 * @Description:  展示大量信息用
 -->

<template>
  <a-row :gutter="gutter">
    <a-col v-for="(item, index) in columns" :span="item.span || 24" :key="index">
      <div class="info">
        <span class="info-label">{{ item.label }}</span>
        <span class="info-content">{{ data[item.key] }}</span>
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

</style>
