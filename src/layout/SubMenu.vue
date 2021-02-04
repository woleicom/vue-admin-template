<template>
  <a-sub-menu>
    <template v-slot:title>
      <span><component v-if='item.icon' :is="item.icon" ></component><span>{{item.title}}</span></span>
    </template>
    <template v-for='(itemChild) of item.subs'>
      <sub-menu 
        v-if="itemChild.subs && itemChild.subs.length > 0 && itemChild.subs.filter(v=>v.hidden).length!==itemChild.subs.length" 
        :key='itemChild.name' 
        :item='itemChild'
      ></sub-menu>
      <menu-item v-else :key='itemChild.name' :item='itemChild'></menu-item>
    </template>
  </a-sub-menu>
</template>
<script>
import * as Icon from '@ant-design/icons-vue';
import MenuItem from './MenuItem.vue'
export default {
  name: 'SubMenu',
  components:{
    MenuItem,
    ...Icon
  },
  props: {
    item: {
      required: true,
      type: Object
    },
  },
  data(){
    return {
    }
  },
}
</script>