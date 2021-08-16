<template>
  <form @submit.prevent="sendInvite" :action="formAction" method="POST">
    <v-row class="mb-6">
      <v-col cols="6">
        <h1>ADD PROPERTY MANAGER</h1>
      </v-col>

      <v-col cols="6" align="end">
        <v-btn
            type="submit"
            :loading="loading"
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

      <v-row>
        <v-col cols="4">
          <v-text-field
              @input="handleInput('Email')"
              :error-messages="errors.get('Email')"
              v-model="inputs.Email"
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
              @input="handleInput('Title')"
              :error-messages="errors.get('Title')"
              v-model="inputs.Title"
              name="Title"
              color="orange"
              label="Title"
              hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>

    <div>
      <v-row class="mb-6" align="center">
        <v-col cols="6">
          <h1>PROPERTIES MANAGED</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-row align="baseline" class="mb-6">
            <v-col cols="12">
              <v-autocomplete
                  v-model="inputs.PropertyIds"
                  :items="properties"
                  item-text="name"
                  item-value="id"
                  label="Properties"
                  placeholder="Properties"
                  color="orange"
                  chips
                  deletable-chips
                  hide-selected
                  multiple
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </form>
</template>

<script>
  import mixinForm from "@/mixins/form";
  import apiProperties from "@/api/properties";
  import apiUsers from "@/api/users";
  import apiPropertyManagers from "@/api/propertyManagers";

  export default {
    name: "AccountMembersCreatePage",
    mixins: [mixinForm],
    data () {
      return {
        formAction: apiUsers.getRoutes().post.create,

        properties: [],

        OrganizationId: this.$store.getters["auth/user"].organization.id,

        inputs: {
          FullName: '',
          Email: '',
          Title: '',
          PropertyIds: [],
        },
      }
    },

    created() {
      this.getProperties();
    },

    methods: {
      sendInvite() {
        if (this.disabled) return;
        this.deactivateSubmit();

        const userParams = {
          ...this.inputs,
          UserRoleId: 3, //PropertyManager
          UserStatusId: 0, //Pending
          OrganizationId: this.OrganizationId,
        };

        apiUsers.create(userParams)
          .then(res => {
            const managerParams = {
              OrganizationId: this.OrganizationId,
              PropertyIds: this.inputs.PropertyIds,
              UserIds: [res.data.id],
            };

            apiPropertyManagers.inviteManagers(managerParams)
              .then(res => {
                this.handleSuccess('Member Has Been Created');
                this.$router.push({path: '/dashboard/account-members'});
              })
              .catch(err => this.handleErrors(err))
          })
          .catch(err => this.handleErrors(err))
      },

      getProperties() {
        apiProperties.getAll()
            .then(res => {
              this.properties = res.data;
            })
            .catch(err => {
              console.error(err);
            })
      },
    }
  }
</script>
