<style lang="less" scoped>
@import '~@assets/css/mixins.less';

@width: 940px;
@margin: 24px;

.de-wrapper {
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #64697C;

  > div {
    margin-top: @margin;
  }

  > div:nth-child(1) , > div:nth-child(2){
    border-radius: 8px;
    border: 1px solid #DCDEE2;
  }

  .pdf-wrapper {
    width: @width;
    height: 1150px;
  }

  .attach-wrapper {
    width: @width;

    .attach-item-wrapper {
      padding: 20px;
      .attach-title {
      }

      .attach-item {
        margin: 15px 0 0 65px;
        background-color: #ccc;
      }
    }
  }

  .handle-wrapper {
    margin-bottom: @margin;
    width: @width;
    display: flex;
    justify-content: space-between;

    .btns-group {

      button {
        .wh(160px,48px);
      }

      button:nth-child(2) {
        margin-left: 16px;
      }
    }
  }
}
</style>

<template>
  <div class="de-wrapper">
    <div class="pdf-wrapper">
      <img src="" alt="处罚决定书pdf">
    </div>
    <div class="attach-wrapper">
      <div class="attach-item-wrapper">
        <div class="attach-title">证据附件：</div>
        <div class="attach-item">
          <s-upload></s-upload>
          <s1-upload></s1-upload>
          <s2-upload></s2-upload>
        </div>
      </div>
    </div>
    <div class="handle-wrapper">
      <div class="btns-group">
        <a-button type="primary" ghost>打印</a-button>
        <a-button type="primary" ghost>下载</a-button>
      </div>
      <div class="btns-group">
        <a-button class="btn-success">送达</a-button>
        <a-button type="primary">转发</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import SUpload from '@/components/file/ImportFile'
import S1Upload from '@/components/file/DownFile'
import S2Upload from '@/components/file/StandardUploadFile'
export default {
  components: {
    SUpload,
    S1Upload,
    S2Upload
  }
}
</script>
