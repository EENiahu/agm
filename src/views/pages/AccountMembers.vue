<template>
  <div>
    <v-row class="mb-10">
      <v-col cols="6">
        <h1>ACCOUNT MEMBERS</h1>
      </v-col>

      <v-col cols="6" align="end">
        <router-link to="/dashboard/account-members/create">
          <v-btn
              class="px-10"
              color="orange darken-2 white--text"
              depressed
              rounded
          >Add User</v-btn>
        </router-link>
      </v-col>
    </v-row>

    <div>
      <v-row style="border-bottom: 2px solid black;" class="mb-4 pb-4 px-6" no-gutters>
        <v-col cols="2">
          <div class="font-weight-bold">FULL NAME</div>
        </v-col>

        <v-col cols="4">
          <div class="font-weight-bold">EMAIL</div>
        </v-col>

        <v-col cols="2">
          <div class="font-weight-bold">ROLE</div>
        </v-col>

        <v-col cols="2">
          <div class="font-weight-bold">STATUS</div>
        </v-col>
      </v-row>

      <v-row class="align-center mb-4 px-6" no-gutters>
        <v-col cols="2">
          <div>Amela Unsworth</div>
        </v-col>

        <v-col cols="4">
          <div>amela@synchroworks.net</div>
        </v-col>

        <v-col cols="2">
          <div>Owner</div>
        </v-col>

        <v-col cols="2">
          <div>Owner</div>
        </v-col>

        <v-col align="end">
          <v-btn
              icon
              color="orange darken-2"
          >
            <v-icon>mdi-square-edit-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row v-for="(user, index) in users" class="align-center mb-4 px-6" no-gutters>
        <v-col cols="2">
          <div>{{ user.fullName }}</div>
        </v-col>

        <v-col cols="4">
          <div>{{ user.email }}</div>
        </v-col>

        <v-col cols="2">
          <div>{{ isPropertyManager(user) ? 'Member' : 'Owner' }}</div>
        </v-col>

        <v-col cols="2">
          <div>{{ statuses[user.userStatus] }}
            <v-btn @click="resendInvite" color="orange darken-2" plain rounded class="px-2 text-capitalize">(Resend Invite)</v-btn>
          </div>
        </v-col>

        <v-col align="end">
          <v-btn
              icon
              color="orange darken-2"
          >
            <v-icon>mdi-square-edit-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  import apiUsers from "@/api/users";

  export default {
    name: "AccountMembers",
    data() {
      return {
        statuses: {
          "-1": "Blocked",
          "0": "Pending",
          "1": "Activated"
        },
        users: []
      }
    },

    created() {
      this.getUsers();
    },

    methods: {
      isPropertyManager(user) {
        return user.role.id === 3;
      },

      resendInvite() {

      },

      getUsers() {
        apiUsers.getAll()
          .then(res => {
            this.users = res.data;
          })
          .catch(err => {
            console.error(err);
          })
      },
    }
  }
</script>
