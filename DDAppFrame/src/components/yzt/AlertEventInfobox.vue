<template>
  <van-panel v-show="show">
    <div slot="header">
      <van-cell>
        <!-- <van-icon slot="icon" :name="titleIcons[info.titleIconIndex]"></van-icon> -->
        <div slot="title">
          <van-icon slot="icon" :name="titleIcons[info.titleIconIndex]"/><font>{{ info.name }}</font>
        </div>
        <van-icon slot="right-icon" name="cross" @click="close"></van-icon>
        <div slot="label">
          <div class="left">{{ info.addr }}</div>
          <van-icon class="left" :name="distanseIcon" style="margin-left:37px;margin-right:7px"/>
          <div class="left">{{ info.distance }}</div>
          <div class="clear"></div>
        </div>
      </van-cell>
    </div>
    <div slot="default" class="content-div">
      <p class="content-div-lyr">事件描述：{{ info.des }}</p>
      <p class="content-div-lyr">处理状态：{{ evtStateMap.list[info.status] }}</p>
      <p class="content-div-lyr">上报时间：{{ info.uploadTime }}</p>
      <p class="content-div-lyr">上报来源：{{ info.uploadSource }}</p>
    </div>
    <div slot="footer">
      <van-button>查看详情</van-button>
      <van-button>事件核查</van-button>
    </div>
  </van-panel>
</template>
<script>
import titleIcon1 from '../../assets/icons/yzt/shijian/zhuyi.png'
import titleIcon2 from '../../assets/icons/yzt/shijian/zhuyi(1).png'
import titleIcon3 from '../../assets/icons/yzt/shijian/zhuyi(2).png'
import juliIcon from '../../assets/icons/yzt/juli.png'
import { isNumber } from '@turf/turf'
var titleIcons = [titleIcon1, titleIcon2, titleIcon3]
var evtStateMap = {
  list: ['待处理', '事件核查中', '跟踪整改中', '现场勘察中', '处理完成', '转为案件办理'],
  map: {
    '待处理': 0,
    '事件核查中': 1,
    '跟踪整改中': 2,
    '现场勘察中': 3,
    '处理完成': 4,
    '转为案件办理': 5
  },
  level: {
    '待处理': 0,
    '事件核查中': 1,
    '跟踪整改中': 1,
    '现场勘察中': 1,
    '处理完成': 2,
    '转为案件办理': 2
  }
}
export default {
  name: 'AlertEventInfobox',
  props: {
    afterClose: {
      type: Function,
      default: undefined
    }
  },
  data: function () {
    return {
      show: false,
      info: {
        titleIconIndex: -1,
        name: '-',
        addr: '-',
        distance: 1.3, // 距离
        status: 0, // 处理状态
        des: '-', // 事件描述
        uploadTime: '2019-12-26  15：33：47', // 上报时间
        uploadSource: 'AI摄像头识别'
      },
      distanseIcon: juliIcon,
      titleIcons: [...titleIcons],
      evtStateMap: evtStateMap
    }
  },
  methods: {
    open: function (info) {
      if (info) {
        this.info.id = info.id || '-'
        this.info.name = info.name || '-'
        this.info.status = info.status === undefined ? -1 : info.status
        this.info.des = info.des || '-'
        this.info.uploadTime = info.uploadTime || '-'
        this.info.addr = info.addr || '-'
        this.info.uploadSource = info.uploadSource || '-'
        this.info.distance = info.distance || '-'
        if (isNumber(this.info.distance)) {
          if (this.info.distance < 1000) {
            this.info.distance = Math.round(this.info.distance) + '米'
          } else {
            this.info.distance = Math.round(this.info.distance / 1000) + '千米'
          }
        }
        this.info.titleIconIndex = evtStateMap.level[evtStateMap.list[status]]
      }
      this.show = true
    },
    close: function () {
      this.show = false
      this.afterClose && this.afterClose()
    }
  },
  mounted: function () {}
}
</script>
<style scoped>
.left {
    float: left;
}
.clear{
    clear: both;
}
.content-div{
    padding: 0 0.4rem;
}
.content-div-lyr{
    margin: 0.2rem 0;
}
</style>
