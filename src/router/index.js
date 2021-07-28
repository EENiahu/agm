import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/Auth.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
    //Guest
  {
    path: '/',
    component: Auth,
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

export default router
