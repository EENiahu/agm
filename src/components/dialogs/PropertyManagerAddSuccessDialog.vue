<template>
  <v-dialog @click:outside="emitClose" v-model="open" width="500">
    <v-card>
      <v-card-title class="mb-6 text-h5 orange--text text--darken-2 justify-center text-center text-break">Invite Sent Successfully!</v-card-title>

      <v-card-text>
          <div class="text-center mb-6">
            <p>An invitation to join AGM Online has been sent to <strong>[email@emial.con]</strong>.</p>
            <p class="mb-0">Did you enter the correct email?</p>
            <p class="mb-0">If not, you can enter the correct email address below and re-send the invite.</p>
          </div>

        <form action="">
          <v-row justify="center" class="mb-6">
            <v-col cols="10">
              <v-text-field
                  @input="handleInput('Email')"
                  :error-messages="errors.get('Email')"
                  v-model="inputs.Email"
                  name="Email"
                  color="orange"
                  label="Email"
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
              >Save & Continue</v-btn>
            </v-col>
          </v-row>

          <v-row justify="center" class="text-center mt-0">
            <v-col cols="10">
              <v-btn
                  text
                  type="submit"
                  :loading="loading"
                  class="px-5"
                  color="blue-grey darken-4 white--text"
                  depressed
                  rounded
              >Re-Send Invite</v-btn>
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
  import mixinDialog from "@/mixins/dialog";

  export default {
    name: "PropertyManagerAddSuccessDialog",
    mixins: [mixinForm, mixinDialog],

    data() {
      return {
        ownerStatuses: [],
        inputs: {
          Email: '',
        }
      }
    },
  }
</script>
