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
        users: `${origin}/${apiVersion}/user`,
        user: `${origin}/${apiVersion}/user/{id}`,
    },

    post: {
        create: `${origin}/${apiVersion}/user`,
    },

    put: {
        updateById: `${origin}/${apiVersion}/user/{id}`,
        updateByEmail: `${origin}/${apiVersion}/user`
    },

    delete: {
        user: `${origin}/${apiVersion}/user/{id}`
    }
};

exports.getRoutes = () => {
    return routes;
};

exports.getAll = () => {
    const url = routes.get.users;
    return axios.get(url, headers);
};

exports.getOne = (id) => {
    const url = routes.get.user.replace('{id}', id);
    return axios.get(url, headers);
};

exports.create = (params) => {
    const url = routes.post.create;
    return axios.post(url, params, headers);
};

exports.updateByEmail = (params) => {
    const url = routes.put.updateByEmail;
    let formData = new FormData();

    Object.keys(params).forEach(param => {
        if (params[param]) formData.append(param, params[param]);
    });

    return axios.put(url, formData, headers);
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
    const url = routes.delete.user.replace('{id}', id);
    return axios.delete(url, headers);
};
