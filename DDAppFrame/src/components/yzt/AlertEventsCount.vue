<template>
  <van-grid :border="false" :column-num="4" class="my-grid" >
    <van-grid-item v-for="(p,i) in list" :key="i + Math.random()">
      <!-- <van-cell :value="p.count+''" :value-class="countColors[i]"></van-cell> -->
      <div slot="text" :class="countColors[i]">{{ p.count+'' }}</div>
    </van-grid-item>
    <van-grid-item v-for="(p,i) in list" :key="i + Math.random()" :text="p.title+''" >
    </van-grid-item>
  </van-grid>
</template>

<script>

export default {
  name: 'AlertEventsCount',
  components: {},
  props: {},
  data: function () {
    return {
      title: '事件统计',
      list: [
        {
          count: 0,
          title: '告警'
        },
        {
          count: 0,
          title: '处理中'
        },
        {
          count: 0,
          title: '未完成'
        },
        {
          count: 0,
          title: '超时'
        }
      ],
      countColors: ['alert-count-cell-1', 'alert-count-cell-2', 'alert-count-cell-3', 'alert-count-cell-4']
    }
  },
  methods: {
    updataCountList: function (list) {
      this.list[0].count = list[0]
      this.list[1].count = list[1]
      this.list[2].count = list[2]
      this.list[3].count = list[3]
    }
  }
}
</script>

<style scoped>
.my-grid{
  width: 343px;
  margin: 0 auto;
}
.alert-count-cell-1{
  text-align: center;
  color: rgba(58, 157, 250, 1);
}
.alert-count-cell-2{
  text-align: center;
  color: rgba(249, 223, 95, 1);
}
.alert-count-cell-3{
  text-align: center;
  color: rgba(255, 132, 5, 1);
}
.alert-count-cell-4{
  text-align: center;
  color: rgba(246, 93, 77, 1);
}
</style>
