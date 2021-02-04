<template>
  <a-result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
    >
      <template v-slot:extra>
        <a-button type="primary" @click="()=>{this.$router.push('/')}">Back Home</a-button>
      </template>
    </a-result>
</template>
<script>
export default {
  name: '500',
}
</script>