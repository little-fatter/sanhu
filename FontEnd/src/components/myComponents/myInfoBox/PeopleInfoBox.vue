<template>
  <a-layout v-show="show">
    <a-layout-header class="header">
      <div class="left title-icon"></div>
      <div class="left title-text">{{ title }}</div>
      <div class="right"><a-icon class="info-close" type="close" @click="close"/></div>
      <div class="clear"></div>
    </a-layout-header>
    <a-layout-content>
      <hr class="line"/>
      <div class="left left-div">
        <div class="font-14 info-row">
          <div class="info-row-title left">姓名</div>
          <div class="left">: {{ info.name }}</div>
          <div class="clear"></div>
        </div>
        <div class="font-14 info-row">
          <div class="info-row-title left">所属组织</div>
          <div class="left">: {{ info.dep }}</div>
          <div class="clear"></div>
        </div>
        <div class="font-14 info-row">
          <div class="info-row-title left">复杂区域</div>
          <div class="left">: {{ info.region }}</div>
          <div class="clear"></div>
        </div>
        <div class="font-14 info-row">
          <div class="info-row-title left">联系电话</div>
          <div class="left">: {{ info.phone }}</div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="right right-div">
        <a-avatar class="info-avatar" :size="50" :src="info.avatar"></a-avatar>
        <div class="info-online" :style="{color:info.online?'rgba(31, 192, 142, 1)':'rgba(127, 135, 174, 1)','font-size':'12px'}">{{ info.online?'在线':'离线' }}</div>
      </div>
      <div class="clear"></div>
      <div class="person-operation">
        <a-button type="primary" class="person-operation-v" @click="onClickVideo"><a-avatar shape="square" :size="12" :src="imgs.shexiangtou"></a-avatar>视频</a-button>
        <a-button type="primary" class="person-operation-y" @click="onClickVoice"><a-avatar shape="square" :size="12" :src="imgs.huatong"></a-avatar>语音</a-button>
        <a-button type="primary" class="person-operation-t" @click="onClickPhone"><a-avatar shape="square" :size="12" :src="imgs.dianhua"></a-avatar>电话</a-button>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script>
import appConfig from '@/config/app.config'
export default {
  name: 'PeopleInfoBox',
  props: {
    afterClickOpenVideo: {
      type: Function,
      default: undefined
    },
    afterClickOpenVoice: {
      type: Function,
      default: undefined
    },
    afterClickOpenPhone: {
      type: Function,
      default: undefined
    },
    afterClose: {
      type: Function,
      default: undefined
    }
  },
  data: function () {
    return {
      title: '执法人信息',
      show: false,
      info: {
        name: '-',
        dep: '-',
        region: '-',
        phone: '-',
        avatar: appConfig.StaticWebContext + '/img/yzt-renyuanceng/user.png',
        online: true
      },
      imgs: {
        shexiangtou: appConfig.StaticWebContext + '/img/yzt-renyuanceng/shexiangtou(20).png',
        huatong: appConfig.StaticWebContext + '/img/yzt-renyuanceng/huatong(20).png',
        dianhua: appConfig.StaticWebContext + '/img/yzt-renyuanceng/dianhua(20).png'
      }
    }
  },
  methods: {
    close: function () {
      this.show = false
      this.afterClose && this.afterClose()
    },
    open: function (info) {
      if (info) {
        this.info.name = info.name || '-'
        this.info.dep = info.dep || '-'
        this.info.region = info.region || '-'
        this.info.phone = info.phone || '-'
        this.info.avatar = info.avatar || '-'
        this.info.online = info.online || false
      }
      this.show = true
    },
    onClickVideo: function () {
      if (this.afterClickOpenVideo) {
        this.afterClickOpenVideo({
          name: this.info.name
        })
      }
    },
    onClickVoice: function () {
      if (this.afterClickOpenVoice) {
        this.afterClickOpenVoice({
          name: this.info.name
        })
      }
    },
    onClickPhone: function () {
      if (this.afterClickOpenPhone) {
        this.afterClickOpenPhone({
          name: this.info.name,
          phone: this.info.phone
        })
      }
    }
  }
}
</script>
<style scoped>
.header{
  background-color: white;
  height: 44px;
  line-height: 44px;
  padding-left: 20px;border-radius: 5px;
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
.line{
  height:1px;
  border:none;
  border-top:1px solid rgba(235, 235, 235, 1);
}
.font-16{
  font-size: 16px;
  color: rgba(127, 135, 174, 1);
}
.font-14{
  font-size: 14px;
  color: rgba(127, 135, 174, 1);
}
.info-row{
  margin: 10px 0;
}
.info-row-title{
  min-width: 60px;
  display: inline;
  text-align:justify;
  text-justify:distribute-all-lines;
  text-align-last:justify;
}
.left-div{
  margin-left: 20px;
  width: 200px;
}
.right-div{
  margin-left: 10px;
  width: 100px;
  text-align: center;
}
.info-avatar{
  margin-top: 30px;
}
.info-online{
  margin-top: 10px;
}
.info-close{
  margin-left: 140px;
}
.person-operation{
  margin: 15px 56px;
}
.person-operation-v{
  /* margin-left: 15px; */
}
.person-operation-y{
  margin-left: 15px;
}
.person-operation-t{
  margin-left: 15px;
}
.person-operation-item-title{
  /* padding: 0 5px; */
}
</style>
