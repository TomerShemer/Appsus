import noteActions from "./note-actions.cmps.js"

export default {
    props: ['info'],
    template: `
        <section class="note note-img">
            <h1>{{info.title}}</h1>
            <img :src="info.url" alt="" />
            <note-actions @edit="edit" @delete-note="deleteNote"/>
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