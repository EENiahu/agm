<template>
  <div>
    <v-row class="mb-10">
      <v-col cols="6">
        <h1 class="text-uppercase">Condo Owners</h1>
      </v-col>

      <v-col cols="6" align="end">
        <v-btn
            @click="onButtonClick"
            type="button"
            class="px-10 mr-4"
            color="blue-grey darken-4 white--text"
            depressed
            rounded
        >Upload Owners</v-btn>

        <input ref="uploader" class="d-none" type="file" accept="text/csv" @change="onFileChanged">

        <v-btn
            @click="dialogs.condoOwnerAddDialog = true"
            type="button"
            class="px-10"
            color="orange darken-2 white--text"
            depressed
            rounded
        >Add New Owner</v-btn>
      </v-col>
    </v-row>

    <div>
      <v-row style="border-bottom: 2px solid black;" class="mb-4 pb-4 px-6" no-gutters>
        <v-col cols="4" class="d-flex align-center">
          <v-checkbox
              @change="selectAll"
              class="mt-0 mr-2 pa-0"
              v-model="inputs.allOwners"
              label=""
              color="orange darken-2"
              :value="true"
              hide-details
          ></v-checkbox>
          <div class="font-weight-bold">FULL NAME</div>
        </v-col>


        <v-col cols="3">
          <div class="font-weight-bold">EMAIL</div>
        </v-col>

        <v-col cols="2">
          <div class="font-weight-bold">UNIT</div>
        </v-col>

        <v-col cols="2">
          <div class="font-weight-bold">OWNER STATUS</div>
        </v-col>
      </v-row>

      <v-row  v-for="(owner, index) in owners" class="align-center mb-4 px-6" no-gutters>
        <v-col cols="4" class="d-flex align-center">
          <v-checkbox
              @change="selectOne"
              class="mt-0 mr-2 pa-0"
              v-model="inputs.owners"
              color="orange darken-2"
              :value="owner.id"
              hide-details
          ></v-checkbox>
          <div>{{ owner.fullName }}</div>
        </v-col>

        <v-col cols="3">
          <div class="text-truncate">{{ owner.email }}</div>
        </v-col>

        <v-col cols="2">
          <div class="d-flex align-center">
            <div>{{ owner.unit }}</div>
          </div>
        </v-col>

        <v-col cols="2">
          <div class="d-flex align-center">
            <div>{{ ownerStatuses[owner.isOffsiteOwner ? 0 : 1].title }}</div>
          </div>
        </v-col>
      </v-row>
    </div>

    <v-slide-y-reverse-transition>
      <v-toolbar v-if="inputs.owners.length" absolute bottom max-width="100%" width="100%" class="d-flex justify-center" style="left: 0;">
        <v-btn v-if="inputs.owners.length === 1" @click="dialogs.condoOwnerEditDialog = true" color="orange darken-2" class="mr-4" text rounded>
          <span class="mr-1">Edit</span>
          <v-icon>mdi-square-edit-outline</v-icon>
        </v-btn>

        <v-btn @click="removeOwners" type="button" color="red darken-2" class="" text rounded>
          <span class="mr-1">Remove</span>
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </v-toolbar>
    </v-slide-y-reverse-transition>

    <condo-owner-add-dialog :open="dialogs.condoOwnerAddDialog"
                            :property-id="PropertyId"
                            @add-success="handleCondoOwnerAddDialog"
                            @close-dialog="dialogs.condoOwnerAddDialog = false">
    </condo-owner-add-dialog>

    <condo-owner-edit-dialog :open="dialogs.condoOwnerEditDialog"
                             :property-id="PropertyId"
                             :owner="selectedOwner"
                             @add-success="handleCondoOwnerEditDialog"
                             @close-dialog="dialogs.condoOwnerEditDialog = false">
    </condo-owner-edit-dialog>
  </div>
</template>

<script>
  import mixinForm from "@/mixins/form";
  import MemberPanel from '@/components/dashboard/MemberPanel.vue';
  import CondoOwnerAddDialog from '@/components/dialogs/CondoOwnerAddDialog.vue';
  import CondoOwnerEditDialog from '@/components/dialogs/CondoOwnerEditDialog.vue';
  import apiUsers from "@/api/users";
  import apiCondoOwners from "@/api/condoOwners";
  import condoOwnerTypeEnum from '@/entities/condo_owners/condoOwnerTypeEnum';

  export default {
    name: "CondoOwnersShowPage",
    mixins: [mixinForm],
    components: {
      MemberPanel,
      CondoOwnerAddDialog,
      CondoOwnerEditDialog
    },

    data() {
      return {
        PropertyId: this.$route.params.id,
        ownerStatuses: condoOwnerTypeEnum,

        dialogs: {
          condoOwnerAddDialog: false,
          condoOwnerEditDialog: false
        },

        owners: [],

        inputs: {
          allOwners: null,
          owners: []
        }
      }
    },

    computed: {
      selectedOwner() {
        return this.owners.filter(o => o.id === this.inputs.owners[0])[0] || {};
      }
    },

    created() {
      this.getUsers();
    },

    methods: {
      onButtonClick() {
        this.$refs.uploader.click();
      },

      onFileChanged(e) {
        apiCondoOwners.uploadCondoOwners( {
          File: e.target.files[0],
          PropertyId: this.PropertyId
        })
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.error(err);
            })
      },

      handleCondoOwnerAddDialog(user) {
        this.dialogs.condoOwnerAddDialog = false;
        this.owners.push(user);
      },

      handleCondoOwnerEditDialog(user) {
        this.dialogs.condoOwnerEditDialog = false;
        this.owners.push(user);
      },

      removeOwners() {
        this.inputs.owners.forEach((x) => {
          this.removeObjectById(this.owners, x);
        })

        this.inputs.owners = [];
      },

      removeObjectById(arr, id) {
        let index = null;

        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === id) index = i;
        }

        if (index != null) arr.splice(index, 1);
      },

      selectAll(d) {
        if (d) {
          this.inputs.owners = this.owners.map(o => o.id);
        }
        else {
          this.inputs.owners = [];
        }
      },

      selectOne() {
        if (this.inputs.allOwners) {
          this.inputs.allOwners = null;
        }
        else {
          this.inputs.allOwners = (this.owners.length === this.inputs.owners.length) || null;
        }
      },

      getUsers() {
        const params = 'userRoles=4';

        apiUsers.getAll(params)
            .then(res => {
              this.owners = res.data;
            })
            .catch(err => {
              console.error(err);
            })
      },
    }
  }
</script>
