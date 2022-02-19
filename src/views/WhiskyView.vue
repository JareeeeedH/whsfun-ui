<template>
  <div class="view-wrapper">
    <!-- 上方搜尋功能區塊 -->
    <SearchArea @emitSearch="searchHandler" />
    <!-- 下方顯示評論區塊 -->
    <ViewComponent :viewList="displayDataList" />
  </div>
</template>

<script>
// allData
// import dataList from '../config/dataList';

// 先使用demoList, 比較少資料
import demoList from '../config/demoList';
import { ref } from 'vue';
import SearchArea from '../components/SearchArea.vue';
import ViewComponent from '../components/WhiskyView.vue';

import { dataMap, searchView } from '../utils/searchView';
export default {
  name: 'Home',
  components: { ViewComponent, SearchArea },
  setup() {
    let displayDataList = ref(dataMap(demoList));

    let searchHandler = function (searchTitle, searchPoints) {
      let dataFiltered = searchView(
        searchTitle,
        searchPoints,
        displayDataList.value
      );
      displayDataList.value = dataFiltered;
    };
    return { displayDataList, searchHandler };
  },
};
</script>

<style lang="scss" scoped>
.view-wrapper {
  width: 100%;
}
.view {
  margin: 0.5rem 0;
  padding: 0.25rem;
  border: 3px solid grey;
  border-radius: 5px;
  .content-area {
    display: flex;
  }
}
</style>
