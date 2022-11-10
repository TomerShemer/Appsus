import noteActions from "./note-actions.cmps.js"
import colorPalette from "./color-palette.cmp.js"

export default {
    props: ['info'],
    template: `
        <section className="note note-txt">
            <p>{{info.txt}}</p>
            <note-actions @edit="edit" @delete-note="deleteNote"/>
            <!-- <color-palette /> -->
        </section>
    `,
    data() {
        return {
            isPaletteOpen: false
        }
    },
    methods: {
        deleteNote() {
            this.$emit('delete-note')
        },
        edit() {
            this.$emit('edit-note')
        },
        changeColor() {

        }
    },
    computed: {
    },
    components: {
        noteActions,
        colorPalette
    }
}