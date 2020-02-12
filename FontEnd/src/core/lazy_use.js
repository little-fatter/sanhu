/**
 *  在这里导入VUE的第三方插件
 *  (与use.js区别是实现按需加载Antd组件)
 */
import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'

/** 按需加载Antd组件的 */
import '@/core/lazy_lib/components_use'

/**  Viser图表插件 */
import Viser from 'viser-vue'
/**  图片剪裁插件 */
import VueCropper from 'vue-cropper'
/**  剪切板插件 */
import VueClipboard from 'vue-clipboard2'
/**  判断权限VUE插件 */
import PermissionHelper from '@/utils/helper/permission'

import PrintHelper from '@/utils/helper/print'

VueClipboard.config.autoSetContainer = true

Vue.use(VueStorage, config.storageOptions)
Vue.use(Viser)
Vue.use(VueClipboard)
Vue.use(PermissionHelper)
Vue.use(VueCropper)

Vue.use(PrintHelper)
