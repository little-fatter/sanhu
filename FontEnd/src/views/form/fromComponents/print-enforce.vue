<template>
  <div class="printCot">
    <div class="company">
      玉溪市抚仙湖管理局
    </div>
    <div class="formStyle">
      行政执法巡查记录表
    </div>
    <div class="docuNum">
      <span>xxx</span><span>[xxx]</span><span>xxx号</span>
    </div>
    <div class="contBox">
      <a-row class="row">
        <a-col class="colSize colLine" :span="4">巡查时间</a-col>
        <a-col class="colSize" :span="20">col-21</a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="4">巡查路线</a-col>
        <a-col class="colSize" :span="20" style="color:red;">col-21</a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="4">巡查情况及发现的问题</a-col>
        <a-col class="colSize" :span="20">col-21</a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="4">对巡查发现的问题采取的初步处理意见</a-col>
        <a-col class="colSize" :span="20">col-21</a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="4">处理结果</a-col>
        <a-col class="colSize" :span="20">col-21</a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="4">巡查人员签名</a-col>
        <a-col class="colSize" :span="20">col-21</a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="4">巡查负责人签名</a-col>
        <a-col class="colSize" :span="20">col-21</a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="4">巡查科室负责人签名</a-col>
        <a-col class="colSize" :span="20">col-21</a-col>
      </a-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PrintEnforce',
  components: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  methods: {

  },
  created () {

  },
  mounted () {

  }
}
</script>
<style lang='less' scoped>
.printCot {
    text-align:center;padding:20px;
    .company {
        color:#101010;font-weight:bold;font-size:18px;
        letter-spacing: 6px;
        margin: 10px;
    }
    .formStyle {
        font-size:24px;letter-spacing: 4px;
    }
    .docuNum {
        text-align:right;padding:20px 0;border-bottom:4px #101010 solid;letter-spacing: 6px;
        span {
            margin:0 5px;
        }
    }
    .contBox {
        border:1px solid #bbbbbb;margin-top: 40px;
        .row {
            border-bottom:1px solid #bbbbbb;
            .colSize {
                padding: 10px;
                font-size: 16px;
            }
            .colLine {
                border-right:1px solid #bbbbbb;
            }
        }
    }
}
</style>
