import Cookie from "js-cookie";
import httpService from "./http.service";

const csrf = {
    getCookie() {
        const token = Cookie.get('XSRF-TOKEN');

        if (token) {
            return new Response(resolve => {
                resolve(token);
            })
        }

        return httpService.get("sanctum/csrf-cookie")
    }
}

export default csrf;