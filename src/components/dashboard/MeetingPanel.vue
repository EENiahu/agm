<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <v-row align="center">
        <v-col>{{ dateTitleFormat(meeting.startDateTime) }}</v-col>
        <v-col class="text-truncate">
          0{{ new Date(meeting.startDateTime).getHours()}}:0{{ new Date(meeting.startDateTime).getMinutes()}} PM
        </v-col>
        <v-col>{{ meeting.property.name }}</v-col>
        <v-col>
          {{ meeting.property.address.secondAddress ? `${meeting.property.address.firstAddress} / ${meeting.property.address.secondAddress}` : meeting.property.address.firstAddress }}
        </v-col>
        <v-col><v-icon color="orange darken-2">mdi-check-circle-outline</v-icon> May 10,21</v-col>
        <v-col><v-icon color="grey lighten-2">mdi-check-circle-outline</v-icon></v-col>
        <v-col>{{ 0 }}</v-col>
        <v-col>{{ 0 }}</v-col>
        <v-col>{{ 0 }}</v-col>
      </v-row>
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-row justify="start">
        <v-col class="flex-grow-0">
          <v-btn type="button" class="px-10" color="blue-grey darken-4 white--text" depressed rounded>
            Start AGM
          </v-btn>
        </v-col>
        <v-col class="flex-grow-0">
          <router-link :to="`/dashboard/meetings-edit/${meeting.id}`">
            <v-btn type="button" class="px-10" color="blue-grey darken-4 white--text" depressed rounded>
              Update
            </v-btn>
          </router-link>
        </v-col>

        <v-col class="flex-grow-0">
          <router-link :to="`/dashboard/meetings-edit/${meeting.id}`">
            <v-btn type="button" class="px-10" color="blue-grey darken-4 white--text" depressed rounded>
              Poll
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
                    @click="removeMeeting(meeting.id)"
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
  import apiMeetings from "@/api/meetings";

  export default {
    name: "MeetingPanel",
    props: {
      meeting: {
        type: Object,
        required: true
      }
    },

    data() {
      return {
        disabled: false,
        loading: false,
        menu: false,
      }
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

      removeMeeting(id) {
        if (this.disabled) return;
        this.deactivateSubmit();

        apiMeetings.delete(id)
          .then(res => {
            this.$emit('remove-meeting', id);
            this.menu = false;
            this.activateSubmit();
          })
          .catch(err => {
            console.error(err);
          })
      },

      dateTitleFormat(date = '') {
        let fullDate = new Date(Date.parse(date));
        const monthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
        const weekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
        const weekDay = fullDate.getDay();
        const year = fullDate.getFullYear();
        const month = fullDate.getMonth();
        let day = fullDate.getDate().toString();

        day = day.length === 1 ? `0${day}` : day;

        return `${weekdaysShort[weekDay]}, ${monthsShort[month]} ${day}, ${year}`;
      },
    }
  }
</script>
