<template>
  <div>
    <van-cell-group v-for="item in caseFileList" :key="item.fileName+'@'">
      <van-cell :title="item.fileName" icon="label-o" :value="item.fileTime"/>
    </van-cell-group>
    <van-divider class="tip">到底了</van-divider>
  </div>
</template>

<script>
export default {
  name: 'CaseFlies',
  data () {
    return {
      caseFileList: [
        { fileName: '巡查记录表', fileTime: '2020-2-29 13:52:36' },
        { fileName: '案件受理记录', fileTime: '2020-2-20 14:32:26' },
        { fileName: '涉嫌犯罪案件移送书勘验（检查）', fileTime: '2020-2-18 10:22:10' }
      ]
    }
  },
  mounted () {
    // 接收路由传参
    console.log(this.$route.params.caseId)
  }
}
</script>

<style scoped>
    .tip {
        width: 60%;
        margin-left: 20%;
    }
</style>
