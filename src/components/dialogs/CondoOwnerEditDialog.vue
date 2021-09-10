<template>
  <v-dialog @click:outside="emitClose" v-model="open" width="500">
    <v-card>
      <v-card-title class="mb-6 text-h5 orange--text text--darken-2 justify-center text-center text-break">Update Condo Owner</v-card-title>

      <v-card-text>
        <form @submit.prevent="sendUpdate" :action="formAction" method="POST">
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
                  readonly
                  disabled
                  title="Email can`t be changed"
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
                  item-text="title"
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
              >Update Condo Owner</v-btn>
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
  import condoOwnerTypeEnum from '@/entities/condo_owners/condoOwnerTypeEnum';

  export default {
    name: "CondoOwnerEditDialog",
    mixins: [mixinForm, mixinDialog],
    props: {
      'propertyId': {
        type: [String, Number],
        required: true
      },

      'owner': {
        type: Object,
        required: true
      }
    },

    data() {
      return {
        formAction: apiUsers.getRoutes().post.create,

        ownerStatuses: condoOwnerTypeEnum,
        inputs: {
          FullName: '',
          Email: '',
          Unit: '',
          OwnerStatus: ''
        }
      }
    },

    watch: {
      open() {
        this.open ? this.setInputs() : this.clearInputs();
      }
    },

    methods: {
      sendUpdate() {
        if (this.disabled) return;
        this.deactivateSubmit();

        const userParams = {
          ...this.inputs,
          UserRoleId: 4, //CondoOwner
          UserStatusId: 0, //Pending
          PropertyId: this.propertyId,
          IsOffsiteOwner: this.inputs.OwnerStatus == 1
        };

        apiUsers.updateById(this.owner.id, userParams)
            .then(res => {
              this.handleSuccess('Condo Owner Has Been Update');
              this.$emit('update-success', res.data);
            })
            .catch(err => this.handleErrors(err))
      },

      setInputs() {
        this.inputs.FullName = this.owner.fullName || '';
        this.inputs.Email = this.owner.email || '';
        this.inputs.Unit = this.owner.unit || '';
        this.inputs.OwnerStatus = this.owner.isOffsiteOwner ? 1 : 2;
      },

      clearInputs() {
        this.inputs = {
          FullName: '',
          Email: '',
          Unit: '',
          OwnerStatus: ''
        };
      }
    }
  }
</script>
