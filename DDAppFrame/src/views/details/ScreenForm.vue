<template>
  <div class="screenForm">
    <van-cell-group>
      <van-cell title="状态" icon="stop" />
      <div class="contentBox status">
        <button :key="index" @click="statusChecked" v-for="(item,index) in statusButtonData">{{ item }}</button>
      </div>
      <van-cell title="类型" icon="stop" />
      <div class="contentBox type">
        <button :key="index" @click="typeChecked" v-for="(item,index) in typeButtonData">{{ item }}</button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      statusButtonData: ['全部', '审批中', '已撤销', '审批完成', '已完成'],
      typeButtonData: [
        '全部',
        '行政执法巡查记录表',
        '当场行政处罚决定书',
        '立案报告'
      ]

    }
  },
  watch: {},
  computed: {},
  methods: {
    statusChecked () {
      console.log(this)
    },
    typeChecked () {
      console.log(this)
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="less">
.van-icon-stop::before {
  color: #0973ec;
  border-radius: 50%;
}
.screenForm {
  .contentBox {
    margin: 5px 0 5px 58px;
    display: flex;
    align-content: center;
    button {
      width: 90px;
      height: 38px;
      font-size: 14px;
      margin: 5px;
      border-radius: 6px;
      border: 1px solid #bbb;
      background-color: #f9f5f5;
    }
    // 激活样式
    .active1 {
      background-color: #9dcfdf;
    }
    .active2 {
      background-color: #9dc69d;
    }
  }
  .status button:first-child {
    background-color: #9dcfdf !important;
  }
  .type button:first-child {
    background-color: #9dc69d!important;
  }
}
</style>
