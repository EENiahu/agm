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
        meetings: `${origin}/${apiVersion}/meeting`,
        meeting: `${origin}/${apiVersion}/meeting/{id}`,
    },

    post: {
        create: `${origin}/${apiVersion}/meeting`,
    },

    put: {
        updateById: `${origin}/${apiVersion}/meeting/{id}`,
    },

    delete: {
        meeting: `${origin}/${apiVersion}/meeting/{id}`
    }
};

exports.getRoutes = () => {
    return routes;
};

exports.getAll = () => {
    const url = routes.get.meetings;
    return axios.get(url, headers);
};

exports.getOne = (id) => {
    const url = routes.get.meeting.replace('{id}', id);
    return axios.get(url, headers);
};

exports.create = (params) => {
    const url = routes.post.create;
    let formData = new FormData();

    Object.keys(params).forEach(param => {
        if (params[param]) formData.append(param, params[param]);
    });

    return axios.post(url, formData, headers);
};

exports.updateById = (id, params) => {
    const url = routes.put.updateById.replace('{id}', id);
    let formData = new FormData();

    Object.keys(params).forEach(param => {
        if (params[param]) formData.append(param, params[param]);
    });

    return axios.put(url, formData, headers);
};

exports.delete = (id) => {
    const url = routes.delete.meeting.replace('{id}', id);
    return axios.delete(url, headers);
};
