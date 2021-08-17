<template>
  <form @submit.prevent="sendSave" :action="formAction" method="POST">
    <v-row class="mb-6">
      <v-col cols="6">
        <h1>UPDATE PROPERTY MANAGER</h1>
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
    name: "AccountMembersEditPage",
    mixins: [mixinForm],
    data () {
      return {
        formAction: apiUsers.getRoutes().post.create,

        properties: [],
        member: {},

        OrganizationId: this.$store.getters["auth/user"].organization.id,
        MemberId: this.$route.params.id,

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
      this.getMember();
    },

    methods: {
      sendSave() {
        if (this.disabled) return;
        this.deactivateSubmit();

        const userParams = {
          FullName: this.inputs.FullName,
          Email: this.inputs.Email,
          Title: this.inputs.Title,
          UserRoleId: this.member.role.id,
          UserStatusId: this.member.userStatus
        };

        apiUsers.updateById(this.MemberId, userParams)
          .then(res => {
            //send invite to new property if user sets new one
            let memberPropertiesId = this.member.properties.map(x => x.id);
            let added = this.inputs.PropertyIds.filter(x => memberPropertiesId.indexOf(x) < 0);
            let removed = memberPropertiesId.filter(x => this.inputs.PropertyIds.indexOf(x) < 0);

            if (added.length) {
              const managerParams = {
                OrganizationId: this.OrganizationId,
                PropertyIds: added,
                UserIds: [this.MemberId],
              };

              apiPropertyManagers.inviteManagers(managerParams)
                .then(res => {
                  this.handleSuccess('Member Has Been Updated');
                  this.$router.push({path: '/dashboard/account-members'});
                })
                .catch(err => this.handleErrors(err))
            }

            if (removed.length) {
              const managerParams = {
                OrganizationId: this.OrganizationId,
                PropertyIds: removed,
                UserIds: [this.MemberId],
              };

              apiPropertyManagers.cancelInvite(managerParams)
                .then(res => {
                  this.handleSuccess('Member Has Been Updated');
                  this.$router.push({path: '/dashboard/account-members'});
                })
                .catch(err => this.handleErrors(err))
            }

            if (!added.length && !removed.length) {
              this.handleSuccess('Member Has Been Updated');
              this.$router.push({path: '/dashboard/account-members'});
            }
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

      getMember() {
        apiUsers.getOne(this.MemberId, 'properties')
          .then(res => {
            this.member = res.data;
            this.setMemberInputs();
          })
          .catch(err => {
            console.error(err);
          })
      },

      setMemberInputs() {
        this.inputs = {
          FullName: this.member.fullName,
          Email: this.member.email,
          Title: this.member.title,
          PropertyIds: this.member.properties.map(property => property.id)
        }
      },
    }
  }
</script>
