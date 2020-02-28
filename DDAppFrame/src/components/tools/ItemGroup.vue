<template>
  <div class="itemGroup">
    <div class="itemGroup_title" :class="{ 'itemGroup_title_required':required }">{{ title }}</div>
    <div class="itemGroup_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemGroup',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang='less' scoped>
@import url('../../assets/css/mixin.less');
.itemGroup
{
    position: relative;
    border-bottom: 1px solid #ebedf0;
    .itemGroup_title
    {
        .px2rem(height,33);
        .px2rem(line-height,33);
        padding-left:18px;
        padding-top: 5px;
        padding-right: 0px;
        padding-bottom: 0px;
        background-color: #F1F2F7;
        color: #4e4e54;
    }

    .itemGroup_content
    {
       padding: 5px;
    }

    .itemGroup_title_required::before {
        content: '*';
        position: absolute;
        top:6px;
        left: 5px;
        font-size: 12px;
        color: #f44;
    }

}
</style>
