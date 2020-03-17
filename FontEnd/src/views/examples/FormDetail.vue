<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-17 11:16:31
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-17 13:26:24
 * @Description:  
 -->

<template>
  <div class="data-page">
    <form-detail />
  </div>
</template>

<script>
import FormDetail from '@/components/business/FormDetail'

export default {
  components: {
    FormDetail
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