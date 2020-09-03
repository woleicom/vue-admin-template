<template>
  <a-config-provider :locale="locale">
    <router-view/>
  </a-config-provider>
</template>
<script>
import {mapState} from 'vuex';
import {messages} from '@/lang/index';
export default {
  name: 'App',
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      language: state=> state.app.language
    }),
    locale() {
      if (messages[this.language]) {
        return messages[this.language]
      }else {
        return null
      }
    }
  }
}
</script>