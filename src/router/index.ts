import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Videos',
    component: () => import('../views/Videos.vue')
  },
  {
    path: '/tracks',
    name: 'Tracks',
    component: () => import('../views/Tracks.vue')
  },
  {
    path: '/covers',
    name: 'Covers',
    component: () => import('../views/Covers.vue')
  },
];

const router = new VueRouter({
  routes
});

export default router;