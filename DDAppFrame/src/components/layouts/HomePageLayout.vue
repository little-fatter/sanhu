<template>
  <div class="workplace">
    <div class="workplace-banner" v-if="isNeedBanner">
      <van-loading type="spinner" color="#1989fa" v-if="loading">
      </van-loading>
      <image-swipe :images="images" :width="widthSwipe" :height="heightSwipe"></image-swipe>
    </div>
    <navigate-group ref="navigateGroup"></navigate-group>
    <div class="workplace-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ImageSwipe from '@/components/tools/ImageSwipe'
import NavigateGroup from '@/components/tools/NavigateGroup'
import { getAppBannersForApp } from '../../api/userApi'
import { downloadFile } from '../../api/fileApi'
import { isNotEmpty } from '../../utils/util'
import bImg from '../../assets/icons/banner/b.jpg'
import cImg from '../../assets/icons/banner/c.jpg'
import dImg from '../../assets/icons/banner/d.jpg'
import fImg from '../../assets/icons/banner/f.jpg'
export default {
  name: 'HomePageLayout',
  components: {
    ImageSwipe,
    NavigateGroup
  },
  props: {
    /** 轮播图的图片数组 */
    isNeedBanner: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      widthSwipe: isNotEmpty(this.$acApi) ? this.$acApi.winWidth : 0,
      heightSwipe: 0,
      images: [],
      defaultImages: [
        {
          Image: bImg,
          Url: '/video'
        },
        {
          Image: cImg,
          Url: 'https://youzan.github.io/vant/mobile.html#/zh-CN/'
        },
        {
          Image: dImg,
          Url: ''
        },
        {
          Image: fImg,
          Url: ''
        }
      ],
      loading: false
    }
  },
  created () {
    this.loading = true
    if (this.isNeedBanner) {
      getAppBannersForApp().then((res) => {
        if (res && res.length > 0) {
          res.forEach(item => {
            downloadFile(item.Image).then(file => {
              window.URL = window.URL || window.webkitURL
              const url = window.URL.createObjectURL(file)
              const image = {
                Image: url,
                Url: item.Url
              }
              this.images.push(image)
            }).catch(() => {

            })
          })
        } else {
          this.images = this.defaultImages
        }
      }).catch(() => {

      }).finally(() => {
        this.loading = false
      })
    }
  },
  methods: {
    /**
     * 更新导航项的info信息
     * itemInfoArray是更新项数组，每项包含{menuId:'',info:''} 其中menuId对于菜单的Id，info是需要提示消息个数，如'8'
     */
    updateNavigateItemInfo (itemInfoArray) {
      this.$refs.navigateGroup.updateNavigateItemInfo(itemInfoArray)
    }
  }
}
</script>

<style lang='less' scoped>
@import url('../../assets/css/mixin.less');
.workplace
{
   .workplace-banner
   {
      width:100%;
      .px2rem(height;160);
   }

   .van-loading
   {
     display: flex;
     align-items: center;
     justify-content: center;
     height: 100%;
   }

   .workplace-content
   {
      margin-left: 20px;
      margin-right: 20px;
   }
}
</style>
