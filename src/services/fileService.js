import axios from "axios";

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

export { sendFile };