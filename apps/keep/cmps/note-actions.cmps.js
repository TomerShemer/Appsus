
export default {
    props: ['isPinned'],
    template: `
        <section className="note-actions">
            <div title="Toggle Pin" @click.stop="togglePin" @class="{'pin-active': isPinned}" className="action-pin"><i class="fa-solid fa-map-pin"></i></div>
            <div title="Change Note Color" @click.stop="togglePalette" className="action-color"><i class="fa-solid fa-palette"></i></div>
            <div @click="sendEmail($event)" title="Send as email" className="action-mail"><i class="fa-solid fa-envelope"></i></div>
            <div title="Edit Note" @click.stop="edit" className="action-edit"><i class="fa-solid fa-pen-to-square"></i></div>
            <div title="Delete Note" @click.stop="deleteNote" className="action-delete"><i class="fa-solid fa-trash"></i></div>
        </section>
    `,
    methods: {
        deleteNote() {
            this.$emit('delete-note')
        },
        edit() {
            this.$emit('edit')
        },
        togglePin() {
            this.$emit('toggle-pin')
        },
        togglePalette() {
            this.$emit('toggle-palette')
        },
        sendEmail(ev) {
            this.$emit('send-email')
        }
    },
}