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
        try {
            await csrf.getCookie();
            await httpService.delete('logout');
        } catch (err){
            console.log(err);
        }
        removeUserFromStorage();
    },
    async register(credentials){
        await httpService.post('register', credentials);
    }
}

function removeUserFromStorage() {
    localStorage.removeItem('api-user');
}

export default authService;