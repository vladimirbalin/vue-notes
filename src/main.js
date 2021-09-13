import Vue from "vue";

window.Vue = require('vue').default;

import App from "./App";
import VueRouter from "vue-router";
import router from "./routes";
import store from "./store";


const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.use(VueRouter)


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
 