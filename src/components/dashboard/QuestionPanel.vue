<template>
  <div>
    <v-row>
      <v-col :class="[inputs.Choice == 1 ? 'col-12': 'col-6']">
        <v-radio-group v-model="inputs.Choice" row hide-details="auto" class="d-flex align-center">
          <v-radio v-for="(type, index) in types" :key="index" :label="type.title" color="orange darken-2" :value="type.id"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col v-if="inputs.Choice == 1" cols="4">
        <v-row>
          <v-col cols="4">
            <v-select
                v-model="inputs.Range"
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
                  v-model="inputs.Number"
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
                  v-model="inputs.Min"
                  name="Min"
                  color="orange"
                  label="Min"
                  hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-text-field
                  v-model="inputs.Max"
                  name="Max"
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
            v-model="inputs.Section"
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
            v-model="inputs.Question"
            name="Question"
            color="orange"
            label="Enter Question"
            hide-details="auto"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-textarea
            v-model="inputs.QuestionDescription"
            name="QuestionDescription"
            color="orange"
            label="Add description to your question"
            hide-details="auto"
            auto-grow
        ></v-textarea>
      </v-col>
    </v-row>

    <div v-for="(answer, index) in inputs.Answers" :ref="`answer-${index}`" :key="index" :class="{'mb-4': inputs.Answers.length-1 != index}">
      <v-row align="baseline">
        <v-col cols="3">
          <v-text-field
              :value="answer.text"
              color="orange"
              label="Add Answer"
              hide-details="auto"
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <v-btn v-if="inputs.Answers.length-1 == index" @click="addAnswer()" icon text color="orange darken-2" class="mr-4">
            <v-icon large>mdi-plus</v-icon>
          </v-btn>

          <v-btn v-if="inputs.Answers.length > 1" @click="removeAnswer(answer.id)" icon text color="orange darken-2">
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
    data() {
      return {
        sections: questionSectionEnum.map(s => {
          s.description = s.description.charAt(0).toLowerCase() + s.description.slice(1);
          s.fullTitle = `Section ${s.section} - ${s.title}`;
          return s;
        }),

        types: questionTypeEnum,
        multipleTypeTypes: questionTypeEnum.filter(t => t.id === 1)[0].types,

        inputs: {
          Choice: 0,
          Section: '',
          Range: '',
          Number: '',
          Min: '',
          Max: '',
          Question: '',
          QuestionDescription: '',
          Answers: []
        }
      }
    },

    computed: {
      isUnlimitedType() {
        return this.inputs.Range === 1
      },

      isExactNumberType() {
        return this.inputs.Range === 2
      },

      isRangeType() {
        return this.inputs.Range === 3
      },

      isInOrderType() {
        return this.inputs.Range === 4
      }
    },

    created() {
      this.addAnswer();
    },

    methods: {
      // scrollToAnswer() {
      //   const options = {
      //     duration: 900,
      //     offset: 0,
      //     easing: 'easeInOutCubic',
      //   };
      //
      //   const target = this.$refs[`answer-${this.inputs.Answers.length-1}`][0];
      //
      //   this.$vuetify.goTo(target, options)
      // },

      removeAnswer(id) {
        this.removeObjectById(this.inputs.Answers, id);
      },

      addAnswer() {
        this.inputs.Answers.push({
          text: '',
          id: this.uuidv4(), //create uuid if no id
        });

        // if (scroll) this.$nextTick(() => this.scrollToAnswer());
      },

      removeObjectById(arr, id) {
        let index = null;

        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === id) index = i;
        }

        if (index != null) arr.splice(index, 1);
      },

      uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          let r = Math.random() * 16 | 0,
              v = c === 'x' ? r : r & 0x3 | 0x8;
          return v.toString(16);
        });
      }
    }
  }
</script>
