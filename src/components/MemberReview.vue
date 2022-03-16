<template>
  <div class="review-content">
    <div class="review">
      <div class="top-area">
        <div class="user-img">
          <img :src="randomImg" alt="user-photo" />
        </div>
        <div class="general-msg">
          <span>
            <span class="name">{{ review.speaker.name }} </span>
            scored this whisky
            <span class="score">{{ review.points }} </span>
            points
          </span>
          <br />
          <span class="message-date">{{ review.date }}(GMT+0)</span>
        </div>
      </div>
      <div class="review-message">
        <h5 class="general-context">{{ review.content }}</h5>
        <span class="sub-context">
          <span class="sub-context-title">Nose:</span>
          <br />
          {{ review.nose }}
        </span>
        <span class="sub-context">
          <span class="sub-context-title">Taste:</span>
          <br />
          {{ review.taste }}
        </span>
        <span class="sub-context">
          <span class="sub-context-title">
            Finish:
            <br />
          </span>
          {{ review.finish }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  name: "memberReview",
  props: ["review"],
  setup(props) {
    let randomImg = computed(() => `https://picsum.photos/200/300?random=${props.review.speaker._id}`);
    return { randomImg };
  },
};
</script>

<style lang="scss">
.review-content {
  padding: 1rem 2.5rem;
  border: 1px solid black;
}
.top-area {
  display: flex;
}

.general-msg {
  padding: 0.5rem;

  .name {
    font-weight: bold;
    font-size: 1.25rem;
  }
  .score {
    font-weight: bold;
    font-size: 1.25rem;
  }

  .message-date {
    font-size: 0.25rem;
    color: grey;
  }
}

.user-img {
  width: 80px;
  height: 80px;
  border-radius: 50px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50px;
  }
}

.review-message {
  display: flex;
  flex-direction: column;

  .general-context {
    padding: 0.5rem 0;
  }

  .sub-context {
    padding: 0.25rem 0;
  }

  .sub-context-title {
    font-weight: bold;
    color: rgb(79, 123, 245);
  }
}
</style>
