<template>
  <div>
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    >
      <div
        slot="action"
      >
        <van-button @click="onSearch" size="small" plain>搜索</van-button>
        <van-button @click="onToggleShowAdvanceSearch" size="small" plain>高级搜索</van-button>
      </div>
    </van-search>
    <van-popup v-model="showAdvanceSearch" position="right" :overlay="true">
      <div class="popup_title" id="popupTitle">
        <span class="title">高级搜索</span>
      </div>
      <div class="popup_content">
        <slot></slot>
      </div>
      <div class="popup_footer">
        <div class="popup_footer_opeate">
          <van-button type="info" @click="onToggleShowAdvanceSearch" class="item">关闭</van-button>
          <van-button type="info" @click="onAdvanceSearch" class="item">确定</van-button>
          <van-button type="info" @click="onAdvanceSearchReset" class="item">重置</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'SearchGroup',
  props: {
    /**
      * 快捷搜索
      */
    searchCallback: {
      type: Function,
      required: true
    },
    /**
     * 高级搜索
     */
    advanceSearchCallback: {
      type: Function,
      default: null,
      required: false
    },
    /**
     * 高级搜索重置
     */
    advanceSearchResetCallback: {
      type: Function,
      default: null,
      required: false
    }

  },
  data () {
    return {
      value: '',
      showAdvanceSearch: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.setPopupTitle()
    },
    onSearch () {
      this.searchCallback(this.value)
    },
    onCancel () {
    },
    onToggleShowAdvanceSearch () {
      this.showAdvanceSearch = !this.showAdvanceSearch
      if (this.showAdvanceSearch) {
        const that = this
        that.$nextTick(function () {
          that.setPopupTitle()
        })
      }
    },
    onAdvanceSearch () {
      if (this.advanceSearchCallback) {
        this.advanceSearchCallback()
      }
      this.onToggleShowAdvanceSearch()
    },
    onAdvanceSearchReset () {
      if (this.advanceSearchResetCallback) {
        this.advanceSearchResetCallback()
      }
    },
    setPopupTitle () {
      if (this.$acApi) {
        const popupTitle = this.$el.querySelector('#popupTitle')
        if (popupTitle) {
          popupTitle.style.marginTop = '20px'
        }
      }
      // const dropdownMenuItem = this.$el.querySelector('.van-dropdown-menu__item')
      // if (dropdownMenuItem) {
      //   dropdownMenuItem.style.justifyContent = 'left'
      //   dropdownMenuItem.style.marginLeft = '10px'
      // }
    }
  }
}
</script>

<style lang='less' scoped>
@import url('../../assets/css/mixin.less');
.van-button--small
{
   height: 0.9rem !important;
   line-height: 0.9rem !important;
}

.van-popup {
    height: 100%;
    padding:0px !important;
    width: 60%;
    box-sizing: border-box;
    &--bottom {
      width: 100%;
      padding: 0;
      border-radius: 0;
    }

    .van-tabs__content {
      height: 156px;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }

    .van-tab__pane:not(:first-child) {
      padding: 10px;
      line-height: 1.4;
      color: rgba(0, 0, 0, 0.7);
    }

    &--top {
      color: #fff;
      width: 100%;
      border-radius: 0;
      line-height: 20px;
      background-color: rgba(0, 0, 0, 0.8);
    }

    &--left,
    &--right {
      width: 80%;
      height: 100%;
    }

    .popup_title
    {
        .px2rem(height,40px);
        width: 100%;
        background-color: #1989fa;
        color: #fff;
        .px2rem(line-height,40px);
        .title
        {
           .px2rem(margin-left,20px);
           font-size:20px;
        }
    }

    .popup_content
    {
    }

    .popup_footer
    {
        background-color: #F1F2F7;
        box-sizing:border-box;
        position: fixed;
        bottom: 0px;
        right: 0px;
        .px2rem(height,60px);
        width: 100%;
        .popup_footer_opeate
        {

            .px2rem(margin-left,15px);
            .px2rem(margin-right,10px);
            .px2rem(margin-top,15px);
            .item
            {
                width: 32%;
                height: 50px;
                 .px2rem(height,40px);
                 .px2rem(line-height,40px);
            }
        }
    }
  }
</style>
