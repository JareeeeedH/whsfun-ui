import axios from "axios";

const API_URL = "http://localhost:3000/api/message";

class messageService {
  // po文
  post(postData, token) {
    console.log(token);
    return axios.post(
      API_URL + "/post",
      { postData },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  // get所有留言訊息
  get(token) {
    return axios.get(API_URL + "/post", {
      headers: {
        Authorization: token,
      },
    });
  }
  // get by Id
  getById(token, funId) {
    return axios.get(API_URL + "/post/" + funId, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new messageService();
