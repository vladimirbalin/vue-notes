import httpService from "./http.service";
import csrf from "./csrf.service";

const authService = {
    async getUser() {
        const {data} = await httpService.get('user');
        return data;
    },
    async login(credentials){
        await csrf.getCookie();
        const {data: {user}} = await httpService.post('login', credentials)
        const storageUser = JSON.stringify(user);
        localStorage.setItem('api-user', storageUser);

        return user;
    },
    async logout(){
        await csrf.getCookie();
        await httpService.delete('logout');
        localStorage.removeItem('api-user');
    },
    async register(credentials){
        await httpService.post('register', credentials);
    }
}

export default authService;