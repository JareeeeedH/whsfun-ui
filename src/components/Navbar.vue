<template>
  <div id="nav">
    <router-link @click="getIndex" class="nav-item" to="/">
      {{ home }}
    </router-link>
    <router-link class="nav-item" to="/about">About</router-link>
    <router-link class="nav-item" to="/register">Register</router-link>
    <router-link class="nav-item" to="/login">login</router-link>
    <router-link class="nav-item" to="/post">post</router-link>
    <router-link class="nav-item" to="/message">message</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  name: 'index',
  setup() {
    let home = ref('Home');

    const getIndex = () => {
      axios.get('http://localhost:3000').then((data) => {
        console.log('get index home message --->', data);
        home.value = data.data;
      });
    };

    return { home, getIndex };
  },
};
</script>

<style lang="scss">
#nav {
  display: flex;
  padding: 1rem;
  border: 2px solid red;
  :first-child {
    margin-right: auto;
  }
  a {
    font-weight: bold;
    color: #121212;
    font-size: 1.25rem;
    text-decoration: none;
    padding: 0 1rem;

    &.router-link-exact-active {
      color: red;
    }
  }
}

.test-box {
  width: 100%;
  background-color: #121212;
  color: white;
}
</style>
