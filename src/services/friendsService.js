import axios from "axios";
// import * as helper from "./serviceHelper"

var friendsService = {
    endpoint: "https://localhost:50001/api/v3/friends"
}

let addFriend = (payload) => {
    console.log("api fire addFriend");
    const config = {
        method: "POST",
        url: `${friendsService.endpoint}`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

let editFriend = (id, payload) => {
    console.log("api fire editFriend", payload);
    const config = {
        method: "PUT",
        url: `${friendsService.endpoint}/${id}`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config);
}

let getFriend = (pageIndex, pageSize) => {
    console.log("api fire getFriend");
    const config = {
        method: "GET",
        // url: `${friendsService.endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        url: `${friendsService.endpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

let getById = (id) => {
    console.log("api fire getById");
    const config = {
        method: "GET",
        url: `${friendsService.endpoint}/${id}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config);
}

let getSearch = (pageIndex, pageSize, string) => {
    console.log("api fire getFriend");
    const config = {
        method: "GET",
        url: `${friendsService.endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${string}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};


let deleted = (id) => {
    console.log("api fire getDeleted", id);
    const config = {
        method: "DELETE",
        url: `${friendsService.endpoint}/${id}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config);
}

export { getFriend, deleted, addFriend, editFriend, getById, getSearch }