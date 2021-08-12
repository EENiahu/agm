<template>
  <form @submit.prevent="sendSave" :action="formAction" method="POST">
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
          <v-select
              @change="handleInput('UserRoleId')"
              :error-messages="errors.get('UserRoleId')"
              v-model="inputs.UserRoleId"
              name="UserRoleId"
              hide-details="auto"
              :items="userRoles"
              item-text="name"
              item-value="id"
              color="orange"
              label="Role"
          ></v-select>
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
  import apiStates from "@/api/states";
  import apiProperties from "@/api/properties";
  import mixinForm from "@/mixins/form";

  export default {
    name: "PropertyManagersCreatePage",
    mixins: [mixinForm],
    data () {
      return {
        formAction: apiProperties.getRoutes().post.create,

        properties: [
          {
            name: 'FirstProperty',
            id: 1
          },
          {
            name: 'SecondProperty',
            id: 2
          },
          {
            name: 'ThirdProperty',
            id: 3
          },
        ],

        userRoles: [
          {
            name: 'FirstRole',
            id: 1
          },
          {
            name: 'SecondRole',
            id: 2
          },
          {
            name: 'ThirdRole',
            id: 3
          },
        ],

        OrganizationId: this.$store.getters["auth/user"].organization.id,

        inputs: {
          FullName: '',
          Email: '',
          UserRoleId: '',
          PropertyIds: [],
        },
      }
    },

    computed: {
      unitsByQuorum() {
        return this.inputs.property.TotalUnits ? `${Math.floor(this.inputs.property.TotalUnits/4)}` : '';
      }
    },

    created() {
      this.getStates();
    },

    methods: {
      handleManagerAdd(user) {
        this.dialogs.propertyManagerAddDialog = false;
        this.tempPropertyManager = user;
        this.dialogs.propertyManagerAddSuccessDialog = true;
      },

      sendSave(e) {
        if (this.disabled) return;
        this.deactivateSubmit();

        const propertyParams = {...this.inputs.property, OrganizationId: this.OrganizationId};

        apiProperties.create(propertyParams)
          .then(res => {
            this.activateSubmit();
            this.$router.push({path: '/dashboard/properties'});
          })
          .catch(err => {
            this.activateSubmit();
            this.handleErrors(err);
          })
      },

      getStates() {
        apiStates.getAll()
          .then(res => {
            this.states = res.data;
          })
          .catch(err => {
            console.error(err);
          })
      },
    }
  }
</script>
