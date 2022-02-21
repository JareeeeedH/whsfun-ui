<template>
  <div class="search" :style="width">
    <i class="my-icon" :class="icon">
      <!-- 如果icon Hover有要提示訊息, props丟訊息內容進來 -->
      <div v-if="hintMessage" class="hint-message">
        <h6>{{ hintMessage.messageZh }}</h6>
        <h5>{{ hintMessage.messageEn }}</h5>
        <span style="color: green">
          example : {{ hintMessage.exampleSearch }}</span
        >
        <span class="arrow">&#x21B4;</span>

        <div class="search-result">
        <span v-html="hintMessage.exampleVies.mainTitle"></span>
          <br>
        <span v-html="hintMessage.exampleVies.subTitle"></span>
        </div>
      </div>
    </i>
    <input
      class="search-term"
      :type="type"
      :placeholder="placeHolder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'search-bar',
  props: ['width', 'placeHolder', 'type', 'icon', 'hintMessage', 'modelValue'],
  setup() {},
};
</script>

<style lang="scss">
@import '@/style/_color.scss';

.search {
  position: relative;
  margin: 0.25rem 0;
  display: flex;
  width: 20%;
  padding: 0.5rem;
  border: 2px solid $amber-color;
  border-radius: 5px;
  i {
    font-size: 1.5rem;
    color: black;
    animation: slower 1.5s;
    &:hover .hint-message {
      display: block;
    }
  }
}

.search-term {
  height: 1.5rem;
  padding: 0 0.25rem;
}

.fa-search {
  font-size: 1.5rem;
}
.search-term {
  width: 100%;
  border: none;
  outline: none;
  color: #000000;
  font-size: 1rem;
}

.hint-message {
  position: absolute;
  padding: 1rem 0.5rem;
  width: 55rem;
  left: 6%;
  border-radius: 10px;
  background-color: rgba($color: $dark-mode, $alpha: 1);
  color: rgb(220, 220, 220);
  z-index: 100;
  display: none;
  font-size: 1rem;

  .search-result {
    margin-top: 2rem;
    padding: 1rem;
    border-radius: 2px;
    color: white;
    font-size: 1.25rem;
    background-color: rgba($color: $amber-color, $alpha: 0.2);
  }

  .arrow {
    font-size: 2rem;
    position: absolute;
  }
}

@keyframes slower {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    transform: scale(2);
    color: $amber-color;
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
