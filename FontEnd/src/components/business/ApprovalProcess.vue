<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-10 15:54:30
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-13 15:08:57
 * @Description:  审批流程
 -->

<template>
  <div class="ap-container">
    <div class="ap-item" v-for="(item, index) in list" :key="index">
      <template v-if="item.avatar">
        <a-avatar class="ap-item-avatar" :src="item.avatar" :size="60" />
      </template>
      <template v-else>
        <a-avatar class="ap-item-avatar" :size="60" :style="{ backgroundColor: '#3A9DFA', verticalAlign: 'middle' }">
          {{ item.username }}
        </a-avatar>
      </template>
      <div class="ap-item-main">
        <div class="ap-item-header">
          <span class="ap-item-title">
            <slot name="title">{{ item.title }} </slot>
          </span>
        </div>
        <div class="ap-item-body">
          <div class="ap-item-content">
            <slot>{{ item.content }}</slot>
          </div>
          <span class="ap-item-time">{{ item.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          username: '张三',
          avatar: 'https://images.pexels.com/photos/2444429/pexels-photo-2444429.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          title: '张三',
          status: '发起上传',
          content: '李四，王五，赵六',
          time: '2020-03-13'
        },
        {
          username: '李四',
          avatar: '',
          title: '张三',
          status: '发起上传',
          content: '李四，王五，赵六',
          time: '2020-03-13'
        }
      ]
    }
  }
}
</script>

<style scoped lang="less">
.ap {
  &-container {

  }
  &-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    &-avatar {
      margin-right: 15px;
    }
    &-main {
      width: 0;
      flex: 1;
      padding: 10px 15px;
      border: 1px solid #DCDEE2;
      border-radius: 8px;
    }
    &-header {
      margin-bottom: 6px;
    }
    &-body {
      display: flex;
      font-size: 12px;
    }
    &-title {
      color: #222328;
    }
    &-content {
      width: 0;
      flex: 1;
      margin-right: 10px;
    }
  }
}
</style>