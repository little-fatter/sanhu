<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-17 11:15:07
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-17 16:03:21
 * @Description:  表单详情
 -->

<template>
  <div class="form-detail">
    <div class="form-detail-container">
      <div class="form-detail-header">
        <template v-if="detail.avatar">
          <a-avatar :src="detail.avatar" :size="60" />
        </template>
        <template v-else>
          <a-avatar :size="60" :style="{ backgroundColor: '#3A9DFA', verticalAlign: 'middle' }">
            {{ detail.username }}
          </a-avatar>
        </template>
        <span class="form-detail-header-main">执法人：{{ detail.username }}</span>
        <span>已完成</span>
      </div>
      <div class="form-detail-info">
        <info-panel :data="detail" :columns="columns">
          <img class="form-detail-signature" :src="detail.signature" />
        </info-panel>
      </div>
      <div class="form-detail-file" v-if="files[0]">
        <file-review :files="files" />
      </div>
      <div class="form-detail-process">
        <process />
      </div>
    </div>
  </div>
</template>

<script>
import FileReview from '@/components/file/FileReview'
import Process from './Process'
import InfoPanel from '@/components/info/InfoPanel'
import { formatTime } from '@/utils/util'

const COLUMNS = [
  {
    label: '当事人',
    key: 'a'
  },
  {
    label: '时间',
    key: 'b',
    customContent: text => text ? formatTime(text) : ''
  },
  {
    label: '违法事实及证据',
    key: 'c'
  },
  {
    label: '违法依据',
    key: 'd'
  },
  {
    label: '案件详情',
    key: 'e'
  },
  {
    label: '处理结果',
    key: 'f'
  },
  {
    label: '被执行人签字',
    slot: 'signature'
  },
]

export default {
  components: {
    FileReview,
    Process,
    InfoPanel
  },
  data () {
    this.columns = COLUMNS
    return {
      detail: {
        username: '张三',
        signature: '/img/commmon/signature_demo.png'
      },
      files: []
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
  // 签字
  &-signature {
    height: 50px;
  }
}
</style>
