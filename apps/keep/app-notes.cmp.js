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
            <note-list v-if="notes" :notes="notes"/>
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
                    if (this.filterBy.txt) {
                        const regex = new RegExp(this.filterBy.txt, 'i')
                        this.notes = notes.filter(note => {
                            // debugger
                            if (note.type === 'note-txt') {
                                return regex.test(note.info.txt)
                            } else if (note.type === 'note-img') {
                                return regex.test(note.info.title)
                            } else if (note.type === 'note-todos') {
                                return regex.test(note.info.label) || regex.test(note.info.txt)
                            }
                        })
                    } else this.notes = notes
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
                    this.getNotesToShow()
                })
        },
        editNote(payload) {
            let note = { ...payload }
            if (note.type === 'note-todos') {
                note = noteService.prepareNoteTodos(note)
            }
            noteService.save(note)
                .then(() => {
                    this.getNotesToShow()
                })
        },
        toggleScreen(isOpen) {
            // console.log('toggling screen');
            this.isOpen = isOpen
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
            // console.log(this.filterBy);
            this.getNotesToShow()
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
        this.notes = this.getNotesToShow()
        eventBus.on('delete-note', this.deleteNote)
        eventBus.on('note-edited', this.editNote)
        eventBus.on('toggle-screen', this.toggleScreen)
    },
}