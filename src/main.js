 import Vue from "vue";
 
 window.Vue = require('vue').default;
 
 
 import App from "./App";
 import VueRouter from "vue-router";
 import routes from "./components/routes";
import authService from "./services/auth.service";
//  import authService from "./services/auth.service";
 
 
const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

 Vue.use(VueRouter)
 
 const router = new VueRouter({
     mode: 'history',
     base: '/',
     routes
 })
 router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authService.isLoggedIn()) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
  
  if(authService.isLoggedIn() && (to.name === 'login' || to.name === 'register' || to.name ==='home')){
    next({name: 'notes'})
  }else {
    next()
  }
})
new Vue({
     router,
     render: h => h(App)
 }).$mount('#app')
 