<template>
  <a-layout-sider :theme='theme'>
  </a-layout-sider>
</template>
<script>
export default {
  name: 'AppAside',
  props: {
    menuToggle: {
      type: Function
    },
    menu: {
      type: Array
    }
  },
  data(){
    return {
      theme: 'light'
    }
  }
}
</script>