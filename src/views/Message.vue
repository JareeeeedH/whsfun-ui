<template>
  <h3>最新的評論：</h3>
  <div class="wrapper">
    <div class="review" v-for="post in allMessage" :key="post">
      <h3>
        {{ post.speaker.name }}
        <span class="msg-time"> | {{ post.date }}</span>
      </h3>
      <h3>
        {{ post.title }}
        <span class="scores"> | scores: {{ post.points }}</span>
      </h3>
      <h5>Note : {{ post.content }}</h5>
      <p v-if="post.nose">&nbsp;&nbsp;&nbsp; Nose:{{ post.nose }}</p>
      <p v-if="post.taste">&nbsp;&nbsp;&nbsp; Taste{{ post.taste }}</p>
      <p v-if="post.finish">&nbsp;&nbsp;&nbsp; Finish{{ post.finish }}</p>
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
      allMessage.value = foundData.data.data.reverse();
    });

    return { allMessage };
  },
};
</script>

<style scoped lang="scss">
.review {
  padding: 1rem;
  margin: 2px 0px;
  background: linear-gradient(90deg, #d6d6d6, #ffbf00, #121212);
}

.msg-time {
  font-size: 1rem;
  color: grey;
}
.scores {
  font-size: 1rem;
}
</style>
