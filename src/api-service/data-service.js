import axios from 'axios';

let API_URL =
  'https://raw.githubusercontent.com/JareeeeedH/fundata/master/WhiskyFun.json';

class dataService {
  get() {
    return axios.get(API_URL);
  }
}

export default new dataService();
