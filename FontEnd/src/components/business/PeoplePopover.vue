<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-17 09:26:23
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-17 10:22:24
 * @Description:  人员信息气泡卡片
 -->

<template>
  <a-popover arrowPointAtCenter>
    <template slot="content">
      <div class="people-popover-item" v-for="item in columns" :key="item.key">
        <span class="people-popover-label">{{ item.label }}</span>:
        <span class="people-popover-value">{{ data[item.key] }}</span>
      </div>
    </template>
    <slot />
  </a-popover>
</template>

<script>
const COLUMNS = [
  {
    label: '姓名',
    key: 'Name'
  },
  {
    label: '性别',
    key: 'Gender'
  },
  {
    label: '身份证',
    key: 'IDcard'
  },
  {
    label: '电话',
    key: 'Contactnumber'
  },
  {
    label: '职业',
    key: 'Occupation'
  },
  {
    label: '地址',
    key: 'address'
  }
]

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    this.columns = COLUMNS
    return {

    }
  }
}
</script>

<style scoped lang="less">
.people-popover {
  &-item {
    width: 260px;
    display: flex;
    margin: 5px 0;
    font-size: 14px;
  }
  &-label {
    width: 3.5em;
  }
  &-value {
    width: 0;
    flex: 1;
    padding-left: 5px;
  }
}
</style>
