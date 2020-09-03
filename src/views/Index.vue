<template>
  <a-layout class='index animated fadeIn'>
    {{t('welcome')}}
     <a-datePicker :style="{width:'200px'}"/>
  </a-layout>
</template>

<script>
import t from '../lang/t'
export default {
  name: 'Home',
  data(){
    return {
      t
    }
  },
  mounted(){
  }
}
</script>
