import { eventBus } from "../../../services/event-bus.service.js"

import noteImg from "./note-img.cmp.js"
import noteTxt from "./note-txt.cmp.js"
import noteTodos from "./note-todos.cmp.js"

import noteTxtEdit from "./note-txt-edit.js"

export default {
    props: ['note'],
    template: `
        <section className="note-preview">
            <component @edit-note="openEdit" @delete-note="deleteNote" :is="note.type" :info="note.info">
            </component>
            <component v-if="isSelected" :is="note.type + '-edit'" :note="note" >
            </component>
        </section>
    `,
    data() {
        return {
            isSelected: false,

        }
    },
    methods: {
        deleteNote() {
            eventBus.emit('delete-note', this.note.id)
        },
        openEdit() {
            console.log('editing', this.note.id);
            this.isSelected = true
        },
        closeEdit() {
            // change to !isSelected?
            this.isSelected = false
        }
    },
    computed: {
    },
    created() {
    },
    components: {
        noteImg,
        noteTxt,
        noteTodos,
        noteTxtEdit
    }
}