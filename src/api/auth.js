const axios = require('axios');

const origin = 'http://31.131.21.188:7300';
const apiVersion = 'v1';
const routes = {
    get: {
        generateNewVerificationCode: `${origin}/${apiVersion}/authentication/generate-new-verification-code`,
        checkRefreshToken: `${origin}/${apiVersion}/authentication/check-refresh-token`,
    },

    post: {
        registration: `${origin}/${apiVersion}/authentication/registration`,
        login: `${origin}/${apiVersion}/authentication/login`,
        checkVerificationCode: `${origin}/${apiVersion}/authentication/check-verification-code`,
        passwordReset: `${origin}/${apiVersion}/authentication/password-reset`,
        passwordRecovery: `${origin}/${apiVersion}/authentication/password-recovery`,
    },
};


exports.getRoutes = () => {
    return routes;
};

exports.register = (credentials) => {
    const url = routes.post.registration;
    return axios.post(url, credentials);
};

exports.login = (credentials) => {
    const url = routes.post.login;
    return axios.post(url, credentials);
};

exports.checkVerificationCode = (credentials) => {
    const url = routes.post.checkVerificationCode;
    return axios.post(url, credentials);
};

exports.resetPassword = (credentials) => {
    const url = routes.post.passwordReset;
    return axios.post(url, credentials);
};
