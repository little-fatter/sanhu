<template>
  <a-modal
    v-model="showModel"
    :closable="false"
    :maskClosable="false"
    title="在以下区域内签名"
    @cancel="onClosePopup"
    @ok="save"
  >
    <div>
      <div>
        <canvas class="canvas" id="m-signature-canvas"></canvas>
      </div>
      <div>
        <div class="center">
          <a-button type="primary" size="small" @click="clear">清除</a-button>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
/**
 * 手签组件
 */
export default {
  name: 'Signature',
  components: {

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
      showModel: false,
      signaturePad: null,
      canvas: null
    }
  },
  watch: {
    showPopup (value, oldValue) {
      if (value !== oldValue) {
        this.showModel = value
        if (this.showModel && !this.canvas) {
          this.$nextTick(() => {
            this.initCanvas()
          })
        }
      }
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.initCanvas()
  },
  methods: {
    init () {
      this.showModel = this.showPopup
    },
    initCanvas () {
      function resizeCanvas () {
        var ratio = Math.max(window.devicePixelRatio || 1, 1)
        canvas.width = canvas.offsetWidth * ratio
        canvas.height = canvas.offsetHeight * ratio
        canvas.getContext('2d').scale(ratio, ratio)
      }
      var canvas = document.getElementById('m-signature-canvas')
      if (canvas) {
        window.onresize = resizeCanvas
        resizeCanvas()
        this.canvas = canvas
        // eslint-disable-next-line no-undef
        this.signaturePad = new SignaturePad(canvas)
        this.clear()
      }
    },
    clear () {
      if (this.signaturePad) {
        this.signaturePad.clear()
      }
    },
    onClosePopup () {
      this.$emit('onClosePopup')
    },
    save () {
      if (this.signaturePad) {
        var signaturePad = this.signaturePad
        // eslint-disable-next-line no-unused-vars
        var canvas = this.canvas
        if (signaturePad.isEmpty()) {
          this.$toast('请提供签名')
        } else {
          var ctx = canvas.getContext('2d')
          var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data

          var lOffset = canvas.width; var rOffset = 0; var tOffset = canvas.height; var bOffset = 0

          for (var i = 0; i < canvas.width; i++) {
            for (var j = 0; j < canvas.height; j++) {
              var pos = (i + canvas.width * j) * 4
              if (imgData[pos] > 0 || imgData[pos + 1] > 0 || imgData[pos + 2] || imgData[pos + 3] > 0) {
                bOffset = Math.max(j, bOffset) // 找到有色彩的最底部的纵坐标
                rOffset = Math.max(i, rOffset) // 找到有色彩的最右端

                tOffset = Math.min(j, tOffset) // 找到有色彩的最上端
                lOffset = Math.min(i, lOffset) // 找到有色彩的最左端
              }
            }
          }
          // 由于循环是从0开始的,而我们认为的行列是从1开始的
          lOffset++
          rOffset++
          tOffset++
          bOffset++
          // console.log(lOffset, rOffset, tOffset, bOffset)
          var oldUrl = signaturePad.toDataURL()
          var originImage = new Image()
          originImage.src = oldUrl

          var canvas2 = document.createElement('canvas')
          canvas2.width = rOffset - lOffset
          canvas2.height = bOffset - tOffset
          // document.body.appendChild(canvas)

          // 用9参数的drawImage方法对图片进行裁减
          canvas2.getContext('2d').drawImage(originImage, lOffset, tOffset, rOffset - lOffset, bOffset - tOffset, 0, 0, rOffset - lOffset, bOffset - tOffset)
          // var newUrl = canvas2.toDataURL();
          // var newImage = new Image();
          // newImage.src = newUrl;
          // window.open(canvas2.toDataURL())// 数据格式为"data:image/png;base64,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"
          canvas2.remove()
          var result = signaturePad.toDataURL()
          this.$emit('onPopupConfirm', result)
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.canvas {
    width:100%;height:80%;background: #666666;
}
.center {
    text-align: center;
}
</style>