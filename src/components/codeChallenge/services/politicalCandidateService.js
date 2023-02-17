import axios from "axios";

var politicalCandidates = {
    endpoint: "https://api.remotebootcamp.dev/api/entities/politicalCandidates"
}

let getCard = () => {
    console.log("api fire getCard");
    const config = {
        method: "GET",
        url: `${politicalCandidates.endpoint}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

let add = (payload) => {
    console.log("api fire add");
    const config = {
        method: "POST",
        url: `${politicalCandidates.endpoint}`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};


export { getCard, add }
