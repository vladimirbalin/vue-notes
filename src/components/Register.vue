<template>
    <div class="form-wrapper">
        <h3>Register and create notes</h3>
        <form @submit.prevent="register" action="">
            <div v-if="errors" class="errors">
                <p v-for="(error, field) in errors" :key="field">
                    {{ error }}
                </p>
            </div>
            <input type="text" v-model="form.username" placeholder="Your username"><br>
            <input type="text" v-model="form.email" placeholder="Your email"><br>
            <input type="password" v-model="form.password" placeholder="Your password"><br>
            <input type="password" v-model="form.password_confirmation" placeholder="Repeat password"><br>
            <button>Register</button>
            <router-link to="/login" class="link">Click here to login</router-link>
        </form>
    </div>
</template>

<script>
import axios from "axios";

axios.defaults.withCredentials = true;

export default {
    name: "Register",
    data() {
        return {
            form: {
                username: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            errors: null
        }
    },
    methods: {
        async register(e) {
            e.preventDefault();

            try {
                await this.$store.dispatch('register', this.form);
                this.$router.push('login');
            } catch (err) {
                this.errors = err.response.data.errors;
            }
        }
    }
}
</script>
<style>

</style>
