<template>
  <div class="view-wrapper">
    <div class="view" v-for="view in viewList" :key="view.id">
      <div class="title-area">
        <h2>{{ view.mainTitle }}</h2>
        <h5>{{ view.subTitle }}</h5>
      </div>
      <div class="content-area">
        <div class="left">
          <div class="img">
            <img v-lazy="view.imgSrc" alt="WhiskyPhoto" />
          </div>
          <div class="point">
            <span> {{ view.SGP }}</span>
            <span>points:{{ view.points }}</span>
          </div>
        </div>
        <div class="right">
          <p>
            {{ view.note }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewComponent",
  props: {
    viewList: {
      type: Array,
      require: true,
    },
  },
  setup(props) {
    console.log(props);
  },
};
</script>

<style lang="scss" scoped>
.view-wrapper {
  width: 100%;
  padding: 0rem 2rem;
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
</style>
