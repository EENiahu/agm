<template>
  <form action="">
    <v-row>
      <v-col cols="6">
        <h1>YOUR PROFILE / MEMBER</h1>
      </v-col>

      <v-col cols="6" align="end">
        <v-btn
            class="px-10"
            color="orange darken-2 white--text"
            depressed
            rounded
        >Save</v-btn>
      </v-col>
    </v-row>

    <div class="mb-12">
      <v-row>
        <v-col cols="4">
          <v-text-field
              color="orange"
              label="Name"
              hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-text-field
              name="Email"
              type="email"
              color="orange"
              label="Email"
              hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-text-field
              color="orange"
              label="Title"
              hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>

    <div>
      <v-row>
        <v-col cols="6">
          <h4>Change you password</h4>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-text-field
              name="Password"
              type="password"
              color="orange"
              label="Password"
              hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-text-field
              name="ConfirmPassword"
              type="password"
              color="orange"
              label="Re-Enter Password"
              hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
  </form>
</template>

<script>
  export default {
    name: "ProfilePage"
  }
</script>
