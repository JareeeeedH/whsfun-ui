<template>
  <div class="wrapper">
    <div class="input">
      <SearchBar
        width="width:300px"
        placeHolder="Title Subtitle"
        type="text"
        :icon="iconBottle"
        :hintMessage="hintMessage"
        v-model="searchContext"
      />

      <SearchBar
        width="width:250px"
        placeHolder="points"
        type="Number"
        :icon="scoreIcon"
        v-model="searchPoints"
      />
    </div>

    <!-- checkBox -->
    <input class="check-box" type="checkbox" v-model="pointGreaterThan" />
    <!-- search Button -->
    <button
      class="search-btn"
      @click="
        $emit('emitSearch', searchContext, searchPoints, pointGreaterThan)
      "
    >
      <i class="fas fa-search"></i>
    </button>
    <!-- 輸入的內容 -->
    <p class="search-result">
      搜尋 : {{ searchContext }} | {{ searchPoints }} points
    </p>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue';
import { computed, ref } from 'vue';
export default {
  name: 'search-area',
  components: { SearchBar },
  setup() {
    // icon CSS for component
    const iconBottle = 'fa-solid fa-wine-bottle';

    // searchIcon
    let pointGreaterThan = ref(false);
    const iconGT = 'fa-solid fa-greater-than-equal';
    const iconEqual = 'fa-solid fa-equals';

    let scoreIcon = computed(() => {
      return pointGreaterThan.value ? iconGT : iconEqual;
    });

    // 搜尋功能提示的內容
    const hintMessage = {
      messageEn:
        'one word : search title, following a space and second word for sub title(optional).',
      messageZh:
        '搜尋一個字,可搜尋評論 [標題] , 空一格後第二個字可以搜尋 [副標題] ',
      exampleSearch: 'BenNevis21 sherry',
      exampleVies: {
        mainTitle: 'Ben Nevis 21 yo 1995/2017',
        subTitle:
          '(52.7%, Wilson & Morgan, Barrel Selection, sherry wood, cask #656, 314 bottles)',
      },
    };

    // search function
    let searchContext = ref('ardbeg10yo sherry');
    let searchPoints = ref(90);

    return {
      iconBottle,
      scoreIcon,
      pointGreaterThan,
      hintMessage,
      searchContext,
      searchPoints,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/style/_color.scss';
.wrapper {
  display: flex;
  position: relative;
  padding: 1rem 0;
  //   border: 2px solid grey;
}

.search-btn {
  position: absolute;
  width: 45px;
  height: 35px;
  border-radius: 3px;
  bottom: 22px;
  left: 300px;
  background-color: transparent;
  border: none;
  &:hover {
    box-shadow: 0px 3px 0px 0px rgba(rgb(82, 82, 82), 0.3);
    background-color: $amber-color;
    color: white;
  }
  i {
    border: none;
    padding: 2px;
    font-size: 1.25rem;
  }
}

.check-box {
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 3px;
  bottom: 30px;
  left: 260px;
  background-color: transparent;
  border: none;
}

.search-result {
  // position: absolute;
  padding: 1rem;
}
</style>
