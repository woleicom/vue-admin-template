<template>
  <a-config-provider :locale="locale">
    <router-view/>
  </a-config-provider>
</template>
<script>
import store from './store';
import {messages} from '@/lang/index';
import {setRouter} from '@/utils/app';
export default {
  name: 'App',
  data() {
    return {
    }
  },
  mounted() {
    setRouter(this.$router,this.$route);
  },
  computed: {
    language() {
      return store.state.app.language
    },
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