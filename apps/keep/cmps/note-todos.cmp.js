import noteActions from "./note-actions.cmps.js"
import colorPalette from "./color-palette.cmp.js"

export default {
    props: ['info', 'color'],
    template: `
        <section :style="{backgroundColor: color}" className="note note-todos">
            <label>{{info.label}}</label>
            <ul class="small-scroll">
                <li class="todo-item" v-for="(todo, idx) in info.todos">
                    <label @click.stop="toggleTodo($event, idx)" :class="{'todo-done': todo.doneAt}">{{todo.txt}}</label>
                </li>
            </ul>
            <note-actions @toggle-palette="togglePalette" @toggle-pin="togglePin" @edit="edit" @delete-note="deleteNote" />
            <color-palette @change-color="changeColor" v-if="isPaletteOpen" />
        </section>
    `,
    data() {
        return {
            isPaletteOpen: false,
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
        },
        togglePalette() {
            this.isPaletteOpen = !this.isPaletteOpen
        },
        changeColor(color) {
            this.$emit('change-color', color)
            this.isPaletteOpen = false
        }
    },
    computed: {
    },
    components: {
        noteActions,
        colorPalette
    }
}