<template>
  <v-app>
    <v-app-bar class="white">
      <div class="d-flex align-center">
        <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            :src="require('../assets/logo.png')"
            transition="scale-transition"
        />
      </div>

      <v-spacer></v-spacer>

      <div class="px-4 text-uppercase grey--text text--darken-1 font-weight-bold">
        Welcome Anne
      </div>

      <v-divider vertical inset class="orange"></v-divider>

      <v-btn @click="logout" plain>
        <span class="text-uppercase grey--text text--darken-4 font-weight-bold">log out</span>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
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
            <v-list-item-title class="grey--text text--lighten-4 text-uppercase">Properties</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title class="grey--text text--lighten-4 text-uppercase">My account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>

export default {
  data() {
    return {
    }
  },

  methods: {
    logout() {
      window.localStorage.removeItem('token');
      this.$router.push('/');
    }
  }
}
</script>
