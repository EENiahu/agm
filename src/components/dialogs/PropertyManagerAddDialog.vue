<template>
  <v-dialog v-model="open" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">Click Me</v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 orange--text text--darken-2 justify-center">Privacy Policy</v-card-title>

      <v-card-text>
        <div class="text-center">
          An email will be sent to this new member to join AGM Online.
        </div>

        <form action="">
          <v-row justify="center">
            <v-col cols="10">
              <v-text-field
                  @input="handleInput('Name')"
                  :error-messages="errors.get('Name')"
                  v-model="inputs.Name"
                  name="Name"
                  color="orange"
                  label="Full Name"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="10">
              <v-text-field
                  @input="handleInput('Email')"
                  :error-messages="errors.get('Email')"
                  v-model="inputs.Email"
                  name="Name"
                  color="orange"
                  label="Property Title"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="10">
              <v-text-field
                  @input="handleInput('Title')"
                  :error-messages="errors.get('Title')"
                  v-model="inputs.Title"
                  name="Name"
                  color="orange"
                  label="Property Title"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center" class="text-center">
            <v-col cols="10">
              <v-btn
                  type="submit"
                  :loading="loading"
                  class="px-10"
                  color="blue-grey darken-4 white--text"
                  depressed
                  rounded
              >Send Invite</v-btn>
            </v-col>
          </v-row>
        </form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey darken-4" rounded text @click="emitClose">close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import mixinForm from "@/mixins/form";

  export default {
    name: "PropertyManagerAddDialog",
    mixins: [mixinForm],
    props: {
      open: {
        type: Boolean,
        required: true
      }
    },

    data() {
      return {
        inputs: {
          Name: '',
          Email: '',
          Title: ''
        }
      }
    },

    methods: {
      emitClose() {
        this.$emit("close-dialog");
      }
    }
  }
</script>
