<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <v-row>
        <v-col>{{ property.name }}</v-col>
        <v-col cols="3" class="text-truncate">
          {{ property.address.secondAddress ? `${property.address.firstAddress} / ${property.address.secondAddress}` : property.address.firstAddress }}
        </v-col>
        <v-col>{{ property.totalUnits }}</v-col>
        <v-col>{{ property.condoOwners.length }}</v-col>
        <v-col>{{ property.condoOwners.length }}</v-col>
        <v-col>{{ property.quorumUnits }}</v-col>
      </v-row>
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-row justify="start">
        <v-col class="flex-grow-0">
          <router-link :to="`/dashboard/meetings-create?property=${property.id}`" >
            <v-btn type="button" class="px-10" color="blue-grey darken-4 white--text" depressed rounded>
              Host a Meeting
            </v-btn>
          </router-link>
        </v-col>
        <v-col class="flex-grow-0">
          <router-link :to="`/dashboard/properties-edit/${property.id}`">
            <v-btn type="button" class="px-10" color="blue-grey darken-4 white--text" depressed rounded>
              Update
            </v-btn>
          </router-link>
        </v-col>
        <v-col class="flex-grow-0">
          <v-menu
              v-model="menu"
              :close-on-content-click="false"
              offset-y
              :nudge-bottom="8"
              :offset-overflow="true"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-on="on" v-bind="attrs" type="button" class="px-10" color="red darken-2 white--text" depressed rounded>
                Remove
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                Are you sure?
              </v-card-title>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn type="button" class="px-5" color="blue-grey darken-4 white--text" outlined depressed rounded
                       @click="menu = false"
                >
                  No
                </v-btn>
                <v-btn
                    :loading="loading"
                    rounded
                    class="px-5"
                    color="red"
                    text
                    type="button"
                    @click="removeProperty"
                >
                  Remove
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
  import apiProperties from "@/api/properties";
  import mixinForm from "@/mixins/form";

  export default {
    name: "PropertyPanel",
    mixins: [mixinForm],
    props: {
      property: {
        type: Object,
        required: true
      }
    },

    data() {
      return {
        menu: false,
      }
    },

    methods: {
      removeProperty() {
        if (this.disabled) return;
        this.deactivateSubmit();

        apiProperties.delete(this.property.id)
          .then(res => {
            this.menu = false;
            this.$emit('remove-property', this.property.id);
            this.handleSuccess('Property Has Been Removed');
          })
          .catch(err => this.handleErrors(err))
      },
    }
  }
</script>
