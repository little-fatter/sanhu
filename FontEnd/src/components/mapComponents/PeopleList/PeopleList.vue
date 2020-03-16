<template>
  <!-- 右侧人员列表，设备列表 -->
  <a-layout>
    <a-layout-header class="header">
      <div class="left title-icon"></div>
      <div class="left title-text">{{ title }}</div>
      <div class="right">
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link dropdown-title">{{ tabs[selectedTab].name }}<a-icon type="down"/></a>
          <a-menu slot="overlay">
            <a-menu-item :key="tab.index" v-for="tab in tabs" @click="onTabSeleted(tab)">{{ tab.name }}</a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="clear"></div>
    </a-layout-header>
    <a-layout-content>
      <hr class="line"/>
      <!-- 人员列表tab -->
      <div v-show="selectedTab === 0">
        <div class="lyr1">
          <a-button class="online-button" :type="tabs[0].onlyShowOnline?'primary':'default'" @click="onShowButtonClick(tabs[0])">在线</a-button>
          <a-button class="all-button" :type="tabs[0].onlyShowOnline?'default':'primary'" @click="onShowButtonClick(tabs[0])">所有人员</a-button>

        </div>
        <a-input-search class="a-input-search" placeholder="请输入执法人姓名" @search="onSearch" size="large">
          <a-button slot="enterButton">搜索</a-button>
        </a-input-search>
        <a-list :dataSource="tabs[0].subs">
          <a-list-item slot="renderItem" slot-scope="item">
            <div>
              <div class="left sub-title font-16">{{ item.name }}</div>
              <a-icon class="left sub-drop" :type="item.open?'up':'down'" @click="onSubDropClick(item)"></a-icon>
              <div class="clear"></div>
            </div>
            <div class="sub-list-div" v-show="item.open" slot="extra">
              <a-list :bordered="false" :dataSource="item.list">
                <a-list-item
                  slot="renderItem"
                  slot-scope="p"
                  class="no-border sub-list-item"
                >
                  <div slot="extra">
                    <div class="left font-14 person-name" @click="onClickPerson(p)">{{ p.StaffName }}</div>
                    <div class="left font-14 person-online" :style="p.online?{}:{color: 'rgba(161, 166, 186, 1)'}">{{ p.online?'在线':'离线' }}</div>

                    <a-button-group class="person-operation">
                      <a-avatar
                        :key="p.name + ',1'"
                        @click="onClickVideo(p)"
                        class="person-operation-item"
                        shape="square"
                        :size="14"
                        :src="imgs.shexiangtou"></a-avatar>
                      <a-avatar
                        :key="p.name + ',2'"
                        @click="onClickVoice(p)"
                        class="person-operation-item"
                        shape="square"
                        :size="14"
                        :src="imgs.huatong"></a-avatar>
                      <a-avatar
                        :key="p.name + ',3'"
                        @click="onClickPhone(p)"
                        class="person-operation-item"
                        shape="square"
                        :size="14"
                        :src="imgs.dianhua"></a-avatar>
                    </a-button-group>

                    <div class="clear"></div>
                  </div>
                </a-list-item>
              </a-list>
            </div>
          </a-list-item>
        </a-list>
      </div>
      <!-- 设备列表tab -->
      <div v-show="selectedTab === 1">
        <div class="lyr1">
          <a-button class="online-button" :type="tabs[1].onlyShowOnline?'primary':'default'" @click="onShowButtonClick(tabs[1])">在线</a-button>
          <a-button class="all-button" :type="tabs[1].onlyShowOnline?'default':'primary'" @click="onShowButtonClick(tabs[1])">所有设备</a-button>
        </div>
        <a-list :dataSource="tabs[1].subs">
          <a-list-item slot="renderItem" slot-scope="item,index">
            <div>
              <div class="left sub-title font-16">{{ item.name }}</div>
              <a-icon class="left sub-drop" :type="item.open?'up':'down'" @click="onSubDropClick(item)"></a-icon>
              <div class="clear"></div>
            </div>
            <div class="sub-list-div" v-show="item.open" slot="extra">
              <a-list :bordered="false" :dataSource="item.list">
                <a-list-item slot="renderItem" slot-scope="p" class="no-border sub-list-item">
                  <div slot="extra">
                    <div class="left font-14 equipment-name" @click="onClickEquipment(p)">{{ p.name }}</div>
                    <template v-if="index == 0">
                      <div class="left font-14 equipment-online" :style="p.online?{}:{color: 'rgba(161, 166, 186, 1)'}">{{ p.online?'在线':'离线' }}</div>
                    </template>
                    <template v-if="index == 1">
                      <div class="left font-14 equipment-online" :style="p.online?{}:{color: 'rgba(161, 166, 186, 1)'}">{{ p.online?'飞行中':'待飞' }}</div>
                    </template>
                    <div class="clear"></div>
                  </div>
                </a-list-item>
              </a-list>
            </div>
          </a-list-item>
        </a-list>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script>
import appConfig from '@/config/app.config'
/**
 * PeopleList.setMapApp方法赋值
 */
var mapApp = {}
export default {
  name: 'PeopleList',
  props: {
    /**
     * 前端数据中心
     */
    dataGet: {
      type: Object,
      default: undefined
    }
  },
  data: function () {
    return {
      title: '执法队伍',
      selectedTab: 0,
      tabs: [
        {
          index: 0,
          name: '人员列表',
          onlyShowOnline: false,
          subs: [
            // {
            //   index: 0,
            //   name: '执法一大队',
            //   teamType: 0,
            //   open: true,
            //   list: [
            //     {
            //       name: '王圣峰',
            //       online: true,
            //       location: [11456131.160076441, 2816040.92138897]
            //     },
            //     {
            //       name: '张华清',
            //       online: true,
            //       location: [11455048.535624135, 2806258.636159215]
            //     },
            //     {
            //       name: '王峰',
            //       online: true,
            //       location: [11455048.535624135, 2806258.636159215]
            //     },
            //     {
            //       name: '黄庆令',
            //       online: true,
            //       location: [11445807.562620534, 2801232.1654877993]
            //     },
            //     {
            //       name: '黄名全',
            //       online: true,
            //       location: [11449016.770818437, 2805910.649728117]
            //     },
            //     {
            //       name: '张丽',
            //       online: true,
            //       location: [11448784.779864373, 2825900.536936747]
            //     },
            //     {
            //       name: '边瑾',
            //       online: true,
            //       location: [11454523.08450299, 2830881.3995001386]
            //     }
            //   ]
            // },
            // {
            //   index: 1,
            //   name: '巡检二大队',
            //   teamType: 1,
            //   open: true,
            //   list: [
            //     {
            //       name: '张三',
            //       online: true,
            //       location: [11459394.894538362, 2829412.123457725]
            //     },
            //     {
            //       name: '李四',
            //       online: true,
            //       location: [11456726.99856661, 2830494.7479100297]
            //     },
            //     {
            //       name: '王五',
            //       online: true,
            //       location: [11460925.63979379, 2824160.604781257]
            //     },
            //     {
            //       name: '刘备',
            //       online: true,
            //       location: [11458698.921676166, 2816923.2770972075]
            //     },
            //     {
            //       name: '关羽',
            //       online: true,
            //       location: [11455799.03475035, 2814139.385648424]
            //     },
            //     {
            //       name: '张飞',
            //       online: true,
            //       location: [11450463.242806846, 2814990.019146663]
            //     },
            //     {
            //       name: '赵云',
            //       online: true,
            //       location: [11454561.749662, 2810620.8561784327]
            //     }
            //   ]
            // }
          ]
        },
        {
          index: 1,
          name: '设备列表',
          onlyShowOnline: false,
          subs: [
            {
              index: 0,
              name: '摄像头',
              open: true,
              list: [
                // {
                //   id: 0,
                //   name: '摄像头xxx',
                //   online: true,
                //   location: [11451694.011647668, 2831054.013192837]
                // }
              ]
            },
            {
              index: 1,
              name: '无人机',
              open: true,
              list: [

              ]
            }
          ]
        }
      ],
      imgs: {
        shexiangtou: appConfig.StaticWebContext + '/img/yzt-renyuanceng/shexiangtou.png',
        huatong: appConfig.StaticWebContext + '/img/yzt-renyuanceng/huatong.png',
        dianhua: appConfig.StaticWebContext + '/img/yzt-renyuanceng/dianhua.png'
      }
    }
  },
  methods: {
    setMapApp: function (_mapApp) {
      mapApp = _mapApp
    },
    onTabSeleted: function (tab) {
      this.selectedTab = tab.index
    },
    onShowButtonClick: function (tab) {
      tab.onlyShowOnline = !tab.onlyShowOnline
    },
    onSearch: function (value) {
      console.log(value)
    },
    onSubDropClick: function (item) {
      item.open = !item.open
    },
    /**
     * 获取人员列表
     */
    getPersonList: function () {
      var ps = []
      for (let i = 0; i < this.tabs[0].subs.length; i++) {
        var sub = this.tabs[0].subs[i]
        for (let j = 0; j < sub.list.length; j++) {
          var p = sub.list[j]
          ps.push({
            id: p.id,
            team: i,
            name: p.name,
            online: p.online,
            location: p.location,
            teamType: sub.teamType,
            dep: sub.name,
            region: '抚仙湖 南部',
            phone: 13500000000
          })
        }
      }
      return ps
    },
    updatePersonList: function () {
    //   this.tabs[0].subs.length = 0
    //   this.tabs[0].subs = [...list]
      var list = this.dataGet.getPeopleList()
      this.tabs[0].subs.length = 0
      this.tabs[0].subs = [...list]
    },
    /**
     * 获取设备列表
     */
    getEquipmentList: function () {
      var ps = []
      for (let i = 0; i < this.tabs[1].subs.length; i++) {
        var sub = this.tabs[1].subs[i]
        for (let j = 0; j < sub.list.length; j++) {
          var p = sub.list[j]
          ps.push({
            id: p.id,
            typeIndex: i,
            name: p.name,
            online: p.online,
            location: p.location
            // teamType: sub.teamType,
            // dep: sub.name,
            // region: '抚仙湖 南部',
            // phone: 13500000000
          })
        }
      }
      return ps
    },
    updateEquipmentList: function (list) {
      this.tabs[1].subs[0].list = [...list.shexiangtou]
      this.tabs[1].subs[1].list = [...list.wurenji]
    },
    onClickVideo: function (p) {
      var info = this.findP(p.name)
      if (this.afterClickOpenVideo) {
        this.afterClickOpenVideo(info)
      }
    },
    onClickVoice: function (p) {
      var info = this.findP(p.name)
      if (this.afterClickOpenVoice) {
        this.afterClickOpenVoice(info)
      }
    },
    onClickPhone: function (p) {
      var info = this.findP(p.name)
      if (this.afterClickOpenPhone) {
        this.afterClickOpenPhone(info)
      }
    },
    findP: function (name) {
      var list = this.getPersonList()
      var index = list.findIndex(function (x) {
        return x.name === name
      })
      return list[index]
    },
    onClickPerson: function (item) {
      this.afterPeopleListItemClick && this.afterPeopleListItemClick(item)
    },
    onClickEquipment: function (item) {
      this.afterEquipmentListItemClick && this.afterEquipmentListItemClick(item)
    }
  },
  mounted: function () {
    // document['personList'] = this
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
    float: right;
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
.dropdown-title{
  color:rgba(99, 104, 123, 1);
  font-size: 16px;
}
.lyr1{
    margin-top: 12px;
}
.a-input-search{
    margin-top: 12px;
    margin-left: 20px;
    width: 320px;
}
.online-button{
    margin-left: 88px;
}
.all-button{
    margin-left: 20px;
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
.sub-title{
    margin-left: 20px;
    min-width: 200px;
}
.sub-drop{
    margin-left: 104px;
}
.sub-list-div{
    /* margin: 0; */
}
.no-border{
    border: none;
}
.sub-list-item{
    padding: 0;
    margin: 14px 0px;
}
.person-name{
    margin-left: 20px;
    min-width: 50px;
    text-align:justify;text-justify:distribute-all-lines;text-align-last:justify;
}
.person-online{
    margin-left: 75px;
    color: rgba(31, 192, 142, 1);
}
.person-operation{
    margin-left: 90px;
}
.person-operation-item{
  margin-left: 10px;
}
.equipment-name{
  margin-left: 20px;
  min-width: 130px;
}
.equipment-online{
  margin-left: 112px;
  color: rgba(31, 192, 142, 1);
  text-align: right;
  width: 48px;
}
</style>
