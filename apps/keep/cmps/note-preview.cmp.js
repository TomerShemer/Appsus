import noteImg from "./note-img.cmp.js"
import noteTxt from "./note-txt.cmp.js"
import noteTodos from "./note-todos.cmp.js"
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['note'],
    template: `
        <section className="note-preview">
            <component @delete-note="deleteNote" :is="note.type" :info="note.info">
            </component>            
        </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        deleteNote() {
            eventBus.emit('delete-note', this.note.id)
        }
    },
    computed: {
    },
    created() {
    },
    components: {
        noteImg,
        noteTxt,
        noteTodos
    }
}