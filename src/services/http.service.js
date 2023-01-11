import axios from "axios";
import authService from "@/services/auth.service";

let config = {
    baseURL: process.env.VUE_APP_API_DOMAIN + '/api/',
    withCredentials: true
}

const httpService = axios.create(config);

httpService.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        if (error.response.status === 401 ||
            error.response.status === 419)
        {
            await authService.logout()
        }
        return Promise.reject(error);
    }
);

export default httpService;
