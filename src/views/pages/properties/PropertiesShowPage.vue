<template>
    <div>
      <v-row class="mb-10">
        <v-col cols="6">
          <h1>PROPERTIES</h1>
        </v-col>

        <v-col cols="6" align="end">
          <router-link to="/dashboard/properties/create">
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
            <property-panel v-for="(property, index) in properties"
                            @remove-property="removeProperty"
                            :key="property.id"
                            :property="property">
            </property-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </div>
</template>

<script>
  import apiProperties from "@/api/properties";
  import PropertyPanel from '@/components/dashboard/PropertyPanel.vue';

  export default {
    name: "PropertiesShowPage",
    components: {
      PropertyPanel
    },
    data() {
      return {
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
        this.removeObjectById(this.properties, id);
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
