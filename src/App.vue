<template>
  <div id="nav">
    <h1>hello drinker</h1>
    <h3>{{ greeting }}</h3>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/login">login</router-link> |
    <router-link to="/post">post</router-link> |
    <router-link to="/message">message</router-link>
  </div>
  <div class="buttons">
    <button @click="getIndex">index</button>
  </div>
  <router-view />
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  name: 'index',
  setup() {
    let greeting = ref('hi');

    const getIndex = () => {
      axios.get('http://localhost:3000').then((data) => {
        console.log('get index greeting message --->', data);
        greeting.value = data.data;
      });
    };

    return { greeting, getIndex };
  },
};
</script>

<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
