<template>
  <div class="my-top">
    <!-- 左边部分 -->
    <div class="left left-div">
      <a-avatar class="left avatar1" shape="square" :src="imgs[0]" :size="20"></a-avatar>
      <a-avatar class="left avatar2" shape="circle" :src="imgs[1]" :size="30"></a-avatar>
      <div class="left big-title">智慧三湖综合执法系统</div>
      <div class="dropdown-div left">
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link dropdown-title">{{ lakes[selectedLakeIndex].name }}<a-icon type="down"/></a>
          <a-menu slot="overlay">
            <a-menu-item :key="lake.index" v-for="lake in lakes" @click="onLakeSeleted(lake)">{{ lake.name }}</a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="clear"></div>
    </div>
    <!-- 右边部分 -->
    <div class="right right-div">
      <!-- 天气 -->
      <a-avatar class="left avatar1" shape="square" :src="imgs[2]" :size="28"></a-avatar>
      <div class="left weather-info-div">
        <p class="weather-info">
          {{ weather.tianqi }} {{ weather.tem[0] }}-{{ weather.tem[1] }}°C {{ weather.wind }}
          AQI {{ weather.aqi[0] + ' '+weather.aqi[1] }}
        </p>
      </div>
      <!-- 信息提示计数 -->
      <div id="components-badge-demo-title" class="left">
        <a-badge :count="infoCount" title="">
          <a-avatar class="left" shape="square" :src="imgs[3]" :size="20"></a-avatar>
        </a-badge>
      </div>
      <!-- 用户 -->
      <a-avatar class="left avatar-user" shape="circle" :src="imgs[4]" :size="30"></a-avatar>
      <div class="dropdown-div left user-info">
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link dropdown-title">{{ userInfo.name }}<a-icon type="down"/></a>
          <a-menu slot="overlay">
            <!-- <a-menu-item :key="0" >{{ lake.name }}</a-menu-item> -->
          </a-menu>
        </a-dropdown>
      </div>
      <div class="clear"></div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
import Avatar from 'ant-design-vue/es/avatar'
import appConfig from '@/config/app.config'
export default {
  name: 'MyPageHeader',
  props: {
    /**
     * 切换湖后需要执行的逻辑，定义在组件外部
     */
    afterLakeSeleted: {
      type: Function,
      default: undefined
    }
  },
  data: () => {
    return {
      imgs: [
        appConfig.StaticWebContext + '/img/yzt-renyuanceng/gengduo.png',
        appConfig.StaticWebContext + '/img/yzt-renyuanceng/circle_blue.png',
        appConfig.StaticWebContext + '/img/yzt-renyuanceng/tianqicanshu.png',
        appConfig.StaticWebContext + '/img/yzt-renyuanceng/xiaoxi.png',
        appConfig.StaticWebContext + '/img/yzt-renyuanceng/user.png'
      ],
      lakes: [
        {
          index: 0,
          name: '抚仙湖'
        },
        {
          index: 1,
          name: '星云湖'
        },
        {
          index: 2,
          name: '杞麓湖'
        }
      ],
      weather: {
        tianqi: '晴',
        tem: [8, 18],
        wind: '西北风3级',
        aqi: [102, '轻度']
      },
      selectedLakeIndex: 0,
      infoCount: 5,
      userInfo: {
        name: '超级管理员'
      }
    }
  },
  components: {
    Avatar
  },
  methods: {
    onLakeSeleted: function (lake) {
      var index = lake.index
      this.selectedLakeIndex = index
      if (this.afterLakeSeleted) {
        this.afterLakeSeleted(lake)
      }
    }
  },
  mounted: function () {

  }
}
</script>

<style scoped>
.my-top{
    width:100%;
    height: 90px;
}
.left{
  float: left;
}
.right{
  float: right;
}
.clear{
  clear: both;
}
.left-div{
  margin-top: 30px;
}
.big-title{
  font-size: 18px;
  font-weight: bold;
  min-width: 186px;
  margin-left: 12px;
  line-height: 30px;
}
.avatar1{
  margin-top: 5px;
}
.avatar2{
  margin-left: 40px;
}
.dropdown-div{
  margin-left: 70px;
  line-height: 30px;
}
.dropdown-title{
  color:rgba(99, 104, 123, 1);
  font-size: 16px;
}
.right-div{
  min-width: 500px;
  margin-top: 30px;
}
#components-badge-demo-title{
  margin-left: 60px;
}

.weather-info-div{
  margin-left: 5px;
}
.weather-info{
  width: 150px;
  line-height: 20px;
}
.avatar-user{
  margin-left: 30px;
}
.user-info{
  margin-left: 20px;
}
</style>
