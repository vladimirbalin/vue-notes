<template>
    <div class="navbar">
        <span v-if="isLoggedIn">Welcome, <b>{{ user.name }}</b>!<a href="/logout" @click="logout">Logout</a></span>
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
            await this.$store.dispatch('logout');
            this.$router.push({name: 'login'});
        },
    },


}
</script>

<style lang="scss" scoped>
.navbar {
    height: 50px;
    position: fixed;
    background-color: #D7D7D7;
    left: 0;
    right: 0;
    top: 0;
    border-bottom: #0c2023 1px solid;
    line-height: 50px;
    padding: 0 15px;
    text-align: center;
    transition: font-weight 0.3s;

    a {
        color: #727373;
    }

}
</style>
