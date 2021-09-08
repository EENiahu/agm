<template>
  <div>
    <v-row class="mb-10">
      <v-col cols="6">
        <h1>ACCOUNT MEMBERS</h1>
      </v-col>

      <v-col cols="6" align="end">
        <router-link :to="{name: 'accountMembersCreate'}">
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

      <member-panel v-for="(user, index) in users" :user="user" @remove-member="removeMember"></member-panel>
    </div>
  </div>
</template>

<script>
  import apiUsers from "@/api/users";
  import mixinForm from "@/mixins/form";
  import MemberPanel from '@/components/dashboard/MemberPanel.vue';

  export default {
    name: "AccountMembersShowPage",
    mixins: [mixinForm],
    components: {
      MemberPanel
    },
    data() {
      return {
        users: []
      }
    },

    created() {
      this.getUsers();
    },

    methods: {
      removeMember(id) {
        this.removeObjectById(this.users, id);
      },

      removeObjectById(arr, id) {
        let index = null;

        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === id) index = i;
        }

        if (index != null) arr.splice(index, 1);
      },

      getUsers() {
        const params = 'userRoles=2&userRoles=3';

        apiUsers.getAll(params)
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
