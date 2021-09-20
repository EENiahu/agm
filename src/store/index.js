import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import auth from './modules/auth';
import alerts from './modules/alerts';

import meetings from './modules/meetings';
import questions from './modules/questions';
import answers from './modules/answers';

export default new Vuex.Store({
  modules: {
    auth,
    alerts,
    meetings,
    questions,
    answers
  }
})
