import noteActions from "./note-actions.cmps.js"


export default {
    props: ['info'],
    template: `
        <section className="note note-todos">
            <label>{{info.label}}</label>
            <ul class="small-scroll">
                <li class="todo-item" v-for="(todo, idx) in info.todos">
                    <label @click.stop="toggleTodo($event, idx)" :class="{'todo-done': todo.doneAt}">{{todo.txt}}</label>
                </li>
            </ul>
            <note-actions @toggle-pin="togglePin" @edit="edit" @delete-note="deleteNote" />
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
        },
        togglePin() {
            this.$emit('toggle-pin')
        },
        toggleTodo(ev, idx) {
            this.$emit('toggle-todo', idx)
        }
    },
    computed: {
    },
    components: {
        noteActions
    }
}