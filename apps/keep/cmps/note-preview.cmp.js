import { eventBus } from "../../../services/event-bus.service.js"

import noteImg from "./note-img.cmp.js"
import noteTxt from "./note-txt.cmp.js"
import noteTodos from "./note-todos.cmp.js"
import noteEdit from "./note-edit.cmp.js"

export default {
    props: ['note'],
    template: `
        <section className="note-preview">
            <component @edit-note="openEdit" @delete-note="deleteNote" :is="note.type" :info="note.info">
            </component>
            <note-edit @discard-changes="closeEdit" @saved-note-changes="save" v-if="noteToEdit" :note="note" />
        </section>
    `,
    data() {
        return {
            noteToEdit: null
        }
    },
    methods: {
        deleteNote() {
            eventBus.emit('delete-note', this.note.id)
        },
        openEdit() {
            console.log('editing', this.note.id);
            this.noteToEdit = { ...this.note }
            eventBus.emit('toggle-screen', true)
        },
        closeEdit() {
            // change to !isSelected?
            this.noteToEdit = null
            eventBus.emit('toggle-screen', false)
        },
        save(note) {
            // this.$emit('note-changed', note)
            eventBus.emit('note-edited', note)
            this.closeEdit()
        }

    },
    computed: {
    },
    created() {
        eventBus.on('close-editor', this.closeEdit)
    },
    components: {
        noteImg,
        noteTxt,
        noteTodos,
        noteEdit
    }
}