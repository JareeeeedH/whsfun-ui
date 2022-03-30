<template>
  <Navbar @changeAuth="authHandler" :userData="savedUser" />
  <div class="main-area">
    <router-view @changeAuth="authHandler" :userData="savedUser" />
  </div>
  <Footer />
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/footer.vue";
import userService from "./api-service/user-auth";
import { ref } from "vue";
// import { useRoute } from "vue-router";

export default {
  name: "index",
  components: { Navbar, Footer },
  setup() {
    let savedUser = ref("");
    savedUser.value = userService.get();
    console.log(savedUser);

    // emit事件, login/logOut
    let authHandler = function (status, userData) {
      // console.log("event:", status, "data:", userData);
      savedUser.value = userData;
    };

    return { savedUser, authHandler };
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
  min-height: calc(82vh);
}
</style>
