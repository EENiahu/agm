const axios = require('axios');
const apiVersion = 'v1';
const routes = {
    get: {
        generateNewVerificationCode: `${apiVersion}/authentication/generate-new-verification-code`,
        checkRefreshToken: `${apiVersion}/authentication/check-refresh-token`,
    },

    post: {
        registration: `${apiVersion}/authentication/registration`,
        login: `${apiVersion}/authentication/login`,
        checkVerificationCode: `${apiVersion}/authentication/check-verification-code`,
        passwordReset: `${apiVersion}/authentication/password-reset`,
        passwordRecovery: `${apiVersion}/authentication/password-recovery`,
    },
};

const origin = 'http://31.131.21.188:7300/'; // dev

exports.register = (credentials) => {
    const url = origin + routes.post.registration;
    return axios.post(url, credentials);
};

exports.checkVerificationCode = (credentials) => {
    const url = origin + routes.checkVerificationCode;
    return axios.post(url, credentials);
};

exports.login = (credentials) => {
    const url = origin + routes.login;
    return axios.post(url, credentials);
};
