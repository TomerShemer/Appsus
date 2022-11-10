import notePreview from "./note-preview.cmp.js"

export default {
    props: ['notes'],
    template: `
        <section className="note-list flex flex-column">
            <!-- <note-preview @delete-note="deleteNote" :note="note" v-for="note in notes" :key="note.id" /> -->
            <section v-if="pinned.length" className="note-list pinned-list"><note-preview @toggle-pin="togglePin" @delete-note="deleteNote" v-for="note in pinned" :note="note" :key="note.id" /></section>
            <section v-if="unpinned.length" className="note-list unpinned-list"><note-preview @toggle-pin="togglePin" @delete-note="deleteNote" v-for="note in unpinned" :note="note" :key="note.id" /></section>
        </section>
    `,
    data() {
        return {
            pinned: [],
            unpinned: [],
        }
    },
    methods: {
        deleteNote(noteId) {
            this.$emit('delete-note', noteId)
        },
        sortPinned() {
            this.pinned = []
            this.unpinned = []
            this.notes.forEach(note => {
                if (note.isPinned) this.pinned.push(note)
                else this.unpinned.push(note)
            })
            // console.log('this.pinned', this.pinned)
            // console.log('this.unpinned', this.unpinned)
        },
        togglePin() {
            this.sortPinned()
        }
    },
    computed: {

    },
    components: {
        notePreview
    },
    created() {
        this.sortPinned()

    }
}