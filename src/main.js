import Vue from "vue";

window.Vue = require('vue').default;

import App from "./App";
import VueRouter from "vue-router";
import router from "./routes";
import index from "./store";

Vue.use(VueRouter)


new Vue({
    router,
    store: index,
    render: h => h(App)
}).$mount('#app')
 