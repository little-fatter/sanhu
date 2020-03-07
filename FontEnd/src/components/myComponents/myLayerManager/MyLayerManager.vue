<template>
  <a-list class="list" :bordered="true" :grid="{ gutter: 2, column: 6 }" :dataSource="data">
    <a-list-item
      slot="renderItem"
      slot-scope="item,itemIndex"
      :class="item.active?itemActiveClassNames[itemIndex]:'item'"
      @click="onItemClick(item)"
    >
      <a-dropdown placement="bottomCenter">
        <a-list-item-meta >
          <a
            slot="title"
            :style="{color:item.active?'white':'rgba(100, 105, 124, 1)'}"
          >{{ item.title }}</a>
          <a-avatar slot="avatar" shape="square" :size="21" :src="item.active?item.aimg:item.img"></a-avatar>
        </a-list-item-meta>
        <a-menu :key="'item' + itemIndex" slot="overlay" >
          <a-menu-item :key="index" v-for="(sub, index) in item.subs"><a-checkbox :checked="sub.active" @click="onItemSubSelected(item,sub)">{{ sub.title }}</a-checkbox></a-menu-item>
        </a-menu>
      </a-dropdown>

    </a-list-item>
  </a-list>
</template>

<script>
import Avatar from 'ant-design-vue/es/avatar'
import appConfig from '@/config/app.config'
export default {
  name: 'MyLayerManager',
  props: {
    afterItemClick: {
      type: Function,
      default: undefined
    },
    afterLayerItemSubChange: {
      type: Function,
      default: undefined
    }
  },
  components: {
    Avatar
  },
  data: function () {
    return {
      data: [
        {
          title: '人员',
          layerName: 'peopleLayer',
          img: appConfig.StaticWebContext + '/img/yzt-renyuanceng/renshu1.png',
          aimg: appConfig.StaticWebContext + '/img/yzt-renyuanceng/renshu.png',
          active: true,
          subs: [
            {
              index: 0,
              title: '执法人员',
              active: true
            },
            {
              index: 1,
              title: '巡检人员',
              active: true
            }
          ]
        },
        {
          title: '设备',
          layerName: 'equipmentLayer',
          img: appConfig.StaticWebContext + '/img/yzt-renyuanceng/xuexijiankong.png',
          aimg: appConfig.StaticWebContext + '/img/yzt-renyuanceng/xuexijiankong1.png',
          active: true,
          subs: [
            {
              index: 0,
              title: 'AI摄像头',
              active: true
            },
            {
              index: 1,
              title: '无人机',
              active: true
            }
          ]
        },
        {
          title: '事件',
          layerName: 'alertEventLayer',
          img: appConfig.StaticWebContext + '/img/yzt-renyuanceng/daiban.png',
          aimg: appConfig.StaticWebContext + '/img/yzt-renyuanceng/daiban1.png',
          active: true,
          subs: []
        },
        {
          title: '船只',
          layerName: 'shipLayer',
          img: appConfig.StaticWebContext + '/img/yzt-renyuanceng/chuan.png',
          aimg: appConfig.StaticWebContext + '/img/yzt-renyuanceng/chuan1.png',
          active: true,
          subs: [
            {
              index: 0,
              title: '渔船',
              active: true
            },
            {
              index: 1,
              title: '游船',
              active: true
            }
          ]
        },
        {
          title: '人流',
          layerName: 'heatLayer',
          img: appConfig.StaticWebContext + '/img/yzt-renyuanceng/bingzhuangtu-tianchong.png',
          aimg: appConfig.StaticWebContext + '/img/yzt-renyuanceng/bingzhuangtu-tianchong1.png',
          active: true,
          subs: []
        },
        {
          title: '建筑',
          layerName: '',
          img: appConfig.StaticWebContext + '/img/yzt-renyuanceng/jianzhuwu.png',
          aimg: appConfig.StaticWebContext + '/img/yzt-renyuanceng/jianzhuwu1.png',
          active: true,
          subs: []
        }
      ],
      itemActiveClassNames: [
        'item-active item-active-start',
        'item-active',
        'item-active',
        'item-active',
        'item-active',
        'item-active item-active-end'
      ]
    }
  },
  methods: {
    onItemClick: function (item) {
      item.active = !item.active
      for (let i = 0; i < item.subs.length; i++) {
        item.subs[i].active = item.active
      }
      // 组件外部的逻辑
      if (this.afterItemClick) {
        this.afterItemClick(item)
      }
    },
    onItemSubSelected: function (item, sub) {
      // console.log(e)
      sub.active = !sub.active
      if (this.afterLayerItemSubChange) {
        this.afterLayerItemSubChange(item)
      }
    }
  }
}
</script>

<style scoped>
.list{
    background-color: white;
}
.item{
    /* margin-top: 18px; */
    height: 50px;
    padding-top: 14px;
}
.item-active{
    background-color: rgba(58, 157, 250, 1);
    height: 50px;
    padding-top: 14px;
}
.item-active-start{
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}
.item-active-end{
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
</style>
