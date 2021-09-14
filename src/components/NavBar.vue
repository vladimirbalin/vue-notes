<template>
    <div class="navbar">
        <span v-if="isLoggedIn">Welcome, {{ user.name }}<a href="/logout" @click="logout">Logout</a></span>
        <div class="auth" v-if="!isLoggedIn">
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
        </div>
    </div>
</template>

<script>

export default {
    name: "Navbar",
    computed: {
        isLoggedIn: function () {
            return this.$store.getters.isLoggedIn
        },
        user() {
            return this.$store.getters.getUser || {name:''}
        }
    },
    methods: {
        async logout(e) {
            e.preventDefault();
            
            localStorage.removeItem('api-token');
            localStorage.removeItem('api-user');

            await this.$store.dispatch('logout');
            this.$router.push({name: 'login'});
        
        },
    },


}
</script>

<style lang="scss" scoped>

</style>
