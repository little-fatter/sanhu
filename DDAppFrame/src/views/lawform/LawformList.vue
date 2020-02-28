<template>
  <div>
    <navigate-group ref="navigateGroup"></navigate-group>
  </div>
</template>

<script>
/**
 * 执法表单列表
 */
import { getUserPermissionsAndMenus } from '../../service/currentUser.service'
import NavigateGroup from '@/components/tools/NavigateGroup'
export default {
  name: 'LawformList',
  components: {
    NavigateGroup
  },
  created () {
    getUserPermissionsAndMenus()
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
