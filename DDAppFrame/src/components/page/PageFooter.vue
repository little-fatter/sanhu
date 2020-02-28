<template>
  <van-tabbar v-model="active" class="page-footer">
    <van-tabbar-item
      v-for="(tab, index) in tabbars"
      :icon="tab.icon"
      :to="tab.path"
      :dot="tab.dot"
      :info="tab.info"
      :key="index"
      :z-index="1"
    >
      {{ tab.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { getFirstLevelMenus } from '../../utils/helper/menu.helper'
export default {
  name: 'PageFooter',
  data () {
    return {
      active: 0,
      tabbars: []
    }
  },

  computed: {
    firstLevelMenus: function () {
      return getFirstLevelMenus()
    }
  },
  watch: {
    $route: 'changeActive'
  },

  created () {
    for (const menu of this.firstLevelMenus) {
      const tabbarItem = {
        name: menu.menuName,
        path: menu.menuUrl,
        icon: menu.menuIcon,
        dot: false,
        info: null
      }
      this.tabbars.push(tabbarItem)
    }
    const toPath = this.$route.path
    this.setActive(toPath)
  },

  methods: {
    changeActive ({ path }) {
      this.setActive(path)
    },
    setActive (path) {
      this.tabbars.forEach((tab, i) => {
        if (tab.path === path) {
          this.active = i
          return false
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
@import url('../../assets/css/mixin.less');
.page-footer
{
  .px2rem(height, 46);
}
</style>
