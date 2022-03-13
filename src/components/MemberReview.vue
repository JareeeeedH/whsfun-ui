<template>
  <div class="review-content">
    <div class="review">
      <div class="top-area">
        <div class="user-img">
          <img src="https://fakeimg.pl/60x60/" alt="user-photo" />
        </div>
        <div class="general-msg">
          <span>{{ review.speaker.name }} scored this whisky {{ review.points }} points</span>
          <br />
          <span>{{ review.date }}</span>
        </div>
      </div>
      <div class="review-message">
        <h5 class="general-context">{{ review.content }}</h5>
        <span class="nose-context">Nose:{{ review.nose }}</span>
        <span class="taste-context">Taste:{{ review.taste }}</span>
        <span class="review-context">Finish:{{ review.finish }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "memberReview",
  props: ["review"],
  setup() {},
};
</script>

<style>
.review-content {
  padding: 1rem;
  border: 2px solid black;
}
.top-area {
  display: flex;
}

.review-message {
  display: flex;
  flex-direction: column;
}
</style>
