import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export const noteService = {
    getNotes,
    getNoteById
}

const SEARCH_KEY = 'notesDB'
let gNotesCache = _createNotes()

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

function getNotes() {
    return gNotesCache
}

function getNoteById(id) {

}



// Private functions

function _createNotes() {
    return storageService.query(SEARCH_KEY)
        .then(notes => {
            console.log(notes);
            return notes
        })
}