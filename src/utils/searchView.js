// 將json的raw data做 map成要呈現的資料結構
let dataMap = function (rowDataList) {
  let srcRoot = "https://raw.githubusercontent.com/JareeeeedH/fundata/master/whiskyfun/";
  let filterList = [];

  rowDataList.forEach((item) => {
    // imgSrc
    let filePath = item.IMAGE_PATH.split("/")[1].split("")[0];
    let imgPath = item.IMAGE_PATH.split("/")[1];
    let imgSrc = srcRoot + filePath + "/" + imgPath;

    //Title
    let name = item.NAME.split(" (");
    let mainTitle = name[0];
    let subTitle = "(" + name[1];

    // Score
    let score = item.SCORE;
    let scoreSplit = item.SCORE.split(" - ");
    let SGP = scoreSplit[0];
    let points = scoreSplit[1];

    // 有些分數格式異常處理
    if (!points) {
      let typeTwoScoreSplit = item.SCORE.split("  ");
      points = typeTwoScoreSplit[1];
    }

    // 分數統一去掉 "points"
    if (points) {
      points = points.replace(" points", "");
    }

    // 沒處理到的異常資料
    if (!points) {
      points = "NaN";
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

// SGP: "SGP:456"
// id: 53
// imgSrc: "https://raw.githubusercontent.com/JareeeeedH/fundata/master/whiskyfun/C/Caol-Ila-13-yo-2007-Maltbarn.jpg"
// mainTitle: "Caol Ila 13 yo 2007/2020"
// note: " A fantastic label here, Maltbarn's Martin has always given greatest care to the fully original photographs he's been using for his labels, some by his very self. Easily in the Top 10%, together with some Japanese friends. The whiskies aren't half bad either... Colour: white wine. Nose: it is a rather medicinal one, pretty much on eucalyptus-based embrocations and fresh mint. Which means this is no peat monster. Right. With water: mud, plaster, new plastic (pretty much an extinct breed) and homemade yoghurt. A rather bready young CI, that's great. Mouth (neat): excellent! Manzanilla, sea water and bone-dry Mosel riesling blended away together. You may add a tiny drop of pastis. With water: back to peaty, bready ad yeasty flavours. Finish: medium. Comments: very, very good. Perhaps just a little less 'obvious' than others? "
// points: "86"
// score: "SGP:456 - 86 points"
// subTitle: "(54.5%, Maltbarn, bourbon, 149 bottles)"

// 字串處理, 合併一起 + 轉小寫
function textTransfer(stringText = "") {
  return stringText.replaceAll(" ", "").toLowerCase();
}

// 把過濾功能整合在這邊處理
let searchMethodCombine = function (payload) {
  console.log("payload---->", payload);
  let filteredData = [];

  filteredData = payload.dataList.filter((viewContent) => {
    // 輸入的title
    let inputTitleTransfer = textTransfer(payload.inputTitle);
    // 輸入的subTitle
    let inputSubTitleTransfer = textTransfer(payload.inputSubTitle);

    // 要被找的title
    let titleTextCheck = textTransfer(viewContent.mainTitle);
    // 要被找的subTitle
    let subTitleTextCheck = textTransfer(viewContent.subTitle);

    if (payload.method == "one") {
      // console.log("one : title Only");
      return titleTextCheck.indexOf(inputTitleTransfer) !== -1;
    }

    if (payload.method == "two") {
      // console.log("two : title + subTitle");
      return (
        titleTextCheck.indexOf(inputTitleTransfer) !== -1 && subTitleTextCheck.indexOf(inputSubTitleTransfer) !== -1
      );
    }

    if (payload.method == "three") {
      // console.log("three : title + 分數 >=");
      return (
        titleTextCheck.indexOf(inputTitleTransfer) !== -1 && Number(viewContent.points) >= Number(payload.searchPoint)
      );
    }

    if (payload.method == "four") {
      // console.log("four : title + =(剛好等於)");
      return (
        titleTextCheck.indexOf(inputTitleTransfer) !== -1 && Number(viewContent.points) == Number(payload.searchPoint)
      );
    }

    if (payload.method == "five") {
      // console.log("title + subTitle + points, >=大於等於");
      return (
        titleTextCheck.indexOf(inputTitleTransfer) !== -1 &&
        subTitleTextCheck.indexOf(inputSubTitleTransfer) !== -1 &&
        Number(viewContent.points) >= Number(payload.searchPoint)
      );
    }

    if (payload.method == "six") {
      // console.log("title + subTitle + points, = 剛好等於");
      return (
        titleTextCheck.indexOf(inputTitleTransfer) !== -1 &&
        subTitleTextCheck.indexOf(inputSubTitleTransfer) !== -1 &&
        Number(viewContent.points) == Number(payload.searchPoint)
      );
    }
  });
  // console.log("filteredData", filteredData);
  return filteredData;
};

// 搜尋功能
let searchView = (searchContext, searchPoint, pointGreaterThan, dataList = []) => {
  // 整理出 主標題,副標題
  let textSplit = searchContext.split(" ");
  let [inputTitle, inputSubTitle] = textSplit;
  console.log("搜尋目標->", inputTitle, inputSubTitle, searchPoint, pointGreaterThan);

  // title Only, method:one
  if (inputTitle && !inputSubTitle && !searchPoint) {
    console.log("title Only, method:one");
    let payload = { inputTitle, inputSubTitle, searchPoint, method: "one", dataList };
    return searchMethodCombine(payload);
  }

  // title + subTitle,  method:two
  if (inputTitle && inputSubTitle && !searchPoint) {
    console.log("title + subTitle,  method:two");
    let payload = { inputTitle, inputSubTitle, searchPoint, method: "two", dataList };
    return searchMethodCombine(payload);
  }

  // title + points (no subTitle), method:three/ four
  if (inputTitle && !inputSubTitle && searchPoint) {
    // 分數 >=
    if (pointGreaterThan) {
      console.log("title + points + 大於等於, method:three");
      let payload = { inputTitle, inputSubTitle, searchPoint, method: "three", dataList };
      return searchMethodCombine(payload);
    }
    // 分數 =
    console.log("title + points + 分數等於, method:four");
    let payload = { inputTitle, inputSubTitle, searchPoint, method: "four", dataList };
    return searchMethodCombine(payload);
  }

  // title + subTitle + points,  method:five/ six
  if (inputTitle && inputSubTitle && searchPoint) {
    // 分數 >=
    if (pointGreaterThan) {
      console.log("title + subTitle + points + 大於等於");
      let payload = { inputTitle, inputSubTitle, searchPoint, method: "five", dataList };
      return searchMethodCombine(payload);
    }
    // = 分數剛好等於
    console.log("title + subTitle + points + 剛好等於");
    let payload = { inputTitle, inputSubTitle, searchPoint, method: "six", dataList };
    return searchMethodCombine(payload);
  }
};

export { dataMap, searchView };
