<style lang="less" scoped>
.pdf-page {
  min-height: 100%;
  padding: 10px;
  background-color: #F6F7FB;
}
</style>

<template>
  <div class="pdf-page">
    <pdf-panel :pdf="pdf" :files="files" pdfName="处罚决定" />
  </div>
</template>

<script>
import PdfPanel from '@/components/business/PdfPanel'
import { isNotEmpty } from '../../utils/util'
import { getFormDetail, getFormsDetailByEventInfoIdPdf } from '../../api/sampleApi'
import { LAW_PUNISHMENT_INFO } from '@/config/model.config'

export default {
  components: {
    'pdfPanel': PdfPanel
  },
  data () {
    return {
      // pdf页数
      pdf: 'pdf/test.pdf',
      id: '',
      files: [
        {
          fileName: '污染源.jpg',
          FileCode: 'http://ci.biketo.com/d/file/news/bikenews/2020-03-04/6457641638b8ee17a95c930d624f63a3.png'
        }
      ]
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.id = this.$route.query.id
      if (isNotEmpty(this.id)) {
        this.loadData(this.id)
      }
    },
    loadData (id) {
      const type = LAW_PUNISHMENT_INFO
      getFormDetail(type, null, id, ['attachment']).then((res) => {
        if (res && isNotEmpty(res.attachment)) {
          this.files = res.attachment
        }
      })
      getFormsDetailByEventInfoIdPdf(id, type).then(res => {
        if (isNotEmpty(res)) {
          this.pdf = res
        }
      })
    }
  }
}
</script>
