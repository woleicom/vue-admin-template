<template>
  <a-menu
    mode='inline'
    :theme='theme'
    :openKeys='openKeys'
    :selectedKeys='selectedKeys'
    @click='onSelectChange'
    @openChange='onOpenChange'
  >
    <template v-for='(item) of menu'>
      <sub-menu 
        v-if="item.subs && item.subs.length > 0 && item.subs.filter(v=>v.hidden).length!==item.subs.length" 
        :key='item.key' 
        :item='item'
      ></sub-menu>
      <menu-item v-else :key='item.key' :item='item'></menu-item>
    </template>
  </a-menu>
</template>
<script>
import {clearPageState} from '../utils/pageState'
import MenuItem from './MenuItem.vue'
import SubMenu from './SubMenu.vue'
const getOpenKeys = string => {
    let newStr = '',
        newArr = [],
        arr = string.split('/').map(i => '/' + i)
    for (let i = 1; i < arr.length - 1; i++) {
        newStr += arr[i]
        newArr.push(newStr)
    }
    return newArr
}
const getPathName = (pathname, menuTree,parentPath) => {
    for(let i = 0; i < menuTree.length; i++){
        //路径包含
        if(pathname.search(menuTree[i].key) === 0){
            //路径相等
            if(pathname === menuTree[i].key){
                //隐藏菜单去父路径
                if(menuTree[i].hidden){
                    return parentPath;
                }else {
                    return menuTree[i].key
                }
            } else if (menuTree[i].subs && menuTree[i].subs.length>0) {
                let str = getPathName(pathname, menuTree[i].subs ,menuTree[i].key);
                if(str !== ''){
                    return str;
                }
            }
        }
    }
    return ''
}
export default {
  name: 'SliderMenu',
  components:{
    MenuItem,
    SubMenu
  },
  props: {
    menuToggle: {
      required: true,
      type: Boolean
    },
    theme: String,
    menu: {
      required: true,
      type: Array
    }
  },
  data(){
    return {
      openKeys:[],
      selectedKeys:[],
    }
  },
  mounted() {
    this.openKeys = getOpenKeys(this.$route.path);
    this.selectedKeys = [getPathName(this.$route.path, this.menu)];
  },
  watch:{
    '$route'(newVal){
      this.openKeys = getOpenKeys(newVal.path);
      this.selectedKeys = getPathName(this.$route.path, this.menu);
    },
    'menu'(newVal){
      this.selectedKeys = getPathName(this.$route.path, newVal);
    }
  },
  methods: {
    onOpenChange(v) {
      if (v.length === 0 || v.length === 1) {
          this.openKeys = v;
      }
      const latestOpenKey = v[v.length - 1]
      // 这里与定义的路由规则有关
      if (latestOpenKey.includes(v[0])) {
          this.openKeys = v;
      } else {
          this.openKeys = [latestOpenKey];
      }
    },
    onSelectChange({ key }){
      clearPageState(key);
      this.selectedKeys = [key];
    }
  }
}
</script>