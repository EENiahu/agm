import Vue from 'vue';
import VueRouter from 'vue-router'
import Auth from '../views/Auth.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    beforeEnter: ((to, from, next) => {
      if (store.getters['auth/isAuthorized'] && store.getters['auth/isVerified']) {
        next();
      } else {
        next({path: '/'});
      }
    })
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
        path: 'activate',
        component: () => import('../components/ActiveAccountForm.vue'),
        beforeEnter: ((to, from, next) => {
          if (store.getters['auth/isAuthorized'] && !store.getters['auth/isVerified']) {
            next();
          } else {
            next({path: '/'});
          }
        })
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
