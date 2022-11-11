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
    getCachedNotes,
}

const NOTES_KEY = 'notesDB'
let gNotesCache
_createNotes()

const startingDatabase = [
    {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: utilService.makeId(),
        type: "note-img",
        info: {
            url: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
            title: "Little Toy"
        },
        style: {
            backgroundColor: "#aecbfa"
        }
    },
    {
        id: utilService.makeId(),
        type: "note-todos",
        info: {
            label: "Stuff to go over",
            todos: [
                {
                    txt: "Practice promises",
                    doneAt: 1668118755022
                },
                {
                    txt: "Learn Vue",
                    doneAt: null
                },
                {
                    txt: "Learn CSS",
                    doneAt: null
                },

            ],
            txt: "Practice promises, Learn Vue, Learn CSS"
        }
    },
    {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
        info: {
            txt: "Don't forget to check Amazon delivery status"
        }
    },
    {
        id: utilService.makeId(),
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
                },
                {
                    txt: "Bacon",
                    doneAt: null,
                },
            ],
            txt: 'Milk, Eggs, Bacon'
        }
    },
    {
        id: utilService.makeId(),
        type: "note-img",
        info: {
            url: "https://images.unsplash.com/photo-1476994230281-1448088947db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
            title: "Some flowers I found"
        },
        style: {
            backgroundColor: "#f28b82"
        },
        isPinned: true,
    },
    {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
        info: {
            txt: "Talk to a designer about new logo"
        }
    },
    {
        id: utilService.makeId(),
        type: "note-img",
        info: {
            url: "https://images.unsplash.com/photo-1511858240726-f89c6f5ba6e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
            title: "Maybe this for Halloween?"
        },
        isPinned: false,
    },
    {
        id: utilService.makeId(),
        type: "note-todos",
        info: {
            label: "Renovate house",
            todos: [
                {
                    txt: "Work on garden",
                    doneAt: null
                },
                {
                    txt: "Retile the kitchen",
                    doneAt: 187111111
                },
                {
                    txt: "Paint walls",
                    doneAt: null,
                },
                {
                    txt: "Buy new furniture",
                    doneAt: null,
                },
            ],
            txt: 'Work on garden,Retile the kitchen, Paint walls, Buy new furniture',
        },
        isPinned: true,
    }
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
    // const idx = gNotesCache.findIndex(note => note.id === noteId)
    console.log('removing note:', noteId);
    return storageService.remove(NOTES_KEY, noteId).then(() => gNotesCache)
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

function getCachedNotes() {
    return _createNotes()
}

// Private functions

function _createNotes() {
    return storageService.query(NOTES_KEY)
        .then(res => {
            if (!res || !res.length) {
                gNotesCache = [...startingDatabase]
                localStorage.setItem(NOTES_KEY, JSON.stringify(gNotesCache))
                // storageService.
            } else {
                gNotesCache = res
            }
            console.log('gNotesCache', gNotesCache)
            return gNotesCache
        })
}
