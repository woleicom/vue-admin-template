<template>
  <a-layout class="app">
    <a-back-top />
    <app-aside :menuToggle='menuToggle' :menu='menu'></app-aside>
    <a-layout
      :style="{marginLeft: menuToggle ? '80px' : '200px', minHeight: '100vh'}"
    >
      <app-header
        :breadCrumb='breadCrumb' 
        :menuToggle='menuToggle'
        :menuClick='menuClick' 
        :language='language'
        :toggleLanguage='toggleLanguage' 
        :avatar='avatar' :loginOut='loginOut'
      ></app-header>
      <a-layout-content class="content">
        <router-view :key="key"/>
      </a-layout-content>
      <app-footer></app-footer>
    </a-layout>
  </a-layout>
</template>
<style lang="less">
@import '../style/layout.less';
</style>
<script>
import {mapState} from 'vuex'
import AppAside from './AppAside'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import avatar from '@/assets/images/user.png'
import {sendLogout} from '@/api/login';
import {$iscode} from '@/utils/app';
//返回除了首页之外的面包屑
const getBreadCrumb = (pathname,menuTree,crumb) => {
  // 首页返回false
  if(pathname === '/index') return false;
  // 递归遍历远端导航菜单tree
  for(let i = 0; i< menuTree.length; i++){
    // 符合则添加到面包屑中
    if(pathname.search(menuTree[i].key) === 0){
      if(menuTree[i].key === pathname){
        crumb.unshift(menuTree[i].title);
        return true;
      }else {
        // 不符合如果有子集继续查找
        if(menuTree[i].subs && menuTree[i].subs.length>0){
          let state = getBreadCrumb(pathname, menuTree[i].subs, crumb);
          if(state){
            crumb.unshift(menuTree[i].title);
            return true;
          }
        }
      }
    }
  }
  return false;
};
export default {
  name: 'DefaultLayout',
  components: {
    AppAside,
    AppHeader,
    AppFooter
  },
  computed: {
    key() {
      return this.$route.path
    },
    ...mapState({
      menu: state => state.user.info.menus,
      menuToggle: state=>state.app.menuToggle,
      language: state=> state.app.language
    }),
    breadCrumb() {
      let breadCrumb = [];
      getBreadCrumb(this.$route.path,this.menu,breadCrumb);
      return breadCrumb;
    },
  },
  data() {
    return {
      avatar,
    }
  },
  mounted() {
  },
  methods: {
    menuClick() {
      this.$store.dispatch('app/setAppMenuToggle',!this.menuToggle);
    },
    toggleLanguage(lang){
      this.$store.dispatch('app/setAppLanguage',lang);
    },
    async loginOut() {
      try{
      let res = await sendLogout();
      if($iscode(res,true)){
        localStorage.clear();
        this.$router.push('/login');
      }
    }catch(e){
      localStorage.clear();
      this.$router.push('/login');
    }
    }
  },
  watch: {
  }
}
</script>