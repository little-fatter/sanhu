<template>
  <van-popup
    v-model="showModel"
    position="bottom"
    :style="{ height: '100%' }"
    @close="onClosePopup"
  >
    <div class="list_wapper">
      <div class="list_wapper_title">
        <div class="desc">选择法律法规</div>
        <div class="list_wapper_title_right">
          <van-icon name="cross" slot="right-icon" @click="onClosePopup" size="20" />
        </div>
      </div>
      <div class="search-area">
        <van-cell-group>
          <van-field
            v-model="queryParam.plawRuleFileId"
            readonly
            class="dropdown-menu_noboder">
            <template slot="input">
              <van-dropdown-menu>
                <van-dropdown-item v-model="queryParam.plawRuleFileId" :options="lawFileoptions" />
              </van-dropdown-menu>
            </template>
          </van-field>
          <van-search
            v-model="queryParam.Keyword"
            placeholder="请输入搜索关键词后查询"
            show-action
            shape="round"
          >
            <div slot="action" @click="onSearch">搜索</div>
          </van-search>
          <div class="keyword-wapper">
            <span>常用关键字：</span>
            <a @click="keywordSearch('禁止')">禁止</a>
            <a @click="keywordSearch('行为')">行为</a>
            <a @click="keywordSearch('处罚')">处罚</a>
          </div>
        </van-cell-group>
      </div>
      <div>
        <!-- <s-list
          :dataCallback="loadData"
          :totalKey="totalRows"
          ref="mylist">
          <van-panel class="list-item" v-for="(item,index) in list" :key="index">
            <div class="list-item_title" slot="header">
              <div class="list-item_title_left">
                {{ item.lawRuleName }}
              </div>
              <div class="list-item_title_right">
                <a @click="onPopupConfirm(item)">选择</a>
              </div>
            </div>
            <van-cell :value="lawRuleContent"></van-cell>
          </van-panel>
        </s-list> -->
        <van-panel class="list-item" v-for="(item,index) in list" :key="index">
          <div class="list-item_title" slot="header">
            <div class="list-item_title_left">
              {{ item.lawRuleName }}
            </div>
            <div class="list-item_title_right">
              <a @click="onPopupConfirm(item)">选择</a>
            </div>
          </div>
          <van-cell :value="item.lawRuleContent"></van-cell>
        </van-panel>
      </div>
    </div>
  </van-popup>
</template>

<script>
/**
 * 法规选择组件
 */
import SList from '../../components/list/SList.vue'
import { getLawRuleItemList, getLawFileList } from '../../api/sfdxApi'
import { isEmpty, isNotEmpty } from '../../utils/util'
export default {
  name: 'LawListSelect',
  components: {
    SList
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
      loading: false,
      queryParam: {
        Keyword: '',
        plawRuleFileId: -1
      },
      list: [],
      showModel: false,
      lawFileoptions: [
        { text: '请选择法律文件后查询', value: -1 }
      ]
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
      this.loadLawFile()
    },
    loadLawFile () {
      getLawFileList().then(res => {
        if (res) {
          res = JSON.parse(res)
          res.forEach(item => {
            var option = {
              text: item.fileName,
              value: item.objId
            }
            this.lawFileoptions.push(option)
          })
        }
      })
    },
    loadData () {
      if (this.queryParam.plawRuleFileId === -1) {
        this.$toast('请先选择法律法规文件')
        return
      }
      if (isEmpty(this.queryParam.Keyword)) {
        this.$toast('请输入搜索关键词后查询')
        return
      }
      this.loading = true
      getLawRuleItemList(this.queryParam.Keyword, this.queryParam.plawRuleFileId).then((res) => {
        var list = []
        if (res) {
          res = JSON.parse(res)
          res.forEach(rule => {
            var item = {
              lawRuleName: '',
              lawRuleContent: ''
            }
            if (isNotEmpty(rule.itemParentContent)) {
              item.lawRuleName = rule.itemParentContent
              item.lawRuleContent = rule.itemContent
            } else {
              item.lawRuleName = rule.itemContent
              item.lawRuleContent = isEmpty(rule.itemSubContent) ? '' : rule.itemSubContent
            }
            list.push(item)
          })
        }
        this.list = list
      }).finally(() => {
        this.loading = false
      })
    },
    onSearch () {
      this.loadData()
    },
    keywordSearch (item) {
      this.queryParam.Keyword = item
      this.onSearch()
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

    .keyword-wapper
    {
       padding-left: 20px;
       padding-bottom: 20px;

       a {
         color: #1989fa;
       }
    }

    .list-item_title
    {
        min-height: 30px;
        line-height: 30px;
        padding: 20px 0px;
    }

    .list-item_title_left
    {
      padding-left: 30px;
      max-width: 60%;
      display: inline-block;
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
         margin-left: 20px;
         .item
         {
           display: inline-block;
          //  border: 1px solid #BBBBBB;
           padding: 2px;
           color: #4D6282;
           margin-right: 10px;
         }
      }

      .footer_right
      {
        float: right;
         .item
         {
           display: inline-block;
         }
      }
    }
}
</style>
