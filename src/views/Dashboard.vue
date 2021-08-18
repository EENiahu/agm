<template>
  <v-app>
    <v-app-bar app clipped-left class="white">
<!--      <v-progress-linear-->
<!--          fixed-->
<!--          top-->
<!--          color="orange darken-2"-->
<!--          rounded-->
<!--          value="40"-->
<!--      ></v-progress-linear>-->

      <router-link to="/dashboard" class="d-flex align-center">
        <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            :src="require('../assets/logo.png')"
            transition="scale-transition"
        />
      </router-link>

      <v-spacer></v-spacer>

      <div class="px-4 text-uppercase grey--text text--darken-1 font-weight-bold">
        Welcome {{ name }}
      </div>

      <v-divider vertical inset class="orange"></v-divider>

      <v-btn @click="logout" plain>
        <span class="text-uppercase grey--text text--darken-4 font-weight-bold">log out</span>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app clipped left color="blue-grey darken-4">
      <v-list nav>
        <v-list-item-group>
          <v-list-item v-for="(navLink, i) in navLinks" :key="i" :to="navLink.link">
            <v-list-item-title class="grey--text text--lighten-4 text-uppercase">{{ navLink.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="pa-12">
        <router-view></router-view>
      </v-container>
    </v-main>

    <AlertMessage/>
  </v-app>
</template>

<script>
  import vuetify from '@/plugins/vuetify';
  import AlertMessage from "@/components/dashboard/AlertMessage";

  export default {
    vuetify,
    components: {
      AlertMessage
    },
    data() {
      return {
        name: this.$store.getters["auth/user"].fullName.split(' ')[0],
        navLinks: [
          {
            title: 'Dashboard',
            link: '/dashboard'
          },

          {
            title: 'Properties',
            link: '/dashboard/properties'
          },

          {
            title: 'My account',
            link: '/dashboard/profile'
          },

          {
            title: 'Account Members',
            link: '/dashboard/account-members'
          },
        ]
      }
    },

    methods: {
      logout() {
        this.$store.dispatch('auth/remove_token');
        this.$store.dispatch('auth/remove_user');
        // this.$router.push('/');
        location.href = '/';
      }
    }
  }
</script>

<style lang="scss">
//Normalize
  a {
    text-decoration: none;
    color: inherit;
  }
</style>
