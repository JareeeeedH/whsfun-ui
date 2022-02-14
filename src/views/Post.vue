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

    let token = "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBhNzczMjIwYWQwMjdlZDdkYzkwNGIiLCJlbWFpbCI6IjIyMkBnbWFpbC5jb20iLCJuYW1lIjoiamFycnJyZWQiLCJpYXQiOjE2NDQ4NTM1Njh9.Su8iTaKLTgS6d6wtzTUYiPvn9svp-1LqrwgpjTOqR3s"
    // let token = "JWT abcdTest"
    let errorMessage = ref(null);

    const submitRegister = () => {
      const post = {
        title: title.value,
        content: message.value,
        points: points.value,
      };

      messageService
        .post(post,token)
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
