<template>
    <div class="navbar">
        <span v-if="isLoggedIn">Welcome, {{ user.username }}<a href="/logout" @click="logout">Logout</a></span>
        <div class="auth" v-if="!isLoggedIn">
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
        </div>
    </div>
</template>

<script>
import httpService from "../services/http.service";

export default {
    name: "Navbar",
    props: {
        user: Object,
        isLoggedIn: Boolean
    },
    methods: {
        async logout(e) {
            e.preventDefault();
            await httpService.delete('logout');
            localStorage.removeItem('api-token');
            localStorage.removeItem('api-user');
        }
    },

}
</script>

<style lang="scss" scoped>

</style>
