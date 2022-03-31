<template>
  <!-- loading -->
  <loading v-model:active="isLoading" :is-full-page="fullPage" />

  <div class="wrapper">
    <h3>最新的評論：</h3>
    <hr />

    <!-- 骨架 -->
    <div v-if="!allMessage" class="skeleton"></div>

    <div class="review" v-for="post in allMessage" :key="post">
      <h5>
        {{ post.speaker.name }}
        <span class="scores"> | {{ post.title }} scores: {{ post.points }} | </span>
        <span class="msg-time">{{ post.date }}</span>
      </h5>

      <br />

      <h5><span class="light-text">comment</span> : {{ post.content }}</h5>
      <br />
      <p v-if="post.nose">&nbsp;&nbsp;&nbsp; Nose:{{ post.nose }}</p>
      <p v-if="post.taste">&nbsp;&nbsp;&nbsp; Taste{{ post.taste }}</p>
      <p v-if="post.finish">&nbsp;&nbsp;&nbsp; Finish{{ post.finish }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

import messageService from "../api-service/message-service";

// loading
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "review",
  components: {
    Loading,
  },
  setup() {
    let isLoading = ref(false);
    let fullPage = ref(true);
    const allMessage = ref(null);
    const token =
      "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiYmU1ZGY5MjUxMWYzZDE0YzE0NGEiLCJlbWFpbCI6IjExMUBnbWFpbC5jb20iLCJuYW1lIjoiamFyZWQiLCJpYXQiOjE2NDQ5MzY5MzR9.dTTeEexRmsn32A6Gf3XeUaqzFqvSLtsoVC4euUJogCU";

    //loading 遮罩出現
    isLoading.value = true;
    messageService.get(token).then((foundData) => {
      allMessage.value = foundData.data.data.reverse();

      //loading 遮罩關閉
      isLoading.value = false;
    });

    return { allMessage, isLoading, fullPage };
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  padding: 1rem;
  background: linear-gradient(120deg, #d6d6d6, #ffbf00, #121212);
}
.review {
  padding: 1rem;
  margin: 2px 0px;
  border-bottom: 1px solid black;
  // background: linear-gradient(90deg, #d6d6d6, #ffbf00, #121212);
}

.msg-time {
  font-size: 1rem;
  color: grey;
}
.scores {
  font-size: 1rem;
}

.skeleton {
  height: 75vh;
  text-align: center;
}
.light-text {
  color: rgb(0, 160, 0);
  font-weight: bold;
  font-size: 1.5rem;
}
</style>
