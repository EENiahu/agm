const axios = require('axios');

const origin = 'http://31.131.21.188:7400';
const headers = {
    headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
    }
};
const apiVersion = 'v1';
const routes = {
    get: {
        organizations: `${origin}/${apiVersion}/organization`,
        organization: `${origin}/${apiVersion}/organization/{id}`,
    },

    post: {
        create: `${origin}/${apiVersion}/organization`,
    },

    put: {
        update: `${origin}/${apiVersion}/organization/{id}`,
    },

    delete: {
        organization: `${origin}/${apiVersion}/organization/{id}`
    }
};

exports.getRoutes = () => {
    return routes;
};

exports.getAll = () => {
    const url = routes.get.organizations;
    return axios.get(url, headers);
};

exports.getOne = (id) => {
    const url = routes.get.organization.replace('{id}', id);
    return axios.get(url, headers);
};

exports.create = (params) => {
    const url = routes.post.create;
    let formData = new FormData();

    Object.keys(params).forEach(param => {
        formData.append(param, params[param]);
    });

    return axios.post(url, formData, headers);
};

exports.update = (id, params) => {
    const url = routes.put.update.replace('{id}', id);
    let formData = new FormData();

    Object.keys(params).forEach(param => {
        formData.append(param, params[param]);
    });

    return axios.put(url, formData, headers);
};

exports.delete = (id) => {
    const url = routes.delete.organization.replace('{id}', id);
    return axios.get(url, headers);
};
