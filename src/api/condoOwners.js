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
        meetingDetails: `${origin}/${apiVersion}/condoowner/meeting-details`,
        downloadFileTemplate: `${origin}/${apiVersion}/condoowner/download-file-template`,
    },

    post: {
        uploadCondoOwners: `${origin}/${apiVersion}/condoowner/upload-condo-owners`,
        inviteToMeeting: `${origin}/${apiVersion}/condoowner/invite-to-meeting`,
        acceptInvite: `${origin}/${apiVersion}/condoowner/accept-invite`,
    },

    put: {
        updateMeetingDetails: `${origin}/${apiVersion}/condoowner/meeting-details`,
        updateFileTemplate: `${origin}/${apiVersion}/condoowner/update-file-template`,
    },

    delete: {
        cancelInvite: `${origin}/${apiVersion}/condoowner/cancel-invite`
    }
};

exports.getRoutes = () => {
    return routes;
};

exports.getAll = () => {
    const url = routes.get.users;
    return axios.post(url, headers);
};

exports.meetingDetails = (userId, meetingId) => {
    const url = routes.get.meetingDetails + `?UserId=${userId}&MeetingId=${meetingId}`;
    return axios.get(url, headers);
};

exports.downloadFileTemplate = () => {
    const url = routes.get.downloadFileTemplate;
    return axios.get(url, headers);
};

exports.uploadCondoOwners = (params) => {
    const url = routes.post.uploadCondoOwners;
    let formData = new FormData();

    Object.keys(params).forEach(param => {
        if (params[param]) formData.append(param, params[param]);
    });

    return axios.post(url, formData, headers);
};

exports.inviteToMeeting = (params) => {
    const url = routes.post.inviteToMeeting;
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

exports.acceptInvite = (params) => {
    const url = routes.post.acceptInvite;
    let formData = new FormData();

    Object.keys(params).forEach(param => {
        if (params[param]) formData.append(param, params[param]);
    });

    return axios.post(url, formData, headers);
};

exports.updateMeetingDetails = (params) => {
    const url = routes.put.updateMeetingDetails;
    let formData = new FormData();

    Object.keys(params).forEach(param => {
        if (params[param]) formData.append(param, params[param]);
    });

    return axios.put(url, formData, headers);
};

exports.updateFileTemplate = (params) => {
    const url = routes.put.updateFileTemplate;
    let formData = new FormData();

    Object.keys(params).forEach(param => {
        if (params[param]) formData.append(param, params[param]);
    });

    return axios.put(url, formData, headers);
};

exports.cancelInvite = (params) => {
    const url = routes.delete.cancelInvite;
    let formData = new FormData();

    Object.keys(params).forEach(param => {
        if (params[param]) formData.append(param, params[param]);
    });

    return axios.delete(url, {...headers, data: formData});
};
