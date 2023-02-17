import axios from "axios";
import * as helper from "./serviceHelper"

var peopleService = {
    endpoint: "https://api.remotebootcamp.dev/api/people/"
}


let getPeople = () => {
    console.log("api fire getcard");
    const config = {
        method: "GET",
        url: `${peopleService.endpoint}?pageIndex=0&pageSize=5`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(helper.onGlobalSuccess);
};

export { getPeople }