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
    const url = routes.get.properties + '?extensions=condoOwners';
    return axios.get(url, headers);
};

exports.getOne = (id, extensions = '') => {
    extensions = extensions ? `?extensions=${extensions}` : '';
    const url = routes.get.property.replace('{id}', id) + extensions;
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
    const url = routes.delete.property.replace('{id}', id);
    return axios.delete(url, headers);
};
