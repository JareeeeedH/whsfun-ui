import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// lazyLoad
import VueLazyLoad from "vue3-lazyload";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

createApp(App).use(VueLazyLoad).use(store).use(router).use(ElementPlus).mount("#app");
