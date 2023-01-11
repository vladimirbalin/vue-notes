import httpService from "./http.service";
import csrf from "./csrf.service";
import store from "@/store";
import {PURGE_AUTH} from "@/store/actions.type";
import router from "@/routes";

const authService = {
    async getUser() {
        const {data} = await httpService.get('user');
        return data;
    },
    async login(credentials) {
        await csrf.getCookie();
        const {data: {user}} = await httpService.post('login', credentials)
        const storageUser = JSON.stringify(user);
        localStorage.setItem('api-user', storageUser);

        return user;
    },
    async logout() {
        this.removeUserFromStorage();
        store.commit(PURGE_AUTH);
        await router.push({name: 'login'})
    },
    async register(credentials) {
        await httpService.post('register', credentials);
    },
    removeUserFromStorage() {
        localStorage.removeItem('api-user');
    }
}


export default authService;