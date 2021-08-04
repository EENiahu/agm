<template>
  <v-app>
    <v-app-bar app clipped-left class="white">
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

    <v-navigation-drawer
        app
        clipped
        left
        color="blue-grey darken-4"
    >
      <v-list nav>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-title class="grey--text text--lighten-4 text-uppercase">Dashboard</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title class="grey--text text--lighten-4 text-uppercase">Host a meeting</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title class="grey--text text--lighten-4 text-uppercase">
              <router-link to="/dashboard/properties" class="white--text">Properties</router-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title class="grey--text text--lighten-4 text-uppercase">My account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="pa-12">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import vuetify from '@/plugins/vuetify';

  export default {
    vuetify,
    data() {
      return {
        name: this.$store.getters["auth/user"].fullName.split(' ')[0]
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
