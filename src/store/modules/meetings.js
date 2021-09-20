const state = {
    meetings: [],
    currentMeetingId: null
};

const getters = {
    currentMeeting() {
        return {}
    }
};

const mutations = {
    SET_MEETINGS(state, meetings) {

    },

    REMOVE_MEETING(state) {

    },

    EDIT_MEETING(state) {

    },
};

const actions = {
    set_meetings({ commit }, meetings) {commit('SET_MEETINGS', meetings)},
    remove_meeting({ commit }) { commit('REMOVE_MEETING') },
    edit_meeting({ commit }) { commit('EDIT_MEETING') },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

