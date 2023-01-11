import httpService from "@/services/http.service";
import {
    SET_NOTES,
    FETCH_NOTES,
    REMOVE_NOTE,
    ADD_NOTE,
    UPDATE_NOTE
} from './actions.type';

const state = {
    notes: []
}

const actions = {
    async [FETCH_NOTES]({commit}) {
        let response;
        try {
            response = await httpService.get('notes');
        } catch (error) {
            console.log(error)
        }
        let notes = response.data.data;
        notes = notes.sort((a, b) => {
            if (a.created_at > b.created_at) {
                return -1;
            } else {
                return 1;
            }
        })

        commit(SET_NOTES, notes);
    },
    async [ADD_NOTE]({state, commit, getters}) {
        const newNote = {title: '', content: '', created_by: getters.getUser.id};
        const url = 'notes';
        const {data} = await httpService.post(url, newNote);

        const note = data.data;

        commit(SET_NOTES, [note, ...state.notes]);
    },
    async [REMOVE_NOTE]({commit, state}, note) {
        const url = 'notes/' + note.id;
        try {
            const {status} = await httpService.delete(url);
            if (status === 200) {
                const notes = state.notes;

                const indexOf = notes.findIndex(el => el.id === note.id);
                const begin = notes.slice(0, indexOf);
                const end = notes.slice(indexOf + 1);

                commit(SET_NOTES, [...begin, ...end])
            }
        } catch ({response: {status, data: {message}}}) {
            if (status === 404) {
                console.log(message)
            }
        }
    },
    async [UPDATE_NOTE]({commit, state}, note) {
        const notes = state.notes;
        const indexOf = notes.findIndex(el => el.id === note.id);
        let updatedNote = notes[indexOf];

        try {
            const url = 'notes/' + note.id;
            const {data} = await httpService.put(url, note);
            updatedNote = data.data;
            updatedNote.errors = [];
        } catch (e) {
            updatedNote.errors = e.response.data.errors
        }

        const begin = notes.slice(0, indexOf);
        const end = notes.slice(indexOf + 1);

        commit(SET_NOTES, [...begin, updatedNote, ...end])
    }
}
const mutations = {
    [SET_NOTES](state, notes) {
        state.notes = notes;
    }
}

const getters = {
    notes: state => state.notes,
}

export default {
    state,
    actions,
    mutations,
    getters
};