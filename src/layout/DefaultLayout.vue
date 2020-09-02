<template>
  <a-layout class="app">
    <a-back-top />
    <app-aside></app-aside>
    <a-layout
      :style="{marginLeft: menuToggle ? '80px' : '200px', minHeight: '100vh'}"
    >
      <app-header></app-header>
      <a-layout-content>
        <router-view :key="key" />
      </a-layout-content>
      <app-footer></app-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import AppAside from './AppAside'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
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
    }
  },
  data() {
    return {
      menuToggle: false
    }
  }
}
</script>