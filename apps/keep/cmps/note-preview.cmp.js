import { eventBus } from "../../../services/event-bus.service.js"

import noteImg from "./note-img.cmp.js"
import noteTxt from "./note-txt.cmp.js"
import noteTodos from "./note-todos.cmp.js"
import noteEdit from "./note-edit.cmp.js"
import noteVideo from "./note-video.cmp.js"

export default {
    props: ['note'],
    template: `
        <section className="note-preview">
            <component @send-email="sendEmail" :color="color" @change-color="changeColor" @toggle-todo="toggleTodo" @toggle-pin="togglePin" @edit-note="openEdit" @delete-note="deleteNote" :is="note.type" :info="note.info" :isPinned="isPinned">
            </component>
            <note-edit @discard-changes="closeEdit" @saved-note-changes="save" v-if="noteToEdit" :note="note" />
        </section>
    `,
    data() {
        return {
            noteToEdit: null,
            isPinned: this.note.isPinned,
            color: null,
        }
    },
    methods: {
        deleteNote() {
            eventBus.emit('delete-note', this.note.id)
        },
        openEdit() {
            this.noteToEdit = { ...this.note }
            eventBus.emit('toggle-screen', true)
        },
        closeEdit() {
            this.noteToEdit = null
            eventBus.emit('toggle-screen', false)
        },
        save(note) {
            eventBus.emit('note-edited', note)
            this.closeEdit()
        },
        togglePin() {
            this.note['isPinned'] = !this.note.isPinned
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
        },
        changeColor(color) {
            if (!this.note.style) this.note.style = { backgroundColor: color }
            else this.note.style.backgroundColor = color
            this.color = color
            eventBus.emit('color-changed', this.note)
        },
        sendEmail() {
            if (this.note.type === 'note-txt') {
                this.$router.push(`/mail?title=${this.note.info.title}&body=${this.note.info.txt}`)
            } else if (this.note.type === 'note-img') {
                this.$router.push(`/mail?title=${this.note.info.title}&body=${this.note.info.url}`)
            } else if (this.note.type === 'note-todos') {
                this.$router.push(`/mail?title=${this.note.info.label}&body=${this.note.info.txt}&todo=1`)
            } else if (this.note.type === 'note-video') {
                this.$router.push(`/mail?title=${this.note.info.title}&body=${this.note.info.url}`)
            }
        }

    },
    created() {
        eventBus.on('close-editor', this.closeEdit)
        this.color = this.note.style ? this.note.style.backgroundColor : '#ffffff'
    },
    components: {
        noteImg,
        noteTxt,
        noteTodos,
        noteVideo,
        noteEdit
    }
}