<template>
  <v-snackbar :value="show" tag="button" class="alert-message pa-0" elevation="2" content-class="pa-0" :timeout="alert.timeout" bottom>
    <v-alert @click="close" :type="type.name" :color="type.color" class="ma-0" border="bottom">
      {{ alert.title }}
    </v-alert>
  </v-snackbar>
</template>

<script>
  export default {
    name: "AlertMessage",
    data() {
      return {
        types: {
          error: {
            name: 'error',
            color: 'red darken-2'
          },

          warning: {
            name: 'warning',
            color: 'orange darken-2'
          },

          info: {
            name: 'info',
            color: 'blue darken-2'
          },

          success: {
            name: 'success',
            color: 'green darken-2'
          },
        }
      }
    },

    computed: {
      show() {
        return this.$store.getters["alerts/isVisible"];
      },

      alert() {
        return this.$store.state.alerts.alert;
      },

      type() {
        return this.types[this.alert.type] || this.types['error'];
      }
    },

    methods: {
      close() {
        this.$store.dispatch('alerts/hide_alert');
        setTimeout(() => { this.$store.dispatch('alerts/remove_alert') }, 1000);
      }
    }
  }
</script>

<style lang="scss">
  .alert-message {
    cursor: pointer;

    .v-snack__action {
      display: none;
    }
  }
</style>
