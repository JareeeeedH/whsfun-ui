<template>
  <div class="main-message">
    <div class="img-wrapper">
      <img :src="imgSrc" alt="" />
    </div>
    <div class="info-area">
      <h1>{{ mainTitle }}</h1>
      <h5>{{ subTitle }}</h5>
    </div>
  </div>
  <!-- 會員的評論 -->
  <MemberReview v-for="review in searchDataById" :key="review._id" :review="review" />

  <!-- 把form拆元件 -->
  <div class="form-wrapper">
    <div class="form">
      <h5>Write down my Review and Rating for:</h5>
      <!-- 名稱 -->
      <!-- 如果是有從評論區傳過來的, 名字附上並且給 disabled -->
      <input :disabled="mainTitle" type="text" id="title" placeholder="Ardbeg 10" v-model="title" />
      <!-- 分數 -->
      <input type="range" min="0" max="100" step="1" id="points" v-model="points" />Rating: {{ points }}
      <!-- <label for="points">Rating: {{ points }}</label> -->
      <label for="message">Write down your feeling?</label>
      <!-- 評論 -->
      <textarea type="text" id="message" v-model="message" />
      <button type="button" class="button show-more" @click="toggleDetail">
        <i class="fa-solid fa-circle-info"></i>
      </button>
      <button type="button" class="button submit-button" @click="submitRegister">OK</button>
    </div>
    <div class="more-detail" v-show="displayDetail">
      <div class="nose">
        <h5>Nose</h5>
        <textarea cols="50" rows="3" v-model="nose"></textarea>
      </div>
      <div class="Taste">
        <h5>Taste</h5>
        <textarea cols="50" rows="3" v-model="taste"></textarea>
      </div>
      <div class="Finish">
        <h5>Finish</h5>
        <textarea cols="50" rows="3" v-model="finish"></textarea>
      </div>
    </div>
  </div>

  <!-- 如果沒有評論 -->
  <div class="no-reviews" v-if="+searchDataById.length === 0">
    <p class="no-reviews-msg">There is no others review yet.</p>
    <!-- 寫 or login 二擇一 -->
    <button class="write-btn">Write my review</button>
    <!-- <router-link class="login-up" to="/login">login to write<i class="fa-solid fa-arrow-right"></i></router-link> -->
  </div>

  <!-- error Message -->
  <div class="alert alert-danger" role="alert" v-show="errorMessage">
    {{ errorMessage }}
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import messageService from "../api-service/message-service";
import MemberReview from "../components/MemberReview.vue";

export default {
  name: "register",
  props: ["mainTitle", "subTitle", "imgSrc", "id", "note"],
  components: { MemberReview },
  setup(props) {
    let title = ref("");
    let message = ref("good, i like Peated !");
    let points = ref(86);
    // let funId = ""; //id不用連動, 直接使用
    let nose = ref("");
    let taste = ref("");
    let finish = ref("");

    let token1 =
      "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJhMDI2NzI0NGY1ZDM1YzcxMWM3YWMiLCJlbWFpbCI6ImoxMjNAZ21haWwuY29tIiwibmFtZSI6ImoxMjMiLCJpYXQiOjE2NDcxMDczMTR9.AWakdxRqu_NuXcVkXND01-cWh57i2DVg8Uz1uiXa-io";

    let user1 = "622a0267244f5d35c711c7ac";
    let errorMessage = ref(null);

    const searchDataById = ref([]);
    // 有props進來, props就是whisky fun的資料內容
    if (props.mainTitle) {
      title.value = JSON.stringify(props.mainTitle);

      // funId打api資料庫撈資料庫也有這筆這筆id的評論
      messageService.getById(token1, props.id).then((foundData) => {
        searchDataById.value = foundData.data.data;
        console.log(searchDataById.value);
      });
    }

    // 提交評論
    const submitRegister = () => {
      const post = {
        title: title.value,
        content: message.value,
        points: points.value,
        speaker: user1,
        funId: props.id,
        nose: nose.value,
        taste: taste.value,
        finish: finish.value,
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

    // more detail..
    let displayDetail = ref(true);
    let toggleDetail = function () {
      displayDetail.value = !displayDetail.value;
    };

    return {
      title,
      message,
      points,
      nose,
      taste,
      finish,
      errorMessage,
      submitRegister,
      toggleDetail,
      displayDetail,
      searchDataById,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/style/_color.scss";
.main-message {
  display: flex;
  width: 100%;
  padding: 1rem 3rem;
  border: 2px solid black;

  .img-wrapper {
    width: 20%;
    // border: 2px solid red;
    img {
      width: 50%;
      margin: auto;
      display: block;
    }
  }
  .info-area {
    width: 80%;
    line-height: 100px;
    margin: auto;
    // border: 2px solid black;
  }
}

// form
.form-wrapper {
  display: flex;
  // display: none;
  width: 100vw;
  height: 50vh;
  padding: 1rem;
  border: 1px solid green;
  // justify-content: center;
}

.form {
  width: 30%;
  position: relative;
  display: flex;
  flex-direction: column;
  border: 2px solid red;

  input {
    width: 70%;
    height: 30px;
    // borderL n
  }

  textarea {
    width: 70%;
    height: 100px;
  }

  .submit-button {
    width: 35px;
    height: 35px;
  }
  .show-more {
    position: absolute;
    padding: 3px;
    border: 1px solid #121212;
    border-radius: 5px;
    background-color: transparent;
    bottom: 100px;
    right: 90px;
  }
}

.more-detail {
  width: 60%;
}

// 沒有評論內容的
.no-reviews {
  text-align: center;
  padding: 3rem 0;

  .no-reviews-msg {
    font-size: 2rem;
  }

  .write-btn {
    border: none;
    padding: 5px;
    border: 1px solid $amber-color;
    border-radius: 3px;
    background-color: transparent;

    &:hover {
      background-color: $amber-color;
      color: white;
    }
  }

  .login-up {
  }
}
</style>
