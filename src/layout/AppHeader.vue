<template>
  <a-layout-header class='header'>
    <div class="left">
      <MenuUnfoldOutlined v-if='menuToggle' @click="menuClick"/>
      <MenuFoldOutlined v-else @click="menuClick"/>
      <div :style='{marginLeft:"10px"}'>
        <header-breadcrumb :arr='breadCrumb'></header-breadcrumb>
      </div>
    </div>
    <div class="right">
      <div class="mr15" @click='screenfullChange'>
        <ShrinkOutlined v-if='isscreenfull'/>
        <ArrowsAltOutlined v-else/>
      </div>
      <div class="mr15" :style="{'cursor':'pointer'}">
        <a-dropdown>
          <template v-slot:overlay>
            <a-menu>
              <a-menu-item 
                v-for="item of langKeys" 
                :key='item.value'
                :disabled='language === item.value'
                @click='toggleLanguage(item.value)'
              >{{item.label}}</a-menu-item>
            </a-menu>
          </template>
          <div>
            <GlobalOutlined />
          </div>
        </a-dropdown>
      </div>
      <div>
        <a-dropdown>
          <template v-slot:overlay>
            <a-menu :style="{ width: '20rem' }">
              <a-menu-item-group title='用户设置'>
                  <a-menu-divider />
                  <a-menu-item>
                      <EditOutlined />
                      个人设置
                  </a-menu-item>
                  <a-menu-item>
                      <SettingOutlined />
                      系统设置
                  </a-menu-item>
              </a-menu-item-group>
              <a-menu-divider />
              <a-menu-item>
                  <div @click='loginOut'>
                      <LogoutOutlined /> 退出登录
                  </div>
              </a-menu-item>
            </a-menu>
          </template>
          <div class='ant-dropdown-link'>
            <a-avatar :src='avatar' alt='avatar' :style="{ cursor: 'pointer' }" >
              <template v-slot:icon>
                <UserOutlined/>
              </template>
            </a-avatar>
          </div>
        </a-dropdown>
      </div>
    </div>  
  </a-layout-header>
</template>
<script>
import {MenuUnfoldOutlined, MenuFoldOutlined, ShrinkOutlined, ArrowsAltOutlined, GlobalOutlined,EditOutlined,SettingOutlined,LogoutOutlined,UserOutlined} from '@ant-design/icons-vue';
import HeaderBreadcrumb from './HeaderBreadcrumb';
import {langKeys} from '../lang/index'
import screenfull from 'screenfull';
export default {
  name: 'AppHeader',
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ShrinkOutlined,
    ArrowsAltOutlined,
    HeaderBreadcrumb,
    GlobalOutlined,
    EditOutlined,
    SettingOutlined,
    LogoutOutlined,
    UserOutlined
  },
  props: {
    menuClick: {
      required: true,
      type: Function
    },
    toggleLanguage: {
      required: true,
      type: Function
    },
    loginOut: {
      required: true,
      type: Function
    },
    menuToggle: {
      required: true,
      type: Boolean
    },
    language: String,
    avatar: String,
    breadCrumb:Array,
  },
  data(){
    return {
      isscreenfull:false,
      langKeys
    }
  },
  methods:{
    screenfullChange(){
      if (!screenfull.isEnabled) {
            this.$message.warning('你的浏览器不支持全屏');
            return false
        }
        this.screenfull = !this.isscreenfull;
        screenfull.toggle()
    },
  }
}
</script>