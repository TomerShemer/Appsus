import notePreview from "./note-preview.cmp.js"

export default {
    props: ['notes'],
    template: `
        <section className="note-list">
            <note-preview :note="note" v-for="note in notes" :key="note.id"/>
        </section>
    `,
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
    },
    components: {
        notePreview
    }
}