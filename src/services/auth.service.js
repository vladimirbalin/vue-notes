import httpService from "./http.service";

const authService = {
    async isLoggedIn() {
        const {data} = await httpService.get('is-logged-in');
        console.log(data)
        return data;
    },
    async getUser() {
        const {data} = await httpService.get('get-user');
        return data;
    }
}

export default authService;