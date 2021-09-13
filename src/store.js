import Vuex from "vuex";
import Vue from "vue";

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
        auth_set_user(state, user) {
            state.user = user;
        }
    },
    actions: {
        async setUser({commit}, user) {
            commit('auth_success', user)
        },
        logout({commit}) {
            commit('auth_logout');
        },
    },
    getters: {
        isLoggedIn: state => state.isLoggedIn,
        getUser: state => state.user,
    }
})

export default store;