<template>
    <div class="tc-notes-wrapper">
        <button class="tc-add-note" @click="addNote">Add note</button>
        <div class="tc-notes">
            <note v-for="(note, index) in notes"
                  :key="index"
                  :note="note"
                  @updateNote="updateNote"
                  @removeNote="removeNote"/>
        </div>
    </div>

</template>

<script>
import Note from "./Note";
import httpService from "../services/http.service";
import {mapState} from "vuex";
import authService from "@/services/auth.service";

export default {
    name: "NotesList",
    components: {Note},
    computed: mapState({
        userId: state => state.user.id,
    }),
    data() {
        return {
            notes: []
        }
    },
    async mounted() {
        let response;
        try {
            response = await httpService.get('notes');
        } catch (err) {
            if (err.response.status === 419 ||
                err.response.status === 401) {
                await authService.logout();
            }
        }
        const notes = response.data.data;
        this.notes = notes.sort((a, b) => {
            if (a.created_at > b.created_at) {
                return -1;
            } else {
                return 1;
            }
        });
    },
    methods: {
        async updateNote(note) {
            const indexOf = this.notes.findIndex(el => el.id === note.id);
            let updatedNote = this.notes[indexOf];

            try {
                const url = 'notes/' + note.id;
                const {data} = await httpService.put(url, note);
                updatedNote = data.data;
                updatedNote.errors = [];
            } catch (e) {
                updatedNote.errors = e.response.data.errors
            }

            const begin = this.notes.slice(0, indexOf);
            const end = this.notes.slice(indexOf + 1);
            this.notes = [...begin, updatedNote, ...end];
        },
        async addNote() {
            const newNote = {title: 'Title', content: 'Content', created_by: this.userId, errors: []};
            const url = 'notes';
            const {data} = await httpService.post(url, newNote);

            const note = data.data;
            this.notes = [note, ...this.notes];
        },
        async removeNote(note) {
            const url = 'notes/' + note.id;
            const {status} = await httpService.delete(url);

            if (status === 202) {
                const indexOf = this.notes.findIndex(el => el.id === note.id);
                const begin = this.notes.slice(0, indexOf);
                const end = this.notes.slice(indexOf + 1);
                this.notes = [...begin, ...end];
            }
            if (status === 404) {
                alert('noth happened');
            }
        }
    }
}
</script>

<style scoped>
.tc-notes-wrapper {
    padding: 30px;
    height: 100%;
}

.tc-notes {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 auto;
}

.tc-add-note {
    align-items: center;
    background-clip: padding-box;
    background-color: #1f5d6b;
    border: 1px solid transparent;
    border-radius: .25rem;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-flex;
    font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 16px;
    font-weight: 600;
    justify-content: center;
    line-height: 1.25;
    margin: 0;
    min-height: 3rem;
    padding: calc(.875rem - 1px) calc(1.5rem - 1px);
    position: relative;
    text-decoration: none;
    transition: all 250ms;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: baseline;
    width: auto;
}

.tc-add-note:hover,
.tc-add-note:focus {
  background-color: #277283;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
}

.tc-add-note:hover {
  transform: translateY(-1px);
}

.tc-add-note:active {
  background-color: #2b7f91;
  box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
  transform: translateY(0);
}
</style>
