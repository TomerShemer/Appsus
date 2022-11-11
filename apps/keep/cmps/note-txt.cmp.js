import noteActions from "./note-actions.cmps.js"
import colorPalette from "./color-palette.cmp.js"

export default {
    props: ['info', 'isPinned', 'color'],
    template: `
        <section :style="{backgroundColor: color}" className="note note-txt">
            <p class="small-scroll">{{info.txt}}</p>
            <note-actions @toggle-palette="togglePalette" :isPinned="isPinned" @toggle-pin="togglePin" @edit="edit" @delete-note="deleteNote"/>
            <color-palette @change-color="changeColor" v-if="isPaletteOpen" />
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
        togglePin() {
            this.$emit('toggle-pin')
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