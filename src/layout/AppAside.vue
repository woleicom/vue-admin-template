<template>
  <a-layout-sider :theme='theme' class='aside' :collapsed='menuToggle'>
    <div class="logo">
      <a rel='noopener noreferrer' href='/'>
        <img :src="Logo" alt=""/> 
        <span v-if='!menuToggle' class='ml15'>Ant Design Vue</span>
      </a>
    </div>
    <slider-menu :menuToggle='menuToggle' :theme='theme' :menu="menu"></slider-menu>
  </a-layout-sider>
</template>
<script>
import Logo from '../assets/images/logo.svg'
import SliderMenu from './SliderMenu.vue'
export default {
  name: 'AppAside',
  components: {
    SliderMenu
  },
  props: {
    menuToggle: {
      required: true,
      type: Boolean
    },
    menu: {
      required: true,
      type: Array
    }
  },
  data(){
    return {
      Logo,
      theme: 'light'
    }
  }
}
</script>