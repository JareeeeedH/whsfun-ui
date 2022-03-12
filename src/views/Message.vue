<template>
  <h1>Post from DB</h1>
  <div class="wrapper">
    <div class="review" v-for="post in allMessage" :key="post">
      <h2>{{ post.speaker.name }} | {{ post.date }}</h2>
      <h3>{{ post.title }} | {{ post.points }}</h3>
      <h5>Note:{{ post.content }}</h5>
      <p>{{ post.nose }}</p>
      <p>{{ post.taste }}</p>
      <p>{{ post.finish }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

import messageService from "../api-service/message-service";

export default {
  name: "review",
  setup() {
    const allMessage = ref(null);
    const token =
      "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiYmU1ZGY5MjUxMWYzZDE0YzE0NGEiLCJlbWFpbCI6IjExMUBnbWFpbC5jb20iLCJuYW1lIjoiamFyZWQiLCJpYXQiOjE2NDQ5MzY5MzR9.dTTeEexRmsn32A6Gf3XeUaqzFqvSLtsoVC4euUJogCU";

    messageService.get(token).then((foundData) => {
      allMessage.value = foundData.data.data;
    });

    return { allMessage };
  },
};
</script>

<style scoped lang="scss">
.review {
  padding: 1rem;
  margin: 2px 0px;
  background: grey;
}
</style>
