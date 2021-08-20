<template>
  <div>
    <form @submit.prevent="sendSave" :action="formAction" method="POST">
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

      <v-row>
        <v-col>
          <div class="mb-12">
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
                    item-color="orange"
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
          </div>

          <div>
            <v-row class="mb-6" align="center">
              <v-col cols="6">
                <h1>PROPERTY MANAGER(S)</h1>
              </v-col>

              <v-col cols="6">
                <v-btn
                    @click.stop="dialogs.propertyManagerAddDialog = true"
                    type="button"
                    class="px-10"
                    color="orange darken-2 white--text"
                    depressed
                    rounded
                >Invite New Member</v-btn>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="8">
                <v-row align="baseline" class="mb-6">
                  <v-col cols="12">
                    <v-select
                        @change="handleInput('UserIds')"
                        :error-messages="errors.get('UserIds')"
                        v-model="inputs.managers"
                        name="UserId"
                        hide-details="auto"
                        :items="managers"
                        item-text="fullName"
                        item-value="id"
                        return-object
                        color="orange"
                        item-color="orange"
                        label="Managers"
                        multiple
                    >
                      <template v-slot:selection="{ item, index }">
                        <v-chip v-if="index === 0">
                          <span>{{ item.fullName }}</span>
                        </v-chip>
                        <span v-if="index === 1" class="grey--text text-caption">
                          (+{{ inputs.managers.length - 1 }} others)
                        </span>
                      </template>
                    </v-select>
                  </v-col>
                </v-row>

                <div v-for="(propertyManager, index) in inputs.managers" :key="index" :class="{'mb-12': inputs.managers.length-1 != index}">
                  <v-row align="baseline">
                    <v-col cols="8">
                      <v-text-field
                          :value="propertyManager.fullName"
                          readonly
                          color="orange"
                          label="Full Name"
                          hide-details="auto"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="2">
                      <v-btn @click="removeManager(propertyManager.id)" icon text color="orange darken-2">
                        <v-icon large>mdi-minus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="8">
                      <v-text-field
                          :value="propertyManager.email"
                          readonly
                          color="orange"
                          label="Email"
                          hide-details="auto"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="8">
                      <v-text-field
                          :value="propertyManager.role.name.split(/(?=[A-Z])/).join(' ')"
                          readonly
                          color="orange"
                          label="Role"
                          hide-details="auto"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>

        <v-col>
          <v-row>
            <v-col cols="8">
              <h5 class="mb-4 text-h5 orange--text text--darken-2">Have you downloaded the Condo Owner's Excel Template?</h5>
              <p class="subtitle-1">Please use AGM Online's template before uploading Condo Owners to your profile.</p>
              <p class="mb-5 subtitle-2 font-weight-regular font-italic">Please indicate in column <strong>Ownership</strong> whether an owner is an Owner Occupant or Offsite Owner.</p>
              <v-btn
                  link
                  download="AGM Online - Condo Owners Template.csv"
                  href="blob:http://31.131.21.188:7300/d3d16c76-2c6d-4040-b36b-ec007980fb2d"
                  class="px-10"
                  color="blue-grey darken-4 white--text"
                  depressed
                  rounded
              >Download Owner Template</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </form>

    <property-manager-add-dialog :open="dialogs.propertyManagerAddDialog"
                                 @add-success="handleManagerAddDialog"
                                 @close-dialog="dialogs.propertyManagerAddDialog = false">
    </property-manager-add-dialog>
  </div>
</template>

<script>
  import apiStates from "@/api/states";
  import apiProperties from "@/api/properties";
  import mixinForm from "@/mixins/form";
  import apiUsers from "@/api/users";
  import PropertyManagerAddDialog from "@/components/dialogs/PropertyManagerAddDialog";
  import apiPropertyManagers from "@/api/propertyManagers";
  import apiCondoOwners from "@/api/condoOwners";

  export default {
    name: "PropertiesCreatePage",
    mixins: [mixinForm],
    components: {
      PropertyManagerAddDialog,
    },
    data () {
      return {
        downloadFileLink: apiCondoOwners.getRoutes().get.downloadFileTemplate,
        formAction: apiProperties.getRoutes().post.create,
        dialogs: {
          propertyManagerAddDialog: false,
        },

        organization: this.$store.getters["auth/user"].organization || {},
        states: [],
        managers: [],

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

          managers: []
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
      this.getUsers();
    },

    methods: {
      handleManagerAddDialog(user) {
        this.dialogs.propertyManagerAddDialog = false;
        this.managers.push(user);
      },

      removeManager(id) {
        this.inputs.managers.forEach((x, i) => {
          if (x.id === id) this.inputs.managers.splice(i, 1);
        })
      },

      sendSave(e) {
        if (this.disabled) return;
        this.deactivateSubmit();

        const propertyParams = {...this.inputs.property, OrganizationId: this.OrganizationId};

        apiProperties.create(propertyParams)
          .then(res => {
            if (this.inputs.managers.length) {
              const managerParams = {
                OrganizationId: this.OrganizationId,
                PropertyIds: [res.data.id],
                UserIds: this.inputs.managers.map(x => x.id),
              };

              apiPropertyManagers.inviteManagers(managerParams)
                  .then(res => {
                    this.handleSuccess('Property Has Been Created');
                    this.$router.push({path: '/dashboard/properties'});
                  })
                  .catch(err => this.handleErrors(err))
            }
            else {
              this.handleSuccess('Property Has Been Created');
              this.$router.push({path: '/dashboard/properties'});
            }
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

      getUsers() {
        apiUsers.getAll()
            .then(res => {
              this.managers = res.data;
            })
            .catch(err => {
              console.error(err);
            })
      },
    }
  }
</script>
