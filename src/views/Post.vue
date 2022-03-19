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
  <div class="write-review" v-if="userData">
    <button @click="toggleForm">
      WRITE
      <i class="fa-solid fa-comments"></i>
    </button>
  </div>

  <!-- form表單 -->
  <div class="form-wrapper" :class="{ active: displayForm }">
    <div class="form">
      <h5>Write down my Review and Rating for:</h5>
      <!-- 名稱 -->
      <!-- 如果是有從評論區傳過來的, 名字附上並且給 disabled -->
      <input
        :disabled="mainTitle"
        type="text"
        id="title"
        placeholder="Ardbeg 10"
        v-model="title"
      />
      <!-- 分數 -->
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        id="points"
        v-model="points"
      />Rating: {{ points }}
      <!-- <label for="points">Rating: {{ points }}</label> -->
      <label for="message">Write down your feeling?</label>
      <!-- 評論 -->
      <textarea type="text" id="message" v-model="message" />
      <!-- 關閉表單 X-->
      <button type="button" class="button close-form" @click="toggleForm">
        X
      </button>
      <!-- 打開顯示更多-->
      <button type="button" class="button show-more" @click="toggleDetail">
        <i class="fa-solid fa-circle-info"></i>
      </button>
      <button
        type="button"
        class="button submit-button"
        @click="submitRegister"
      >
        OK
      </button>
      <!-- <br /> -->
      <transition name="fade">
        <div class="more-detail" :class="{ 'more-active': displayDetail }">
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
      </transition>
    </div>
  </div>

  <!-- 會員的評論 -->
  <MemberReview
    v-for="review in searchDataById"
    :key="review._id"
    :review="review"
  />

  <!-- 如果沒有評論 -->
  <div class="no-reviews" v-if="displayNoReviewsHint">
    <p class="no-reviews-msg">There is no others review yet.</p>
    <!-- 寫 or login 二擇一 -->
    <button class="write-btn" v-if="userData" @click="toggleForm">
      Write my review
    </button>
    <router-link v-else class="login-up write-btn" to="/login"
      >login to write<i class="fa-solid fa-arrow-right"></i
    ></router-link>
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
  props: ["mainTitle", "subTitle", "imgSrc", "id", "note", "userData"],
  components: { MemberReview },
  setup(props) {
    let title = ref("");
    let message = ref("good, i like Peated !");
    let points = ref(86);
    let nose = ref("");
    let taste = ref("");
    let finish = ref("");
    let displayNoReviewsHint = ref(false); //有丟props進來, 並且資料庫沒資料, 才要顯示

    let errorMessage = ref(null);

    const searchDataById = ref([]);
    // 有props進來, props就是whisky fun的資料內容
    if (props.mainTitle) {
      title.value = JSON.stringify(props.mainTitle);

      // funId打api資料庫撈資料庫也有這筆這筆id的評論
      messageService
        .getById(props.userData.token, props.id)
        .then((foundData) => {
          searchDataById.value = foundData.data.data.reverse();
          console.log("searchDataById", searchDataById);

          if (searchDataById.value.length === 0) {
            displayNoReviewsHint.value = true;
          }
        });
    }

    // 提交評論
    const submitRegister = () => {
      const post = {
        title: title.value,
        content: message.value,
        points: points.value,
        speaker: props.userData._id,
        funId: props.id,
        nose: nose.value,
        taste: taste.value,
        finish: finish.value,
      };

      // call Api提交評論
      messageService
        .post(post, props.userData.token)
        .then((response) => {
          // 這邊利用props.userData的name直接放在response回傳, 直接加上畫面, 替代重打api load資料.
          let newData = response.data.data;
          newData.speaker = { name: props.userData.name };
          searchDataById.value.unshift(newData);

          // 關掉表單
          toggleForm();

          // 關閉 沒有任何評論的提示
          displayNoReviewsHint.value = false;
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
    let displayForm = ref(false);

    let toggleForm = function () {
      console.log(displayForm.value);
      displayForm.value = !displayForm.value;
    };
    // more detail..
    let displayDetail = ref(false);
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
      toggleForm,
      displayDetail,
      displayForm,
      searchDataById,
      displayNoReviewsHint,
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

.write-review {
  padding: 1rem 2.5rem;
  button {
    border: none;
    border-radius: 5px;
    padding: 0.55rem;
    background-color: $amber-color;
  }
}

// form
.form-wrapper {
  opacity: 0;
  display: flex;
  position: absolute;
  border-radius: 10px;
  width: 50vw;
  padding: 1rem;
  top: 70px;
  background: linear-gradient(45deg, $amber-color, $amber-color, #121212);
  box-shadow: 0 0 0px 5px rgba($color: #121212, $alpha: 0.7);
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.5s;
}

.active {
  opacity: 1;
}

.form {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  input {
    width: 80%;
    height: 35px;
  }

  textarea {
    width: 80%;
    height: 100px;
  }

  .submit-button {
    position: relative;
    left: 80%;
    width: 50px;
    height: 30px;
    border: none;
    // background-color: rgb(0, 0, 0);
    color: #121212;
    border-radius: 5px;
    &:hover {
      color: rgb(255, 255, 255);
      background-color: green;
      // border: 1px solid $amber-color;
    }
  }

  .show-more,
  .close-form {
    width: 30px;
    height: 30px;
    position: absolute;
    padding: 3px;
    border: 1px solid #ffffff;
    border-radius: 5px;
    background-color: transparent;
  }
  .show-more {
    right: 50px;
    &:hover {
      background-color: $amber-color;
    }
    .fa-solid {
      color: white;
    }
  }

  .close-form {
    color: white;
    right: 10px;

    &:hover {
      background-color: red;
    }
  }
}

.more-detail {
  opacity: 0;
  display: none;
}

.more-active {
  opacity: 1;
  display: block;
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
    text-decoration: none;
  }
}

@media screen and (max-width: 1024px) {
  .form-wrapper {
    width: 85vw;
  }
}
</style>
