<template>
  <a-layout class='index animated fadeIn'>
    detail
    <a-button @click="()=>{$router.go(-1)}">返回上一页</a-button>
  </a-layout>
</template>
<script>
export default {
  name: 'Detail',
}
</script>