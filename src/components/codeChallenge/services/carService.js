import axios from "axios";

var carService = {
    endpoint: "https://api.remotebootcamp.dev/api/entities/cars"
}

carService.getAll = () => {
    const config = {
        method: "GET",
        url: `${carService.endpoint}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

export default carService;