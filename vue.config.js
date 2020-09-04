module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000/api',
        ws: true,
        pathRewrite: {'^/api' : ''},
        changeOrigin: true
      },
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    /* resolve: {
      alias: {
        '@': resolve('src'),
        'assets': resolve('src/assets')
      }
    } */
  },
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