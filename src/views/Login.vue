<template>
  <h1>Login</h1>
  <div class="form-wrapper">
    <div class="form">
      <label for="email">email</label>
      <input type="text" id="email" v-model="email" />

      <label for="password">password</label>
      <input type="text" id="password" v-model="password" />
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
import axios from 'axios';

export default {
  name: 'register',
  setup() {
    let email = ref('@gmail.com');
    let password = ref('');

    const submitRegister = () => {
      const drinker = {
        email: email.value,
        password: password.value,
      };
      console.log('Login page');
      axios
        .post('http://localhost:3000/api/member/login', { drinker })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.warn('error !!!!', err.response.data));
    };

    return { email, password, submitRegister };
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

  .submit-btn {
    margin: 0.5rem 0;
    width: 70px;
    font-size: 0.75rem;
  }
}
</style>
