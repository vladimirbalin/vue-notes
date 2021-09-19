import axios from "axios";

let config = {
    baseURL: 'http://laravel-notes.local/api/',
    withCredentials: true
}

const httpService = axios.create(config);

export default httpService;
