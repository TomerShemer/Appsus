import noteTxtEdit from "./note-txt-edit.js"
import noteImgEdit from "./note-img-edit.cmp.js"
import noteTodosEdit from "./note-todos-edit.cmp.js"
import noteVideoEdit from "./note-video-edit.cmp.js"

export default {
    props: ['note'],
    template: `
        <section className="note-edit">
            <h1>Edit your note</h1>
            <component @changed-video="saveNoteVideo" @changed-todos="saveNoteTodos" @changed-img="saveNoteImg" @changed-txt="saveNoteTxt" @cancel-changes="discardChanges" :is="note.type + '-edit'" :note="note" >
            </component>
        </section>
        `,
    data() {
        return {
        }
    },
    methods: {
        saveNote(note) {
            this.$emit('saved-note-changes', note)
        },
        saveNoteTxt(newInfo) {
            const note = { ...this.note }
            note.info = newInfo
            this.saveNote(note)
        },
        saveNoteImg(newInfo) {
            const note = this.note
            note.info = newInfo
            this.saveNote(note)
            // this.note = note
        },
        saveNoteTodos(newInfo) {
            const note = { ...this.note }
            note.info = newInfo
            this.saveNote(note)
        },
        saveNoteVideo(newInfo) {
            const note = { ...this.note }
            note.info = newInfo
            this.saveNote(note)
        },
        discardChanges() {
            this.$emit('discard-changes')
        }
    },
    components: {
        noteTxtEdit,
        noteImgEdit,
        noteTodosEdit,
        noteVideoEdit,
    }
}