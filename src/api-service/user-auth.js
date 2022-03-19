class userService {
  save(userData) {
    // console.log(userData);
    window.localStorage.setItem("drinker", JSON.stringify(userData));
  }
  get() {
    let drinker = window.localStorage.getItem("drinker");
    if (drinker) {
      return JSON.parse(drinker);
    }
    return "";
  }
  logOut() {
    window.localStorage.setItem("drinker", "");
  }
}

export default new userService();
