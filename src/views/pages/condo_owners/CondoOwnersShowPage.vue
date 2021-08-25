<template>
  <div>
    <v-row class="mb-10">
      <v-col cols="6">
        <h1 class="text-uppercase">Condo Owners</h1>
      </v-col>

      <v-col cols="6" align="end">
          <v-btn
              type="button"
              class="px-10 mr-4"
              color="blue-grey darken-4 white--text"
              depressed
              rounded
          >Add New Owner</v-btn>

        <v-btn
            type="button"
            class="px-10 mr-4"
            color="blue-grey darken-4 white--text"
            depressed
            rounded
        >Upload Owners</v-btn>
      </v-col>
    </v-row>

    <div>
      <v-row style="border-bottom: 2px solid black;" class="mb-4 pb-4 px-6" no-gutters>
        <v-col cols="2" class="d-flex align-center">
          <v-checkbox
              @change="selectAll"
              class="mt-0 mr-2 pa-0"
              v-model="inputs.allOwners"
              label=""
              color="orange darken-2"
              :value="true"
              hide-details
          ></v-checkbox>
          <div class="font-weight-bold">FIRST NAME</div>
        </v-col>

        <v-col cols="2">
          <div class="font-weight-bold">LAST NAME</div>
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
        <v-col cols="2" class="d-flex align-center">
          <v-checkbox
              @change="selectOne"
              class="mt-0 mr-2 pa-0"
              v-model="inputs.owners"
              color="orange darken-2"
              :value="`owner-${owner.id}`"
              hide-details
          ></v-checkbox>
          <div>Pavlo</div>
        </v-col>

        <v-col cols="2">
          <div>Pylypchuk</div>
        </v-col>

        <v-col cols="3">
          <div class="text-truncate">dataxov228@hyprhost.com</div>
        </v-col>

        <v-col cols="2">
          <div class="d-flex align-center">
            <div>456</div>
          </div>
        </v-col>

        <v-col cols="2">
          <div class="d-flex align-center">
            <div>Owner Occupant</div>
          </div>
        </v-col>
      </v-row>
    </div>

    <v-slide-y-reverse-transition>
      <v-toolbar v-if="inputs.owners.length" absolute bottom max-width="100%" width="100%" class="d-flex justify-center" style="left: 0;">
        <v-btn color="orange darken-2" class="mr-4" text rounded>
          <span>Edit</span>
          <v-icon>mdi-square-edit-outline</v-icon>
        </v-btn>

        <v-btn type="button" color="red darken-2" class="" text rounded>
          <span>Remove</span>
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </v-toolbar>
    </v-slide-y-reverse-transition>
  </div>
</template>

<script>
  import apiUsers from "@/api/users";
  import mixinForm from "@/mixins/form";
  import MemberPanel from '@/components/dashboard/MemberPanel.vue';

  export default {
    name: "CondoOwnersShowPage",
    mixins: [mixinForm],
    components: {
      MemberPanel
    },
    data() {
      return {
        owners: [
          {
            id: 1,
            name: 'vasa'
          },
          {
            id: 2,
            name: 'vasa'
          },
          {
            id: 3,
            name: 'vasa'
          },
          {
            id: 4,
            name: 'vasa'
          },
          {
            id: 5,
            name: 'vasa'
          },
        ],

        inputs: {
          allOwners: null,
          owners: []
        }
      }
    },

    created() {

    },

    methods: {
      selectAll(d) {
        if (d) {
          this.inputs.owners = this.owners.map(o => `owner-${o.id}`);
        }
        else {
          this.inputs.owners = [];
        }
      },

      selectOne() {
        if (this.inputs.allOwners) this.inputs.allOwners = null;
      },
    }
  }
</script>
