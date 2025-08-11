<template>
  <RouterView v-if="$route.name === 'login'" />

  <DefaultLayout v-else>
    <RouterView />
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/components/layout/DefaultLayout.vue'

export default {
  name: 'App',
  components: { DefaultLayout }
}
</script>

<style scoped>
.default-layout {
  display: flex;
  max-height: 97vh;
  overflow: hidden;
}

.content {
  flex: 1;
  background-color: #ffff;
  overflow-y: auto;
}
</style>
