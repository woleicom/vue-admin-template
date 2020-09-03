<template>
  <a-menu-item>
    <router-link :to='item.key'>
      <component v-if='item.icon' :is="item.icon" ></component><span>{{item.title}}</span>
    </router-link>
  </a-menu-item>
</template>
<script>
import * as Icon from '@ant-design/icons-vue';
export default {
  name: 'MenuItem',
  components: {
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