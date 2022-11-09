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
            url: "http://some-img/me",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#00d"
        }
    }, {
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
    }
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
            console.log('gNotesCache', gNotesCache)
            return gNotesCache
        })
}