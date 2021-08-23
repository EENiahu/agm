<template>
  <div>
    <v-row class="mb-6">
      <v-col cols="6">
        <h1>CREATE POLL</h1>
      </v-col>

      <v-col cols="6" align="end">
        <router-link to="/dashboard/properties" class="mr-4">
          <v-btn
              type="button"
              class="px-10"
              color="blue-grey darken-4 white--text"
              depressed
              rounded
          >Back to AGM</v-btn>
        </router-link>

        <v-btn
            type="button"
            class="px-10 mr-4"
            color="blue-grey darken-4 white--text"
            depressed
            rounded
        >Add Question</v-btn>

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

    <div>
      <question-panel></question-panel>

      <v-divider color="orange" class="my-12"></v-divider>

      <question-panel></question-panel>
    </div>
  </div>
</template>

<script>
import QuestionPanel from "@/components/dashboard/QuestionPanel";

export default {
  name: "PollsCreatePage",
  components: {
    QuestionPanel
  },
  data() {
    return {

    }
  }
}
</script>
