<template>
  <div class="main-message">
    <div class="img-wrapper">
      <img :src="parsePropsCommentItem.imgSrc" alt="" />
    </div>
    <div class="info-area">
      <h2>{{ parsePropsCommentItem.mainTitle }}</h2>
      <br />
      <h5>{{ parsePropsCommentItem.subTitle }}</h5>
    </div>
  </div>
  <div class="form-wrapper">
    <div class="form">
      <h3>Review and Rating for</h3>
      <input disabled type="text" id="title" :value="parsePropsCommentItem.mainTitle" />
      <label for="points">My Rating: {{ points }}</label>
      <input type="range" min="0" max="100" step="1" id="points" v-model="points" />
      <label for="message">Write down your review?</label>
      <textarea type="text" id="message" v-model="message" />
      <button type="button" class="button show-more">more..</button>
      <button type="button" class="button submit-button" @click="submitRegister">Submit</button>
    </div>
  </div>
  <h1></h1>
  <div class="alert alert-danger" role="alert" v-show="errorMessage">
    {{ errorMessage }}
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import messageService from "../api-service/message-service";
import { computed } from "@vue/runtime-core";

export default {
  name: "register",
  props: {
    commentItem: {
      type: String,
    },
  },
  setup(props) {
    let title = ref("ardbeg 10");
    let message = ref("good, i like Peated !");
    let points = ref(86);

    let token1 =
      "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiYmU1ZGY5MjUxMWYzZDE0YzE0NGEiLCJlbWFpbCI6IjExMUBnbWFpbC5jb20iLCJuYW1lIjoiamFyZWQiLCJpYXQiOjE2NDQ5MzY5MzR9.dTTeEexRmsn32A6Gf3XeUaqzFqvSLtsoVC4euUJogCU";
    // let token2 = "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiYmU5OGY5MjUxMWYzZDE0YzE0NGQiLCJlbWFpbCI6IjIyMkBnbWFpbC5jb20iLCJuYW1lIjoiTmVsc29uIiwiaWF0IjoxNjQ0OTM2OTc5fQ.evZwKgDi2ci-zRKXzOxmfppJ0oOwhhTZgiTDOmy1TVc"
    // let token3 = "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiYmVjOGY5MjUxMWYzZDE0YzE0NTAiLCJlbWFpbCI6IjMzM0BnbWFpbC5jb20iLCJuYW1lIjoiUGV0ZXIiLCJpYXQiOjE2NDQ5MzcwMjh9.orFzNwesCmF1SCOHAykZcGnnw9_YnX_ZmPdp99qIFLw"

    // let token = "JWT abcdTest"

    let user1 = "620bbe5df92511f3d14c144a";

    let errorMessage = ref(null);

    const submitRegister = () => {
      const post = {
        title: title.value,
        content: message.value,
        points: points.value,
        speaker: user1,
      };

      messageService
        .post(post, token1)
        .then((response) => {
          console.log("post OK --->", response);
        })
        .catch((err) => {
          // 目前我想到的兩種 error
          // 如果err是DB驗證不通過
          if (err.response.data.err) {
            let errorMsg = err.response.data.err.message;
            errorMessage.value = errorMsg;
            console.log(errorMsg);
          }
          // 或者是 token無效, 沒有授權
          else {
            let errorMsg = err.response.data;
            errorMessage.value = errorMsg;
            console.log(errorMsg);
          }
        });
    };

    let parsePropsCommentItem = computed(() => {
      return JSON.parse(props.commentItem);
    });

    return { title, message, points, errorMessage, submitRegister, parsePropsCommentItem };
  },
};
</script>

<style scoped lang="scss">
.main-message {
  display: flex;
  width: 100%;
  padding: 1rem 3rem;
  border: 2px solid black;

  .img-wrapper {
    width: 20%;
    border: 2px solid red;
    img {
      width: 50%;
      margin: auto;
      display: block;
    }
  }
  .info-area {
    width: 80%;
    border: 2px solid black;
  }
}

// form
.form-wrapper {
  width: 100vw;
  display: flex;
  justify-content: center;
}

.form {
  width: 70%;
  display: flex;
  flex-direction: column;
  border: 2px solid red;

  input {
    width: 70%;
    height: 20px;
  }

  textarea {
    width: 70%;
    height: 50px;
  }

  .button {
    width: 50px;
    height: 50px;
  }
}
</style>
