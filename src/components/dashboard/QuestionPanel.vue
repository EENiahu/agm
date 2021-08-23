<template>
  <div>
    <v-row>
      <v-col :class="[inputs.Choice == 2 ? 'col-12': 'col-6']">
        <v-radio-group v-model="inputs.Choice" row hide-details="auto" class="d-flex align-center">
          <v-radio label="Single Choice" color="orange darken-2" value="1"></v-radio>
          <v-radio label="Multiple Choice" color="orange darken-2" value="2"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col v-if="inputs.Choice == 2" cols="6">
        <v-row>
          <v-col cols="4">
            <v-select
                v-model="inputs.Range"
                name="RangeId"
                hide-details="auto"
                :items="sections"
                item-text="name"
                item-value="id"
                color="orange"
                item-color="orange"
                label="Choice Range"
            ></v-select>
          </v-col>

          <v-col cols="4">
            <v-text-field
                v-model="inputs.Min"
                name="Min"
                color="orange"
                label="Min"
                hide-details="auto"
            ></v-text-field>
          </v-col>

          <v-col>
            <v-text-field
                v-model="inputs.Max"
                name="Max"
                color="orange"
                label="Max"
                hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-select
            v-model="inputs.Section"
            name="SectionId"
            hide-details="auto"
            :items="sections"
            item-text="name"
            item-value="id"
            color="orange"
            item-color="orange"
            label="Choose a Section (Proxy Form)"
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
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
      <v-col cols="6">
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

    <div v-for="(answer, index) in inputs.Answers" :key="index" :class="{'mb-4': inputs.Answers.length-1 != index}">
      <v-row align="baseline">
        <v-col cols="4">
          <v-text-field
              :value="answer.text"
              color="orange"
              label="Full Name"
              hide-details="auto"
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <v-btn v-if="inputs.Answers.length-1 == index" @click="addQuestion(answer.id)" icon text color="orange darken-2" class="mr-4">
            <v-icon large>mdi-plus</v-icon>
          </v-btn>

          <v-btn v-if="inputs.Answers.length > 1" @click="removeQuestion(answer.id)" icon text color="orange darken-2">
            <v-icon large>mdi-minus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionPanel",
  data() {
    return {
      sections: [],

      inputs: {
        Choice: '1',
        Section: '',
        Range: '',
        Min: '',
        Max: '',
        Question: '',
        QuestionDescription: '',
        Answers: []
      }
    }
  },

  created() {
    this.inputs.Answers.push({
      text: '',
      id: this.uuidv4(),
    });
  },

  methods: {
    removeQuestion(id) {
      this.removeObjectById(this.inputs.Answers, id);
    },

    addQuestion() {
      //create uuid if no id
      this.inputs.Answers.push({
        text: '',
        id: this.uuidv4(),
      });
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
