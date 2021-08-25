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
        meta: {title: 'Your Profile'},
        component: () => import('../views/pages/profiles/ProfilesEditPage.vue')
        // component: () => import('../views/pages/profiles/loaders/ProfilesEditPageSkeleton.vue')
      },
      {
        path: '/dashboard/account-members',
        meta: {title: 'Members Dashboard'},
        component: () => import('../views/pages/account_members/AccountMembersShowPage.vue')
      },
      {
        path: '/dashboard/account-members/create',
        meta: {title: 'Create Member'},
        component: () => import('../views/pages/account_members/AccountMembersCreatePage.vue')
      },
      {
        path: '/dashboard/account-members/edit/:id',
        meta: {title: 'Edit Member'},
        component: () => import('../views/pages/account_members/AccountMembersEditPage.vue')
      },
      {
        path: '/dashboard/properties',
        meta: {title: 'Properties Dashboard'},
        component: () => import('../views/pages/properties/PropertiesShowPage.vue')
      },
      {
        path: '/dashboard/properties-create',
        meta: {title: 'Create Property'},
        component: () => import('../views/pages/properties/PropertiesCreatePage.vue')
      },
      {
        path: '/dashboard/properties-edit/:id',
        meta: {title: 'Update Property'},
        component: () => import('../views/pages/properties/PropertiesEditPage.vue')
      },
      {
        path: '/dashboard/meetings-create',
        meta: {title: 'Create Meeting'},
        component: () => import('../views/pages/meetings/MeetingsCreatePage.vue')
      },
      {
        path: '/dashboard/meetings-edit/:id',
        name: 'meetingEdit',
        meta: {title: 'Update Meeting'},
        component: () => import('../views/pages/meetings/MeetingsEditPage.vue')
      },
      {
        path: '/dashboard/meetings-edit/:id/polls/create',
        name: 'pollsCreate',
        meta: {title: 'Create Poll'},
        component: () => import('../views/pages/polls/PollsCreatePage.vue')
      },
      {
        path: '/dashboard/meetings-edit/:id/polls/edit/:id',
        meta: {title: 'Edit Poll'},
        component: () => import('../views/pages/polls/PollsEditPage.vue')
      },
      {
        path: '/dashboard/condo-owners',
        meta: {title: 'Condo Owners Dashboard'},
        component: () => import('../views/pages/condo_owners/CondoOwnersShowPage.vue')
      },
      {
        path: '',
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
