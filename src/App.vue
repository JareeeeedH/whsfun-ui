<template>
  <Navbar />
  <div class="main-area">
    <router-view />
  </div>
  <Footer />
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/footer.vue";

export default {
  name: "index",
  components: { Navbar, Footer },
};
</script>

<style lang="scss">
@import "@/style/main.scss";
.main-area {
  height: 85vh;
  // max-width: 1240px;
  // margin: auto;
  // padding: 0 1rem;
}
</style>
