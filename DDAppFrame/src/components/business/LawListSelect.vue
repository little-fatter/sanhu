<template>
  <van-popup
    v-model="showModel"
    position="bottom"
    :style="{ height: '80%' }"
    @close="onClosePopup"
  >
    <div class="list_wapper">
      <div class="list_wapper_title">
        <div class="desc">选择法规</div>
        <div class="list_wapper_title_right">
          <van-icon name="cross" slot="right-icon" @click="onClosePopup" size="20" />
        </div>
      </div>
      <div class="search-area">
        <van-cell-group>
          <van-field
            v-model="queryParam.lawType"
            readonly
            class="dropdown-menu_noboder">
            <template slot="input">
              <van-dropdown-menu>
                <van-dropdown-item v-model="queryParam.lawType" :options="lawTypeoptions" @change="lawTypeSelectChange" />
              </van-dropdown-menu>
            </template>
          </van-field>
          <van-search
            v-model="queryParam.Keyword"
            placeholder="请输入搜索关键词"
            show-action
            shape="round"
          >
            <div slot="action" @click="onSearch">搜索</div>
          </van-search>
          <div class="keyword-wapper">
            <span>常用关键字：</span>
            <a>禁止</a>
            <a>行为</a>
            <a>处罚</a>
          </div>
        </van-cell-group>
      </div>
      <div>
        <s-list
          :dataCallback="loadData"
          ref="mylist">
          <van-panel class="list-item" v-for="(item,index) in list" :key="index">
            <div class="list-item_title" slot="header">
              <div class="list-item_title_left">
                {{ item.title }}
              </div>
              <div class="list-item_title_right">
                <a @click="onPopupConfirm(item)">选择</a>
              </div>
            </div>
            <van-cell v-for="(child,mIndex) in item.items" :key="mIndex" :title="child.content">

            </van-cell>
          </van-panel>
        </s-list>
      </div>
    </div>
  </van-popup>
</template>

<script>
/**
 * 法规选择组件
 */
import SList from '../../components/list/SList.vue'
const lawData = [{
  objId: 1,
  title: '第十二条 抚仙湖一级保护区内禁止下列行为',
  items: [
    {
      content: '（一）新建排污口；'
    },
    {
      content: '（二）新建、扩建或者擅自改建建筑物、构筑物，经玉溪市人民政府批准的环境监测、执法 ……'
    }
  ]
},
{
  objId: 2,
  title: '第十四条 抚仙湖二级保护区内禁止新建、改建、扩建污染环境、破坏生态平衡和自然景观的工矿企业和其他项目',
  items: []
},
{
  objId: 3,
  title: '第十五条 抚仙湖保护范围内禁止下列行为',
  items: [
    {
      content: '（四）生产、经营、使用含磷洗涤用品和国家禁止的剧毒、高毒、高残留农药；'
    }
  ]
}
]
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
      queryParam: {
        Keyword: '',
        lawType: -1
      },
      list: [],
      showModel: false,
      lawTypeoptions: [
        { text: '请选择法律文件后查询', value: -1 },
        { text: '云南抚仙湖保护条例', value: 1 },
        { text: '云南星云湖保护条例', value: 2 },
        { text: '云南省杞麓湖保护条例', value: 3 }
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
    },
    loadData (parameter) {
      return new Promise((resolve) => {
        var result = {}
        this.list = lawData
        console.log('list', this.list)
        result.Total = lawData.length
        return resolve(result)
      })
    },
    onSearch () {

    },
    onClosePopup () {
      this.$emit('onClosePopup')
    },
    onPopupConfirm (item) {
      this.$emit('onPopupConfirm', item)
    },
    lawTypeSelectChange (value) {

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
