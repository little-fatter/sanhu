<template>
  <van-swipe :autoplay="autoplay" :width="width" :height="height" @change="onChange" class="van-swipe-customer">
    <van-swipe-item v-for="(item, index) in images" :key="index" @click="handleItemClick(item.Url)">
      <!-- <img v-lazy="image.Image" /> -->
      <div
        :style="{backgroundImage:'url(' + item.Image + ')'}"
        class="imgDiv">
      </div>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: 'ImageSwipe',
  props: {
    images: {
      type: Array,
      default: function () {
        return []
      }
    },
    autoplay: {
      type: Number,
      default: 3000
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  created () {

  },
  beforeDestroy () {
  },
  methods: {
    onChange (index) {
      this.currentIndex = index
    },
    handleItemClick (url) {
      // if (isNotEmpty(url)) {
      //   if (url.toLowerCase().indexOf('http:') > -1 || url.toLowerCase().indexOf('https:') > -1) {
      //     if (isAppEnv()) {
      //       this.$api.rmStorage('frm_ExternalWeb')
      //       this.$acApi.closeFrame({
      //         name: 'frm_ExternalWeb'
      //       })
      //       this.$api.setStorage('frm_ExternalWeb', true)
      //       this.$acApi.openFrame({
      //         name: 'frm_ExternalWeb',
      //         url: url,
      //         rect: {
      //           x: 0,
      //           y: 0,
      //           w: 'auto',
      //           h: 'auto'
      //         }
      //       })
      //     } else {
      //       window.location.href = url
      //     }
      //   } else {
      //     this.$router.push({ path: url })
      //   }
      // }
    }
  }
}
</script>

<style lang='less' scoped>
@import url('../../assets/css/mixin.less');
.van-swipe-customer
{
    .px2rem(height, 160);
}
.van-swipe-item
{
    .imgDiv {
        width: 100%;
        height: 100%;
        background-size:cover;
        background-position: center;
    }
}
</style>
