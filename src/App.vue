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

import userService from "./api-service/user-auth";
// router
// import { useRouter } from "vue-router";

export default {
  name: "index",
  components: { Navbar, Footer },
  setup() {
    // const router = useRouter();
    let userData = JSON.parse(userService.get());
    console.log(userData);
    // router.push("/view");
  },
};
</script>

<style lang="scss">
@import "@/style/main.scss";

html,
body,
#app {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
.main-area {
  min-height: calc(85vh);
}
</style>
