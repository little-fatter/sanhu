<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-09 15:16:48
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-09 17:28:19
 * @Description:  消息
 -->
<template>
  <div class="demo">
    <div class="demo-item" v-for="item in demos" :key="item.title">
      <router-link :to="item.url">
        <a>{{ item.title }}</a>
      </router-link>
    </div>
  </div>
</template>

<script>
const demos = [
  {
    title: '通用列表数据面板组件',
    url: '/demo/data-panel'
  },
  {
    title: 'pdf面板组件',
    url: '/demo/pdf-panel'
  }
]

export default {
  data () {
    this.demos = demos
    return {

    }
  }
}
</script>

<style>

</style>