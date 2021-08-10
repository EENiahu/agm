const state = {
    alert: {},
    show: false,
};

const getters = {
    isVisible(state) {
        return !!Object.keys(state.alert).length && state.show;
    },

    alert(state) {
        return state.alert;
    },
};

const mutations = {
    SET_ALERT(state, alert) {
        //defaults
        alert.timeout = alert.timeout || 5000;
        alert.type = alert.type || 'error';

        state.alert = alert;
        state.show = true;

        setTimeout(() => {
            state.alert = {};
            state.show = false;
        }, (state.alert.timeout+1000));
    },

    REMOVE_ALERT(state) {
        state.alert = {};
    },

    HIDE_ALERT(state) {
        state.show = false;
    },
};

const actions = {
    set_alert({ commit }, alert) {commit('SET_ALERT', alert)},
    remove_alert({ commit }) { commit('REMOVE_ALERT') },
    hide_alert({ commit }) { commit('HIDE_ALERT') },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

