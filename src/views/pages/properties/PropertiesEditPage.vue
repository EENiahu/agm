<template>
  <form @submit.prevent="sendSave" :action="formAction" method="PUT">
    <v-row class="mb-6">
      <v-col cols="6">
        <h1>UPDATE PROPERTY</h1>
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
              <h3>{{ organization.name }}</h3>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-text-field
                  @input="handleInput('Name')"
                  :error-messages="errors.get('Name')"
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
                  @input="handleInput('FirstAddress')"
                  :error-messages="errors.get('FirstAddress')"
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
                  @input="handleInput('SecondAddress')"
                  :error-messages="errors.get('SecondAddress')"
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
                  @input="handleInput('City')"
                  :error-messages="errors.get('City')"
                  v-model="inputs.property.City"
                  name="City"
                  color="orange"
                  label="City"
                  hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-select
                  @change="handleInput('StateId')"
                  :error-messages="errors.get('StateId')"
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
                  @input="handleInput('Country')"
                  :error-messages="errors.get('Country')"
                  v-model="inputs.property.Country"
                  name="Country"
                  color="orange"
                  label="Country"
                  hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-text-field
                  @input="handleInput('PostalCode')"
                  :error-messages="errors.get('PostalCode')"
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
                  @input="handleInput('TotalUnits')"
                  :error-messages="errors.get('TotalUnits')"
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
import errorHandler from "@/lib/ErrorHandler";

export default {
  name: "PropertiesEditPage",
  data () {
    return {
      errors: new errorHandler(),
      disabled: false,
      loading: false,
      formAction: apiProperties.getRoutes().put.updateById.replace('{id}', this.$route.params.id),

      organization: this.$store.getters["auth/user"].organization || {},
      property: {},
      states: [],

      OrganizationId: this.$store.getters["auth/user"].organization.id,
      PropertyId: this.$route.params.id,

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
    this.getProperty();
  },

  methods: {
    handleInput(name) {
      if (this.errors.has(name)) this.errors.clear(name);
      if (this.errors.has('Message')) this.errors.clear('Message');
    },

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

      apiProperties.updateById(this.property.id, propertyParams)
          .then(res => {
            this.activateSubmit();
            this.$router.push({path: '/dashboard/properties'});
          })
          .catch(err => {
            this.activateSubmit();
            if (err.response && err.response.data.errors) this.errors.record(err.response.data.errors);
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

    getProperty() {
      apiProperties.getOne(this.PropertyId)
          .then(res => {
            this.property = res.data;
            this.setPropertyInputs();
          })
          .catch(err => {
            console.error(err);
          })
    },

    setPropertyInputs() {
      this.inputs.property = {
        Name: this.property.name,
        FirstAddress: this.property.address.firstAddress,
        SecondAddress: this.property.address.secondAddress,
        Country: this.property.address.country,
        City: this.property.address.city,
        PostalCode: this.property.address.postalCode,
        StateId: this.property.address.state.id,
        TotalUnits: this.property.totalUnits,
      }
    },
  }
}
</script>
