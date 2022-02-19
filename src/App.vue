<template>
  <Navbar />
  <div class="main-area">
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'index',
  components: { Navbar },
};
</script>

<style lang="scss">
@import '@/style/main.scss';
.main-area {
  max-width: 1240px;
  margin: auto;
}
</style>
