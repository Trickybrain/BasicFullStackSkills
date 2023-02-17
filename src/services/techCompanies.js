import axios from "axios";


const techCompanies = {
    endpoint: "https://api.remotebootcamp.dev/api/techcompanies"
}

let addCompanies = (payload) => {
    const config = {
        method: "POST",
        url: `${techCompanies.endpoint}`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }

    };

    return axios(config);
}

let editCompanies = (id, payload) => {
    const config = {
        method: "PUT",
        url: `${techCompanies.endpoint}/${id}`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }

    };

    return axios(config);
}


let getCompanies = () => {
    const config = {
        method: "GET",
        url: `${techCompanies.endpoint}?pageIndex=0&pageSize=10`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }

    };

    return axios(config);
}

let deleteCompanies = (id) => {
    const config = {
        method: "PUT",
        url: `${techCompanies.endpoint}/${id}/Active`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

export { addCompanies, deleteCompanies, editCompanies, getCompanies }