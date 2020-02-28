
/**
 * 在Vue组件中引入外部js
 */

export default {
  name: 'RemoteJs',
  props: {
    src: { type: String, required: true }
  },
  render (createElement) {
    return createElement('script', { attrs: { type: 'text/javascript', src: this.src } })
  }
}
