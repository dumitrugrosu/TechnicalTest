import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Detail from '../views/Detail.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/detail/:id', component: Detail, props: true }, // Dynamic route for detail view
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
