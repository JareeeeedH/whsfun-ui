<template>
  <div class="view-wrapper">
    <div class="view" v-for="view in viewList" :key="view.id">
      <div class="title-area">
        <h3>{{ view.mainTitle }}</h3>
        <h5>{{ view.subTitle }}</h5>
      </div>
      <div class="content-area">
        <div class="left">
          <div class="img">
            <img :src="view.imgSrc" alt="WhiskyPhoto" />
          </div>
          <div class="point">
            <span> {{ view.SGP }}</span>
            <br />
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
  name: 'Home',
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
}
.view {
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.25rem 1rem;
  border: 3px solid grey;
  background-color: rgba(#ffbf00, 0.3);
  border-radius: 5px;

  .title-area {
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
  }
  .right {
    font-size: 1.5rem;
  }
}
</style>
