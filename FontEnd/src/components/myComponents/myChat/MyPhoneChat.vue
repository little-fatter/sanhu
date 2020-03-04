<template>
  <a-modal
    class="main"
    title="拨打电话"
    centered
    v-model="show"
    :footer="null"
    :width="520"
  >
    <div class="voice-div" >
      <!-- <a-avatar :src="info.avatar" :size="50" class="user-avatar"></a-avatar> -->
      <div class="user-name font-14">{{ info.name }}:{{ info.phone }}</div>
      <div class="operation">
        <a-button type="primary" class="operation-j">拨打</a-button>
        <a-button type="danger" class="operation-g" @click="close">挂断</a-button>
        <a-button type="primary" class="operation-v">录音</a-button>
      </div>
      <div class="link-info font-14">
        连接状况...
      </div>
    </div>
  </a-modal>
</template>
<script>
import appConfig from '@/config/app.config'

export default {
  name: 'MyVoiceChat',
  props: {

  },
  data: function () {
    return {
      show: false,
      info: {
        name: '-',
        avatar: appConfig.StaticWebContext + '/img/yzt-renyuanceng/user.png',
        phone: '-------------------'
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
        // this.info.avatar = info.avatar || appConfig.StaticWebContext + '/img/yzt-renyuanceng/user.png'
        this.info.phone = info.phone || '-------------------'
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
  height: 220px;
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
    /* top: 80px; */
    width: 100%;
    /* text-align: center; */
}
.link-info{
    position: absolute;
    width: 100%;
    height: 150px;
    top: 80px;
    border: 1px gray solid;
}
.operation{
    position: absolute;
    top: 30px;
    left: 50%;
    margin-left: -105px;
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
