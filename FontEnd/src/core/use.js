import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'

/**  全局导入ant-design-vue组件 */
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

/**  Viser图表插件 */
import Viser from 'viser-vue'
/**  图片剪裁插件 */
import VueCropper from 'vue-cropper'
/**  剪切板插件 */
import VueClipboard from 'vue-clipboard2'
/**  判断权限VUE插件 */
import PermissionHelper from '@/utils/helper/permission'

VueClipboard.config.autoSetContainer = true

Vue.use(Antd)
Vue.use(Viser)

Vue.use(VueStorage, config.storageOptions)
Vue.use(VueClipboard)
Vue.use(PermissionHelper)
Vue.use(VueCropper)
