const axios = require('axios');

const origin = 'http://31.131.21.188:7300';
const headers = {
    headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
    }
};
const apiVersion = 'v1';
const routes = {
    post: {
        inviteToProperties: `${origin}/${apiVersion}/propertymanager/invite-to-properties`,
        inviteManagers: `${origin}/${apiVersion}/propertymanager/invite-managers`,
        acceptInvite: `${origin}/${apiVersion}/propertymanager/accept-invite`,
    },

    delete: {
        cancelInvite: `${origin}/${apiVersion}/propertymanager/cancel-invite`
    }
};

exports.getRoutes = () => {
    return routes;
};

exports.getAll = () => {
    const url = routes.get.users;
    return axios.post(url, headers);
};

exports.inviteToProperties = (params) => {
    const url = routes.post.inviteToProperties;
    let formData = new FormData();

    Object.keys(params).forEach(param => {
        if (params[param] !== null && params[param] !== '') {
            if (Array.isArray(params[param])) {
                params[param].forEach(arrayValue => {
                    formData.append(`${param}[]`, arrayValue);
                });
            }
            else {
                formData.append(param, params[param]);
            }
        }
    });

    return axios.post(url, formData, headers);
};

exports.inviteManagers = (params) => {
    const url = routes.post.inviteManagers;
    let formData = new FormData();

    Object.keys(params).forEach(param => {
        if (params[param] !== null && params[param] !== '') {
            if (Array.isArray(params[param])) {
                params[param].forEach(arrayValue => {
                    formData.append(`${param}[]`, arrayValue);
                });
            }
            else {
                formData.append(param, params[param]);
            }
        }
    });

    return axios.post(url, formData, headers);
};

exports.acceptInvite = () => {
    const url = routes.post.acceptInvite;
    return axios.post(url, headers);
};

exports.cancelInvite = (params) => {
    const url = routes.delete.cancelInvite;
    let formData = new FormData();

    Object.keys(params).forEach(param => {
        if (params[param]) formData.append(param, params[param]);
    });

    return axios.delete(url, {...headers, data: formData});
};
