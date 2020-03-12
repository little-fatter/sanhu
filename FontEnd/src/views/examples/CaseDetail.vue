<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-11 10:56:23
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-11 11:00:35
 * @Description:  案件详情
 -->

<template>
  <div class="data-page">
    <case-detail />
  </div>
</template>

<script>
import CaseDetail from '@/components/business/CaseDetail'

export default {
  components: {
    CaseDetail
  }
}
</script>

<style scoped lang="less">
.data-page {
  min-height: 100%;
  padding: 10px;
  background-color: #F6F7FB;
}
</style>
