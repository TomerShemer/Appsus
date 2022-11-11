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
            pinned: null,
            unpinned: null,
        }
    },
    methods: {
        deleteNote(noteId) {
            this.$emit('delete-note', noteId)
        },
        sortPinned(notes) {
            this.pinned = []
            this.unpinned = []
            notes.forEach(note => {
                if (note.isPinned) this.pinned.push(note)
                else this.unpinned.push(note)
            })
            // console.log('this.pinned', this.pinned)
            // console.log('this.unpinned', this.unpinned)
        },
        togglePin() {
            this.sortPinned(this.notes)
        }
    },
    computed: {
        filterPinned() {

        }
    },
    components: {
        notePreview
    },
    created() {
        this.sortPinned(this.notes)

    },
    watch: {
        notes: {
            handler() {
                console.log('changed');
                console.log(this.notes);
                this.sortPinned(this.notes)
            },
            deep: true
        }
    }
}