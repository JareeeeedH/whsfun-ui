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

    const submitRegister = () => {
      const post = {
        title: title.value,
        content: message.value,
        points: points.value,
      };

      messageService
        .post(post)
        .then((response) => console.log('post OK --->', response))
        .catch((err) =>
          console.log('post Error --->', err.response.data.err.message)
        );
    };

    return { title, message, points, submitRegister };
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
