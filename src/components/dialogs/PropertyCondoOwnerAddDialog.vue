<template>
  <v-dialog @click:outside="emitClose" v-model="open" width="500">
    <v-card>
      <v-card-title class="mb-6 text-h5 orange--text text--darken-2 justify-center text-center text-break">Add a New Condo Owner to this Property</v-card-title>

      <v-card-text>
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
                  name="Email"
                  color="orange"
                  label="Email"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="10">
              <v-text-field
                  @input="handleInput('Unit')"
                  :error-messages="errors.get('Unit')"
                  v-model="inputs.Unit"
                  name="Unit"
                  color="orange"
                  label="Unit"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="10">
              <v-select
                  @change="handleInput('OwnerStatus')"
                  :error-messages="errors.get('OwnerStatus')"
                  v-model="inputs.OwnerStatus"
                  name="OwnerStatus"
                  hide-details="auto"
                  :items="ownerStatuses"
                  item-text="name"
                  item-value="id"
                  color="orange"
                  item-color="orange"
                  label="Choose Owner Status"
              ></v-select>
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
              >Add Condo Owner</v-btn>
            </v-col>
          </v-row>
        </form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey darken-4" class="px-5" rounded text @click="emitClose">close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import mixinForm from "@/mixins/form";
  import mixinDialog from "@/mixins/dialog";

  export default {
    name: "PropertyCondoOwnerAddDialog",
    mixins: [mixinForm, mixinDialog],

    data() {
      return {
        ownerStatuses: [],
        inputs: {
          Name: '',
          Email: '',
          Unit: '',
          OwnerStatus: ''
        }
      }
    },
  }
</script>
