import { eventBus } from '../../services/event-bus.service.js'
import { noteService } from './services/note.service.js'

import noteFilter from './cmps/note-filter.cmp.js'
import noteEdit from './cmps/note-edit.cmp.js'
import noteList from './cmps/note-list.cmp.js'
import noteAdd from './cmps/note-add.cmp.js'
import noteScreen from './cmps/note-screen.cmp.js'

export default {
    props: [],
    template: `
        <section className="note-app-container main-layout flex flex-column align-center">
            <note-filter />
            <note-add @add="addNewNote"/>
            <note-list v-if="notes" :notes="notes"/>
            <note-screen v-if="isOpen" />
        </section>
        `,
    data() {
        return {
            notes: null,
            isOpen: false,
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
                    this.getNotes()
                })
        },
        editNote(payload) {
            let note = { ...payload }
            if (note.type === 'note-todos') {
                note = noteService.prepareNoteTodos(note)
            }
            noteService.save(note)
                .then(() => {
                    this.getNotes()
                })
        },
        toggleScreen(isOpen) {
            // console.log('toggling screen');
            this.isOpen = isOpen
        }
    },
    computed: {
    },
    components: {
        noteFilter,
        noteEdit,
        noteList,
        noteAdd,
        noteScreen
    },
    created() {
        this.notes = this.getNotes()
        eventBus.on('delete-note', this.deleteNote)
        eventBus.on('note-edited', this.editNote)
        eventBus.on('toggle-screen', this.toggleScreen)
    },
}