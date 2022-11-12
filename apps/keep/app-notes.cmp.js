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
            <note-filter @filtered="setFilter" />
            <note-add @add="addNewNote"/>
            <note-list v-if="notes" @delete-note="deleteNote" :notes="notes"/>
            <note-screen v-if="isOpen" />
        </section>
        `,
    data() {
        return {
            notes: null,
            isOpen: false,
            filterBy: {
                txt: ''
            }
        }
    },
    methods: {
        getNotesToShow() {
            noteService.query()
                .then(notes => {
                    if (!notes || !notes.length) {
                        noteService.getCachedNotes()
                            .then(notes => this.notes = notes)
                    } else if (this.filterBy.txt) {
                        const regex = new RegExp(this.filterBy.txt, 'i')
                        this.notes = notes.filter(note => {
                            if (note.type === 'note-txt') {
                                return regex.test(note.info.txt)
                            } else if (note.type === 'note-img') {
                                return regex.test(note.info.title)
                            } else if (note.type === 'note-todos') {
                                return regex.test(note.info.label) || regex.test(note.info.txt)
                            } else if (note.type === 'note-video') {
                                return regex.test(note.info.title)
                            }
                        })
                    } else this.notes = notes
                })
        },
        addNewNote(newNote) {
            let note = { ...newNote }
            if (note.type === 'note-todos') {
                note = noteService.prepareNoteTodos(note)
            }
            this.saveNote(note)
                .then(note => {
                    this.notes.unshift(note)
                })
        },
        saveNote(note) {
            return noteService.save(note)
        },
        deleteNote(payload) {
            const idx = this.notes.findIndex(note => payload === note.id)
            this.notes.splice(idx, 1)
            noteService.remove(payload)
        },
        editNote(payload) {
            let noteCopy = { ...payload }
            if (noteCopy.type === 'note-todos') {
                noteCopy = noteService.prepareNoteTodos(noteCopy)
            }
            noteService.save(noteCopy)
                .then(() => {
                    this.getNotesToShow()
                })
                .catch(err => {
                })
        },
        toggleScreen(isOpen) {
            this.isOpen = isOpen
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
            this.getNotesToShow()
        },
        togglePin(note) {
            noteService.save(note)
                .then(savedNote => {
                    const idx = this.notes.findIndex(note => note.id === savedNote.id)
                    this.notes[idx] = savedNote
                })
        },
        toggledTodo(payload) {
            noteService.save(payload)
            const idx = this.notes.findIndex(note => payload.id === note.id)
            this.notes.splice(idx, 1, payload)
        },

    },
    components: {
        noteFilter,
        noteEdit,
        noteList,
        noteAdd,
        noteScreen
    },
    created() {
        this.notes = this.getNotesToShow()
        eventBus.on('delete-note', this.deleteNote)
        eventBus.on('note-edited', this.editNote)
        eventBus.on('toggle-screen', this.toggleScreen)
        eventBus.on('toggle-pin', this.togglePin)
        eventBus.on('toggled-todo', this.toggledTodo)
        eventBus.on('color-changed', this.saveNote)
    },
}