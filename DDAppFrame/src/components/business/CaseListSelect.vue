<template>
  <van-popup
    v-model="showModel"
    position="bottom"
    :style="{ height: '100%' }"
    @close="onClosePopup"
  >
    <div class="list_wapper">
      <div class="list_wapper_title">
        <div class="desc">选择案件</div>
        <div class="list_wapper_title_right">
          <van-icon name="cross" slot="right-icon" @click="onClosePopup" size="20" />
        </div>
      </div>
      <div class="search-area">
        <van-search
          v-model="queryParam.Keyword"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
        >
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      </div>
      <div>
        <s-list
          :dataCallback="loadData"
          ref="mylist">
          <van-panel class="list-item" v-for="(item,index) in list" :key="index">
            <div class="list-item_title" slot="header">
              <div class="list-item_title_left">
                {{ item.CauseOfAction }}
              </div>
              <div class="list-item_title_right">
                <a @click="onPopupConfirm(item)">选择</a>
              </div>
            </div>
            <van-row class="list-item_content">
              <van-col span="8">
                <img-view :url="item.imgUrl" wapperClass="img-wapper"></img-view>
              </van-col>
              <van-col span="16">
                <van-cell title="事发地点" :value="item.IncidentAddress" style="padding-top:0"></van-cell>
                <van-cell title="案件类型" :value="item.CaseType"></van-cell>
                <van-cell title="办案人" :value="item.CreatUser"></van-cell>
              </van-col>
            </van-row>
            <div slot="footer" class="footer-wapper">
              <div class="footer_left">
                <div class="item"><van-tag plain type="primary" v-show="item.CaseNumber">{{ item.CaseNumber }}</van-tag></div>
                <div class="item"><van-tag plain type="success" v-show="item.CaseStatus">{{ item.CaseStatus }}</van-tag></div>
              </div>
              <div class="footer_right">
                <div class="item">{{ item.CreateDate | dayjs('YYYY-MM-DD') }}</div>
              </div>
            </div>
          </van-panel>
        </s-list>
      </div>
    </div>
  </van-popup>
</template>

<script>
/**
 * 案件选择组件
 */
import SList from '../../components/list/SList.vue'
import { getQueryConditon, isNotEmpty, isImg, getFileReadUrl, isEmpty } from '../../utils/util'
import { getPageDate } from '../../api/regulatoryApi'
import ImgView from '../../components/file/ImgView'
export default {
  name: 'CaseListSelect',
  components: {
    SList,
    ImgView
  },
  props: {
    showPopup: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    return {
      queryParam: {
        Keyword: ''
      },
      list: [],
      showModel: false
    }
  },
  watch: {
    showPopup (value, oldValue) {
      if (value !== oldValue) {
        this.showModel = value
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.showModel = this.showPopup
    },
    loadData (parameter) {
      var rules = []
      if (isNotEmpty(this.queryParam.Keyword)) {
        rules = [
          {
            field: 'CauseOfAction',
            op: 'like',
            value: this.queryParam.Keyword,
            type: 'string'
          },
          {
            field: 'CaseType',
            op: 'like',
            value: this.queryParam.Keyword,
            type: 'string'
          },
          {
            field: 'CaseTitle',
            op: 'like',
            value: this.queryParam.Keyword,
            type: 'string'
          }
        ]
      }
      var conditon = getQueryConditon(rules, 'or')
      return getPageDate('case_Info', parameter.pageIndex, parameter.pageSize, conditon).then((res) => {
        if (res.Rows) {
          res.Rows.forEach(item => {
            item.imgUrl = this.getCaseFile(item)
            this.list.push(item)
          })
        }
        return res
      })
    },
    getCaseFile (caseInfo) {
      var img = ''
      if (isNotEmpty(caseInfo.attachments) && caseInfo.attachments.length > 0) {
        for (const attachment of caseInfo.attachments) {
          var fileName = attachment.fileName || attachment.FileName
          var fileCode = attachment.fileCode || attachment.FileCode
          if (isImg(fileName)) {
            img = getFileReadUrl(fileCode)
            break
          }
        }
      }
      if (isEmpty(img) && isNotEmpty(caseInfo.evtFileUrl)) {
        img = caseInfo.evtFileUrl.split(',')[0]
      }
      return img
    },
    onSearch () {
      this.list = []
      this.$refs.mylist.refresh()
    },
    onClosePopup () {
      this.$emit('onClosePopup')
    },
    onPopupConfirm (item) {
      this.$emit('onPopupConfirm', item)
    }
  }
}
</script>

<style lang="less" scoped>
.list_wapper
{
   .list_wapper_title
    {
        height: 30px;
        line-height: 30px;
        padding-top: 10px;
        text-align: center;
        position: relative;
       .desc
       {
            font-size: 22px;
       }
       .list_wapper_title_right
       {
           position:absolute;
           top: 10px;
           right: 20px;
       }
    }

     .list-item
    {
       border-bottom: 20px solid #fafafa;
    }

    .list-item_title
    {
        height: 30px;
        line-height: 30px;
        padding: 10px 0px;
    }

    .list-item_content
    {
      /deep/ .img-wapper
      {
        width: 100%;
        height: 170px;
      }
      .van-cell__title
      {
         max-width: 100px !important;
      }
    }

    .list-item_title_left
    {
      float: left;
      padding-left: 25px;
    }

    .list-item_title_right
    {
      float: right;
       padding-right: 25px;
       a
       {
           color: #1989fa;
       }
    }

    .footer-wapper
    {
      height: 30px;
      line-height: 30px;
      .footer_left
      {
         float: left;
         margin-left: 0px;
         .item
         {
           display: inline-block;
          //  border: 1px solid #BBBBBB;
           padding: 2px;
          //  color: #4D6282;
           margin-right: 10px;
         }
      }

      .footer_right
      {
        float: right;
         .item
         {
           display: inline-block;
           padding-top: 5px;
         }
      }
    }
}
</style>
