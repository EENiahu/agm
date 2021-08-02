<template>
  <form action="">
    <v-row class="mb-6">
      <v-col cols="6">
        <h1>ADD PROPERTY MANAGER</h1>
      </v-col>

      <v-col cols="6" align="end">
        <v-btn
            class="px-10"
            color="orange darken-2 white--text"
            depressed
            rounded
        >Invite</v-btn>
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
              label="Property Manager"
              hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>

    <div>
      <v-row class="mb-6">
        <v-col cols="6">
          <h1>PROPERTIES MANAGED</h1>
        </v-col>
      </v-row>

      <div>
        <v-row>
          <v-col cols="4">
            <v-text-field
                color="orange"
                label="Property Management Company"
                hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
    </div>
  </form>
</template>

<script>
  export default {
    name: "AddPropertyManager"
  }
</script>
