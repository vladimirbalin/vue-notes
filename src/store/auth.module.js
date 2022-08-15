import authService from "@/services/auth.service";
import {
    LOGIN,
    LOGOUT,
    PURGE_AUTH,
    REGISTER,
    SET_AUTH
} from "@/store/actions.type";


const initialState = {
    user: JSON.parse(localStorage.getItem('api-user')) || {},
    isLoggedIn: !!localStorage.getItem('api-user'),
}

const state = {
    ...initialState
}

const actions = {
    async [LOGIN]({commit}, credentials) {
        const user = await authService.login(credentials);
        commit(SET_AUTH, user);
    },
    async [LOGOUT]({commit}) {
        await authService.logout();
        commit(PURGE_AUTH);
    },
    async [REGISTER](obj, credentials) {
        await authService.register(credentials);
    },
}
const mutations = {
    [SET_AUTH](state, user) {
        state.user = user;
        state.isLoggedIn = true
    },
    [PURGE_AUTH](state) {
        state.user = {};
        state.isLoggedIn = false
    },
}

const getters = {
    isLoggedIn: state => state.isLoggedIn,
    getUser: state => state.user,
}

export default {
    state,
    actions,
    mutations,
    getters
};