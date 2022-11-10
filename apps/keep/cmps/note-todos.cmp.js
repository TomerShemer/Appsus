import noteActions from "./note-actions.cmps.js"


export default {
    props: ['info'],
    template: `
        <section className="note note-todos">
            <label>{{info.label}}</label>
            <ul>
                <li v-for="todo in info.todos">{{todo.txt}}</li>
            </ul>
            <note-actions @edit="edit" @delete-note="deleteNote" />
        </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        deleteNote() {
            this.$emit('delete-note')
        },
        edit() {
            this.$emit('edit-note')
        }
    },
    computed: {
    },
    components: {
        noteActions
    }
}