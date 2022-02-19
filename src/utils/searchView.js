// 將json的raw data做 map成要呈現的資料結構
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
      points = points.replace(' points', '');
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

// 搜尋功能
let searchView = (searchText, searchPoint, dataList = []) => {
  // let filteredData = dataList.filter((content) => {
  //   return content.points == searchPoint;
  // });

  dataList.forEach((item) => {
    console.log('-----');
    console.log(item.mainTitle.trim().toLowerCase().replaceAll(' ', ''));
    console.log(item.subTitle.trim().toLowerCase().replaceAll(' ', ''));
    console.log('-----');
  });
  // let [title, subTitle] = searchText.split(' ');
  // console.log(title);
  // console.log(subTitle);
  // console.log(searchPoint);
  return dataList;
};
export { dataMap, searchView };
