<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item v-for="(item, index) in breadList" :key="index">
      <router-link
        v-if="item.name =='index' || item.path!=path"
        :to="{ path: item.path === '' ? '/' : item.path }"
      >{{ item.meta.title }}</router-link>
      <span v-else>{{ item.meta.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>

/**
 * 通用导航面包屑组件
 */
export default {
  name: 'SBreadcrumb',
  data () {
    return {
      path: '',
      breadList: []
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      this.breadList = []
      this.path = this.$route.path
      this.$route.matched.forEach((item) => {
        // item.meta.name === 'dashboard' ? item.path = '/dashboard' : this.$route.path === item.path
        this.breadList.push(item)
      })
      console.log('breadList', this.breadList)
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  }
}
</script>

<style scoped>

</style>
