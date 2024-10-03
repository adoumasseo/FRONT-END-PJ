import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';
import AdminDashboard from '@/pages/AdminDashboard.vue';
import Login from '@/pages/Login.vue';
import Register from '@/pages/Register.vue';
import UserDashboard from '@/pages/UserDashboard.vue';


const routes = [

  {
    path: '/admin',
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: `/dashboard/users`,
    component: UserDashboard,
    meta: { requiresAuth: true }
  },

  { path: '/login', component: Login },
  { path: '/register', component: Register },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('auth_token');
  const isAdmin = localStorage.getItem('user_role') === 'admin';

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next('/dashboard/users');
  } else {
    next();
  }
});

export default router;
