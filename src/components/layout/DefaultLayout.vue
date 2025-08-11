<template>
  <div class="default-layout">
    <SideBar />
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<script>
import SideBar from '../../components/navigation/SideBar.vue'
export default {
  name: 'DefaultLayout',
  components: { SideBar }
}
</script>

<style scoped>
.default-layout {
  display: flex;
  height: 100vh;
  gap: 1rem; 
}

.content {
  flex: 1;
  background-color: #ffff;
  overflow-y: auto;
}
</style>