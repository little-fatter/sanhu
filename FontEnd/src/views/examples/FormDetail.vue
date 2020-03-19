<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-17 11:16:31
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-19 09:22:11
 * @Description:  
 -->

<template>
  <div class="data-page">
    <form-detail :header-info="headerInfo">
      <info-panel :data="detail" :columns="columns">
        <img slot="signature" class="signature" :src="detail.signature" />
      </info-panel> 
    </form-detail>
  </div>
</template>

<script>
import FormDetail from '@/components/business/FormDetail'
import InfoPanel from '@/components/info/InfoPanel'

const columns = [
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
    key: 'Illegalfacts'
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
    key: 'Punishmentdecision'
  },
  {
    label: '被执行人签字',
    slot: 'signature'
  },
]

const headerInfo = {
  avatar: '',
  username: '张三',
  status: '已完成'
}

export default {
  components: {
    FormDetail,
    InfoPanel
  },
  data () {
    this.columns = columns
    this.headerInfo = headerInfo
    return {
      detail: {
        signature: '/img/common/signature_demo.png'
      }
    }
  }
}
</script>

<style scoped lang="less">
.data-page {
  min-height: 100%;
  padding: 10px;
  background-color: #F6F7FB;
}
// 签字
.signature {
  height: 90px;
}
</style>