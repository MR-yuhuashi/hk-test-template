import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeModule from '../views/root/route';
import userCenterModule from '../views/user-center/route';

Vue.use(VueRouter);

const routes = [
  ...HomeModule,
  ...userCenterModule
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
