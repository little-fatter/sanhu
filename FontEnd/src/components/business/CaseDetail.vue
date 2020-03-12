<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-11 09:52:57
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-11 14:35:21
 * @Description:  案件详情
 -->

<template>
  <div class="case-detail">
    <div class="panel case-detail-header">
      <div class="case-detail-top">
        <span class="case-detail-title">案〔2020〕3206号</span>
        <span class="case-detail-status">已结案</span>
      </div>
      <div class="case-detail-tab">
        <div>案件详情</div>
        <div>案卷列表</div>
      </div>
    </div>
    <div class="panel"></div>
    <div class="panel"></div>
    <div class="panel"></div>
    <div class="panel"></div>
  </div>
</template>

<script>
import Panel from '@/components/panel/Panel'

export default {
  components: {
    Panel
  }
}
</script>

<style scoped lang="less">
.panel {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  &-header {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid #DCDEE2;
    &-title {
      width: 0;
      flex: 1;
    }
  }
  &-body {
    padding: 20px;
  }
}
.case-detail {
  &-header {

  }
}
</style>