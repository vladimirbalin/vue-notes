import Vuex from "vuex";
import Vue from "vue";
import authService from "./services/auth.service";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: JSON.parse(localStorage.getItem('api-user')) || {},
        isLoggedIn: !!localStorage.getItem('api-user'),
    },
    mutations: {
        auth_success(state, user) {
            state.user = user;
            state.isLoggedIn = true
        },
        auth_logout(state) {
            state.user = {};
            state.isLoggedIn = false
        },
    },
    actions: {
        async login({commit}, credentials) {
            const user = await authService.login(credentials);
            commit('auth_success', user);
        },
        async logout({commit}) {
            await authService.logout();
            commit('auth_logout');
        },
        async register(obj, credentials) {
            await authService.register(credentials);
        }
    },
    getters: {
        isLoggedIn: state => state.isLoggedIn,
        getUser: state => state.user,
    }
})

export default store;