<template>
  <v-dialog @click:outside="emitClose" v-model="open" width="500">
    <v-card>
      <v-card-title class="mb-6 text-h5 orange--text text--darken-2 justify-center text-center text-break">Invite a new member to manage this property</v-card-title>

      <v-card-text>
        <div class="text-center">
          An email will be sent to this new member to join AGM Online.
        </div>

        <form @submit.prevent="sendInvite" :action="formAction" method="POST">
          <v-row justify="center">
            <v-col cols="10">
              <v-text-field
                  @input="handleInput('FullName')"
                  :error-messages="errors.get('FullName')"
                  v-model="inputs.FullName"
                  name="FullName"
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
                  @input="handleInput('Title')"
                  :error-messages="errors.get('Title')"
                  v-model="inputs.Title"
                  name="Name"
                  color="orange"
                  label="Title"
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
        <v-btn color="blue-grey darken-4" class="px-5" rounded text @click="emitClose">close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import mixinForm from "@/mixins/form";
  import mixinDialog from "@/mixins/dialog";
  import apiUsers from "@/api/users";
  import apiPropertyManagers from "@/api/propertyManagers";

  export default {
    name: "PropertyManagerAddDialog",
    mixins: [mixinForm, mixinDialog],

    data() {
      return {
        formAction: apiUsers.getRoutes().post.create,

        inputs: {
          FullName: '',
          Email: '',
          Title: ''
        }
      }
    },

    methods: {
      sendInvite() {
        if (this.disabled) return;
        this.deactivateSubmit();

        const userParams = {
          ...this.inputs,
          UserRoleId: 3, //PropertyManager
          UserStatusId: 0 //Pending
        };

        apiUsers.create(userParams)
          .then(res => {
            this.activateSubmit();
            this.$emit('add-success', res.data);
          })
          .catch(err => {
            this.activateSubmit();
            this.handleErrors(err);
          })
      }
    }
  }
</script>
