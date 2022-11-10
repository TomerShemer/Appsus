import noteActions from "./note-actions.cmps.js"
import colorPalette from "./color-palette.cmp.js"

export default {
    props: ['info', 'isPinned'],
    template: `
        <section className="note note-txt">
            <p class="small-scroll">{{info.txt}}</p>
            <note-actions :isPinned="isPinned" @toggle-pin="togglePin" @edit="edit" @delete-note="deleteNote"/>
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
            console.log('changig color');
        },
        togglePin() {
            this.$emit('toggle-pin')
        }
    },
    computed: {
    },
    components: {
        noteActions,
        colorPalette
    }
}