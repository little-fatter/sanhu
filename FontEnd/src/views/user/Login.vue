<template>
  <div>
    <a-button type="primary" @click="handleSubmit">登录</a-button>
  </div>
</template>

<script>
import appConfig from '@/config/app.config'
export default {
  components: {
  },
  data () {
    return {

    }
  },
  created () {
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      const currentUser = {
        userName: '测试人员'
      }
      const permissionIds = []
      this.$ls.set(appConfig.localStorageKey.userInfo, currentUser)
      this.$ls.set(appConfig.localStorageKey.permissionId, permissionIds)
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
