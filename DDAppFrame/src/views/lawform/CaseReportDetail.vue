<template>
  <div>
    <van-cell-group>
      <van-field
        v-model="casereport.caseName"
        label="案件"
        placeholder="请输入案件"
      />
      <van-field
        v-model="casereport.dsy"
        label="当事人"
        placeholder="请输入当事人"
      />
      <van-field
        v-model="casereport.xb"
        label="性别"
        placeholder="请输入性别"
      />
      <van-field
        v-model="casereport.sfz"
        label="身份证号"
        placeholder="请输入身份证号"
      />
      <van-field
        v-model="casereport.ajly"
        label="案件来源"
        placeholder="请输入案件来源"
      />
      <van-field
        v-model="casereport.aq"
        rows="2"
        autosize
        label="案情"
        type="textarea"
        maxlength="200"
        placeholder="请输入案情"
        show-word-limit
      />
    </van-cell-group>
    <item-group title="证据附件">
      <s-upload
        ref="myupload"
        :accept="access"
        :sync2Dingding="false"
        :isOnlyView="true"
      >
      </s-upload>
    </item-group>
    <item-group title="违法依据">
      <div>
        {{ casereport.yj }}
      </div>
    </item-group>
    <van-cell-group>
      <van-field
        v-model="casereport.sbr"
        label="上报人员"
        placeholder="请输入上报人员"
      />
    </van-cell-group>
  </div>
</template>

<script>
import ItemGroup from '../../components/tools/ItemGroup'
import SUpload from '../../components/file/StandardUploadFile'
export default {
  name: 'CaseReportDetail',
  components: {
    ItemGroup,
    SUpload
  },
  props: {

  },
  data () {
    return {
      casereport: {
        caseName: '案件1',
        sbr: '张同时',
        xb: '男',
        sfz: '510602199409025796',
        ajly: '网络',
        dsy: '李某某',
        aq: '售卖假口罩，骗取200万元',
        yj: `    当事人已违反《中华人民共和国×××法》×××条×××款×××项、
        《云南省抚仙湖保护条例》第×××条×××款×××项、......的规定，
        根据《中华人民共和国×××法》×××条×××款×××项、
        《云南省抚仙湖保护条例》第×××条×××款×××项、......的规定，
        建议对×××的违法问题立案查处。`
      }
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {

  },
  watch: {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
