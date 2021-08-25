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
        getAnswers: `${origin}/${apiVersion}/answer`,
        getAnswer: `${origin}/${apiVersion}/answer/{id}`,
    },

    post: {
        createAnswer: `${origin}/${apiVersion}/answer`,
    },

    put: {
        updateAnswer: `${origin}/${apiVersion}/answer/{id}`,
    },

    delete: {
        deleteAnswer: `${origin}/${apiVersion}/answer/{id}`,
    }
};

exports.getRoutes = () => {
    return routes;
};

exports.getAll = () => {
    const url = routes.get.getAnswers;
    return axios.get(url, headers);
};

exports.getOne = (id) => {
    const url = routes.get.getAnswer.replace('{id}', id);
    return axios.get(url, headers);
};

exports.create = (params) => {
    const url = routes.post.createAnswer;
    let formData = new FormData();

    Object.keys(params).forEach(param => {
        if (params[param]) formData.append(param, params[param]);
    });

    return axios.post(url, formData, headers);
};

exports.updateById = (id, params) => {
    const url = routes.put.updateAnswer.replace('{id}', id);
    let formData = new FormData();

    Object.keys(params).forEach(param => {
        if (params[param]) formData.append(param, params[param]);
    });

    return axios.put(url, formData, headers);
};

exports.delete = (id) => {
    const url = routes.delete.deleteAnswer.replace('{id}', id);
    return axios.delete(url, headers);
};
