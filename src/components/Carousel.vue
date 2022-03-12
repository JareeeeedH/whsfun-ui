<template>
  <div class="carousel-outer">
    <div class="swiper-wrapper">
      <swiper
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        class="swiper-container"
        :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
        :pagination="{ clickable: true }"
        :autoplay="{ autoplay: true }"
        loop
      >
        <swiper-slide class="swiper-slide" v-for="recommendView in displayList" :key="recommendView.id">
          <img :src="recommendView.imgSrc" />
        </swiper-slide>

        <div class="swiper-pagination"></div>
        <!--箭頭-->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </swiper>
    </div>

    <!-- pc版, 右邊的列表 -->
    <div class="view-info">
      <ul>
        <li
          :class="{ active: index == activeIndex }"
          v-for="(recommendView, index) in displayList"
          :key="recommendView.id"
          @click="choseView(index)"
        >
          {{ index + 1 }} {{ recommendView.mainTitle }}
        </li>
      </ul>
    </div>

    <!-- mobile每個威士忌名字 -->
    <h3 class="indexItem">
      {{ indexItem.mainTitle }}
    </h3>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay } from "swiper";
SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay]);

import { onMounted, ref } from "vue";

export default {
  name: "carousel",
  props: ["displayList"],
  components: { Swiper, SwiperSlide },
  setup(props) {
    let activeIndex = ref(0);
    // 存放swipe實例
    let swiper = ref(null);

    // mobile顯示,輪播當前的名字
    let indexItem = ref("");

    // 取得swiper實例
    function onSwiper(swiperObject) {
      swiper.value = swiperObject;
    }

    // li點擊, 滑到點擊位置
    function choseView(index) {
      swiper.value.slideTo(index + 1);
    }

    // 偵聽切換觸發, 給li class
    function onSlideChange(evt) {
      activeIndex.value = evt.realIndex;
      // 取得當筆輪播
      indexItem.value = props.displayList[evt.realIndex];
    }

    onMounted(() => {
      // console.log(swiperObject);
    });

    return { onSwiper, onSlideChange, choseView, activeIndex, swiper, indexItem };
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/_color.scss";
.carousel-outer {
  width: 95%;
  display: flex;
  padding: 3rem 2rem;
  border-radius: 5px;
  background: linear-gradient(90deg, #eeeeee, #121212);
  margin: auto;
  margin-bottom: 200px;
}
.swiper-wrapper {
  width: 30%;
  // border: 2px solid red;
}
.view-info {
  width: 60%;
  margin: auto;
}

.view-info {
  color: $dark-mode;
  font: 1.5rem sans-serif;
  li {
    list-style: none;
    padding: 5px 0px;
    cursor: pointer;
    &:hover {
      color: $amber-color;
    }
  }
}

img {
  width: 70%;
  height: 450px;
  background-size: cover;
  margin: auto;
  display: block;
}

.active {
  color: green;
}

.indexItem {
  display: none;
  text-align: center;
  padding: 5px;
}
@media screen and (max-width: 768px) {
  .carousel-outer {
    display: block;
  }
  .swiper-wrapper {
    width: 100%;
  }
  .view-info {
    display: none;
  }

  .swiper-wrapper {
    width: 100%;
  }

  .indexItem {
    display: block;
  }
}
</style>
