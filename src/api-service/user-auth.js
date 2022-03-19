class userService {
  save(userData) {
    // console.log(userData);
    window.localStorage.setItem("drinker", JSON.stringify(userData));
  }
  get() {
    return window.localStorage.getItem("drinker");
  }
  logOut() {
    window.localStorage.setItem("drinker", "");
  }
}

export default new userService();
