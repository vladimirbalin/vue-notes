<template>
    <div class="form-wrapper">
        <h3>Login to create notes</h3>
        <form @submit.prevent="login" action="">
            <small>please use <b>test/test </b>as username/password for testing on existing notes</small><br><br>
            <div v-if="errors" class="errors">
                <p v-for="(error, field) in errors" :key="field">
                    {{ error }}
                </p>
            </div>
            <input type="text" v-model="form.username" placeholder="Your username"><br>
            <div class="invalid-feedback">

            </div>
            <input type="password" v-model="form.password" placeholder="Your password"><br>
            <button>Login</button>
        </form>
    </div>
</template>

<script>

import httpService from "../services/http.service";

export default {
    name: "Login",
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            errors: null,
        }
    },
    methods: {
        async login(e) {
            e.preventDefault();
            try {
                const {data, status} = await httpService.post('login', this.form);
                const user = data.user;

                const storageUser = JSON.stringify({'username': user.name, 'id': user.id});
                localStorage.setItem('api-user', storageUser);
                localStorage.setItem('api-token', data.token);

                this.$router.push({name: 'home'});
            } catch (err) {
                this.errors = err.response.data.errors;
            }
        }
    }
}
</script>

<style scoped>

</style>
