<template>
  <form @submit.prevent="sendSave" :action="formAction" method="PUT">
    <v-row class="mb-6">
      <v-col cols="6">
        <h1>YOUR PROFILE</h1>
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
                @input="handleInput('FullName')"
                :error-messages="errors.get('FullName')"
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
                @input="handleInput('Email')"
                :error-messages="errors.get('Email')"
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
                @input="handleInput('Phone')"
                :error-messages="errors.get('Phone')"
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
                @input="handleInput('Title')"
                :error-messages="errors.get('Title')"
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
                @input="handleInput('Password')"
                :error-messages="errors.get('Password')"
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
                @input="handleInput('ConfirmPassword')"
                :error-messages="errors.get('ConfirmPassword')"
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
  </form>
</template>

<script>
  import mixinForm from "@/mixins/form";
  import ProfilesEditPageSkeleton from "@/views/pages/profiles/loaders/ProfilesEditPageSkeleton";
  import apiUsers from "@/api/users";
  import apiOrganizations from "@/api/organizations";
  import apiStates from "@/api/states";

  export default {
    name: "CondoOwnerProfileEditPage",
    mixins: [mixinForm],
    components: {
      ProfilesEditPageSkeleton
    },
    data () {
      return {
        skeletonLoader: true,
        formAction: apiUsers.getRoutes().put.updateById.replace('{id}', this.$store.getters["auth/user"].id),

        organization: {},
        states: [],

        UserId: this.$store.getters["auth/user"].id,
        UserRoleId: this.$store.getters["auth/user"].role.id,
        UserStatusId: this.$store.getters["auth/user"].userStatus,

        inputs: {
          user: {
            FullName: this.$store.getters["auth/user"].fullName,
            Email: this.$store.getters["auth/user"].email,
            Phone: this.$store.getters["auth/user"].phone,
            Title: this.$store.getters["auth/user"].title || '',
          },

          organization: {
            OrganizationName: '',
            FirstAddress: '',
            SecondAddress: '',
            Country: '',
            City: '',
            PostalCode: '',
            StateId: '',
          },

          auth: {
            Password: '',
            ConfirmPassword: '',
          }
        },
      }
    },

    created() {
      this.getStates();
      this.getOrganization();
    },

    methods: {
      sendSave() {
        if (this.disabled) return;
        this.deactivateSubmit();

        const changedPassword = this.inputs.auth.Password && this.inputs.auth.ConfirmPassword;
        const userParams = {
          ...this.inputs.user,
          ...(changedPassword ? this.inputs.auth : {}),
          UserRoleId: this.UserRoleId,
          UserStatusId: this.UserStatusId
        };
        const organizationParams = {...this.inputs.organization, UserId: this.UserId};
        const hasOrganization = this.$store.getters["auth/user"].organization;

        (hasOrganization ? apiOrganizations.update(this.organization.id, organizationParams) : apiOrganizations.create(organizationParams))
            .then(res => {
              apiUsers.updateById(this.UserId, userParams)
                  .then(res => {
                    this.handleSuccess('Profile Has Been Updated');

                    if (changedPassword) {
                      this.$store.dispatch('auth/remove_token');
                      this.$store.dispatch('auth/remove_user');
                      location.href = '/';
                    }
                    else {
                      this.$store.dispatch('auth/set_user', {user: res.data});
                    }
                  })
                  .catch(err => this.handleErrors(err))
            })
            .catch(err => this.handleErrors(err))
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

      getOrganization() {
        const hasOrganization = this.$store.getters["auth/user"].organization;
        if (!hasOrganization) {
          this.skeletonLoader = false;
          return;
        }

        apiOrganizations.getOne(this.$store.getters["auth/user"].organization.id)
            .then(res => {
              this.organization = res.data;
              this.setOrganizationInputs();
              this.skeletonLoader = false;
            })
            .catch(err => {
              console.error(err);
            })
      },

      setOrganizationInputs() {
        this.inputs.organization = {
          OrganizationName: this.organization.name,
          FirstAddress: this.organization.address.firstAddress,
          SecondAddress: this.organization.address.secondAddress,
          Country: this.organization.address.country,
          City: this.organization.address.city,
          PostalCode: this.organization.address.postalCode,
          StateId: this.organization.address.state.id,
        }
      },
    }
  }
</script>

