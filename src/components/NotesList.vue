<template>
    <div class="tc-notes-wrapper">
        <button class="tc-add-note" @click="addNote">Add new</button>
        <div class="tc-notes">
            <note v-for="(note) in notes"
                  :key="note.id"
                  :note="note"/>
        </div>
    </div>

</template>

<script>
import Note from "./Note";
import {FETCH_NOTES} from "@/store/actions.type";
import {mapGetters} from "vuex";

export default {
    name: "NotesList",
    components: {Note},
    computed: {
        ...mapGetters([
            'notes'
        ])
    },
    mounted() {
        this.$store.dispatch(FETCH_NOTES);
    },
    methods: {
        async addNote() {
            await this.$store.dispatch('addNote');
            this.lastAddedNote().$refs.title.focus()
        },
        lastAddedNote(){
            return this.$children.at(-1);
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
    background-color: #D7D7D7;
    border: 1px solid transparent;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    font-family: system-ui, -apple-system, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 600;
    justify-content: center;
    line-height: 1.25;
    min-height: 3rem;
    padding: calc(.875rem - 1px) calc(1.5rem - 1px);
    position: relative;
    text-transform: uppercase;
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
    border: 1px solid black;
}

.tc-add-note:hover {
    transform: translateY(-1px);
}

.tc-add-note:active {
    background-color: #0c2023;
    box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
    transform: translateY(0);
}
</style>
