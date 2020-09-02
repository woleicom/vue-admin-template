module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    // 不采用按需加载，全部引入
    /* [
      "import",
      {
        "libraryName": "ant-design-vue",
        "libraryDirectory": "es",
        //babel-plugin-import 的 style 属性除了引入对应组件的样式，也会引入一些必要的全局样式。如果你不需要它们，建议不要使用此属性。你可以 import 'ant-design-vue/dist/antd.css 手动引入，并覆盖全局样式。
        "style": true
      }
    ] */
  ]
}
