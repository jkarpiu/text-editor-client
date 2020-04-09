<template>
  <div class="home">
    <Default />
  </div>
</template>

<script>
// @ is an alias to /src
import Default from '@/components/Default.vue'

export default {
  name: 'Home',
  components: {
    Default
  }
}
</script>

<style scoped>
    * {
      margin: 0;
      padding: 0;
    }
</style>
