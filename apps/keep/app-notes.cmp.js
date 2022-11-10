import { eventBus } from '../../services/event-bus.service.js'
import { noteService } from './services/note.service.js'

import noteFilter from './cmps/note-filter.cmp.js'
import noteEdit from './cmps/note-edit.cmp.js'
import noteList from './cmps/note-list.cmp.js'
import noteAdd from './cmps/note-add.cmp.js'

export default {
    props: [],
    template: `
        <section className="note-app-container main-layout flex flex-column align-center">
            <note-filter />
            <note-add @add="addNewNote"/>
            <note-list v-if="notes" :notes="notes"/>
        </section>
        `,
    data() {
        return {
            notes: null
        }
    },
    methods: {
        getNotes() {
            noteService.query()
                .then(notes => {
                    this.notes = notes
                    // console.log(notes);
                })
        },
        addNewNote(newNote) {
            let note = { ...newNote }
            if (note.type === 'note-todos') {
                note = noteService.prepareNoteTodos(note)
            }
            // console.log(note);
            noteService.save(note)
                .then(note => {
                    this.notes.unshift(note)
                })
        },
        deleteNote(payload) {

            noteService.remove(payload)
                .then(() => {
                    debugger
                    this.getNotes()
                })
        }
    },
    computed: {
    },
    components: {
        noteFilter,
        noteEdit,
        noteList,
        noteAdd,
    },
    created() {
        this.notes = this.getNotes()
        eventBus.on('delete-note', this.deleteNote)
    },
}