import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export const noteService = {
    query,
    save,
    remove,
    get,
    getNewTxtNote,
    getNewImgNote,
    getNewTodosNote,
    prepareNoteTodos,
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
            ],
            txt: "Driving liscence, Coding power"
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
    {
        id: "n105",
        type: "note-todos",
        info: {
            label: "Buy groceries",
            todos: [
                {
                    txt: "Milk",
                    doneAt: null
                },
                {
                    txt: "Eggs",
                    doneAt: 187111111
                }
            ],
            txt: 'Milk, Eggs'
        }
    },
]

function query() {
    return storageService.query(NOTES_KEY, 200)
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTES_KEY, note)
    } else {
        return storageService.post(NOTES_KEY, note, false)
    }
}

function remove(noteId) {
    const idx = gNotesCache.findIndex(note => note.id === noteId)
    console.log('removing note:', noteId);
    return storageService.remove(NOTES_KEY, noteId)
}

function getNewTxtNote() {
    return {
        type: 'note-txt',
        info: { txt: '' },
        isPinned: false,
    }
}

function getNewImgNote() {
    return {
        type: 'note-img',
        info: {
            url: '',
            title: '',
        }
    }
}

function getNewTodosNote() {
    return {
        type: 'note-todos',
        info: {
            label: '',
            todos: [],
            txt: '',
        }
    }
}


function prepareNoteTodos(newNote) {
    const note = { ...newNote }
    const todos = note.info.txt.split(',').map(todo => {
        return {
            txt: todo.trim(),
            doneAt: null
        }
    })
    note.info.todos = todos
    return note
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
