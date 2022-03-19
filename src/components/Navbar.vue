<template>
  <div id="nav">
    <router-link class="nav-item" to="/">
      {{ home }}
    </router-link>
    <router-link class="nav-item" to="/view">View</router-link>
    <!-- post 頁籤先不要 -->
    <!-- <router-link class="nav-item" to="/post">post</router-link> -->
    <router-link class="nav-item" to="/message">message</router-link>

    <a class="nav-item log-out-item" v-if="userData" @click="logOut">logout</a>
    <router-link class="nav-item" v-else to="/login">login</router-link>
  </div>
</template>

<script>
// import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import userService from "../api-service/user-auth";

export default {
  name: "Nav",
  props: ["userData"],
  emit: ["changeAuth"],
  setup(props, context) {
    let home = ref("Home");

    const router = useRouter();

    let logOut = function () {
      userService.logOut();
      context.emit("changeAuth", "logOut", "");
      router.push("/login");
    };

    // const getIndex = () => {
    //   // call Api測試heroku Server
    //   let apiUrl = "https://whisky-happy.herokuapp.com/api/message/post";
    //   const token =
    //     "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiYmU1ZGY5MjUxMWYzZDE0YzE0NGEiLCJlbWFpbCI6IjExMUBnbWFpbC5jb20iLCJuYW1lIjoiamFyZWQiLCJpYXQiOjE2NDQ5MzY5MzR9.dTTeEexRmsn32A6Gf3XeUaqzFqvSLtsoVC4euUJogCU";

    //   axios.get(apiUrl, { headers: { Authorization: token } }).then((data) => {
    //     console.log(data, "server api test!");
    //   });

    //   home.value = "HappyDrinker.com";
    // };

    return { home, logOut };
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/_color.scss";

#nav {
  display: flex;
  padding: 1rem;
  background-color: $dark-mode;
  :first-child {
    margin-right: auto;
  }
  .nav-item {
    position: relative;
    font-weight: bold;
    color: $dark-mode;
    font-size: 1.25rem;
    color: rgb(200, 200, 200);
    text-decoration: none;
    padding: 0 1rem;

    &:hover::before {
      background-color: $amber-color;
      width: 85%;
    }

    &::before {
      position: absolute;
      display: block;
      content: "";
      bottom: -1px;
      width: 5%;
      height: 2px;
      background-color: #fff;
      transition: width 0.5s;
    }

    &.router-link-exact-active {
      color: $amber-color;
    }
  }
}

.test-box {
  width: 100%;
  background-color: #121212;
  color: white;
}

.log-out-item {
  cursor: pointer;
}
</style>
