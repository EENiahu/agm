const axios = require('axios');

const origin = 'http://31.131.21.188:7300';
const headers = {
    headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
    }
};
const apiVersion = 'v1';
const routes = {
    get: {
        getQuestions: `${origin}/${apiVersion}/question`,
        getQuestion: `${origin}/${apiVersion}/question/{id}`,
    },

    post: {
        createQuestion: `${origin}/${apiVersion}/question`,
    },

    put: {
        updateQuestion: `${origin}/${apiVersion}/question/{id}`,
    },

    delete: {
        deleteQuestion: `${origin}/${apiVersion}/question/{id}`,
    }
};

exports.getRoutes = () => {
    return routes;
};

exports.getAll = () => {
    const url = routes.get.getQuestions;
    return axios.get(url, headers);
};

exports.getOne = (id) => {
    const url = routes.get.getQuestion.replace('{id}', id);
    return axios.get(url, headers);
};

exports.create = (params) => {
    const url = routes.post.createQuestion;
    let formData = new FormData();

    Object.keys(params).forEach(param => {
        if (params[param]) formData.append(param, params[param]);
    });

    return axios.post(url, formData, headers);
};

exports.updateById = (id, params) => {
    const url = routes.put.updateQuestion.replace('{id}', id);
    let formData = new FormData();

    Object.keys(params).forEach(param => {
        if (params[param]) formData.append(param, params[param]);
    });

    return axios.put(url, formData, headers);
};

exports.delete = (id) => {
    const url = routes.delete.deleteQuestion.replace('{id}', id);
    return axios.delete(url, headers);
};
