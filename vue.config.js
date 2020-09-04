'use strict';
const EndWebpackPlugin = require('./plugins/webpack.end.js');
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
  configureWebpack: config => {
    if (process.env.ENV === 'production') {
      config.plugins.push(new EndWebpackPlugin('dist','项目名称'))
    }
  },
  chainWebpack: (config) => {
    // config.resolve.alias
    //   .set('@', resolve('src')) 
    //   .end();
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