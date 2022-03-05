<template>
  <div class="login-page">
    <div class="form-wrapper">
      <div class="form">
        <h2 class="login-text">Login</h2>
        <div class="email-wrapper">
          <label for="email"><i class="fa-solid fa-envelope"></i></label>
          <input type="text" id="email" v-model="email" />
        </div>
        <div class="password-wrapper">
          <label for="password">
            <i class="fa-solid fa-unlock-keyhole"></i>
          </label>
          <input type="text" id="password" v-model="password" />
        </div>
        <div class="button">
          <button type="button" class="submit-btn" @click="submitRegister">Submit</button>
          <router-link class="sign-up" to="/register">
            Sign up now
            <i class="fa-solid fa-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import axios from "axios";
// import img from "../imgs/islay.jepg";

export default {
  name: "register",
  setup() {
    let email = ref("@gmail.com");
    let password = ref("");

    const submitRegister = () => {
      const drinker = {
        email: email.value,
        password: password.value,
      };
      console.log("Login page");
      axios
        .post("http://localhost:3000/api/member/login", { drinker })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.warn("error !!!!", err.response.data));
    };

    return { email, password, submitRegister };
  },
};
</script>

<style scoped lang="scss">
// .img-bgc {
//   background-color: rgb(54, 44, 44);
//   width: 100%;
//   height: 100vh;
// }
// linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5))

.login-text {
  text-align: center;
  color: white;
}
.login-page {
  position: relative;
  width: 100vw;
  height: 90vh;
  background: url("../imgs/islay.jpg");
  opacity: 0.8;
  background-position: center center;
  background-size: cover;
}
.form-wrapper {
  position: absolute;
  width: 50%;
  left: 50%;
  bottom: 50%;
  transform: translate(-50%, -10%);
  display: flex;
  justify-content: center;
  animation: fade-in 1s;
}

.form {
  display: flex;
  flex-direction: column;
  width: 500px;

  .email-wrapper,
  .password-wrapper {
    // margin: 2px 0px;
    border-radius: 5px;
    // background-color: rgb(0, 0, 0);
    border: none;
    padding: 0;
    margin: 2px;
    text-decoration: none;

    // margin: 2px 0;
  }

  label {
    width: 10%;
    height: 50px;
    border: none;
    text-align: center;
  }
  i {
    text-align: center;
    font-size: 1.5rem;
    color: white;
    // background-color: #121212;
  }
  input {
    width: 90%;
    height: 50px;
    color: white;
    background-color: rgba($color: #121212, $alpha: 0.5);
    padding: 5px;
    border-style: none;
    border: 0;
    border-radius: 5px;
  }

  .button {
    width: 100%;
    display: flex;
  }
  .submit-btn {
    width: 25%;
    font-size: 1rem;
    margin-top: 2px;
    margin-right: auto;
    padding: 0.25rem;
    border: none;
    border-radius: 5px;
    background-color: transparent;
    border: 2px solid green;
    color: white;
    &:hover {
      background: green;
      // border: 1px solid rgb(255, 255, 255);
      color: white;
    }
  }

  .sign-up {
    padding: 0 5px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    color: white;
    cursor: pointer;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
}
</style>
