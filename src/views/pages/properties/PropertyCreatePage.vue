<template>
  <form @submit.prevent="sendSave" :action="formAction" method="POST">
    <v-row class="mb-6">
      <v-col cols="6">
        <h1>CREATE NEW PROPERTY</h1>
      </v-col>

      <v-col cols="6" align="end">
        <router-link to="/dashboard/properties" class="mr-4">
          <v-btn
              type="button"
              class="px-10"
              color="blue-grey darken-4 white--text"
              depressed
              rounded
          >Back</v-btn>
        </router-link>

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
              <h3>{{ organization.name }}</h3>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-text-field
                  v-model="inputs.property.Name"
                  name="Name"
                  color="orange"
                  label="Property Title"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-text-field
                  v-model="inputs.property.FirstAddress"
                  name="FirstAddress"
                  color="orange"
                  label="Address 1"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-text-field
                  v-model="inputs.property.SecondAddress"
                  name="SecondAddress"
                  color="orange"
                  label="Address 2"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <v-text-field
                  v-model="inputs.property.City"
                  name="City"
                  color="orange"
                  label="City"
                  hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-select
                  v-model="inputs.property.StateId"
                  name="StateId"
                  hide-details="auto"
                  :items="states"
                  item-text="name"
                  item-value="id"
                  color="orange"
                  label="State"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <v-text-field
                  v-model="inputs.property.Country"
                  name="Country"
                  color="orange"
                  label="Country"
                  hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-text-field
                  v-model="inputs.property.PostalCode"
                  name="PostalCode"
                  color="orange"
                  label="Postal Code"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-text-field
                  v-model="inputs.property.TotalUnits"
                  name="TotalUnits"
                  type="number"
                  color="orange"
                  label="How many units in total?"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-text-field
                  readonly
                  :value="unitsByQuorum"
                  color="orange"
                  label="How many units to meet quorum? (calculated)"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>

        <v-col>
          <v-row>
            <v-col cols="8">
              <h5 class="mb-4 text-h5 orange--text text--darken-2">Have you downloaded the Condo Owner's Excel Template?</h5>
              <p class="subtitle-1">Please use AGM Online's template before uploading Condo Owners to your profile.</p>
              <p class="mb-5 subtitle-2 font-weight-regular font-italic">Please indicate in column <strong>Ownership</strong> whether an owner is an Owner Occupant or Offsite Owner.</p>
              <v-btn
                  type="button"
                  class="px-10"
                  color="blue-grey darken-4 white--text"
                  depressed
                  rounded
              >Download Owner Template</v-btn>
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

export default {
  name: "PropertyCreatePage",
  data () {
    return {
      disabled: false,
      loading: false,
      formAction: apiProperties.getRoutes().post.create,

      organization: this.$store.getters["auth/user"].organization || {},
      states: [],

      OrganizationId: this.$store.getters["auth/user"].organization.id,

      inputs: {
        property: {
          Name: '',
          FirstAddress: '',
          SecondAddress: '',
          Country: '',
          City: '',
          PostalCode: '',
          StateId: '',
          TotalUnits: '',
        },
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
    deactivateSubmit() {
      this.disabled = true;
      this.loading = true;
    },

    activateSubmit() {
      this.disabled = false;
      this.loading = false;
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
