import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import auth from './modules/auth';
import alerts from './modules/alerts';

export default new Vuex.Store({
  modules: {
    auth,
    alerts
  }
})
