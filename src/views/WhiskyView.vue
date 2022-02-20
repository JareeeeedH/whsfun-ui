<template>
  <div class="view-wrapper">
    <!-- 上方搜尋功能區塊 -->
    <SearchArea @emitSearch="searchHandler" />
    <!-- warnin Message -->
    <h1 v-if="warningMessage" style="color: red">
      {{ warningMessage }}
    </h1>
    <!-- 下方顯示評論區塊 -->
    <ViewComponent v-if="displayDataList.length !== 0" :viewList="displayDataList" />
    <div v-else>no Data</div>
  </div>
</template>

<script>
// allData
// import dataList from '../config/dataList';
// 先使用demoList, 比較少資料
import demoList from "../config/demoList";

import { ref } from "vue";
import SearchArea from "../components/SearchArea.vue";
import ViewComponent from "../components/ViewComponent.vue";

import { dataMap, searchView } from "../utils/searchView";
export default {
  name: "Home",
  components: { ViewComponent, SearchArea },
  setup() {
    let rowDisplayDataList = ref(dataMap(demoList));
    let displayDataList = ref([]);
    let warningMessage = ref("");

    let searchHandler = function (searchContext, searchPoints, pointGreaterThan) {
      // error Handling
      // 至少搜尋標題三個字元
      if (searchContext.length < 3) {
        console.log("searchContext輸入的內容", searchContext);
        warningMessage.value = "can not search less than three letter ";
        return;
      }

      warningMessage.value = "";

      // 調用搜尋功能的function
      let dataFiltered = searchView(searchContext, searchPoints, pointGreaterThan, rowDisplayDataList.value);
      displayDataList.value = dataFiltered;
    };
    return { displayDataList, warningMessage, searchHandler };
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
