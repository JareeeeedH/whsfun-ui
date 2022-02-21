import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// lazyLoad
import VueLazyLoad from 'vue3-lazyload'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

createApp(App).use(VueLazyLoad).use(store).use(router).mount('#app');
