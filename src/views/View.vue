<template>
  <div class="view-wrapper">
    <ViewComponent :viewList="displayDataList" />
  </div>
</template>

<script>
// allData
// import dataList from '../config/dataList';

// 先使用demoList, 比較少資料
import demoList from '../config/demoList';
import { ref } from 'vue';

import ViewComponent from '../components/WhiskyView.vue';
export default {
  name: 'Home',
  components: { ViewComponent },
  setup() {
    let dataMap = function (rowDataList) {
      let srcRoot =
        'https://raw.githubusercontent.com/JareeeeedH/fundata/master/whiskyfun/';
      let filterList = [];

      rowDataList.forEach((item) => {
        // imgSrc
        let filePath = item.IMAGE_PATH.split('/')[1].split('')[0];
        let imgPath = item.IMAGE_PATH.split('/')[1];
        let imgSrc = srcRoot + filePath + '/' + imgPath;

        //Title
        let name = item.NAME.split(' (');
        let mainTitle = name[0];
        let subTitle = '(' + name[1];

        // Score
        let score = item.SCORE;
        let scoreSplit = item.SCORE.split(' - ');
        let SGP = scoreSplit[0];
        let points = scoreSplit[1];

        // 有些分數格式異常處理
        if (!points) {
          let typeTwoScoreSplit = item.SCORE.split('  ');
          points = typeTwoScoreSplit[1];
        }

        // 分數統一去掉 "points"
        if (points) {
          points = points.replace('points', '');
        }

        // 沒處理到的異常資料
        if (!points) {
          points = 'NaN';
        }

        let eachItem = {
          SGP,
          points,
          mainTitle,
          subTitle,
          imgSrc,
          score,
          note: item.NOTE,
          id: item.id,
        };
        filterList.push(eachItem);
      });

      return filterList;
    };
    let displayDataList = ref(dataMap(demoList));
    return { displayDataList };
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
