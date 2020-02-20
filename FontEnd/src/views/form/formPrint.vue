<template>
  <div class="wrapper">
    <component ref="print" :is="formStyleName"></component>
    <div class="footer" >
      <span class="goback" @click="$router.back()">返回</span>
      <span class="printButton" @click="prints">打印</span>
    </div>
  </div>
</template>

<script>
import enforce from './fromComponents/print-enforce'
export default {
  name: 'FormPrint',
  components: { enforce },
  data () {
    return {
      formStyleName: 'enforce'
    }
  },
  computed: {},
  watch: {},
  methods: {
    prints () {
      this.$print(this.$refs.print)
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>
<style lang='less' scoped>
.wrapper {
    .footer {
        text-align:center;
        .printButton {
            padding: 8px 30px;
            border: 1px solid #bbbbbb;
            background: #1890ff;
            border-radius: 6px;
            color: white;
            letter-spacing: 4px;
        }
        .printButton:hover {
            cursor: pointer;
        }
        .goback {
            padding: 8px 30px;border:1px solid #bbbbbb;
            border-radius: 6px;letter-spacing: 4px;margin-right: 20px;
        }
        .goback:hover{
            cursor: pointer;
        }
    }
}
</style>
