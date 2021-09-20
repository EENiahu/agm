import helpers from '@/lib/helpers';
let questionModel = (meetingId) => {
    return {
        answers: [],
        title: "",
        description: "",
        displayed: null,
        id: helpers.uuidv4(),
        maximumAnswers: '',
        minimumAnswers: '',
        meetingId: meetingId,
        section: 1,
        type: 1,
    }
};

const state = {
    statuses: ['new', 'updated', 'removed'],
    questions: [],
    currentQuestionId: null
};

const getters = {
    questions(state) {
        return state.questions;
    },

    currentQuestion() {
        return {}
    }
};

const mutations = {
    SET_QUESTIONS(state, questions) {
        state.questions = questions;
    },

    ADD_QUESTION(state, meetingId) {
        let question = questionModel(meetingId);
        question.status = state.statuses[0]; //new
        state.questions.push(question);
    },

    ADD_ANSWER(state, questionId) {
        const questionIndex = helpers.getObjectIndexById(state.questions, questionId);
        state.questions[questionIndex].answers.push({ text: '', id: helpers.uuidv4() })
    },

    REMOVE_QUESTION(state, questionId) {
        helpers.removeObjectById(state.questions, questionId);
    },

    REMOVE_ANSWER(state,{ questionId, answerId }) {
        const questionIndex = helpers.getObjectIndexById(state.questions, questionId);
        helpers.removeObjectById(state.questions[questionIndex].answers, answerId);
    },

    UPDATE_QUESTION(state, { fieldName, fieldValue, questionId }) {
        const question = helpers.getObjectById(state.questions, questionId);
        question[fieldName] = fieldValue;
    },

    UPDATE_ANSWER(state, { fieldValue, questionId, answerId }) {
        const questionIndex = helpers.getObjectIndexById(state.questions, questionId);
        const answer = helpers.getObjectById(state.questions[questionIndex].answers, answerId);
        answer['text'] = fieldValue;
    },
};

const actions = {
    set_questions({ commit }, questions) {commit('SET_QUESTIONS', questions)},
    add_question({ commit }, meetingId) {commit('ADD_QUESTION', meetingId)},
    add_answer({ commit }, questionId) {commit('ADD_ANSWER', questionId)},
    remove_question({ commit }, questionId) { commit('REMOVE_QUESTION', questionId) },
    remove_answer({ commit }, { questionId, answerId }) { commit('REMOVE_ANSWER', { questionId, answerId }) },
    update_question({ commit }, { fieldName, fieldValue, questionId }) { commit('UPDATE_QUESTION', { fieldName, fieldValue, questionId }) },
    update_answer({ commit }, { fieldValue, questionId, answerId }) { commit('UPDATE_ANSWER', { fieldValue, questionId, answerId }) },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

