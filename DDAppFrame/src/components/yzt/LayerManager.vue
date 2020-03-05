<template>
  <van-grid :column-num="1" class="my-layer-grid" v-show="show">
    <van-grid-item
      :class="l.open?'layer-item-selected':'layer-item-unselected'"
      :key="l.index + Math.random()"
      v-for="l in list"
      :text="l.name"
    >
      <van-icon slot="icon" :name="imgs[l.index]"/>
    </van-grid-item>
  </van-grid>
</template>
<script>
import svgShuizhi from '../../assets/icons/yzt/shuizhi.png'
import svgQixiang from '../../assets/icons/yzt/qixiang.png'
import svgKongqi from '../../assets/icons/yzt/kongqi.png'
import svgWuranyuan from '../../assets/icons/yzt/wuranyuan.png'
import svgXhifa from '../../assets/icons/yzt/zhifa.png'
import svgTurang from '../../assets/icons/yzt/turang.png'
import svgShuizhiS from '../../assets/icons/yzt/shuizhi-s.png'
import svgQixiangS from '../../assets/icons/yzt/qixiang-s.png'
import svgKongqiS from '../../assets/icons/yzt/kongqi-s.png'
import svgWuranyuanS from '../../assets/icons/yzt/wuranyuan-s.png'
import svgXhifaS from '../../assets/icons/yzt/zhifa-s.png'
import svgTurangS from '../../assets/icons/yzt/turang-s.png'
export default {
  name: 'LayerManager',
  data: function () {
    return {
      show: true,
      list: [],
      imgs: [
        svgShuizhi, svgQixiang, svgKongqi, svgWuranyuan, svgXhifa, svgTurang
      ],
      imgsSeleted: [
        svgShuizhiS, svgQixiangS, svgKongqiS, svgWuranyuanS, svgXhifaS, svgTurangS
      ]
    }
  },
  mounted: function () {
    this.list.length = 0
    var list = [{
      index: 0,
      name: '水质',
      open: false
    }, {
      index: 1,
      name: '气象',
      open: false
    }, {
      index: 2,
      name: '空气',
      open: false
    }, {
      index: 3,
      name: '污染',
      open: false
    }, {
      index: 4,
      name: '执法',
      open: true
    }, {
      index: 5,
      name: '土壤',
      open: false
    }]
    this.list.push(...list)
  }
}
</script>
<style scoped>
.my-layer-grid{
  width: 1.2rem;
  height: auto;
  margin-top: 3rem;
}
.layer-item-selected {
  background-color: rgba(58, 157, 250, 1)
}
.layer-item-unselected {
  background-color: white
}
</style>
