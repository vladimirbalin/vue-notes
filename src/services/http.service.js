import axios from "axios";

let config = {
    baseURL: process.env.VUE_APP_API_DOMAIN + '/api/',
    withCredentials: true
}

const httpService = axios.create(config);

export default httpService;
