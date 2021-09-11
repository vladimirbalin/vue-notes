import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import NotesList from "./NotesList";

export default [
    {
        path: '/', component: Home,
        name: 'home',
        children: [
            {path: 'login', component: Login, name: 'login'},
            {path: 'register', component: Register, name: 'register'},
            {path: 'notes', component: NotesList, name: 'notes',  meta: { requiresAuth: true }},
        ]
    },
]
