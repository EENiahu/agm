<template>
  <div>
    <v-row>
      <v-col :class="[question.type == 1 ? 'col-12': 'col-6']">
        <v-radio-group @change="updateQuestion('type', $event)" :value="question.type" row hide-details="auto" class="d-flex align-center">
          <v-radio v-for="(type, index) in types" :key="index" :label="type.title" color="orange darken-2" :value="type.id"></v-radio>
        </v-radio-group>

        <v-btn
            @click="removeQuestion"
            type="button"
            class="px-10"
            color="blue-grey darken-4 white--text"
            depressed
            rounded
        >Remove</v-btn>
      </v-col>

      <v-col v-if="question.type == 1" cols="4">
        <v-row>
          <v-col cols="4">
            <v-select
                :value="question.range"
                @change="updateQuestion('range', $event)"
                name="RangeId"
                hide-details="auto"
                :items="multipleTypeTypes"
                item-text="title"
                item-value="id"
                color="orange"
                item-color="orange"
                label="Choice Type"
            ></v-select>
          </v-col>

          <template v-if="isExactNumberType">
            <v-col cols="4">
              <v-text-field
                  @change="updateQuestion('number', $event)"
                  :value="question.number"
                  name="Number"
                  color="orange"
                  label="Number"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </template>

          <template v-if="isRangeType">
            <v-col cols="4">
              <v-text-field
                  @change="updateQuestion('minimumAnswers', $event)"
                  :value="question.minimumAnswers"
                  name="MinimumAnswers"
                  color="orange"
                  label="Min"
                  hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-text-field
                  @change="updateQuestion('maximumAnswers', $event)"
                  :value="question.maximumAnswers"
                  name="MaximumAnswers"
                  color="orange"
                  label="Max"
                  hide-details="auto"
              ></v-text-field>
            </v-col>
          </template>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-select
            @change="updateQuestion('section', $event)"
            :value="question.section"
            name="SectionId"
            hide-details="auto"
            :items="sections"
            item-text="fullTitle"
            item-value="section"
            color="orange"
            item-color="orange"
            label="Choose a Section (Proxy Form)"
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-text-field
            @input="updateQuestion('title', $event)"
            :value="question.title"
            name="Title"
            color="orange"
            label="Enter Question"
            hide-details="auto"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-textarea
            @input="updateQuestion('description', $event)"
            :value="question.description"
            name="Description"
            color="orange"
            label="Add description to your question"
            hide-details="auto"
            auto-grow
        ></v-textarea>
      </v-col>
    </v-row>

    <div v-for="(answer, index) in question.answers" :ref="`answer-${index}`" :key="index" :class="{'mb-4': question.answers.length-1 != index}">
      <v-row align="baseline">
        <v-col cols="3">
          <v-text-field
              @input="updateAnswer(answer.id, $event)"
              :value="question.answers[index].text"
              color="orange"
              label="Add Answer"
              hide-details="auto"
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <v-btn v-if="question.answers.length-1 == index" @click="addAnswer()" icon text color="orange darken-2" class="mr-4">
            <v-icon large>mdi-plus</v-icon>
          </v-btn>

          <v-btn v-if="question.answers.length > 1" @click="removeAnswer(answer.id)" icon text color="orange darken-2">
            <v-icon large>mdi-minus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  import questionSectionEnum from '@/entities/questions/questionSectionEnum';
  import questionTypeEnum from '@/entities/questions/questionTypeEnum';

  export default {
    name: "QuestionPanel",
    props: {
      question: {
        type: Object,
        required: true
      }
    },

    data() {
      return {
        sections: questionSectionEnum.map(s => {
          s.description = s.description.charAt(0).toLowerCase() + s.description.slice(1);
          s.fullTitle = `Section ${s.section} - ${s.title}`;
          return s;
        }),

        types: questionTypeEnum,
        multipleTypeTypes: questionTypeEnum.filter(t => t.id === 1)[0].types,
      }
    },

    computed: {
      isUnlimitedType() {
        return this.question.range === 1
      },

      isExactNumberType() {
        return this.question.range === 2
      },

      isRangeType() {
        return this.question.range === 3
      },

      isInOrderType() {
        return this.question.range === 4
      }
    },

    created() {
      this.addAnswer();
    },

    methods: {
      addAnswer() {
        this.$store.dispatch('questions/add_answer', this.question.id);
      },

      removeQuestion() {
        this.$store.dispatch('questions/remove_question', this.question.id);
      },

      removeAnswer(answerId) {
        this.$store.dispatch('questions/remove_answer', {
          questionId: this.question.id,
          answerId
        });
      },

      updateQuestion(fieldName, fieldValue) {
        this.$store.dispatch('questions/update_question', {
          fieldName,
          fieldValue,
          questionId: this.question.id
        });
      },

      updateAnswer(answerId, fieldValue) {
        this.$store.dispatch('questions/update_answer', {
          answerId,
          fieldValue,
          questionId: this.question.id
        });
      },
    }
  }
</script>
