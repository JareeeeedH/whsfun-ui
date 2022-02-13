import axios from 'axios';

const API_URL = 'http://localhost:3000/api/message';

class messageService {
  post(postData) {
    return axios.post(API_URL + '/post', { postData });
  }
  get(id) {
    return id;
  }
}

export default new messageService();
