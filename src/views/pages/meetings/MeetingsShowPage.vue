<template>
    <div>
      <v-row class="mb-10">
        <v-col cols="6">
          <h1>DASHBOARD</h1>
        </v-col>

        <v-col cols="6" align="end">
          <router-link to="/dashboard/meetings-create">
            <v-btn
                class="px-10"
                color="orange darken-2 white--text"
                depressed
                rounded
            >Host a Meeting</v-btn>
          </router-link>
        </v-col>
      </v-row>

      <v-row style="border-bottom: 2px solid black;" class="mb-4 pb-4 px-6" no-gutters>
        <v-col>
          <div class="font-weight-bold">DATE</div>
        </v-col>

        <v-col>
          <div class="font-weight-bold">TIME</div>
        </v-col>

        <v-col>
          <div class="font-weight-bold">PROPERTY</div>
        </v-col>

        <v-col>
          <div class="font-weight-bold">ADDRESS</div>
        </v-col>

        <v-col>
          <div class="font-weight-bold">1ST NOTICE</div>
        </v-col>

        <v-col>
          <div class="font-weight-bold">2ND NOTICE</div>
        </v-col>

        <v-col>
          <div class="font-weight-bold">ATTENDEES</div>
        </v-col>

        <v-col>
          <div class="font-weight-bold">PROXIES</div>
        </v-col>

        <v-col>
          <div class="font-weight-bold">ONLINE VOTES</div>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col>
          <v-expansion-panels>
            <meeting-panel v-for="(meeting, index) in meetings"
                            @remove-meeting="removeMeeting"
                            :key="meeting.id"
                            :meeting="meeting">
            </meeting-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </div>
</template>

<script>
  import apiMeetings from "@/api/meetings";
  import MeetingPanel from '@/components/dashboard/MeetingPanel.vue';

  export default {
    name: "MeetingsShowPage",
    components: {
      MeetingPanel
    },
    data() {
      return {
        meetings: [],
      }
    },

    created() {
      this.getMeetings();
    },

    methods: {
      getMeetings() {
        apiMeetings.getAll()
          .then(res => {
            this.meetings = res.data;
          })
          .catch(err => {
            console.error(err)
          })
      },

      removeMeeting(id) {
        this.removeObjectById(this.meetings, id);
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
