import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import NotesList from "./components/NotesList";
import VueRouter from "vue-router";
import store from "./store";
import Greetings from "@/components/Greetings";

const routes = [
    {
        path: '/', component: Home,
        name: 'home',
        children: [
            {path: '', component: Greetings, name: 'greetings'},
            {path: 'login', component: Login, name: 'login'},
            {path: 'register', component: Register, name: 'register'},
            {path: 'notes', component: NotesList, name: 'notes', meta: {requiresAuth: true}},
        ]
    },
];

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes
})
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn) {
            next({
                path: '/login',
            })
        } else {
            next()
        }
    } else {
        next()
    }

    if (store.getters.isLoggedIn && (to.name !== 'notes')) {
        next({name: 'notes'})
    } else {
        next()
    }
})

export default router;