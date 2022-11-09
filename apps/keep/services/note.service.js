import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export const noteService = {
    query,
}

const NOTES_KEY = 'notesDB'
let gNotesCache
_createNotes()

const startingDatabase = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: "n102",
        type: "note-img",
        info: {
            url: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: "n103",
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [
                {
                    txt: "Driving liscence",
                    doneAt: null
                },
                {
                    txt: "Coding power",
                    doneAt: 187111111
                }
            ]
        }
    },
    {
        id: "n104",
        type: "note-txt",
        isPinned: false,
        info: {
            txt: "Today I learned something new!"
        }
    },
]

function query() {
    return storageService.query(NOTES_KEY)
}

function get(noteId) {

}

function save() {

}

function remove() {

}

// Private functions

function _createNotes() {
    return storageService.query(NOTES_KEY)
        .then(res => {
            if (!res || !res.length) {
                gNotesCache = [...startingDatabase]
                localStorage.setItem(NOTES_KEY, JSON.stringify(gNotesCache))
            } else {
                gNotesCache = res
            }
            // console.log('gNotesCache', gNotesCache)
            return gNotesCache
        })
}