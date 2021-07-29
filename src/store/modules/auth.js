import Vue from 'vue';
const apiAuth = require('../../api/auth');

const state = {
  token: window.localStorage.getItem('token') || '',
  user: JSON.parse(window.localStorage.getItem('user')) || {}
};

const getters = {
  token(state) {
    return state.token;
  },

  user(state) {
    return state.user;
  },

  isAuthorized(state) {
    return state.token.length > 0 && Object.keys(state.user).length > 0;
  },

  isVerified(state, getters) {
    return getters.isAuthorized && state.user.emailVerification;
  }
};

const mutations = {
  SET_TOKEN(state, token) {
    window.localStorage.setItem('token', token);
    state.token = token;
  },

  SET_USER(state, user) {
    window.localStorage.setItem('user', JSON.stringify(user));
    state.user = user;
  },

  MUTATE_USER(state, propName, propValue) {
    Vue.set(state.user, propName, propValue);
  },

  GET_TOKEN(state, { task }) {
    window.localStorage.getItem('token');
  },

  REMOVE_TOKEN(state) {
    window.localStorage.removeItem('token');
    state.token = '';
  },

  REMOVE_USER(state) {
    window.localStorage.removeItem('user');
    state.user = {};
  },
};

const actions = {
  set_token({ commit }, { token }) {commit('SET_TOKEN', token)},
  set_user({ commit }, { user }) {commit('SET_USER', user)},
  mutate_user({ commit }, { propName, propValue }) {commit('MUTATE_USER', propName, propValue)},
  get_token({ commit }, payload) {
    // apiAuth
    commit('GET_TOKEN', payload)
  },
  remove_token({ commit }) { commit('REMOVE_TOKEN') },
  remove_user({ commit }) { commit('REMOVE_USER') },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

