<template>
  <div class="RecordOfInquest">
    <van-cell title="检查事由" value="2020-02-26 13:52:26"></van-cell>
    <van-field border="true" value="四川" readonly name="eventAddress" label="事发地点">
      <van-icon name="location" color="#969799" slot="right-icon" size="30" />
    </van-field>
    <PartyInfoView :initData="initData"></PartyInfoView>
    <van-cell title="执法检查人员" value="2020-02-26 13:52:26"></van-cell>
    <van-cell title="记录人" value="2020-02-26 13:52:26"></van-cell>
    <van-cell title="监督检查类别" value="张三"></van-cell>
    <van-cell title="开始时间" value="2020-02-26 13:52:26"></van-cell>
    <van-cell title="结束时间" value="2020-02-26 13:52:26"></van-cell>
    <van-cell title="被检查陪同人" value="2020-02-26 13:52:26"></van-cell>
    <van-field
      type="textarea"
      label="勘察记录"
      value="1232311115645666666666666666666666666666666666666661265"
    />
    <van-cell>
      <van-button @click="returnSubmitForm" type="info" native-type="submit" size="large">返回</van-button>
    </van-cell>
  </div>
</template>

<script>
import PartyInfoView from '../../components/business/PartyInfoView'
export default {
  name: '',
  components: {
    PartyInfoView
  },
  props: {},
  data () {
    return {
      initData: []
    }
  },
  watch: {},
  computed: {},
  methods: {
    returnSubmitForm () {
      this.$router.go(-1)
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="less">
.van-field__control {
  color: #969799;
}
</style>
