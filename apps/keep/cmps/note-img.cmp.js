import noteActions from "./note-actions.cmps.js"

export default {
    props: ['info'],
    template: `
        <section class="note note-img">
            <label>{{info.title}}</label>
            <img :src="info.url" alt="" />
            <note-actions @toggle-pin="togglePin" @edit="edit" @delete-note="deleteNote"/>
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
        }
    },
    computed: {
    },
    created() {
        // console.log(this.info);
    },
    components: {
        noteActions
    }
}