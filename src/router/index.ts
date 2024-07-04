import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/CardList.vue'; // Adjust the path based on your actual structure

const routes = [
  { path: '/', component: Home },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
