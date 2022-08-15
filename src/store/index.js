import Vuex from "vuex";
import Vue from "vue";
import note from '@/store/note.module';
import auth from '@/store/auth.module';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        note
    }
})

export default store;