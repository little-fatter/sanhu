<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="left title-icon"></div>
      <div class="left title-text">{{ title }}</div>
      <div class="clear"></div>
    </a-layout-header>
    <a-layout-content>
      <a-list :bordered="true" :grid="{ gutter: 2, column: 4 }" :dataSource="list">
        <a-list-item slot="renderItem" slot-scope="item" :extra="item.title">
          <a-list-item-meta >
            <a-avatar slot="avatar" shape="square" :size="40" :style="item.style">{{ item.count }}</a-avatar>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-layout-content>
  </a-layout>
</template>

<script>
import Avatar from 'ant-design-vue/es/avatar'

export default {
  name: 'EventsCount',
  components: { Avatar },
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
      title: '事件统计',
      list: [
        {
          count: 0,
          title: '告警',
          style: {
            'background-color': 'white',
            color: 'rgba(58, 157, 250, 1)',
            'font-size': '28px'
          }
        },
        {
          count: 0,
          title: '处理中',
          style: {
            'background-color': 'white',
            color: 'rgba(249, 223, 95, 1)',
            'font-size': '28px'
          }
        },
        {
          count: 0,
          title: '未完成',
          style: {
            'background-color': 'white',
            color: 'rgba(255, 132, 5, 1)',
            'font-size': '28px'
          }
        },
        {
          count: 0,
          title: '超时',
          style: {
            'background-color': 'white',
            color: 'rgba(246, 93, 77, 1)',
            'font-size': '28px'
          }
        }
      ]
    }
  },
  methods: {
    updataCountList: function () {
      var list = this.dataGet.getCountList()
      this.list[0].count = list[0]
      this.list[1].count = list[1]
      this.list[2].count = list[2]
      this.list[3].count = list[3]
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
</style>
