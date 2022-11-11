import noteActions from "./note-actions.cmps.js"
import colorPalette from "./color-palette.cmp.js"
export default {
    props: ['info', 'color'],
    template: `
        <section :style="{backgroundColor: color}" class="note note-img">
            <label>{{info.title}}</label>
            <img :src="info.url" alt="" />
            <note-actions @toggle-palette="togglePalette" @toggle-pin="togglePin" @edit="edit" @delete-note="deleteNote"/>
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
    created() {
        // console.log(this.info);
    },
    components: {
        noteActions,
        colorPalette
    }
}