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
import { getHost } from '@/config/api.config'
import { isNotEmpty } from '../../utils/util'
import { getFormDetail, getFormsDetailByEventInfoIdPdf } from '../../api/sampleApi'

export default {
  components: {
    'pdfPanel': PdfPanel
  },
  data () {
    return {
      // pdf页数
      pdf: '/pdf/test.pdf',
      id: '',
      formType: '',
      files: [
        {
          title: '污染源.jpg',
          path: 'http://ci.biketo.com/d/file/news/bikenews/2020-03-04/6457641638b8ee17a95c930d624f63a3.png'
        },
        {
          title: '污染源.jpg',
          path: 'http://ci.biketo.com/d/file/news/bikenews/2020-03-05/a8801141956d617cda49c85c9c3f4627.jpg'
        },
        {
          title: '污染源.jpg',
          path: 'http://ci.biketo.com/d/file/news/girl/2020-03-07/7d2de48e737e6249a479e2b6f211050a.jpg'
        },
        {
          title: '污染源.jpg',
          path: 'http://ci.biketo.com/d/file/news/bikenews/2020-03-07/dd3f1d954fcafa8f93135b47f8b5fd75.jpg'
        },
        {
          title: '执法附件  抚仙湖政府管理决策法规第367条',
          path: 'http://ci.biketo.com/d/file/news/bikenews/2020-03-04/6457641638b8ee17a95c930d624f63a3.png'
        },
        {
          title: '执法附件  抚仙湖政府管理决策法规第367条',
          path: 'http://ci.biketo.com/d/file/news/bikenews/2020-03-07/dd3f1d954fcafa8f93135b47f8b5fd75.jpg'
        }
      ]
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.id = this.$route.query.id || 'e68050bf-e3a6-44dc-949b-f35e996606e2'
      this.formType = this.$route.query.formType || 'form_inquestrecord'
      if (isNotEmpty(this.id)) {
        this.loadData(this.id)
      }
    },
    loadData (id) {
      getFormDetail('form_inquestrecord', null, id, ['attachment']).then((res) => {
        if (res) {
          console.log('getFormDetail -> res', res)
        }
      })
      const FormID = '47f6f786-f478-4948-9705-1918cac58f23'
      getFormsDetailByEventInfoIdPdf(FormID, this.formType).then(res => {
        if (isNotEmpty(res)) {
          this.pdf = `${getHost('list')}/${res}`
        }
      })
    }
  }
}
</script>
