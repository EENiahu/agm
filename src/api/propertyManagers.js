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

exports.inviteToProperties = () => {
    const url = routes.post.inviteToProperties;
    return axios.post(url, headers);
};

exports.inviteManagers = () => {
    const url = routes.post.inviteManagers;
    return axios.post(url, headers);
};

exports.acceptInvite = () => {
    const url = routes.post.acceptInvite;
    return axios.post(url, headers);
};

exports.delete = () => {
    const url = routes.delete.cancelInvite;
    return axios.delete(url, headers);
};
