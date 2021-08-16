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
          <div class="d-flex align-center">
            <div>{{ statuses[user.userStatus] }}</div>
            <v-btn v-if="isPendingStatus(user) && !user.inviteSent" @click="resendInvite(user)" color="orange darken-2" :loading="user.loading" plain rounded class="px-2 text-capitalize">(Resend Invite)</v-btn>
          </div>
        </v-col>

        <v-col align="end">
          <router-link :to="`/dashboard/account-members/edit/${user.id}`">
            <v-btn icon color="orange darken-2"><v-icon>mdi-square-edit-outline</v-icon></v-btn>
          </router-link>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  import apiUsers from "@/api/users";
  import apiPropertyManagers from "@/api/propertyManagers";
  import mixinForm from "@/mixins/form";

  export default {
    name: "AccountMembersShowPage",
    mixins: [mixinForm],
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

      isPendingStatus(user) {
        return user.userStatus === 0;
      },

      resendInvite(user) {
        const memberParams = {
          OrganizationId: user.organization.id,
          PropertyId: user.properties.map(property => property.id),
          UserIds: user.id,
        };

        let member = this.users.filter(u => u.id === user.id)[0];

        member.loading = true;

        apiPropertyManagers.inviteManagers(memberParams)
          .then(res => {
            this.handleSuccess();
            member.inviteSent = true;
          })
          .catch(err => this.handleErrors(err))
      },

      getUsers() {
        apiUsers.getAll()
          .then(res => {
            this.users = res.data.map(u => {
              u.inviteSent = false;
              u.loading = false;
              return u;
            })
          })
          .catch(err => {
            console.error(err);
          })
      },
    }
  }
</script>
