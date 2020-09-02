module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // antd-design-vue 库样式定制
            'primary-color': '#7546c9',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
};