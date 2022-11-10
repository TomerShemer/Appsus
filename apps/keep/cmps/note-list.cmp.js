import notePreview from "./note-preview.cmp.js"

export default {
    props: ['notes'],
    template: `
        <section className="note-list">
            <note-preview @delete-note="deleteNote" :note="note" v-for="note in notes" :key="note.id"/>
            <!-- <section className="pinned"><note-preview v-for="note in pinnedNotes" :notes="note" /></section>
            <section className="unpinned"><note-preview /></section> -->
        </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        deleteNote(noteId) {
            this.$emit('delete-note', noteId)
        }
    },
    computed: {
    },
    components: {
        notePreview
    }
}