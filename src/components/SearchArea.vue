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
    <p class="search-content">
      <span class='displayTitle'>{{searchContentSplit[0]}}</span>

      <div>
        <span v-show='searchContentSplit[1]'>({{ (searchContentSplit[1]) }}) | </span>
        <span>{{searchPoints}}</span>
      </div>

    </p>

    <span class='matched-result'> {{ matchedNumber }} 筆搜尋</span>

  </div>
</template>

<script>
import SearchBar from './SearchBar.vue';
import { computed, ref } from 'vue';
export default {
  name: 'search-area',
  components: { SearchBar },
  props:{
    matchedNumber:{
      type: Number,
      default: 0
    }
  },
  setup() {
    // icon CSS for component
    const iconBottle = 'fa-solid fa-wine-bottle';

    // searchIcon
    let pointGreaterThan = ref(true);
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
      exampleSearch: 'BenNevis21 sherryWood',
      exampleVies: {
        mainTitle: '<span style="color:green">Ben Nevis 21 </span>yo 1995/2017',
        subTitle:
          '(52.7%, Wilson & Morgan, Barrel Selection, <span style="color:green">sherry wood</span>, cask #656, 314 bottles)',
      },
    };

    // search function
    let searchContext = ref('ben');
    let searchPoints = ref(90);

    // 搜尋的內容拆分 title/ subTitle
    let searchContentSplit = computed(()=>{ return searchContext.value.split(' ')})

    return {
      iconBottle,
      scoreIcon,
      pointGreaterThan,
      hintMessage,
      searchContext,
      searchPoints,
      searchContentSplit,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/style/_color.scss';
.wrapper {
  width: 100%;
  display: flex;
  position: relative;
  padding: 2rem 2rem;
  // border: 2px solid grey;
}

.search-btn {
  position: absolute;
  width: 45px;
  height: 35px;
  border-radius: 3px;
  bottom: 30px;
  left: 320px;
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
  bottom: 37px;
  left: 290px;
  background-color: transparent;
  border: none;
}

.search-content {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  bottom: -6px;
  left: 400px;
  position: absolute;
  font-size: 1rem;

  .displayTitle{
    font-size: 1.55rem;
    font-weight: 600;
  }
}

.matched-result{
  position: absolute;
  bottom: 0px;
  right: 10px;
  padding: 1rem;
  font-size: 1.5rem;;
}
</style>
