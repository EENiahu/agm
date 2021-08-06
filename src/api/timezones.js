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
        timezones: `${origin}/${apiVersion}/timezone`,
        timezone: `${origin}/${apiVersion}/timezone/{id}`,
    },
};

exports.getRoutes = () => {
    return routes;
};

exports.getAll = () => {
    const url = routes.get.timezones;
    return axios.get(url, headers);
};

exports.getOne = (id) => {
    const url = routes.get.timezone.replace('{id}', id);
    return axios.get(url, headers);
};
