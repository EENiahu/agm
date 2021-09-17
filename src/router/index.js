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
        name: 'profileEdit',
        meta: {title: 'Your Profile'},
        component: () => import('../views/pages/profiles/ProfilesEditPage.vue')
      },
      {
        path: '/dashboard/account-members',
        name: 'accountMembersShow',
        meta: {title: 'Members Dashboard'},
        component: () => import('../views/pages/account_members/AccountMembersShowPage.vue')
      },
      {
        path: '/dashboard/account-members/create',
        name: 'accountMembersCreate',
        meta: {title: 'Create Member'},
        component: () => import('../views/pages/account_members/AccountMembersCreatePage.vue')
      },
      {
        path: '/dashboard/account-members/:id/edit',
        name: 'accountMembersEdit',
        meta: {title: 'Edit Member'},
        component: () => import('../views/pages/account_members/AccountMembersEditPage.vue')
      },
      {
        path: '/dashboard/properties',
        name: 'propertiesShow',
        meta: {title: 'Properties Dashboard'},
        component: () => import('../views/pages/properties/PropertiesShowPage.vue')
      },
      {
        path: '/dashboard/properties/create',
        name: 'propertiesCreate',
        meta: {title: 'Create Property'},
        component: () => import('../views/pages/properties/PropertiesCreatePage.vue')
      },
      {
        path: '/dashboard/properties/:id/edit',
        name: 'propertiesEdit',
        meta: {title: 'Update Property'},
        component: () => import('../views/pages/properties/PropertiesEditPage.vue')
      },
      {
        path: '/dashboard/properties/:id/condo-owners',
        name: 'condoOwnersShow',
        meta: {title: 'Condo Owners Dashboard'},
        component: () => import('../views/pages/condo_owners/CondoOwnersShowPage.vue')
      },
      {
        path: '/dashboard/meetings/create',
        name: 'meetingsCreate',
        meta: {title: 'Create Meeting'},
        component: () => import('../views/pages/meetings/MeetingsCreatePage.vue')
      },
      {
        path: '/dashboard/meetings/:meetingId/edit',
        name: 'meetingsEdit',
        meta: {title: 'Update Meeting'},
        component: () => import('../views/pages/meetings/MeetingsEditPage.vue')
      },
      {
        path: '/dashboard/meetings/:meetingId/polls/create',
        name: 'pollsCreate',
        meta: {title: 'Create Poll'},
        component: () => import('../views/pages/polls/PollsCreatePage.vue')
      },
      {
        path: '/dashboard/meetings/:meetingId/polls/:pollId/edit',
        name: 'pollsEdit',
        meta: {title: 'Edit Poll'},
        component: () => import('../views/pages/polls/PollsEditPage.vue')
      },
      {
        path: '',
        name: 'meetingsShow',
        meta: {title: 'Meetings Dashboard'},
        component: () => import('../views/pages/meetings/MeetingsShowPage.vue')
      },
      {
        path: '*',
        meta: {title: 'Meetings Dashboard'},
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
        meta: {title: 'Login'},
        component: () => import('../components/LoginForm.vue')
      },
      {
        path: 'register',
        meta: {title: 'Register'},
        component: () => import('../components/RegisterForm.vue')
      },
      {
        path: 'activate',
        meta: {title: 'Activate Account'},
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
        path: 'password-forgot',
        meta: {title: 'Forgot Password'},
        component: () => import('../components/ForgotPasswordForm.vue')
      },
      {
        path: 'password-reset',
        meta: {title: 'Reset Password'},
        component: () => import('../components/ResetPasswordForm.vue'),
        beforeEnter: ((to, from, next) => {
          if (to.query.resetToken) {
            next();
          } else {
            next({path: '/'});
          }
        })
      },
      {
        path: 'accept-invite',
        meta: {title: 'Accept Invite'},
        component: () => import('../components/AcceptInviteForm.vue'),
        beforeEnter: ((to, from, next) => {
          if (to.query.userEmail && to.query.organizationInviteId) {
            next();
          } else {
            next({path: '/'});
          }
        })
      },
      {
        path: '',
        meta: {title: 'Login'},
        component: () => import('../components/LoginForm.vue')
      },
      {
        path: '*',
        meta: {title: 'Login'},
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

router.afterEach((to, from) => {
  if (to.meta.title) document.title = to.meta.title
})

export default router
