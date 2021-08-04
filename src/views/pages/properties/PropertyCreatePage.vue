<template>
  <form @submit.prevent="sendSave" :action="formAction" method="PUT">
    <v-row class="mb-6">
      <v-col cols="6">
        <h1>CREATE NEW PROPERTY</h1>
      </v-col>

      <v-col cols="6" align="end">
        <v-btn
            type="submit"
            :loading="loading"
            class="px-10"
            color="orange darken-2 white--text"
            depressed
            rounded
        >Save</v-btn>
      </v-col>
    </v-row>

    <div class="mb-12">
      <v-row>
        <v-col>
          <v-row>
            <v-col cols="8">
              <h3>Change profile details</h3>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-text-field
                  v-model="inputs.user.FullName"
                  color="orange"
                  label="Name"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-text-field
                  v-model="inputs.user.Email"
                  name="Email"
                  type="email"
                  color="orange"
                  label="Email"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-text-field
                  v-mask="'+1-###-###-####'"
                  v-model="inputs.user.Phone"
                  color="orange"
                  label="Work Telephone (optional)"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-text-field
                  v-model="inputs.user.Title"
                  color="orange"
                  label="Title"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>

        <v-col>
          <v-row>
            <v-col cols="8">
              <h3>Change your password</h3>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-text-field
                  v-model="inputs.auth.Password"
                  name="Password"
                  type="password"
                  color="orange"
                  label="Password"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-text-field
                  v-model="inputs.auth.ConfirmPassword"
                  name="ConfirmPassword"
                  type="password"
                  color="orange"
                  label="Re-Enter Password"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>

    <div>
      <v-row class="mb-6">
        <v-col cols="6">
          <h1>COMPANY PROFILE</h1>
        </v-col>
      </v-row>

      <div>
        <v-row>
          <v-col cols="4">
            <v-text-field
                v-model="inputs.organization.OrganizationName"
                color="orange"
                label="Property Management Company"
                hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <v-text-field
                v-model="inputs.organization.FirstAddress"
                name="FirstAddress"
                color="orange"
                label="Address 1"
                hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <v-text-field
                v-model="inputs.organization.SecondAddress"
                name="SecondAddress"
                color="orange"
                label="Address 2"
                hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <v-text-field
                v-model="inputs.organization.City"
                name="City"
                color="orange"
                label="City"
                hide-details="auto"
            ></v-text-field>
          </v-col>

          <v-col cols="2">
            <v-select
                v-model="inputs.organization.StateId"
                :items="states"
                item-text="name"
                item-value="id"
                color="orange"
                label="State"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <v-text-field
                v-model="inputs.organization.Country"
                name="Country"
                color="orange"
                label="Country"
                hide-details="auto"
            ></v-text-field>
          </v-col>

          <v-col cols="2">
            <v-text-field
                v-model="inputs.organization.PostalCode"
                name="Postal Code"
                color="orange"
                label="Postal Code"
                hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
    </div>
  </form>
</template>

<script>
import apiStates from "@/api/states";
import apiUsers from "@/api/users";
import apiOrganizations from "@/api/organizations";

export default {
  name: "PropertyCreatePage",
  data () {
    return {
      disabled: false,
      loading: false,
      formAction: apiUsers.getRoutes().put.updateById.replace('{id}', this.$store.getters["auth/user"].id),

      organization: {},
      states: [],

      UserId: this.$store.getters["auth/user"].id,
      UserRoleId: this.$store.getters["auth/user"].role.id,
      UserStatusId: this.$store.getters["auth/user"].userStatus,
      OrganizationId: this.$store.getters["auth/user"].organizations.id,

      inputs: {
        user: {
          FullName: this.$store.getters["auth/user"].fullName,
          Email: this.$store.getters["auth/user"].email,
          Phone: '',
          Title: '',
        },
      },
    }
  },

  created() {
    this.getStates();
    this.getOrganization();
  },

  methods: {
    deactivateSubmit() {
      this.disabled = true;
      this.loading = true;
    },

    activateSubmit() {
      this.disabled = false;
      this.loading = false;
    },

    sendSave() {

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
