<template>
  <div class="register-page">
    <div class="form-wrapper">
      <div class="form">
        <h2 class="register-text">Register</h2>
        <div class="name-wrapper">
          <label for="name">
            <i class="fa-solid fa-user-plus"></i>
          </label>
          <input type="text" id="name" @input="nameValidate" :value="name" />
          <span class="input-hint" :class="{ 'invalid-input': !validName }"> 至少三個字元, 不可特殊符號與空格 </span>
        </div>
        <div class="email-wrapper">
          <label for="email"><i class="fa-solid fa-envelope"></i></label>
          <input type="text" id="email" @input="emailValidate" :value="email" />
          <span class="input-hint" :class="{ 'invalid-input': !validEmail }">有效的email address</span>
        </div>
        <div class="password-wrapper">
          <label for="password">
            <i class="fa-solid fa-unlock-keyhole"></i>
          </label>
          <input type="password" id="password" :password="password" @input="passwordValidate" />
        </div>
        <span class="input-hint" :class="{ 'invalid-input': !validPassword }">請輸入6-12英文與數字</span>
        <div class="password-wrapper">
          <label for="password">
            <i class="fa-solid fa-unlock-keyhole"></i>
          </label>
          <input type="password" id="password" v-model="passwordAgain" />
        </div>
        <span class="input-hint">確認密碼</span>
        <div class="button">
          <button type="button" class="submit-btn" @click="submitRegister">OK</button>
        </div>
      </div>
    </div>
    <!-- success Message -->
    <div class="alert alert-success" role="alert" v-if="successMessage">
      {{ successMessage }}
    </div>
    <!-- error Message -->
    <div class="alert alert-danger" role="alert" v-if="registerErrorMessage">
      {{ registerErrorMessage }}
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "register",
  setup() {
    // router
    let router = useRouter();

    let name = ref("");
    let email = ref("");
    let password = ref("");
    let passwordAgain = ref("");
    // 註冊失敗/成功提示訊息
    let registerErrorMessage = ref("");
    let successMessage = ref("");

    // 驗證
    let validName = ref(true);
    let validEmail = ref(true);
    let validPassword = ref(true);
    let passwordConfirm = ref(true);

    // 送出前, 所有欄位驗證
    let inputResultConfirm = function () {
      // 如果沒寫
      if (!name.value || !email.value || !password.value) {
        return false;
      }

      // 每次輸入先把成功／失敗訊息清空
      registerErrorMessage.value = "";
      successMessage.value = "";

      let confirmList = [validName.value, validEmail.value, validPassword.value];

      let checkAllInput = confirmList.every((item) => item == true);
      let passwordConfirm = password.value == passwordAgain.value;

      // 欄位都有填對, 確認密碼也相同, true通過
      if (checkAllInput && passwordConfirm) {
        return true;
      }

      registerErrorMessage.value = "輸入有誤";
      return false;
    };

    const submitRegister = () => {
      // 如果欄位驗證有誤
      if (!inputResultConfirm()) {
        // console.log("not allow to submit!");
        return;
      }
      const newDrinker = {
        name: name.value,
        email: email.value,
        password: password.value,
      };

      // local
      // let apiUrl = "http://localhost:3000/api/member/register";

      // server apiUrl
      let apiUrl = "https://whisky-happy.herokuapp.com/api/member/register";

      axios
        .post(apiUrl, { newDrinker })
        .then((response) => {
          // 註冊成功, 導頁
          if (response.data.message === "ok") {
            successMessage.value = "註冊成功, 前往登入頁面";
            setTimeout(() => {
              router.push("/login");
            }, 3000);
          }
        })
        .catch((err) => {
          // err錯誤訊息, 輸入限制 or 密帳重複 ...
          let errorMessage = err.response.data;
          registerErrorMessage.value = errorMessage;
        });
    };

    // 驗證name
    function nameValidate(evt) {
      let newValue = evt.target.value;
      name.value = newValue;

      let isName = /^[\u4E00-\u9FA5A-Za-z0-9]+$/g;
      let contentValidate = isName.test(newValue);

      if (newValue.length < 3 || !contentValidate) {
        validName.value = false;
        return;
      }
      // 驗證成功 true
      validName.value = contentValidate;
    }

    // 驗證email
    function emailValidate(evt) {
      let emailInput = evt.target.value;
      email.value = emailInput;

      let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      let validationResult = reg.test(emailInput);
      validEmail.value = validationResult;
    }

    // 驗證密碼
    function passwordValidate(evt) {
      // 驗證輸入內容
      let inputPassword = evt.target.value;
      password.value = inputPassword;

      let accountRegex = /^[A-Za-z0-9]+$/;
      let contentValidate = accountRegex.test(inputPassword);
      // 4 - 12 位, AZ/az/0-9
      if (inputPassword.length < 6 || inputPassword.length > 12 || !contentValidate) {
        validPassword.value = false;
        return;
      }

      // 設置驗證結果: true
      validPassword.value = contentValidate;
    }

    return {
      name,
      email,
      password,
      passwordAgain,
      validName,
      validEmail,
      validPassword,
      passwordConfirm,
      nameValidate,
      emailValidate,
      passwordValidate,
      submitRegister,
      registerErrorMessage,
      successMessage,
    };
  },
};
</script>

<style scoped lang="scss">
.register-text {
  text-align: center;
  color: white;
}
.register-page {
  position: relative;
  width: 100vw;
  height: 82vh;
  background: url("../imgs/register.jpg");
  opacity: 0.8;
  background-position: center;
  background-size: cover;
}
.form-wrapper {
  position: absolute;
  width: 90%;
  left: 50%;
  bottom: 20%;
  transform: translate(-50%, -10%);
  display: flex;
  justify-content: center;

  animation: fade-in 3s;
}

.form {
  display: flex;
  flex-direction: column;
  width: 550px;

  .email-wrapper,
  .password-wrapper,
  .name-wrapper {
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

  .input-hint {
    color: green;
    font-weight: bold;
    font-size: 0.75rem;
    padding: 0 0 0 60px;
  }

  .invalid-input {
    color: red;
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
