<template>
  <div>
    <v-row class="mb-6">
      <v-col cols="6">
        <h1>CREATE POLLS</h1>
      </v-col>

      <v-col cols="6" align="end">
        <router-link :to="{ name: 'meetingsEdit', params: { id: MeetingId }}" class="mr-4">
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
      <question-panel :ref="`question-${index}`" :question="question" :key="index"></question-panel>
      <v-divider v-if="questions.length-1 != index" color="orange" class="mt-12 mb-6"></v-divider>
    </div>
  </div>
</template>

<script>
  import QuestionPanel from "@/components/dashboard/QuestionPanel";
  import mixinForm from "@/mixins/form";
  import apiQuestions from "@/api/questions";

  export default {
    name: "PollsCreatePage",
    mixins: [mixinForm],
    components: {
      QuestionPanel
    },

    data() {
      return {
        MeetingId: this.$route.params.meetingId,
        questions: [],
      }
    },

    created() {
      this.getQuestions();
    },

    methods: {
      sendSave() {
        let questions = Object.keys(this.$refs).map(questionKey => {
          return {
            ...this.$refs[questionKey][0].inputs,
            Answers: this.$refs[questionKey][0].inputs.Answers.map(answer => answer.text),
            MeetingId: this.MeetingId
          }
        });

        let params = {
          questions: questions
        };

        apiQuestions.createQuestionsWithAnswers(params)
          .then(res => {
            console.log(res);
          })
          .catch(err => console.error(err))
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
      },

      getQuestions() {
        apiQuestions.getAll()
            .then(res => {
              this.questions = res.data.length ? res.data : this.addQuestion(false);
            })
            .catch(err => {
              console.error(err);
            })
      },
    }
  }
</script>
