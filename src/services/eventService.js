import axios from "axios";

const eventServices = {
    endpoint: "https://api.remotebootcamp.dev/api/events",
};

let getAdd = (payload) => {
    const config = {
        method: "POST",
        url: `${eventServices.endpoint}`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config);
};

let getEdit = (id, payload) => {
    const config = {
        method: "PUT",
        url: `${eventServices.endpoint}/${id}`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config);
};

let getEventFeeds = () => {
    const config = {
        method: "GET",
        url: `${eventServices.endpoint}/feeds`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};

let getEventPaginatedFeeds = (pageIndex, pageSize) => {
    const config = {
        method: "GET",
        url: `${eventServices.endpoint}/feed?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};

let getSearch = () => {
    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/events/search?pageIndex=0&pageSize=7&dateStart=2022-12-01&dateEnd=2022-12-8`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};

let sendEmail = (payload) => {
    const config = {
        method: "POST",
        url: `https://api.remotebootcamp.dev/api/emails`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config);
};

let sendFile = (payload) => {
    const config = {
        method: "POST",
        url: `https://api.remotebootcamp.dev/api/files`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then((response) => response.data.items);
};

export {
    getEventFeeds,
    getEventPaginatedFeeds,
    getAdd,
    getEdit,
    getSearch,
    sendEmail,
    sendFile,
};
