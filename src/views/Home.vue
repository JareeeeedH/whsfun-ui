<template>
  <div class="home">
    <h1 class="home-title">Have fun with Whisky!</h1>
    <br />
    <div class="home-message">
      <div class="eng">
        <p>
          This is a website about to get you search those Whisky reviews more comfortable from
          <span class="fun-test">Whiskyfun.com</span> own by Angus. Please check our search function in
          <router-link to="/view">View</router-link> page. You can write down your feelings, then in future we can see see
          more and more sharing from the world. This website is non-commercial use, Our purpose is to create a atmosphere
          that we can share information about Whisky, have fun !
        </p>
      </div>
      <div class="zh-tw">
        <p>
          這個網站是讓你可以更加方便搜尋到<span class="fun-test">Whiskyfun.com</span>的威士忌評論。請前往
          <router-link to="/view">View</router-link>頁面使用搜尋功能。 也希望你可以留下你的評論與分享,
          讓我們可以與全世界的威士忌愛好者一同分享更多資訊。 這個網站不使用於商業用途,
          目標是想要打造一個威士忌愛好者可以一起同樂分享訊息的環境。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 1rem;
  height: 82vh;
}

.home-message {
  font-size: 1.25rem;
  line-height: 50px;
}

.fun-test {
  text-decoration: underline;
}

@media screen and (max-width: 550px) {
  .home-message {
    font-size: 1rem;
    line-height: 25px;
    /* letter-spacing: 2px; */
  }

  .eng {
    margin-bottom: 50px;
  }
}
</style>

<script></script>
