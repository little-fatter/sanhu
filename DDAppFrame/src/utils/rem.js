/**
 * 该方法是以iPhone6（真机宽度：375）对于设计稿web宽度（750）来计算rem
 * 其他元素px值转换为rem则使用：rem=px/100
 */
function setRem () {
  // 375 默认大小16px
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  // 得到html的Dom元素
  const htmlDom = document.getElementsByTagName('html')[0]
  // 设置根元素字体大小
  const standardFontSize = (htmlWidth / 7.5)
  htmlDom.style.fontSize = standardFontSize + 'px'
}

// 初始化
setRem()
