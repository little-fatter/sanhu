<template>
  <div>
    <a-row class="top">
      <a-col class="top-L-col" :span="24">
        <a-card title="表单创建">
          <a-row class="row">
            <a-col :span="8" class="col" @click="gotoCreate('caseCreate')">
              <div>
                <img src="../../assets/icons/组 685.png" alt="图片加载失败">
              </div>
              <div class="formName">案件创建表</div>
            </a-col>
            <a-col :span="8" class="col" >
              <div>
                <img src="../../assets/icons/组 691.png" alt="图片加载失败">
              </div>
              <div class="formName" >处罚决定书</div>
            </a-col>
            <a-col :span="8" class="col" @click="gotoCreate('caseFinalReportCreate')">
              <div>
                <img src="../../assets/icons/组 698.png" alt="图片加载失败">
              </div>
              <div class="formName">结案报告</div>
            </a-col>
          </a-row>
          <a-row class="row">
            <a-col :span="8" class="col" @click="gotoCreate('askPutDownCreate')">
              <div>
                <img src="../../assets/icons/组 704.png" alt="图片加载失败">
              </div>
              <div class="formName">询问笔录</div>
            </a-col>
            <a-col :span="8" class="col">
              <div>
                <img src="../../assets/icons/组 704.png" alt="图片加载失败">
              </div>
              <div class="formName">勘验笔录</div>
            </a-col>
            <a-col :span="8" class="col" @click="gotoCreate('inventoryCreate')">
              <div>
                <img src="../../assets/icons/组 700.png" alt="图片加载失败">
              </div>
              <div class="formName">物品清单</div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>

export default {
  name: 'FormList',
  components: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  methods: {
    gotoCreate (name) {
      console.log(name)
      this.$router.push({ name: name })
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>
<style lang='less' scoped>
.top {
    padding:20px;
    .top-L-col {
        border-radius: 8px!important;
        .row {
            margin-bottom:20px;
            .col {
                text-align: center;
            }
        }
    }
}
</style>
