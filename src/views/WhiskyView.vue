<template>
  <div class="view-wrapper">
    <!-- 上方搜尋功能區塊 -->
    <SearchArea :matchedNumber="matchedNumber" @emitSearch="searchHandler" />

    <Carousel v-if="!isSearch" :displayList="displayDataList" />
    <template v-else>
      <!-- 下方顯示評論區塊 -->
      <ViewComponent v-if="displayDataList.length !== 0" :viewList="displayDataList" />
      <h5 v-else>no data / 沒有符合的評論</h5>
      <!-- warnin Message -->
    </template>

    <h5 v-if="warningMessage" style="color: red">{{ warningMessage }} / 請搜尋至少三個字</h5>
  </div>
</template>

<script>
// allData
import dataList from "../config/dataList";
// 先使用demoList, 比較少資料
// import demoList from "../config/demoList";

import { computed, ref } from "vue";
import SearchArea from "../components/SearchArea.vue";
import ViewComponent from "../components/ViewComponent.vue";

import { dataMap, searchView } from "../utils/searchView";

import Carousel from "../components/Carousel.vue";
export default {
  name: "Home",
  components: { ViewComponent, SearchArea, Carousel },
  setup() {
    // row Data
    let rowDisplayDataList = ref(dataMap(dataList));
    // 搜尋到的dataList
    let displayDataList = ref([]);
    // 搜尋到的數量
    let matchedNumber = computed(() => {
      return displayDataList.value.length;
    });
    let warningMessage = ref("");

    // 是否已經有搜尋過, 控制是否顯示輪播
    let isSearch = ref(false);

    let searchHandler = function (searchContext, searchPoints, pointGreaterThan) {
      // error Handling
      // 至少搜尋標題三個字元
      if (searchContext.length < 3) {
        console.log("searchContext輸入的內容", searchContext);
        warningMessage.value = "can not search less than three letter ";
        displayDataList.value = [];
        return;
      }

      warningMessage.value = "";

      // 調用搜尋功能的function
      let dataFiltered = searchView(searchContext, searchPoints, pointGreaterThan, rowDisplayDataList.value);
      displayDataList.value = dataFiltered;

      isSearch.value = true;
    };

    // 取得隨機幾筆當首頁輪播
    let randomData = [];
    for (let i = 0; i < 10; i++) {
      let randomNumber = Math.round(Math.random() * dataList.length);
      randomData.push(rowDisplayDataList.value[randomNumber]);
      displayDataList.value = randomData;
    }

    return { displayDataList, warningMessage, matchedNumber, randomData, isSearch, searchHandler };
  },
};
</script>

<style lang="scss" scoped>
.view-wrapper {
  width: 100%;
  position: relative;
}
// .view {
//   margin: 0.5rem 0;
//   padding: 0.25rem;
//   border: 3px solid grey;
//   border-radius: 5px;
//   .content-area {
//     display: flex;
//   }
// }
</style>
