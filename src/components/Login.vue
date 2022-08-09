<template>
    <div class="form-wrapper">
        <h3>Login to create notes</h3>
        <form @submit.prevent="login" action="">
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
                <button type="submit">Login</button>
            </div>
        </form>
        <button class="test-credentials" @click="fillTheForm">Fill the form with test credentials</button>
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
        },
        fillTheForm(){
            this.form.username = this.form.password ='test';
        }
    }
}
</script>

<style scoped lang="scss">
  .colored{
    color: #ff6969;
  }
  .inputs-wrapper{
    margin: .7rem;
  }
  button.test-credentials{
      display: block;
      margin: 0 auto;
      outline: 0;
      cursor: pointer;
      border: 1px solid darken(#e36c77, 5%);
      background-color: #ef5d73;
      color: white;
      padding: 6px 12px;
      transition: all 0.3s;

      &:hover {
           background-color: darken(#e36c77, 10%);
       }
  }
</style>
