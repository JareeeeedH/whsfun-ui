<template>
  <div id="nav">
    <router-link @click="getIndex" class="nav-item" to="/">
      {{ home }}
    </router-link>
    <router-link class="nav-item" to="/view">View</router-link>
    <!-- <router-link class="nav-item" to="/about">About</router-link> -->
    <!-- <router-link class="nav-item" to="/register">Register</router-link> -->
    <router-link class="nav-item" to="/login">login</router-link>
    <router-link class="nav-item" to="/post">post</router-link>
    <router-link class="nav-item" to="/message">message</router-link>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  name: "index",
  setup() {
    let home = ref("Home");

    const getIndex = () => {
      axios.get("http://localhost:3000").then((data) => {
        console.log("get index home message --->", data);
        home.value = data.data;
      });
    };

    return { home, getIndex };
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/_color.scss";

#nav {
  display: flex;
  padding: 1.25rem;
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
</style>
