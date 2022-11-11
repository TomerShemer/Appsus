import { eventBus } from "../../../services/event-bus.service.js"

import noteImg from "./note-img.cmp.js"
import noteTxt from "./note-txt.cmp.js"
import noteTodos from "./note-todos.cmp.js"
import noteEdit from "./note-edit.cmp.js"

export default {
    props: ['note'],
    template: `
        <section className="note-preview">
            <component @toggle-todo="toggleTodo" @toggle-pin="togglePin" @edit-note="openEdit" @delete-note="deleteNote" :is="note.type" :info="note.info" :isPinned="isPinned">
            </component>
            <note-edit @discard-changes="closeEdit" @saved-note-changes="save" v-if="noteToEdit" :note="note" />
        </section>
    `,
    data() {
        return {
            noteToEdit: null,
            isPinned: this.note.isPinned
        }
    },
    methods: {
        deleteNote() {
            eventBus.emit('delete-note', this.note.id)
        },
        openEdit() {
            // console.log('editing', this.note.id);
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
        },
        togglePin() {
            this.note['isPinned'] = !this.note.isPinned
            // console.log('toggling', this.note, this.note.isPinned);
            eventBus.emit('toggle-pin', this.note)
            this.$emit('toggle-pin', this.note)
        },
        toggleTodo(idx) {
            const newNote = { ...this.note }
            const todo = newNote.info.todos[idx]
            if (!todo.doneAt) {
                todo.doneAt = Date.now()
            } else {
                todo.doneAt = null
            }
            newNote.info.todos.splice(idx, 1, todo)
            eventBus.emit('toggled-todo', newNote)
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