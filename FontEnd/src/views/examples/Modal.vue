<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-11 10:46:16
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-20 15:18:42
 * @Description:  模态演示
 -->

<template>
  <div>
    <a-button type="primary" @click="$refs.selectPeople.open()">选择人员</a-button>
    <br>
    <a-button type="primary" @click="$refs.selectCase.open()">选择案件</a-button>
    <br>
    <a-button type="primary" @click="$refs.selectEvent.open()">选择事件</a-button>
    <br>
    <a-button type="primary" @click="$refs.selectRegulation.open()">选择法律法规</a-button>
    <select-people ref="selectPeople" @on-select="handleSelect" />
    <select-case ref="selectCase" @on-select="handleSelect" />
    <select-event ref="selectEvent" @on-select="handleSelect" />
    <select-regulation ref="selectRegulation" @on-select="handleSelect" />
  </div>
</template>

<script>
import SelectPeople from '@/components/business/SelectPeople'
import SelectCase from '@/components/business/SelectCase'
import SelectEvent from '@/components/business/SelectEvent'
import SelectRegulation from '@/components/business/SelectRegulation'

export default {
  components: {
    SelectPeople,
    SelectCase,
    SelectEvent,
    SelectRegulation
  },
  methods: {
    handleSelect (record) {
      console.log(record)
    }
  }
}
</script>

<style>

</style>
