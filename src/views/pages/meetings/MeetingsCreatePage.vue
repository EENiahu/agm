<template>
  <form @submit.prevent="sendSave" :action="formAction" method="POST">
    <v-row class="mb-6">
      <v-col cols="6">
        <h1>CREATE VIRTUAL MEETING</h1>
      </v-col>

      <v-col cols="6" align="end">
        <router-link to="/dashboard/properties" class="mr-4">
          <v-btn
              type="button"
              class="px-10"
              color="blue-grey darken-4 white--text"
              depressed
              rounded
          >Create Polls</v-btn>
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
        <v-col cols="2">
          <v-select
              @change="handleInput('PropertyId')"
              :error-messages="errors.get('PropertyId')"
              v-model="inputs.meeting.PropertyId"
              name="PropertyId"
              hide-details="auto"
              :items="properties"
              item-text="name"
              item-value="id"
              color="orange"
              label="Choose a Property"
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-text-field
              @input="handleInput('Title')"
              :error-messages="errors.get('Title')"
              v-model="inputs.meeting.Title"
              name="Title"
              color="orange"
              label="Meeting Title"
              hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-textarea
              @input="handleInput('Description')"
              :error-messages="errors.get('Description')"
              v-model="inputs.meeting.Description"
              name="Description"
              color="orange"
              label="Meeting Description"
              hide-details="auto"
              auto-grow
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-select
              @change="handleInput('TimeZoneId')"
              :error-messages="errors.get('TimeZoneId')"
              v-model="inputs.meeting.TimeZoneId"
              name="TimeZoneId"
              hide-details="auto"
              :items="timezones"
              item-text="title"
              item-value="id"
              color="orange"
              label="Time Zone"
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-menu ref="menuDateFrom" v-model="menuDateFrom" color="orange"
                  :close-on-content-click="false" :return-value.sync="inputs.dateFrom"
                  transition="scale-transition" offset-y max-width="290px" min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="inputs.dateFrom" @click:append="menuDateFrom = !menuDateFrom" readonly color="orange"
                  name="StartDateTime" label="Start Date" append-icon="mdi-calendar" hide-details="auto"
                  v-bind="attrs" v-on="on" :error="!!errors.get('StartDateTime')">
              </v-text-field>
            </template>
            <v-date-picker v-model="inputs.dateFrom" color="orange" type="date" flat no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="orange" @click="menuDateFrom = false">Cancel</v-btn>
              <v-btn text color="orange" @click="$refs.menuDateFrom.save(inputs.dateFrom)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="2">
          <v-menu ref="menuTimeFrom" v-model="menuTimeFrom" :close-on-content-click="false"
                  :nudge-right="40" :return-value.sync="inputs.timeFrom"
                  transition="scale-transition" offset-y max-width="290px" min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field :value="timeFromTitle" @click:append="menuTimeFrom = !menuTimeFrom" readonly color="orange"
                            label="Start Time" append-icon="mdi-clock-time-four-outline" hide-details="auto"
                            v-bind="attrs" v-on="on" :error="!!errors.get('StartDateTime')">
              </v-text-field>
            </template>
            <v-time-picker v-if="menuTimeFrom" v-model="inputs.timeFrom" @click:minute="$refs.menuTimeFrom.save(inputs.timeFrom)"
                           format="ampm" ampm-in-title full-width color="orange" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="orange" @click="menuTimeFrom = false">Cancel</v-btn>
              <v-btn text color="orange" @click="$refs.menuTimeFrom.save(inputs.timeFrom)">OK</v-btn>
            </v-time-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row v-if="errors.has('StartDateTime')" no-gutters class="mt-2" transition="slide-y-transition">
        <v-col cols="4" transition="slide-y-transition">
          <div class="v-text-field__details">
            <div class="v-messages theme--light error--text" role="alert">
              <div class="v-messages__wrapper">
                <div class="v-messages__message">{{ errors.get('StartDateTime') }}</div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-menu ref="menuDateTo" v-model="menuDateTo" color="orange"
                  :close-on-content-click="false" :return-value.sync="inputs.dateTo"
                  transition="scale-transition" offset-y max-width="290px" min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="inputs.dateTo" @click:append="menuDateTo = !menuDateTo" readonly color="orange"
                            name="EndDateTime" label="End Date" append-icon="mdi-calendar" hide-details="auto"
                            v-bind="attrs" v-on="on" :error="!!errors.get('EndDateTime')">
              </v-text-field>
            </template>
            <v-date-picker v-model="inputs.dateTo" color="orange" type="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="orange" @click="menuDateTo = false">Cancel</v-btn>
              <v-btn text color="orange" @click="$refs.menuDateTo.save(inputs.dateTo)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="2">
          <v-menu ref="menuTimeTo" v-model="menuTimeTo" :close-on-content-click="false"
                  :nudge-right="40" :return-value.sync="inputs.timeTo"
                  transition="scale-transition" offset-y max-width="290px" min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field :value="timeToTitle" @click:append="menuTimeTo = !menuTimeTo" readonly color="orange"
                            label="End Time" append-icon="mdi-clock-time-four-outline" hide-details="auto"
                            v-bind="attrs" v-on="on" :error="!!errors.get('EndDateTime')">
              </v-text-field>
            </template>
            <v-time-picker v-if="menuTimeTo" v-model="inputs.timeTo" @click:minute="$refs.menuTimeTo.save(inputs.timeTo)"
                           format="ampm" ampm-in-title full-width color="orange" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="orange" @click="menuTimeTo = false">Cancel</v-btn>
              <v-btn text color="orange" @click="$refs.menuTimeTo.save(inputs.timeTo)">OK</v-btn>
            </v-time-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row v-if="errors.has('EndDateTime')" no-gutters class="mt-2" transition="slide-y-transition">
        <v-col cols="4" transition="slide-y-transition">
          <div class="v-text-field__details">
            <div class="v-messages theme--light error--text" role="alert">
              <div class="v-messages__wrapper">
                <div class="v-messages__message">{{ errors.get('EndDateTime') }}</div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-text-field
              @input="handleInput('MeetingRegistrationLink')"
              :error-messages="errors.get('MeetingRegistrationLink')"
              v-model="inputs.meeting.MeetingRegistrationLink"
              name="TotalUnits"
              type="text"
              color="orange"
              label="Meeting Registration Link"
              hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
  </form>
</template>

<script>
import apiStates from "@/api/states";
import apiTimezones from "@/api/timezones";
import apiProperties from "@/api/properties";
import apiMeetings from "@/api/meetings";
import errorHandler from "@/lib/ErrorHandler";

export default {
  name: "MeetingsCreatePage",
  data () {
    return {
      errors: new errorHandler(),
      disabled: false,
      loading: false,

      menuDateFrom: false,
      menuDateTo: false,
      menuTimeFrom: false,
      menuTimeTo: false,

      formAction: apiMeetings.getRoutes().post.create,

      states: [],
      timezones: [],
      properties: [],

      inputs: {
        meeting: {
          Title: '',
          Description: '',
          TimeZoneId: '',
          PropertyId: '',
          MeetingRegistrationLink: '',
        },

        dateFrom: '',
        dateTo: '',
        timeFrom: '',
        timeTo: ''
      },
    }
  },

  watch: {
    'inputs.dateFrom'() {
      this.errors.clear('StartDateTime');
    },

    'inputs.timeFrom'() {
      this.errors.clear('StartDateTime');
    },

    'inputs.dateTo'() {
      this.errors.clear('EndDateTime');
    },

    'inputs.timeTo'() {
      this.errors.clear('EndDateTime');
    },
  },

  computed: {
    timeFromTitle() {
      if (!this.inputs.timeFrom.length) return '';
      let date = new Date();
      let hours = this.inputs.timeFrom.split(':')[0];
      let minutes = this.inputs.timeFrom.split(':')[1];

      date.setHours(hours);
      date.setMinutes(minutes);

      return this.timeTitleFormat(date);
    },

    timeToTitle() {
      if (!this.inputs.timeTo.length) return '';

      let date = new Date();
      let hours = this.inputs.timeTo.split(':')[0];
      let minutes = this.inputs.timeTo.split(':')[1];

      date.setHours(hours);
      date.setMinutes(minutes);

      return this.timeTitleFormat(date);
    },

    StartDateTime() {
      if (!this.inputs.dateFrom || !this.inputs.timeFrom) return '';
      return this.inputs.dateFrom + ' ' + this.inputs.timeFrom + ':00';
    },

    EndDateTime() {
      if (!this.inputs.dateTo || !this.inputs.timeTo) return '';
      return this.inputs.dateTo + ' ' + this.inputs.timeTo + ':00';
    },
  },

  created() {
    this.getStates();
    this.getTimezones();
    this.getProperties();
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

      const meetingParams = {...this.inputs.meeting, StartDateTime: this.StartDateTime, EndDateTime: this.EndDateTime};

      apiMeetings.create(meetingParams)
        .then(res => {
          this.activateSubmit();
          this.$router.push({path: '/dashboard/meetings'});
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

    getTimezones() {
      apiTimezones.getAll()
          .then(res => {
            this.timezones = res.data;
          })
          .catch(err => {
            console.error(err);
          })
    },

    getProperties() {
      apiProperties.getAll()
          .then(res => {
            this.properties = res.data;
          })
          .catch(err => {
            console.error(err);
          })
    },

    timeTitleFormat(date) {
      let fullDate = new Date(Date.parse(date));
      let hours = fullDate.getHours();
      let minutes = fullDate.getMinutes();
      let ampm = hours >= 12 ? 'pm' : 'am';

      hours = hours % 12;
      hours = hours ? hours : 12;
      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;

      return `${hours}:${minutes} ${ampm}`;
    },
  }
}
</script>
