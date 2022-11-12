
export default {
    props: ['isPinned'],
    template: `
        <section className="note-actions">
            <div title="Toggle Pin" @click.stop="togglePin" @class="{'pin-active': isPinned}" className="action-pin"><i class="fa-solid fa-map-pin"></i></div>
            <div title="Change Note Color" @click.stop="togglePalette" className="action-color"><i class="fa-solid fa-palette"></i></div>
            <div @click="sendEmail($event)" title="Send as email" className="action-mail"><i class="fa-solid fa-envelope"></i></div>
            <div title="Edit Note" @click.stop="edit" className="action-edit"><i class="fa-solid fa-pen-to-square"></i></div>
            <div title="Delete Note" @click.stop="deleteNote" className="action-delete"><i class="fa-solid fa-trash"></i></div>
            <!-- <div className="action-more"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.<path d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"/></svg></div> -->
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
            this.$emit('edit')
        },
        togglePin() {
            // console.log('toggling');
            this.$emit('toggle-pin')
        },
        togglePalette() {
            this.$emit('toggle-palette')
        },
        sendEmail(ev) {
            this.$emit('send-email')
        }
    },
    computed: {
    },
    components: {
    }
}