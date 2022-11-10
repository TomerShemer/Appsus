import noteActions from "./note-actions.cmps.js"

export default {
    props: ['info'],
    template: `
        <section className="note note-txt">
            <p>{{info.txt}}</p>
            <note-actions @delete-note="deleteNote"/>
        </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        deleteNote() {
            this.$emit('delete-note')
        }
    },
    computed: {
    },
    components: {
        noteActions
    }
}