import axios from "axios";

// local Url
// const API_URL = "http://localhost:3000/api/message";

let API_URL = "https://whisky-happy.herokuapp.com/api/message";

class messageService {
  // po文
  post(postData, token) {
    // console.log(token);
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
  // 其實可以不用token了
  get(token) {
    return axios.get(API_URL + "/post", {
      headers: {
        Authorization: token,
      },
    });
  }
  // get by Id
  // 其實可以不用token了
  getById(token, funId) {
    return axios.get(API_URL + "/post/" + funId, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new messageService();
