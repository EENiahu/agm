<template>
    <div>
      <v-row class="mb-10">
        <v-col cols="6">
          <h1>PROPERTIES</h1>
        </v-col>

        <v-col cols="6" align="end">
          <router-link to="/dashboard/properties-create">
            <v-btn
                class="px-10"
                color="orange darken-2 white--text"
                depressed
                rounded
            >Add New Property</v-btn>
          </router-link>
        </v-col>
      </v-row>

      <v-row style="border-bottom: 2px solid black;" class="mb-4 pb-4 px-6" no-gutters>
        <v-col>
          <div class="font-weight-bold">PROPERTY</div>
        </v-col>

        <v-col cols="3">
          <div class="font-weight-bold">ADDRESS</div>
        </v-col>

        <v-col>
          <div class="font-weight-bold"># UNITS</div>
        </v-col>

        <v-col>
          <div class="font-weight-bold">OWNER OCCUPANTS</div>
        </v-col>

        <v-col>
          <div class="font-weight-bold">OFFSITE OWNERS</div>
        </v-col>

        <v-col>
          <div class="font-weight-bold">#UNITS TO MEET QUORUM</div>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col>
          <v-expansion-panels>
            <v-expansion-panel v-for="(property, index) in properties" :key="property.id">
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
                    <v-btn type="button" class="px-10" color="blue-grey darken-4 white--text" depressed rounded>
                      Host a Meeting
                    </v-btn>
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
                              rounded
                              class="px-5"
                              color="red"
                              text
                              type="button"
                              @click="removeProperty(property.id)"
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
          </v-expansion-panels>
        </v-col>
      </v-row>
    </div>
</template>

<script>
  import apiProperties from "@/api/properties";

  export default {
    name: "PropertiesShowPage",
    data() {
      return {
        fav: true,
        menu: false,
        message: false,
        hints: true,
        properties: [],
      }
    },

    created() {
      this.getProperties();
    },

    methods: {
      getProperties() {
        apiProperties.getAll()
            .then(res => {
              this.properties = res.data;
            })
            .catch(err => {
              console.error(err)
            })
      },

      removeProperty(id) {
        apiProperties.delete(id)
          .then(res => {
            this.menu = false;
            this.removeObjectById(this.properties, id);
          })
          .catch(err => {
            console.error(err);
          })
      },

      removeObjectById(arr, id) {
        let index = null;

        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === id) index = i;
        }

        if (index != null) arr.splice(index, 1);
      }
    }
  }
</script>
