<template>
  <div class="search">
    <div class="searchBox">
      <div class="search-area">
        <van-search v-model="queryParam.Keyword" placeholder="请输入搜索关键词" show-action shape="round">
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      </div>
    </div>
    <div class="history">
      <div class="bar">
        搜索历史
        <span @click="closeHistory">x</span>
      </div>
      <div class="listBox">
        <span
          v-show="showFlag"
          class="historyList"
          :key="index"
          v-for="(item,index) in historyList"
        >{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      queryParam: {
        Keyword: ''
      },
      searchShow: false,
      historyList: [
        '非法捕捞',
        '排放污水',
        '非法捕捞',
        '排放污水',
        '非法捕捞',
        '排放污水',
        '非法捕捞',
        '排放污水'
      ],
      formListData: '',
      showFlag: true // 历史记录显示隐藏标杆
    }
  },
  watch: {},
  computed: {
    // 显示隐藏切换
    show () {
      return this.formListData === ''
    }
  },
  methods: {
    // 搜索
    onSearch () {
      this.$emit('show', this.searchShow)
    },
    // 关闭历史记录
    closeHistory () {
      this.showFlag = !this.showFlag
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="less">
.search {
  .history {
    .bar {
      display: flex;
      justify-content: space-between;
      background-color: rgba(174, 174, 178, 0.36);
      line-height: 50px;
      padding: 0 20px;
      color: #101010;
      margin-bottom: 5px;
    }
    .listBox {
      padding: 0 20px;
      .historyList {
        color: #1989fa;
        display: inline-block;
        min-width: 50px;
        margin: 2px 10px;
      }
    }
  }
  .noContent {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
