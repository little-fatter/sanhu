<template>
  <div class="exception">
    <div class="img">
      <img :src="config[type].img"/>
    </div>
    <div class="content">
      <h1>{{ config[type].title }}</h1>
      <div class="desc">{{ config[type].desc }}</div>
      <div class="action">
        <van-button type="info" @click="handleToHome">返回首页</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Img403 from '@/assets/icons/exception/403.svg'
import Img404 from '@/assets/icons/exception/404.svg'
import Img500 from '@/assets/icons/exception/500.svg'
export default {
  name: 'ExceptionPage',
  props: {
    type: {
      type: String,
      default: '404'
    }
  },
  data () {
    return {
      config: {
        403: {
          img: Img403,
          title: '403',
          desc: '抱歉，你无权访问该页面'
        },
        404: {
          img: Img404,
          title: '404',
          desc: '抱歉，你访问的页面不存在或仍在开发中'
        },
        500: {
          img: Img500,
          title: '500',
          desc: '抱歉，服务器出错了'
        }
      }
    }
  },
  methods: {
    handleToHome () {
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>

<style lang="less" scoped>
  .exception {
    min-height: 500px;
    height: 80%;
    align-items: center;
    text-align: center;
    margin-top: 150px;
    .img {
      display: inline-block;
      padding-right: 52px;
      zoom: 1;
      img {
        height: 360px;
        max-width: 430px;
      }
    }
    .content {
      display: inline-block;
      flex: auto;
      h1 {
        color: #434e59;
        font-size: 72px;
        font-weight: 600;
        line-height: 72px;
        margin-bottom: 24px;
      }
      .desc {
        color: rgba(0, 0, 0, .45);
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 16px;
      }
    }
  }

  .mobile {
    .exception {
      margin-top: 30px;
      .img {
        padding-right: unset;

        img {
          height: 40%;
          max-width: 80%;
        }
      }
    }
  }
</style>
