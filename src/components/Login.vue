<template>
    <div class="form-wrapper">
        <h3>Login to create notes</h3>
        <form @submit.prevent="login" action="">
            <p class="for-testing-purposes">please use <b class="colored">test/test</b> for testing purposes</p>
            <div v-if="errors" class="errors">
                <p v-for="(error, field) in errors" :key="field">
                    {{ error }}
                </p>
            </div>
            <div class="inputs-wrapper">
              <input type="text" v-model="form.username" placeholder="Your username"><br>
              <div class="invalid-feedback">

              </div>
              <input type="password" v-model="form.password" placeholder="Your password"><br>
              <button>Login</button>
            </div>
        </form>
    </div>
</template>

<script>


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
                await this.$store.dispatch('login', this.form);
                this.$router.push({name: 'notes'});
            } catch (err) {
                this.errors = err.response.data.errors;
            }
        }
    }
}
</script>

<style scoped>
  .for-testing-purposes{
    text-align: center;
    font-weight: 300;
  }
  .colored{
    color: #ff6969;
  }
  .inputs-wrapper{
    margin: .7rem;
  }
</style>
