const state = {
    answers: [],
    currentAnswerId: null
};

const getters = {
    currentAnswer() {
        return {}
    }
};

const mutations = {
    SET_ANSWERS(state, answers) {

    },

    REMOVE_ANSWER(state) {

    },

    EDIT_ANSWER(state) {

    },
};

const actions = {
    set_answers({ commit }, answers) {commit('SET_ANSWERS', answers)},
    remove_answer({ commit }) { commit('REMOVE_ANSWER') },
    edit_answer({ commit }) { commit('EDIT_ANSWER') },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

