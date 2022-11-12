import noteActions from "./note-actions.cmps.js"
import colorPalette from "./color-palette.cmp.js"

export default {
    props: ['info', 'isPinned', 'color'],
    template: `
        <section :style="{backgroundColor: color}" className="note note-txt">
            <h1>{{info.title}}</h1>
            <p class="small-scroll">{{info.txt}}</p>
            <note-actions @send-email="sendEmail" @toggle-palette="openPalette" :isPinned="isPinned" @toggle-pin="togglePin" @edit="edit" @delete-note="deleteNote"/>
            <color-palette @blur="closePalette" ref="colorPaletteRef" tabindex="0" @change-color="changeColor" v-show="isPaletteOpen" />
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
        changeColor(color) {
            this.$emit('change-color', color)
            this.isPaletteOpen = false
        },
        openPalette() {
            if (this.isPaletteOpen) return
            this.isPaletteOpen = true
            setTimeout(() => {
                this.$refs.colorPaletteRef.$el.focus()
            }, 0);
        },
        closePalette() {
            this.isPaletteOpen = false
        },
        sendEmail() {
            this.$emit('send-email')
        }
    },
    computed: {
    },
    components: {
        noteActions,
        colorPalette
    },
    mounted() {
    }
}