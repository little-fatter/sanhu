<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-10 13:23:22
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-11 15:46:37
 * @Description:  文件预览
 -->

<template>
  <div class="file-riview">
    <div class="file-riview-header">
      <span class="file-riview-header-title">
        <slot name="imgHeaderTitle">证据:</slot>
      </span>
    </div>
    <div class="file-riview-content">
      <template v-for="(item, index) in imgs">
        <img-preview
          v-if="index < showImgCount || showImgCount === 0 || show"
          class="file-riview-img"
          :group="groupId"
          :key="index"
          :src="item.path"
          :thumb-src="item.path"
        />
      </template>
      <div
        v-if="!show && imgs.length > showImgCount && showImgCount !== 0"
        class="file-riview-img mask"
        :style="genMask(imgs[3].path)"
        title="展示全部图片"
        @click="switchShow"
      >
        <span>+{{ imgs.length - showImgCount }}</span>
      </div>
      <div v-if="show && showImgCount !== 0" class="file-riview-img-hide">
        <div @click="switchShow">
          <span>收起</span>
          <a-icon type="up" />
        </div>
      </div>
    </div>
    <div class="file-riview-header">
      <span class="file-riview-header-title">
        <slot name="fileHeaderTitle">附件:</slot>
      </span>
    </div>
    <div class="file-riview-content">
      <div class="file-riview-file" v-for="(item, index) in otherFiles" :key="index" title="下载" @click="downloadFile(item)">
        <a-icon class="file-riview-file-icon" type="link" />
        <span class="file-riview-file-title">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ImgPreview, AspectImage } from 'vue-imgs'
import { isImg } from '@/utils/util'
import { downloadFile, genImgBackground } from '@/utils/util'

export default {
  components: {
    ImgPreview,
    AspectImage
  },
  props: {
    // 文件集合
    files: {
      type: Array,
      default: () => [],
      required: true
    },
    // 显示图片数量, 为0则不限制
    showImgCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    // 图片列表
    imgs () {
      return this.files.filter(i => isImg(i.title))
    },
    // 其他文件列表
    otherFiles () {
      return this.files.filter(i => !isImg(i.title))
    }
  },
  data () {
    this.genMask = genMask
    return {
      // 是否展示全部图片
      show: false,
      // 图片组id
      groupId: new Date().getTime()
    }
  },
  mounted () {

  },
  methods: {
    // 下载文件
    downloadFile (record) {
      downloadFile({ url: record.path, isOpenBrowser: true })
    },
    switchShow () {
      this.show = !this.show
    }
  }
}
</script>

<style scoped lang="less">
.file-riview {
  padding-bottom: 10px;
  background-color: #fff;
  &-header {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
  &-content {
    padding: 0 10px 0 60px;
  }
  &-img {
    display: inline-block;
    width: 208px;
    height: 136px;
    overflow: hidden;
    margin: 0 10px 5px 0;
    border-radius: 8px;
    &-hide {
      padding-right: 15px;
      text-align: right;
      color: #999;
      div {
        display: inline-block;
        cursor: pointer;
      }
      span {
        margin-right: 5px;
      }
    }
    &.mask {
      position: relative;
      background: #000;
      cursor: pointer;
      & > span {
        width: 100%;
        height: 100%;
        display: block;
        background-color: rgba(#777777, .8);
        line-height: 136px;
        text-align: center;
        font-size: 30px;
        color: #fff;
      }
    }
  }
  &-file {
    height: 40px;
    margin: 0 10px 10px 0;
    display: flex;
    align-items: center;
    background-color: #F3F4F6;
    line-height: 40px;
    color: #7F87AE;
    border-radius: 5px;
    cursor: pointer;
    &-icon {
      margin: 0 10px 0 15px;
    }
    &-title {
      width: 0;
      flex: 1;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    &:hover {
      background-color: #EEEEEE;
    }
  }
}
</style>