<template>
    <div class="tc-note">
        <div class="tc-note-header">
            <span @click="removeNote" class="tc-note-close">
                <span class="tc-note-delete">X</span>
            </span>
        </div>

        <!--    errors    -->
        <div v-if="initialNote.errors" class="errors-wrap">
            <div class="errors"
                 v-for="(error, field) in initialNote.errors" :key="field">
                <span>Not saved: </span>
                <p>{{ error }}</p>
            </div>
        </div>

        <!--   title     -->
        <div v-if="titlePlaceholder"
             class="tc-note-title placeholder">
            Enter title
        </div>
        <div ref="title" class="tc-note-title"
             contenteditable=""
             @focusin="placeholderOff('title')"
             @focusout="placeholderOn('title')"
             @blur="titleChanged"
             v-text="note.title">
        </div>

        <!--   content     -->
        <div v-if="contentPlaceholder"
             class="tc-note-body placeholder">
            Text of the note
        </div>
        <div ref="content" class="tc-note-body"
             contenteditable=""
             @focusin="placeholderOff('content')"
             @focusout="placeholderOn('content')"
             @blur="contentChanged"
             v-text="note.content">
        </div>
    </div>
</template>

<script>
export default {
    name: "Note",
    props: {
        initialNote: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            note: this.initialNote,
            titlePlaceholder: !this.initialNote.title,
            contentPlaceholder: !this.initialNote.content,
        }
    },
    methods: {
        removeNote() {
            this.$store.dispatch('removeNote', this.note);
        },
        titleChanged(event) {
            this.note.title = event.target.innerText
            this.$store.dispatch('updateNote', this.note)
        },
        contentChanged(event) {
            this.note.content = event.target.innerText
            this.$store.dispatch('updateNote', this.note)
        },
        placeholderOn(type) {
            if (
                type === 'title' &&
                !this.note.title
            ) {
                this.titlePlaceholder = true;
            }

            if (
                type === 'content' &&
                !this.note.content
            ) {
                this.contentPlaceholder = true;
            }
        },
        placeholderOff(type) {
            if (type === 'title') {
                this.titlePlaceholder = false;
            }

            if (type === 'content') {
                this.contentPlaceholder = false;
            }
        },
    },
    mounted() {
        if (!this.note.title) {
            this.titlePlaceholder = true;
        }
        if (!this.note.content) {
            this.contentPlaceholder = true;
        }
    },
}
</script>

<style lang="scss" scoped>
.errors {
    margin-bottom: 5px;
    padding: 5px 5px;
    color: #fff;
    background-color: #ff6969;
    font-size: 12px;
}

.tc-note {
    background-color: #D7D7D7;
    border: solid 1px #575757;
    width: 280px;
    margin: 0 10px 20px;
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
    transition: all 0.5s;
    font-family: 'Abel', sans-serif;
    z-index: 1;

    .tc-note-header {
        padding: 10px 16px 0;

        .tc-note-close {
            display: inline-block;
            width: 24px;
            height: 24px;
            font-size: 24px;
            color: #808c7b;
            border-radius: 50%;
            line-height: 24px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
                background-color: rgba(0, 0, 0, 0.2);
            }

            &:focus {
                box-shadow: inset 2px 3px 0px rgba(0, 0, 0, 0.8);
            }
        }

        .tc-note-close {
            float: right;
        }
    }

    .tc-note-title,
    .tc-note-body {
        outline: 0;
    }

    .tc-note-title {
        font-size: 32px;
        padding: 10px 16px;
        font-weight: bold;
    }

    .tc-note-title.placeholder,
    .tc-note-body.placeholder {
        position: absolute;
        font-size: 24px;
        color: #a3b09e;
        z-index: -1;
    }

    .tc-note-body {
        font-size: 26px;
        padding: 10px 16px 16px;
    }

    &:hover {
        box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.3);
    }
}
</style>
