<template>
  <div>
    <div style="font-size: 0;">
      <van-image
        :lazy-load="lazyLoad"
        :src="imgUrl"
        width="100%"
        :class="wapperClass"
        fit="cover"
        @click="viewBigImg"
      />
    </div>
    <van-image-preview
      v-model="isShowBigImg"
      :images="bigImgs"
      @onClose="bigImgClose"
    >

    </van-image-preview>
  </div>
</template>
<script>
import defaultImg from '../../assets/icons/defaultImg.jpg'
import { isNotEmpty } from '../../utils/util'
/**
 *  图片预览组件
 */
export default {
  name: 'ImgView',
  components: {

  },
  props: {
    /** 图片地址 */
    url: {
      type: String,
      default: '',
      required: true
    },
    /**
     * 图片自定义Class 用于自定义图片大小
     */
    wapperClass: {
      type: String,
      default: 'img-wapper'
    },
    /** 是否需要懒加载 */
    lazyLoad: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      bigImgs: [],
      isShowBigImg: false,
      imgUrl: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (isNotEmpty(this.url)) {
        this.imgUrl = this.url
      } else {
        this.imgUrl = defaultImg
      }
    },
    viewBigImg () {
      this.bigImgs = [this.url]
      this.isShowBigImg = true
    },
    bigImgClose () {
      this.isShowBigImg = false
    }
  }
}
</script>

<style lang="less" scoped>
.img-wapper
{
    width: 100%;
    height: 170px;
}
</style>
