import axios from "axios";

var userAPI = {
    endpoint: "https://api.remotebootcamp.dev/api/users/"
}

export var login = (payload) => {
    const config = {
        method: "POST",
        url: userAPI.endpoint + "login",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    console.log("login is finsihing", payload);
    return axios(config);
}

export var logout = () => {
    const config = {
        method: "GET",
        url: userAPI.endpoint + "logout",
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    console.log("logout is finsihing");
    return axios(config);
}

export var register = (payload) => {
    const config = {
        method: "POST",
        url: userAPI.endpoint + "register",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    console.log("register is finsihing", payload);
    return axios(config);
}

export var getById = (id) => {
    const config = {
        method: "GET",
        url: userAPI.endpoint + id,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config);
}

export var getCurrent = () => {
    const config = {
        method: "GET",
        url: userAPI.endpoint + "current",
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config);
}

export const services = { register, login, getById, getCurrent, logout }

export default services;