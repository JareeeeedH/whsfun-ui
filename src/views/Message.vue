<template>
  <h1>Post from DB</h1>
  <div class="wrapper">
    <div class="review" v-for="post in 3" :key="post">
      <h3>title</h3>
      <h5>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
        voluptatibus quia sequi consectetur voluptatem atque sint pariatur
        dolore quasi, rerum dolorem amet deleniti dolor aut!
      </h5>
      <h5>85</h5>
    </div>
  </div>
</template>

<script>
// import { ref } from '@vue/reactivity';
// import axios from 'axios';

export default {
  name: 'review',
  setup() {},
};
</script>

<style scoped lang="scss">
.review {
  padding: 1rem;
  margin: 2px 0px;
  background: grey;
}
</style>
