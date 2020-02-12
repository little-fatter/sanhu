
/**
 * 定义store的getter（可以认为是store的计算属性）
 * 用于快捷访问store中的各种状态
 */
const getters = {
  device: state => state.app.device, // 屏幕类型
  color: state => state.app.color // 主题色
}

export default getters
