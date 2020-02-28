<template>
  <div>
    <van-search
      v-model="keyword"
      placeholder="请输入搜索关键词"
      show-action
      :shape="shape"
      @search="onSearch"
      background="rgb(248,248,248)"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
  </div>
</template>

<script>
export default {
  name: 'SearchConponent',
  props: {
    shape: {
      type: String,
      default: 'square'
    }
  },
  data () {
    return {
      keyword: '' // 搜索关键字
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
  },
  methods: {
    onSearch () {
      // 搜索的方法
      // console.log('搜索方法触发', this.keyword)
      this.$emit('getSearchKeyword', this.keyword)
    }
  }
}
</script>
<style lang='less' scoped>
@import url('../../assets/css/mixin.less');
.page-footer
{
  .px2rem(height, 46);
}
.van-search__content{
  background: #fff;
}
</style>
