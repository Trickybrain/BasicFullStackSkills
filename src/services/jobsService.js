import axios from "axios";

let jobService = {
    endpoint: "https://api.remotebootcamp.dev/api/jobs"
}

let addJobs = (payload) => {
    console.log("api fire addFriend");
    const config = {
        method: "POST",
        url: `${jobService.endpoint}`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

let getJobs = () => {
    const config = {
        method: "GET",
        url: `${jobService.endpoint}?pageIndex=0&pageSize=10`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config)
}

let getSearch = (string) => {
    console.log("api fire getSearch");
    const config = {
        method: "GET",
        url: `${jobService.endpoint}/search?pageIndex=0&pageSize=8&searchTerm=${string}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

let deleted = (id) => {
    console.log("api fire getDeleted");
    const config = {
        method: "PUT",
        url: `${jobService.endpoint}/${id}/3`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config);
}

let editJobs = (id, payload) => {
    console.log("api fire editFriend");
    const config = {
        method: "PUT",
        url: `${jobService.endpoint}/${id}`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config);
}


export { getJobs, getSearch, deleted, editJobs, addJobs }