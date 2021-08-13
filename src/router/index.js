import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

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
        component: () => import('../views/pages/account_members/AccountMembersShowPage.vue')
      },
      {
        path: '/dashboard/account-members/create',
        component: () => import('../views/pages/account_members/AccountMembersCreatePage.vue')
      },
      {
        path: '/dashboard/account-members/edit/:id',
        component: () => import('../views/pages/account_members/AccountMembersEditPage.vue')
      },
      {
        path: '/dashboard/properties',
        component: () => import('../views/pages/properties/PropertiesShowPage.vue')
      },
      {
        path: '/dashboard/properties-create',
        component: () => import('../views/pages/properties/PropertiesCreatePage.vue')
      },
      {
        path: '/dashboard/properties-edit/:id',
        component: () => import('../views/pages/properties/PropertiesEditPage.vue')
      },
      {
        path: '/dashboard/meetings-create',
        component: () => import('../views/pages/meetings/MeetingsCreatePage.vue')
      },
      {
        path: '/dashboard/meetings-edit/:id',
        component: () => import('../views/pages/meetings/MeetingsEditPage.vue')
      },
      {
        path: '',
        component: () => import('../views/pages/meetings/MeetingsShowPage.vue')
      },
      {
        path: '*',
        component: () => import('../views/pages/meetings/MeetingsShowPage.vue')
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
