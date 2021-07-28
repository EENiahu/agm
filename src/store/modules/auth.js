import Vue from 'vue';
const apiAuth = require('../../api/auth');

const state = {
  token: window.localStorage.getItem('token') || '',
  user: {}
};

const getters = {
  token(state) {
    return state.token
  }
};

const mutations = {
  SET_TOKEN(state, token) {
    window.localStorage.setItem('token', token);
    state.token = token;
  },

  GET_TOKEN(state, { task }) {
    window.localStorage.getItem('token');
  },

  REMOVE_TOKEN(state) {
    window.localStorage.removeItem('token');
    state.token = '';
  }
};

const actions = {
  set_token({ commit }, { token }) {commit('SET_TOKEN', token)},
  get_token({ commit }, payload) {
    // apiAuth
    commit('GET_TOKEN', payload)
  },
  remove_token({ commit }) { commit('REMOVE_TOKEN') },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

