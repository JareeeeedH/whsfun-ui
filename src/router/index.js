import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Post from '../views/Post';
import Message from '../views/Message';

// 主要的評論搜尋頁面
import WhiskyView from '../views/WhiskyView';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/view',
    name: 'view',
    component: WhiskyView,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/post',
    name: 'Post',
    component: Post,
  },
  {
    path: '/message',
    name: 'Message',
    component: Message,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
