<template>
  <div>
    <v-row class="mb-10">
      <v-col cols="6">
        <h1>ACCOUNT MEMBERS</h1>
      </v-col>

      <v-col cols="6" align="end">
        <v-btn
            class="px-10"
            color="orange darken-2 white--text"
            depressed
            rounded
        >Add User</v-btn>
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

      <v-row class="align-center mb-4 px-6" no-gutters>
        <v-col cols="2">
          <div>Eduard</div>
        </v-col>

        <v-col cols="4">
          <div>eduard@synchroworks.net</div>
        </v-col>

        <v-col cols="2">
          <div>Member</div>
        </v-col>

        <v-col cols="2">
          <div>Pending <span class="orange--text text--darken-2">(Resend Invite)</span></div>
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
  export default {
    name: "AccountMembers"
  }
</script>
