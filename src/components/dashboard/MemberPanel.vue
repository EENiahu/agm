<template>
  <v-row class="align-center mb-4 px-6" no-gutters>
    <v-col cols="2">
      <div>{{ user.fullName }}</div>
    </v-col>

    <v-col cols="4">
      <div>{{ user.email }}</div>
    </v-col>

    <v-col cols="2">
      <div>{{ isPropertyManager ? 'Member' : 'Owner' }}</div>
    </v-col>

    <v-col cols="2">
      <div class="d-flex align-center">
        <div>{{ statuses[user.userStatus] }}</div>
        <v-btn v-if="isPendingStatus && !resendInviteBtn.sent" @click="resendInvite" color="orange darken-2" :loading="resendInviteBtn.loading" plain rounded class="mx-2 px-2 text-capitalize">(Resend Invite)</v-btn>
      </div>
    </v-col>

    <v-col>
      <div class="d-flex justify-end align-center">
        <router-link :to="`/dashboard/account-members/edit/${user.id}`" class="mr-4">
          <v-btn icon color="orange darken-2"><v-icon>mdi-square-edit-outline</v-icon></v-btn>
        </router-link>

        <v-menu
            v-model="menu"
            :close-on-content-click="false"
            offset-y
            :nudge-bottom="8"
            :offset-overflow="true"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-on="on" v-bind="attrs" type="button" icon color="red darken-2" depressed rounded>
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              Are you sure?
            </v-card-title>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn type="button" class="px-5" color="blue-grey darken-4 white--text" outlined depressed rounded @click="menu = false">
                No
              </v-btn>
              <v-btn
                  :loading="loading"
                  rounded
                  class="px-5"
                  color="red"
                  text
                  type="button"
                  @click="removeMember"
              >
                Remove
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </v-col>
  </v-row>
</template>

<script>
  import apiPropertyManagers from "@/api/propertyManagers";
  import mixinForm from "@/mixins/form";

  export default {
    name: "MemberPanel",
    mixins: [mixinForm],
    props: {
      user: {
        type: Object,
        required: true
      }
    },

    data() {
      return {
        statuses: {
          "-1": "Blocked",
          "0": "Pending",
          "1": "Activated"
        },

        resendInviteBtn: {
          loading: false,
          sent: false,
        },

        menu: false,
      }
    },

    computed: {
      isPropertyManager() {
        return this.user.role.id === 3;
      },

      isPendingStatus() {
        return this.user.userStatus === 0;
      }
    },

    methods: {
      removeMember() {
        if (this.disabled) return;
        this.deactivateSubmit();

        //to remove manager we should not send PropertyIds
        const memberParams = {
          OrganizationId: this.user.organization.id,
          UserIds: [this.user.id],
        };

        apiPropertyManagers.cancelInvite(memberParams)
          .then(res => {
            this.menu = false;
            this.$emit('remove-member', this.user.id);
            this.handleSuccess('Member Has Been Removed');
          })
          .catch(err => this.handleErrors(err))
      },

      resendInvite() {
        const memberParams = {
          OrganizationId: this.user.organization.id,
          PropertyId: this.user.properties.map(property => property.id),
          UserIds: this.user.id,
        };

        this.resendInviteBtn.loading = true;

        apiPropertyManagers.inviteManagers(memberParams)
            .then(res => {
              this.handleSuccess();
              this.resendInviteBtn.sent = true;
            })
            .catch(err => this.handleErrors(err))
      },
    }
  }
</script>
