import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import './style/App.less'
import App from './App.vue'
import router from './routers'
import store from './store'

createApp(App).use(Antd).use(store).use(router).mount('#app')
 