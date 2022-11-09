import noteImg from "./note-img.cmp.js"
import noteTxt from "./note-txt.cmp.js"
import noteTodos from "./note-todos.cmp.js"

export default {
    props: ['note'],
    template: `
        <section className="note-preview">
            <component :is="note.type" :info="note.info">
            </component>            
        </section>
    `,
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
    },
    components: {
        noteImg,
        noteTxt,
        noteTodos
    }
}