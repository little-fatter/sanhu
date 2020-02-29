<template>
  <a-modal
    class="main"
    title="语音通话"
    centered
    v-model="show"
    :footer="null"
    :width="360"
  >
    <div class="voice-div" >
      <a-avatar :src="info.avatar" :size="50" class="user-avatar"></a-avatar>
      <div class="user-name font-14">{{ info.name }}</div>
      <div class="operation">
        <a-button type="primary" class="operation-j">静音</a-button>
        <a-button type="danger" class="operation-g" @click="close">挂断</a-button>
        <a-button type="primary" class="operation-v">切到视频</a-button>
      </div>
    </div>
  </a-modal>
</template>
<script>
import appConfig from '@/config/app.config';
export default {
  name: 'MyVoiceChat',
  props: {

  },
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
.main{
  width: 626px;
  height: 377px;
}
.voice-div{
  height: 150px;
  position: relative;
  /* border: 1px gray solid; */
}
.video-div video{
  width: 100%;
  height: 100%;
}
.user-avatar{
  position: absolute;
  top: 20px;
  left: 50%;
  margin-left: -25px;
}
.user-name{
    position: absolute;
    top: 80px;
    width: 100%;
    text-align: center;
}
.link-info{
    position: absolute;
    right: 50px;
    top: 30px;
}
.operation{
    position: absolute;
    top: 120px;
    left: 36px;
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
.font-16{
  font-size: 16px;
  color: rgba(127, 135, 174, 1);
}
.font-14{
  font-size: 14px;
  color: rgba(127, 135, 174, 1);
}
</style>
