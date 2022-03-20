<template>
  <!-- modal -->
  <div class="popModal" v-if="openModal" tabindex="0" :class="{ 'fade-in': openModal }" @blur="toggleModal(false)">
    <h1 class="modal-title">{{ modalTitle }}</h1>
    <h3 class="modal-subtitle">{{ modalSubtitle }}</h3>
    <br />
    <button class="modal-close" @click="toggleModal(false)">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <p class="modal-note-content">
      {{ modalNote }}
    </p>
    <button class="modal-close-mobile" @click="toggleModal(false)">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <button class="modal-close-mobile" @click="toggleModal(false)">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>

  <div class="view-wrapper" :class="{ 'no-see': openModal }">
    <div class="single-view" v-for="view in viewList" :key="view.id">
      <div class="img">
        <img v-lazy="view.imgSrc" alt="WhiskyPhoto" />
      </div>
      <div class="info">
        <h3 class="title">
          {{ view.mainTitle }}
        </h3>
        <h6>{{ view.subTitle }}</h6>
        <div class="buttons">
          <span class="current-info" @click="toggleModal(true, view)">查看評論</span>
          <span class="leave-info" @click="PostRouteHandler(view)">我要評論</span>
        </div>
        <div class="score">
          <h6>{{ view.SGP }}</h6>
          <h6>points:{{ view.points }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import { useRouter } from "vue-router";
export default {
  name: "ViewComponent",
  props: {
    viewList: {
      type: Array,
      require: true,
    },
  },
  setup() {
    let openModal = ref(false);
    let modalTitle = ref("");
    let modalSubtitle = ref("");
    let modalNote = ref("");
    let modalImg = ref("");
    // console.log(props);

    let toggleModal = function (swift, modalDisplayContent) {
      console.log(swift);
      openModal.value = swift;
      if (modalDisplayContent) {
        modalTitle.value = modalDisplayContent.mainTitle;
        modalSubtitle.value = modalDisplayContent.subTitle;
        modalNote.value = modalDisplayContent.note;
        modalImg.value = modalDisplayContent.imgSrc;
      }
    };

    const router = useRouter();
    // 從搜尋評論,倒轉進去, 並把那一筆資料傳進去
    function PostRouteHandler(commentItem) {
      router.push({
        name: "Post",
        params: {
          mainTitle: commentItem.mainTitle,
          subTitle: commentItem.subTitle,
          imgSrc: commentItem.imgSrc,
          id: commentItem.id,
          note: commentItem.note,
        },
      });
    }

    return {
      openModal,
      modalTitle,
      modalSubtitle,
      modalNote,
      toggleModal,
      PostRouteHandler,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/_color.scss";

.view-wrapper {
  // position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 1rem 2rem;

  box-sizing: border-box;
}
.view {
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.25rem;
  border: 3px solid grey;
  // background-color: rgba(#ffbf00, 0.3);
  border-radius: 5px;
  animation: fadeIn 1.5s ease;

  .title-area {
    padding: 0.75rem;
    background-color: rgba(#ffbf00, 0.5);
    border-bottom: 2px solid black;
  }
  .content-area {
    display: flex;
    align-items: center;
    padding: 1.25rem;
  }
  .left {
    width: 30%;
    padding: 0 1.5rem;
  }
  .img {
    width: 100%;
    transition: 0.5s ease transform;
    &:hover {
      transform: scale(1.5);
    }
  }
  .right {
    font-size: 1.5rem;
    line-height: 150%;
    font-weight: 600;
  }
  .point {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
  }
}

.single-view {
  display: flex;
  width: 48%;
  height: 250px;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin: 0 auto 5px 0;
  &:hover {
    box-shadow: 1px 1px 1px 3px $amber-color;
  }
  animation: fadeIn 1s;

  .img {
    // border: 2px solid red;
    width: 20%;
    height: 100%;
    margin-right: auto;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.5s;
      &:hover {
        transform: scale(1.2);
      }
    }
  }

  .info {
    position: relative;
    width: 75%;
    height: 100%;
    .title {
    }

    .current-info,
    .leave-info {
      text-decoration: none;
      font-size: 10px;
      padding: 5px;
      background-color: rgba($color: #105203, $alpha: 0.7);
      cursor: pointer;
      color: white;
      border-radius: 5px;
    }
    .leave-info {
      background-color: rgba($color: #121212, $alpha: 0.7);
      margin-left: 5px;
    }
    .score {
      position: absolute;
      bottom: 5px;
    }
  }
}

.popModal {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90vw;
  max-height: 80vh;
  overflow: auto;
  padding: 1rem;
  border: 2px solid rgb(0, 0, 0);
  color: #121212;
  background-color: #ffffff;
  border-radius: 5px;
  z-index: 100;

  animation: scrollIn 1s;

  .modal-title {
  }
  .modal-subtitle {
  }
  .modal-note-content {
    font-size: 1.5rem;
  }
  .modal-close {
    position: absolute;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 3px;
    top: 15px;
    right: 15px;
    background-color: rgba(#c74545, 0.5);
    &:hover {
      background-color: rgba(#c74545, 1);
      color: white;
    }
  }
  .modal-close-mobile {
    display: none;
    position: absolute;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 3px;
    right: 10px;
    bottom: 5px;
    background-color: rgba(#c74545, 0.5);
    &:hover {
      background-color: rgba(#c74545, 1);
      color: white;
    }
  }
}

// 背景模糊
.no-see {
  background: hsla(0, 0%, 100%, 0.3);
  filter: blur(3px);
}

// mobile
@media screen and (max-width: 768px) {
  .single-view {
    width: 100%;
  }

  .modal-close {
    display: none;
  }
  .modal-close-mobile {
    display: block !important;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

// modal往下捲動出現

@keyframes scrollIn {
  from {
    opacity: 0;
    transform: translateX(0);
    transform: translate(-50%, -200%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
</style>
