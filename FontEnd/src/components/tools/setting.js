import { message } from 'ant-design-vue'

let lessNodesAppended = false

const lessJsPath = '//cdnjs.cloudflare.com/ajax/libs/less.js/3.8.1/less.min.js' // '@/assets/js/less.min.js'

/**
 * 定义可选择的主题色
 */
const colorList = [
  {
    key: '薄暮', color: '#F5222D'
  },
  {
    key: '火山', color: '#FA541C'
  },
  {
    key: '日暮', color: '#FAAD14'
  },
  {
    key: '明青', color: '#13C2C2'
  },
  {
    key: '极光绿', color: '#52C41A'
  },
  {
    key: '拂晓蓝（默认）', color: '#1890FF'
  },
  {
    key: '极客蓝', color: '#2F54EB'
  },
  {
    key: '酱紫', color: '#722ED1'
  }
]

/**
 * 更改主题色函数
 * 注意：开发环境利用Less变更主题色，不要在生产环境使用，生产环境都是使用defaultSettings来设置
 * @param {*} primaryColor
 */
const updateTheme = primaryColor => {
  if (!primaryColor) {
    return
  }
  const hideMessage = message.loading('正在编译主题！', 0)
  function buildIt () {
    if (!window.less) {
      hideMessage()
      return
    }
    try {
      setTimeout(() => {
        window.less
          .modifyVars({
            '@primary-color': primaryColor
          })
          .then(() => {
            hideMessage()
          })
          .catch(() => {
            message.error('更改主题色失败')
            hideMessage()
          })
      }, 200)
    } catch (ex) {
      message.error('更改主题色失败')
      hideMessage()
    }
  }
  if (!lessNodesAppended) {
    const lessStyleNode = document.createElement('link')
    const lessConfigNode = document.createElement('script')
    const lessScriptNode = document.createElement('script')
    lessStyleNode.setAttribute('rel', 'stylesheet/less')
    lessStyleNode.setAttribute('href', '/color.less')
    lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true
      };
    `
    lessScriptNode.src = lessJsPath
    lessScriptNode.async = true
    lessScriptNode.onload = () => {
      buildIt()
      lessScriptNode.onload = null
    }
    document.body.appendChild(lessStyleNode)
    document.body.appendChild(lessConfigNode)
    document.body.appendChild(lessScriptNode)
    lessNodesAppended = true
  } else {
    buildIt()
  }
}

/**
 * 更改弱色模式颜色
 * @param {*} colorWeak
 */
const updateColorWeak = colorWeak => {
  colorWeak ? document.body.classList.add('colorWeak') : document.body.classList.remove('colorWeak')
}

export { updateTheme, colorList, updateColorWeak }
