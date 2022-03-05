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
  setup() {
    let activeIndex = ref(0);
    // 存放swipe實例
    let swiper = ref(null);

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
    }

    onMounted(() => {
      // console.log(swiperObject);
    });

    return { onSwiper, onSlideChange, choseView, activeIndex, swiper };
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/_color.scss";
.carousel-outer {
  width: 100%;
  display: flex;
  padding: 5rem 2rem;
  border-radius: 5px;
  background: rgba($color: $grey-color, $alpha: 0.1);
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
</style>
