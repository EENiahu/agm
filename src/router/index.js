import Vue from 'vue';
import VueRouter from 'vue-router'
import Auth from '../views/Auth.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    beforeEnter: ((to, from, next) => {
      if (store.getters['auth/isAuthorized'] && store.getters['auth/isVerified']) {
        next();
      } else {
        next({path: '/'});
      }
    }),
    children: [
      {
        path: '/dashboard/profile',
        component: () => import('../views/pages/ProfilePage.vue')
      },
      {
        path: '/dashboard/account-members',
        component: () => import('../views/pages/AccountMembers.vue')
      },
      {
        path: '/dashboard/invite-property-manager',
        component: () => import('../views/pages/InvitePropertyManager.vue')
      },
      {
        path: '',
        component: () => import('../views/pages/ProfilePage.vue')
      },
      {
        path: '*',
        component: () => import('../views/pages/ProfilePage.vue')
      },
    ]
  },
  //Guest
  {
    path: '/',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
    beforeEnter: ((to, from, next) => {
      if (store.getters['auth/isAuthorized'] && store.getters['auth/isVerified']) {
        next({path: '/dashboard/profile'});
      } else {
        next();
      }
    }),
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
        path: 'forgot-password',
        component: () => import('../components/ForgotPasswordForm.vue')
      },
      {
        path: 'reset-password',
        component: () => import('../components/ResetPasswordForm.vue'),
        beforeEnter: ((to, from, next) => {
          if (to.query.token) {
            next();
          } else {
            next({path: '/'});
          }
        })
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
