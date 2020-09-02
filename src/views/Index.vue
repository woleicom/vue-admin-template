<template>
  <div class="home">
    123
    <a-button type="primary">
    {{t('welcome')}}
  </a-button>
  </div>
</template>

<script>
import t from '../lang/t'
export default {
  name: 'Home',
  data(){
    return {
      t:t
    }
  }
}
</script>
