module.exports = {
  presets: [
    '@vue/app',
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'entry'
      }
    ]
  ],
  // 配置ant-design-vue组件按需加载
  plugins: [
    [ 'import', {
      'libraryName': 'ant-design-vue',
      'libraryDirectory': 'es',
      'style': true // `style: true` 会加载 less 文件
    } ]
  ]
}
