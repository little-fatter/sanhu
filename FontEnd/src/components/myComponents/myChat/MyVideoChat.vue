<template>
  <a-modal
    class="main"
    title="视频通话"
    centered
    v-model="show"
    :footer="null"
    :width="675"
  >
    <div class="video-div">
      <video class="video" src=""></video>
      <a-avatar :src="info.avatar" class="user-avatar"></a-avatar>
      <div class="user-name">{{ info.name }}</div>
      <div class="link-info">正在等待对方接受邀请...</div>
      <div class="operation">
        <a-button type="primary" class="operation-j">静音</a-button>
        <a-button type="danger" class="operation-g" @click="close">挂断</a-button>
        <a-button type="primary" class="operation-v">切到语音</a-button>
      </div>
    </div>
  </a-modal>
</template>
<script>
import appConfig from '@/config/app.config'
export default {
  name: 'MyVideoChat',
  props: {},
  data: function () {
    return {
      show: false,
      info: {
        name: '-',
        avatar: appConfig.StaticWebContext + '/img/yzt-renyuanceng/user.png'
      }
    }
  },
  methods: {
    close: function () {
      this.show = false
    },
    open: function (info) {
      if (info) {
        this.info.name = info.name || '-'
        this.info.avatar = info.avatar || appConfig.StaticWebContext + '/img/yzt-renyuanceng/user.png'
      }
      this.show = true
    }
  }
}
</script>

<style scoped>
.header{
  background-color: white;
  height: 44px;
  line-height: 44px;
  padding-left: 32px;border-radius: 5px;
}
.left{
  float: left;
}
.right{
  float: left;
}
.clear{
  clear: both;
}
.title-icon{
  width:4px;
  height: 20px;
  background: rgba(58, 157, 250, 1);
  margin-top: 12px;
  margin-right: 14px;
}
.title-text{
  color: rgba(34, 35, 40, 1);
  font-size: 16px;
}
.close-button{
  margin-left: 140px;
}
.main{
  width: 626px;
  height: 377px;
}
.video-div{
  width: 626px;
  height: 377px;
  position: relative;
  border: 1px gray solid;
}
.video-div video{
  width: 100%;
  height: 100%;
}
.user-avatar{
    position: absolute;
    right: 12px;
    top: 12px;
}
.user-name{
    position: absolute;
    right: 50px;
    top: 10px;
}
.link-info{
    position: absolute;
    right: 50px;
    top: 30px;
}
.operation{
    position: absolute;
    bottom: 5px;
    left: 200px;
}
.operation-j{
    margin-left: 0
}
.operation-g{
    margin-left: 10px
}
.operation-v{
    margin-left: 10px
}
</style>
