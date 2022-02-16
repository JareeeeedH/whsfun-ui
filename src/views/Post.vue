<template>
  <h1>Post vies or message</h1>
  <div class="form-wrapper">
    <div class="form">
      <label for="title">title</label>
      <input type="text" id="title" v-model="title" />

      <label for="message">message</label>
      <textarea type="text" id="message" v-model="message" />

      <label for="points">points</label>
      <input type="text" id="points" v-model="points" />
      <button
        type="button"
        class="submit-btn btn btn-primary"
        @click="submitRegister"
      >
        Submit
      </button>
    </div>
  </div>
  <div class="alert alert-danger" role="alert" v-show="errorMessage">
    {{ errorMessage }}
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import messageService from '../api-service/message-service';

export default {
  name: 'register',
  setup() {
    let title = ref('ardbeg 10');
    let message = ref('good, i like Peated !');
    let points = ref(86);

    let token1 = "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiYmU1ZGY5MjUxMWYzZDE0YzE0NGEiLCJlbWFpbCI6IjExMUBnbWFpbC5jb20iLCJuYW1lIjoiamFyZWQiLCJpYXQiOjE2NDQ5MzY5MzR9.dTTeEexRmsn32A6Gf3XeUaqzFqvSLtsoVC4euUJogCU"
    // let token2 = "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiYmU5OGY5MjUxMWYzZDE0YzE0NGQiLCJlbWFpbCI6IjIyMkBnbWFpbC5jb20iLCJuYW1lIjoiTmVsc29uIiwiaWF0IjoxNjQ0OTM2OTc5fQ.evZwKgDi2ci-zRKXzOxmfppJ0oOwhhTZgiTDOmy1TVc"
    // let token3 = "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiYmVjOGY5MjUxMWYzZDE0YzE0NTAiLCJlbWFpbCI6IjMzM0BnbWFpbC5jb20iLCJuYW1lIjoiUGV0ZXIiLCJpYXQiOjE2NDQ5MzcwMjh9.orFzNwesCmF1SCOHAykZcGnnw9_YnX_ZmPdp99qIFLw"
    
    // let token = "JWT abcdTest"

    let user1 = "620bbe5df92511f3d14c144a"
    // let user2 = "620bbe98f92511f3d14c144d"
    // let user3 = "620bbec8f92511f3d14c1450"

    let errorMessage = ref(null);

    const submitRegister = () => {
      const post = {
        title: title.value,
        content: message.value,
        points: points.value,
        speaker: user1
      };

      messageService
        .post(post,token1)
        .then((response) => {
          console.log('post OK --->', response)
        })
        .catch((err) => {

          // 目前我想到的兩種 error
          // 如果err是DB驗證不通過
          if(err.response.data.err){
            let errorMsg = err.response.data.err.message
            errorMessage.value = errorMsg
            console.log(errorMsg)
          }
          // 或者是 token無效, 沒有授權
          else{
            let errorMsg = err.response.data
            errorMessage.value = errorMsg
            console.log(errorMsg)
          }
        });
    };

    return { title, message, points, errorMessage, submitRegister };
  },
};
</script>

<style scoped lang="scss">
.form-wrapper {
  width: 100vw;
  display: flex;
  justify-content: center;
}

.form {
  width: 70%;
  display: flex;
  flex-direction: column;

  input {
    width: 70%;
    height: 20px;
  }

  textarea {
    width: 70%;
    height: 50px;
  }

  .submit-btn {
    margin: 0.5rem 0;
    width: 70px;
    font-size: 0.75rem;
  }
}
</style>
