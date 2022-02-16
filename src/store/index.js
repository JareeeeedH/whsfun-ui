import { createStore } from 'vuex';
import axios from 'axios';

let api =
  'https://raw.githubusercontent.com/JareeeeedH/fundata/master/WhiskyFun.json';

// let srcSample =
//   'https://raw.githubusercontent.com/JareeeeedH/fundata/master/whiskyfun/A/A-1710-Soleil-de-Minuit.jpg';

export default createStore({
  state: {},
  mutations: {},
  actions: {
    GET_JSON_DATA(context) {
      axios.get(api).then((response) => {
        context.commit('SET_DATA', response.data);
      });
    },
  },
  getters: {
    dataList(state) {
      let srcRoot =
        'https://raw.githubusercontent.com/JareeeeedH/fundata/master/whiskyfun/';
      let filterList = [];

      state.funData.forEach((item) => {
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
    },
  },
});
