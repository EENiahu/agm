<template>
  <div>
    <v-row class="mb-6">
      <v-col cols="6">
        <h1>CREATE POLL</h1>
      </v-col>

      <v-col cols="6" align="end">
        <router-link :to="{ name: 'meetingEdit', params: { id: $route.params.id }}" class="mr-4">
          <v-btn
              type="button"
              class="px-10"
              color="blue-grey darken-4 white--text"
              depressed
              rounded
          >Back to AGM</v-btn>
        </router-link>

        <v-btn
            @click="addQuestion"
            type="button"
            class="px-10 mr-4"
            color="blue-grey darken-4 white--text"
            depressed
            rounded
        >Add Question</v-btn>

        <v-btn
            @click="sendSave"
            type="button"
            :loading="loading"
            class="px-10"
            color="orange darken-2 white--text"
            depressed
            rounded
        >Save</v-btn>
      </v-col>
    </v-row>

    <div v-for="(question, index) in questions">
      <question-panel :ref="`question-${index}`" :key="index"></question-panel>
      <v-divider v-if="questions.length-1 != index" color="orange" class="mt-12 mb-6"></v-divider>
    </div>
  </div>
</template>

<script>
  import QuestionPanel from "@/components/dashboard/QuestionPanel";
  import mixinForm from "@/mixins/form";
  import apiQuestions from "@/api/questions";
  import apiAnswers from "@/api/answers";

  export default {
    name: "PollsCreatePage",
    mixins: [mixinForm],
    components: {
      QuestionPanel
    },

    data() {
      return {
        questions: [],
      }
    },

    created() {
      this.addQuestion(false);
    },

    methods: {
      sendSave() {
        console.log('save');
        // apiQuestions.create()
        //     .then(res => {
        //       apiAnswers.create()
        //           .then(res => {
        //
        //           })
        //           .catch(err => {})
        //     })
        //     .catch(err => {})
      },

      addQuestion(scroll = true) {
        this.questions.push({});
        if (scroll) this.$nextTick(() => this.scrollToQuestion());
      },

      scrollToQuestion() {
        const options = {
          duration: 900,
          offset: 0,
          easing: 'easeInOutCubic',
        };

        const target = this.$refs[`question-${this.questions.length-1}`][0].$el;

        this.$vuetify.goTo(target, options)
      }
    }
  }
</script>
