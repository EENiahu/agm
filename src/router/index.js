import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/Auth.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
    //Guest
  {
    path: '/',
    component: () => import('../views/Auth.vue'),
    children: [
      {
        path: 'login',
        component: () => import('../components/LoginForm.vue')
      },
      {
        path: 'register',
        component: () => import('../components/RegisterForm.vue')
      },
      {
        path: 'reset-password',
        component: () => import('../components/ResetPasswordForm.vue')
      },
      {
        path: '',
        component: () => import('../components/LoginForm.vue')
      },
      {
        path: '*',
        component: () => import('../components/LoginForm.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (false) { //isAuthenticated
      next({ name: 'Dashboard' });
    }
    else {
      next({ path: '/' });
    }
  }
  else {
    next();
  }
})

export default router
