<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-17 11:15:07
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-18 17:58:53
 * @Description:  表单详情
 -->

<template>
  <div class="form-detail">
    <div class="form-detail-container">
      <div class="form-detail-header">
        <template v-if="headerInfo.avatar">
          <a-avatar :src="headerInfo.avatar" :size="60" />
        </template>
        <template v-else>
          <a-avatar :size="60" :style="{ backgroundColor: '#3A9DFA', verticalAlign: 'middle' }">
            {{ headerInfo.username }}
          </a-avatar>
        </template>
        <span class="form-detail-header-main">执法人：{{ headerInfo.username }}</span>
        <span>{{ headerInfo.status }}</span>
      </div>
      <div class="form-detail-info">
        <slot />
      </div>
      <div class="form-detail-file" v-if="files[0]">
        <file-review :files="files" />
      </div>
      <div class="form-detail-process">
        <process :list="process" />
      </div>
    </div>
  </div>
</template>

<script>
import FileReview from '@/components/file/FileReview'
import Process from './Process'
import { formatTime } from '@/utils/util'

export default {
  components: {
    FileReview,
    Process
  },
  props: {
    // 头部信息
    headerInfo: {
      type: Object,
      default: () => ({})
    },
    // 文件列表
    files: {
      type: Array,
      default: () => []
    },
    // 流程
    process: {
      type: Array,
      default: () => []
    },
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="less">
.form-detail {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  &-container {
    max-width: 1000px;
    margin: auto;
  }
  &-header, &-info, &-file {
    border-bottom: 1px solid #DCDEE2;
  }
  &-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding-bottom: 20px;
    &-main {
      width: 0;
      flex: 1;
      padding: 10px;
      font-size: 16px;
      color: #222328;
    }
  }
  &-info {
    padding-bottom: 10px;
  }
  &-process {
    padding-top: 15px;
  }
}
</style>
