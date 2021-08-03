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
        properties: `${origin}/${apiVersion}/property`,
        property: `${origin}/${apiVersion}/property/{id}`,
    },

    post: {
        create: `${origin}/${apiVersion}/property`,
    },

    put: {
        updateById: `${origin}/${apiVersion}/property/{id}`,
    },

    delete: {
        property: `${origin}/${apiVersion}/property/{id}`
    }
};

exports.getRoutes = () => {
    return routes;
};

exports.getAll = () => {
    const url = routes.get.properties;
    return axios.get(url, headers);
};

exports.getOne = (id) => {
    const url = routes.get.property.replace('{id}', id);
    return axios.get(url, headers);
};

exports.create = () => {
    const url = routes.post.create;
    return axios.post(url, headers);
};

exports.updateById = (id) => {
    const url = routes.put.updateById.replace('{id}', id);
    return axios.get(url, headers);
};

exports.delete = (id) => {
    const url = routes.delete.property.replace('{id}', id);
    return axios.get(url, headers);
};
