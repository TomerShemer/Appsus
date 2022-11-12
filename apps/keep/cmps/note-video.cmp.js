import noteActions from "./note-actions.cmps.js"
import colorPalette from "./color-palette.cmp.js"

export default {
    props: ['info', 'color'],
    template: `
        <section :style="{backgroundColor: color}" className="note note-video">
            <h1>{{info.title}}</h1>
            <iframe :src="getSrc" width="216" height="130" frameborder="0"></iframe>
            <note-actions @send-email="sendEmail" @toggle-palette="openPalette" @toggle-pin="togglePin" @edit="edit" @delete-note="deleteNote"/>
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
        getSrc() {
            const startIdx = this.info.url.indexOf('=') + 1
            const endIdx = this.info.url.indexOf('&')
            const id = this.info.url.slice(startIdx, endIdx)
            return `https://www.youtube.com/embed/${id}`
        }
    },
    components: {
        noteActions,
        colorPalette
    }
}