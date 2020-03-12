<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-09 17:21:09
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-11 10:52:57
 * @Description:  PDF面板组件
 -->

<template>
  <div class="pdf-page">
    <pdf-panel :pdf="pdf" :files="files" pdfName="处罚决定" />
  </div>
</template>

<script>
import PdfPanel from '@/components/business/PdfPanel'

export default {
  components: {
    PdfPanel
  },
  
  data () {
    this.pdf = '/pdf/test.pdf'
    return {
      // pdf页数
      pageCount: 0,
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

  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.pdf-page {
  min-height: 100%;
  padding: 10px;
  background-color: #F6F7FB;
}
</style>